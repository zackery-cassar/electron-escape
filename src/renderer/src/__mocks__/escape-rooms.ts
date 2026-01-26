import { EscapeRoom } from '@shared/types/escape-room'
import { State } from '@shared/types/state'

export const MOCK_ESCAPE_ROOMS: EscapeRoom[] = [
  {
    id: 'dark-dungeon',
    name: 'Dark Dungeon',
    state: State.READY,
    puzzles: [
      {
        id: 'chain-lock',
        name: 'Chain Lock',
        isTech: false,
        order: 1,
        state: State.READY,
        connected: true,
        hints: [
          {
            id: 'hint-1',
            title: 'Feel for the arrow',
            content: 'This is the first hint.',
            order: 0
          },
          { id: 'hint-2', title: 'Unlock the chain', content: 'This is the second hint.', order: 1 }
        ]
      },
      {
        id: 'crank',
        name: 'Crank',
        isTech: true,
        order: 2,
        state: State.ACTIVE,
        hints: [],
        connected: false
      },
      {
        id: 'runes',
        name: 'Runes',
        isTech: true,
        order: 3,
        state: State.PAUSED,
        hints: [],
        connected: true
      },
      {
        id: 'maze',
        name: 'Maze',
        isTech: true,
        order: 4,
        state: State.FINISHED,
        hints: [],
        connected: false
      }
    ],
    connected: true
  },
  {
    id: 'mad-monster',
    name: 'Mad Monster',
    state: State.ACTIVE,
    puzzles: [],
    connected: false
  },
  {
    id: 'cottage-capers',
    name: 'Cottage Capers',
    state: State.READY,
    puzzles: [],
    connected: false
  },
  {
    id: 'r18',
    name: 'R18',
    state: State.RESETTING,
    puzzles: [],
    connected: true
  }
]
