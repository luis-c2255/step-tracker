import type { StepEntry, WeWardsActivity } from '../types'


const DISTANCE_FACTOR = 0.00075 // km per step

export function calculateDistance(steps: number): number {
  return steps * DISTANCE_FACTOR
}

export function calculatePercentChange(current: number, previous: number | null): number | null {
  if (previous === null || previous === 0) return null
  return ((current - previous) / previous) * 100
}

// Returns entries for a given "YYYY-MM" month, each enriched with
// distance and % change (comparing against the previous entry overall,
// even if that entry is from the prior month).
export function getMonthRows(allEntries: StepEntry[], monthKey: string) {
  const sorted = [...allEntries].sort((a, b) => a.date.localeCompare(b.date))

  return sorted
    .map((entry, index) => ({
      ...entry,
      distance: calculateDistance(entry.steps),
      stepsDifference: index === 0 ? null : calculateStepsDifference(entry.steps, sorted[index - 1].steps),
    }))
    .filter(entry => entry.date.startsWith(monthKey))
}

// Returns a sorted list of unique "YYYY-MM" months present in the data,
// newest first. Always includes the current month even if it has no entries yet.
export function getAvailableMonths(allEntries: StepEntry[]): string[] {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const months = new Set(allEntries.map(e => e.date.slice(0, 7)))
  months.add(currentMonth)
  return Array.from(months).sort((a, b) => b.localeCompare(a))
}

export function countCollected(cards: string[]): number {
  return cards.filter(c => c.trim() !== '').length
}

export function isComplete(cards: string[]): boolean {
  return countCollected(cards) === 9
}

export interface MonthSummary {
  monthKey: string // YYYY-MM
  totalSteps: number
  convertedSteps: number
  totalDistance: number
  totalCoins: number
  totalActiveCalories: number
  totalFloorsClimbed: number
  daysLogged: number
  avgSteps: number
  avgDistance: number
  avgActiveCalories: number
  avgFloorsClimbed: number
}

export function getMonthSummary(
  steps: StepEntry[],
  activities: WeWardsActivity[],
  monthKey: string
): MonthSummary {
  const monthSteps = steps.filter(s => s.date.startsWith(monthKey))
  const monthActivities = activities.filter(a => a.date.startsWith(monthKey))

  const totalSteps = monthSteps.reduce((sum, s) => sum + s.steps, 0)
  const convertedSteps = monthSteps.reduce((sum, s) => sum + s.exchangedSteps, 0)
  const totalDistance = monthSteps.reduce((sum, s) => sum + calculateDistance(s.steps), 0)
  const coinsFromSteps = monthSteps.reduce((sum, s) => sum + s.coinsEarned, 0)
  const coinsFromActivities = monthActivities.reduce((sum, a) => sum + a.coinsEarned, 0)
  const totalActiveCalories = monthSteps.reduce((sum, s) => sum + s.activeCalories, 0)
  const totalFloorsClimbed = monthSteps.reduce((sum, s) => sum + s.floorsClimbed, 0)

  const daysLogged = monthSteps.length

  return {
    monthKey,
    totalSteps,
    convertedSteps,
    totalDistance,
    totalCoins: coinsFromSteps + coinsFromActivities,
    totalActiveCalories,
    totalFloorsClimbed,
    daysLogged,
    avgSteps: daysLogged > 0 ? totalSteps / daysLogged : 0,
    avgDistance: daysLogged > 0 ? totalDistance / daysLogged : 0,
    avgActiveCalories: daysLogged > 0 ? totalActiveCalories / daysLogged : 0,
    avgFloorsClimbed: daysLogged > 0 ? totalFloorsClimbed / daysLogged : 0,
  }
}

// Returns summaries for every month that has data, newest first,
// always including the current month even if empty.
export function getAllMonthSummaries(steps: StepEntry[], activities: WeWardsActivity[]): MonthSummary[] {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthKeys = new Set([
    ...steps.map(s => s.date.slice(0, 7)),
    ...activities.map(a => a.date.slice(0, 7)),
    currentMonth,
  ])
  return Array.from(monthKeys)
    .sort((a, b) => b.localeCompare(a))
    .map(key => getMonthSummary(steps, activities, key))
}

export function calculateStepsDifference(current: number, previous: number | null): number | null {
  if (previous === null) return null
  return current - previous
}