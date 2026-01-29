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

    this.connect()
  }

  /**
   * Connect to the MQTT broker
   */
  async connect(): Promise<void> {
    if (this.client && this.client.connected) return // Already connected

    return new Promise((resolve, reject) => {
      const brokerUrl = `mqtt://${this.config.brokerHost}:${this.config.brokerPort}` // Construct the broker URL

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
        console.error(`[${this.id}] Connection error:`, error)
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
  publish(topic: string, message: string, retain: boolean = false): void {
    if (!this.client || !this.client.connected) return // Cannot publish if not connected

    // Publish the message
    this.client.publish(topic, message, { retain })
  }

  private setConnected(connected: boolean): void {
    if (this.lastConnected === connected) return
    this.lastConnected = connected
    this.webContents.send('client:connected', { id: this.id, connected })
  }

  protected abstract callback(topic: string, message: string): void
}
