import { EscapeRoom } from '@shared/types/escape-room'
import { MqttConfig } from '@shared/types/mqtt-config'
import { WebContents } from 'electron'
import { BaseClient } from './base-client'

export class EscapeRoomClient extends BaseClient {
  private escapeRoom: EscapeRoom

  constructor(id: string, config: MqttConfig, webContents: WebContents, escapeRoom: EscapeRoom) {
    super(id, config, webContents)
    this.escapeRoom = escapeRoom
  }

  protected callback(topic: string, message: string): void {
    console.log(`[EscapeRoomClient ${this.id}] Message received on topic ${topic}: ${message}`)

    // TODO: Loop through every puzzle and see if the topic matches
  }
}
