import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
}

export default function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 flex items-center gap-4">
      <div className="bg-emerald-500/20 text-emerald-400 rounded-lg p-3">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-slate-400 text-xs">{label}</p>
        <p className="text-white text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}