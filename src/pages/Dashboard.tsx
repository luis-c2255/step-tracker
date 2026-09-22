import { useData } from '../context/DataContext'
import { getAllMonthSummaries } from '../utils/calculations'
import MetricCard from '../components/dashboard/MetricCard'
import ComparisonTable from '../components/dashboard/ComparisonTable'
import CompletedCollections from '../components/dashboard/CompletedCollections'
import { Footprints, ArrowLeftRight, MapPin, Coins } from 'lucide-react'

export default function Dashboard() {
  const { steps, activities } = useData()
  const summaries = getAllMonthSummaries(steps, activities)
  const currentMonth = summaries[0]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Steps" value={currentMonth.totalSteps.toLocaleString()} icon={Footprints} />
        <MetricCard label="Converted Steps" value={currentMonth.convertedSteps.toLocaleString()} icon={ArrowLeftRight} />
        <MetricCard label="Total Distance (km)" value={currentMonth.totalDistance.toFixed(2)} icon={MapPin} />
        <MetricCard label="Total Coins Earned" value={currentMonth.totalCoins.toLocaleString()} icon={Coins} />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Monthly Comparison</h2>
        <ComparisonTable summaries={summaries} />
      </div>

      <CompletedCollections />
    </div>
  )
}