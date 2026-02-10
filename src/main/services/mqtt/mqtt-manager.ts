import { BaseClient } from './clients/base-client'

export class MqttManager {
  private clients: Map<string, BaseClient> = new Map()

  /**
   * Add MQTT client to the manager
   */
  async addClient(id: string, client: BaseClient): Promise<void> {
    if (this.clients.has(id)) return // Client already exists don't overwrite it

    this.clients.set(id, client)
    console.log(`[MqttManager] Added client with id ${id}.`)

    // Connect the client and handle errors
    try {
      await client.connect()
    } catch (error) {
      console.error(`[MqttManager] Failed to connect client ${id}:`, error)
      // Keep the client in the map even if connection fails - it will attempt to reconnect
    }
  }

  /**
   * Remove MQTT client from the manager
   */
  async removeClient(id: string): Promise<void> {
    if (!this.clients.has(id)) return // Client doesn't exist

    // Disconnect and remove the client
    await this.clients.get(id)?.disconnect()
    this.clients.delete(id)
    console.log(`[MqttManager] Removed client with id ${id}.`)
  }

  /**
   * Get MQTT client by id
   * @param id Client ID
   * @returns The MQTT client or undeffined if not found
   */
  getClient(id: string): BaseClient | undefined {
    return this.clients.get(id)
  }

  /**
   * Cleanup all MQTT clients
   */
  async cleanup(): Promise<void> {
    console.log('[MqttManager] Cleaning up all MQTT clients...')

    // Disconnect all clients
    await Promise.all(Array.from(this.clients.values()).map((client) => client.disconnect()))

    // Clear all the clients from the map
    this.clients.clear()
  }
}

export const mqttManager = new MqttManager()
