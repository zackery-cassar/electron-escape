import { MqttConfig } from '@shared/types/mqtt-config'
import mqtt from 'mqtt'

export abstract class BaseMqttClient {
  protected client: mqtt.MqttClient | null = null
  protected config: MqttConfig
  protected id: string

  constructor(id: string, config: MqttConfig) {
    this.id = id
    this.config = config
  }

  // Connect to MQTT broekr
  async connect(): Promise<void> {
    if (this.client && this.client.connected) {
      return
    }

    return new Promise((resolve, reject) => {
      const brokerUrl = `mqtt://${this.config.brokerHost}:${this.config.brokerPort}`
      console.log(`[${this.id}] Connecting to ${brokerUrl}...`)

      this.client = mqtt.connect(brokerUrl, {
        clientId: this.id,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000
      })

      // Connection successful
      this.client.on('connect', () => {
        console.log(`[${this.id}] Connected successfully`)
        this.setupSubscriptions()
        resolve()
      })

      // Connection error
      this.client.on('error', (err) => {
        console.error(`[${this.id}] Connection error:`, err)
        reject(err)
      })

      // Incoming messages
      this.client.on('message', (topic, payload) => {
        this.handleMessage(topic, payload.toString())
      })
    })
  }

  async disconnect(): Promise<void> {
    if (!this.client) return

    return new Promise((resolve) => {
      this.client!.end(false, {}, () => {
        this.client = null
        resolve()
      })
    })
  }

  isConnected(): boolean {
    return this.client?.connected ?? false
  }

  private setupSubscriptions(): void {
    if (!this.client) return

    const subscriptions = this.getSubscriptions()

    subscriptions.forEach((topic) => {
      this.client!.subscribe(topic, (error) => {
        if (error) console.log(`[${this.id}] Subscription error for topic ${topic}:`, error)
      })
    })
  }

  protected publish(topic: string, message: string, retain: boolean = false): void {
    if (!this.client || !this.client.connected) return

    this.client.publish(topic, message, { retain }, (error) => {
      if (error) console.log(`[${this.id}] Publish error for topic ${topic}:`, error)
    })
  }

  protected abstract handleMessage(topic: string, message: string): void
  protected abstract getSubscriptions(): string[]
}
