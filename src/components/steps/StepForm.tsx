import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function StepForm() {
  const { addStep } = useData()

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [steps, setSteps] = useState('')
  const [exchangedSteps, setExchangedSteps] = useState('')
  const [coinsEarned, setCoinsEarned] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !steps) return // basic guard: date and steps are required

    addStep({
      date,
      steps: Number(steps),
      exchangedSteps: Number(exchangedSteps) || 0,
      coinsEarned: Number(coinsEarned) || 0,
    })

    // Reset form (keep date, clear the rest)
    setSteps('')
    setExchangedSteps('')
    setCoinsEarned('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-end"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400">Steps</label>
        <input
          type="number"
          value={steps}
          onChange={e => setSteps(e.target.value)}
          placeholder="e.g. 8000"
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400">Exchanged Steps</label>
        <input
          type="number"
          value={exchangedSteps}
          onChange={e => setExchangedSteps(e.target.value)}
          placeholder="e.g. 5000"
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400">Coins Earned</label>
        <input
          type="number"
          value={coinsEarned}
          onChange={e => setCoinsEarned(e.target.value)}
          placeholder="e.g. 10"
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="col-span-2 md:col-span-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 transition-colors"
      >
        Add Entry
      </button>
    </form>
  )
}