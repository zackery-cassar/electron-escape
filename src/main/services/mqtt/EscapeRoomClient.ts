import { BaseMqttClient } from './BaseMqttClient'

export class EscapeRoomClient extends BaseMqttClient {
  protected handleMessage(topic: string, message: string): void {
    console.log(`[${this.id}] Message received on topic ${topic}:`, message)
  }

  protected getSubscriptions(): string[] {
    return ['test/#']
  }
}
