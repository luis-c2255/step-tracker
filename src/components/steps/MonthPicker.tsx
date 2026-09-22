interface MonthPickerProps {
  months: string[]
  selected: string
  onChange: (month: string) => void
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function MonthPicker({ months, selected, onChange }: MonthPickerProps) {
  return (
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
    >
      {months.map(month => (
        <option key={month} value={month}>
          {formatMonthLabel(month)}
        </option>
      ))}
    </select>
  )
}