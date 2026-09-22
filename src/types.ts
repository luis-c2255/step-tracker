export interface StepEntry {
  id: string
  date: string // YYYY-MM-DD
  steps: number
  exchangedSteps: number
  coinsEarned: number
}

export interface WeWardsActivity {
  id: string
  date: string // YYYY-MM-DD
  activityName: string
  coinsEarned: number
}

export type Region =
  | 'Europe'
  | 'Africa'
  | 'Asia'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Special'

export interface CardCollection {
  id: string
  region: Region
  name: string
  cards: string[] // always length 9, empty string = empty slot
  imageUrl?: string // optional image shown when the collection is completed
}