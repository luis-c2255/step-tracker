import { useData } from '../context/DataContext'
import { getAllMonthSummaries } from '../utils/calculations'
import MetricCard from '../components/dashboard/MetricCard'
import ComparisonTable from '../components/dashboard/ComparisonTable'
import CompletedCollections from '../components/dashboard/CompletedCollections'
import {
  Footprints, ArrowLeftRight, MapPin, Coins,
  Flame, Building2, TrendingUp, BarChart3,
} from 'lucide-react'

export default function Dashboard() {
  const { steps, activities } = useData()
  const summaries = getAllMonthSummaries(steps, activities)
  const currentMonth = summaries[0]
  const previousMonth = summaries[1] // may be undefined if there's no prior month data

  const avgStepsComparison =
    previousMonth && previousMonth.daysLogged > 0
      ? currentMonth.avgSteps - previousMonth.avgSteps
      : null

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Monthly totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Steps" value={currentMonth.totalSteps.toLocaleString()} icon={Footprints} />
        <MetricCard label="Converted Steps" value={currentMonth.convertedSteps.toLocaleString()} icon={ArrowLeftRight} />
        <MetricCard label="Total Distance (km)" value={currentMonth.totalDistance.toFixed(2)} icon={MapPin} />
        <MetricCard label="Total Coins Earned" value={currentMonth.totalCoins.toLocaleString()} icon={Coins} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Calories (Total)" value={currentMonth.totalActiveCalories.toLocaleString()} icon={Flame} />
        <MetricCard label="Floors Climbed (Total)" value={currentMonth.totalFloorsClimbed.toLocaleString()} icon={Building2} />
        <MetricCard label="Average Steps / Day" value={Math.round(currentMonth.avgSteps).toLocaleString()} icon={BarChart3} />
        <MetricCard
          label="Avg. Steps vs Last Month"
          value={
            avgStepsComparison === null
              ? '—'
              : `${avgStepsComparison >= 0 ? '+' : ''}${Math.round(avgStepsComparison).toLocaleString()}`
          }
          icon={TrendingUp}
          valueColor={
            avgStepsComparison === null
            ? undefined
            : avgStepsComparison >= 0
            ? 'text-emerald-400'
            : 'text-red-400'
          }
        />
      </div>

      {/* Daily averages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Avg. Distance / Day (km)" value={currentMonth.avgDistance.toFixed(2)} icon={MapPin} />
        <MetricCard label="Avg. Active Calories / Day" value={Math.round(currentMonth.avgActiveCalories).toLocaleString()} icon={Flame} />
        <MetricCard label="Avg. Floors Climbed / Day" value={currentMonth.avgFloorsClimbed.toFixed(1)} icon={Building2} />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Monthly Comparison</h2>
        <ComparisonTable summaries={summaries} />
      </div>

      <CompletedCollections />
    </div>
  )
}