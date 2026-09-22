import type { MonthSummary } from '../../utils/calculations'

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function ComparisonTable({ summaries }: { summaries: MonthSummary[] }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-slate-400 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3">Month</th>
            <th className="px-4 py-3">Total Steps</th>
            <th className="px-4 py-3">Converted Steps</th>
            <th className="px-4 py-3">Distance (km)</th>
            <th className="px-4 py-3">Total Coins</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map(row => (
            <tr key={row.monthKey} className="border-b border-slate-700/50 text-white">
              <td className="px-4 py-3">{formatMonthLabel(row.monthKey)}</td>
              <td className="px-4 py-3">{row.totalSteps.toLocaleString()}</td>
              <td className="px-4 py-3">{row.convertedSteps.toLocaleString()}</td>
              <td className="px-4 py-3">{row.totalDistance.toFixed(2)}</td>
              <td className="px-4 py-3">{row.totalCoins.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}