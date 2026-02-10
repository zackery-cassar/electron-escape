import { MqttConfig } from '@shared/types/mqtt-config'
import { WebContents } from 'electron'
import mqtt from 'mqtt'

export abstract class BaseClient {
  protected client: mqtt.MqttClient | null = null
  protected config: MqttConfig
  protected id: string
  protected webContents: WebContents
  protected subscriptions: string[] = []
  private lastConnected: boolean = false

  constructor(id: string, config: MqttConfig, webContents: WebContents) {
    this.id = id
    this.config = config
    this.webContents = webContents
  }

  /**
   * Connect to the MQTT broker
   */
  async connect(): Promise<void> {
    if (this.client && this.client.connected) return // Already connected

    return new Promise((resolve, reject) => {
      // For macOS compatibility, append .local if it's a hostname (not an IP)
      let host = this.config.brokerHost
      if (process.platform === 'darwin') {
        const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(host)
        if (!isIP && !host.endsWith('.local')) {
          host += '.local'
        }
      }

      // Construct the broker URL
      const brokerUrl = `mqtt://${host}:${this.config.brokerPort}`

      // Create a new MQTT client instance and connect
      this.client = mqtt.connect(brokerUrl, {
        clientId: `${this.id}-${Math.random().toString(16).slice(2)}`, // Ensure unique client ID
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000
      })

      // Connection successful
      this.client.on('connect', () => {
        console.log(`[${this.id}] Connected successfully`)
        this.setConnected(true)

        // Subscribe to all topics in the subscriptions list
        this.subscriptions.forEach((topic) => this.client!.subscribe(topic))
        resolve() // Resolve the promise on successful connection
      })

      // Connection error
      this.client.on('error', (error) => {
        this.setConnected(false)
        reject(error) // Reject the promise on error
      })

      // Handle reconnection and disconnection events to update connection status
      this.client.on('reconnect', () => this.setConnected(false))
      this.client.on('close', () => this.setConnected(false))
      this.client.on('offline', () => this.setConnected(false))
      this.client.on('end', () => this.setConnected(false))

      // Incoming messages
      this.client.on('message', (topic, payload) => {
        this.callback(topic, payload.toString()) // Handle incoming messages
      })
    })
  }

  /**
   * Disconnect from the MQTT broker
   */
  async disconnect(): Promise<void> {
    if (!this.client) return // Nothing to disconnect

    // Disconnect the client
    return new Promise((resolve) => {
      this.client!.end(false, {}, () => {
        this.setConnected(false)
        this.client = null
        resolve() // Resolve the promise once disconnected
      })
    })
  }

  /**
   * Subscribe to MQTT topics
   */
  subscribe(topic: string): void {
    if (this.subscriptions.find((sub) => sub === topic)) return // Already subscribed

    // Add topic to subscriptions list
    this.subscriptions.push(topic)

    // Subscribe immediately if connected
    if (this.client && this.client.connected) this.client.subscribe(topic)
  }

  /**
   * Publish a message to an MQTT topic
   */
  publish(topic: string, message: Record<string, unknown>, retain: boolean = false): void {
    if (!this.client || !this.client.connected) return // Cannot publish if not connected

    // Publish the message
    this.client.publish(`${this.config.topic}/${topic}`, JSON.stringify(message), { retain })
  }

  private setConnected(connected: boolean): void {
    if (this.lastConnected === connected) return
    this.lastConnected = connected

    // Check if webContents is still valid before sending (prevents errors on app close)
    if (!this.webContents.isDestroyed()) {
      this.webContents.send('client:connected', { id: this.id, connected })
    }
  }

  protected abstract callback(topic: string, message: string): void
}
