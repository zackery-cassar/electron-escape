

export const State = {
	Ready: 0,
	Active: 1,
	Paused: 2,
	Finished: 3,
	Resetting: 4
} as const

export type State = typeof State[keyof typeof State]