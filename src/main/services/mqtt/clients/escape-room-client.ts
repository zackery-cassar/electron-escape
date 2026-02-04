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
    const data = JSON.parse(message)

    // Timer stuff
    if (topic === `${this.config.topic}/timer/state`) {
      this.webContents.send('timer:state', {
        roomId: this.room.id,
        state: data.state
      })
      return
    }
    if (topic === `${this.config.topic}/timer/connected`) {
      this.webContents.send('timer:connected', {
        roomId: this.room.id,
        connected: data.connected
      })
      return
    }
    if (topic === `${this.config.topic}/timer/data`) {
      this.webContents.send('timer:data', {
        roomId: this.room.id,
        data: data.value
      })
      return
    }

    // Hint stuff
    if (topic === `${this.config.topic}/hint/data`) {
      this.webContents.send('hint:data', {
        roomId: this.room.id,
        data: data.value
      })
      return
    }
    if (topic === `${this.config.topic}/hint/counter`) {
      this.webContents.send('hint:counter', {
        roomId: this.room.id,
        counter: data.value
      })
      return
    }

    // Loop through every puzzle and see if the topic matches
    Object.values(this.room.puzzles).forEach((puzzle) => {
      // Puzzle connected
      if (topic === `${this.room.mqtt.topic}/${puzzle.subtopic}/connected`) {
        this.webContents.send('puzzle:connected', {
          roomId: this.room.id,
          puzzleId: puzzle.id,
          connected: data.connected
        })
        return
      }
      // Puzzle state
      if (topic === `${this.room.mqtt.topic}/${puzzle.subtopic}/state`) {
        // Send the puzzle state update to the renderer process
        this.webContents.send('puzzle:state', {
          roomId: this.room.id,
          puzzleId: puzzle.id,
          state: data.state
        })
        return
      }
    })
  }
}
