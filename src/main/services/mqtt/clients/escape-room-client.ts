import { EscapeRoom } from '@shared/types/escape-room'
import { MqttConfig } from '@shared/types/mqtt-config'
import { WebContents } from 'electron'
import { BaseClient } from './base-client'

export class EscapeRoomClient extends BaseClient {
  private room: EscapeRoom

  constructor(id: string, config: MqttConfig, webContents: WebContents, room: EscapeRoom) {
    super(id, config, webContents)
    this.room = room
    this.subscribe(`${this.room.mqtt.topic}/#`)
  }

  protected callback(topic: string, message: string): void {
    // Loop through every puzzle and see if the topic matches
    this.room.puzzles.forEach((puzzle) => {
      if (topic === `${this.room.mqtt.topic}/${puzzle.subtopic}/state`) {
        const data = JSON.parse(message)
        // Send the puzzle state update to the renderer process
        this.webContents.send('puzzle:state', {
          roomId: this.room.id,
          puzzleId: puzzle.id,
          state: data.state
        })
      }
    })
  }
}
