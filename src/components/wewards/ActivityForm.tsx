import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function ActivityForm() {
  const { addActivity } = useData()

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [activityName, setActivityName] = useState('')
  const [coinsEarned, setCoinsEarned] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !activityName) return

    addActivity({
      date,
      activityName,
      coinsEarned: Number(coinsEarned) || 0,
    })

    setActivityName('')
    setCoinsEarned('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
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

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-slate-400">Activity Description</label>
        <input
          type="text"
          value={activityName}
          onChange={e => setActivityName(e.target.value)}
          placeholder="e.g. Daily login bonus"
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400">Coins Earned</label>
        <input
          type="number"
          value={coinsEarned}
          onChange={e => setCoinsEarned(e.target.value)}
          placeholder="e.g. 15"
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="md:col-span-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 transition-colors"
      >
        Add Activity
      </button>
    </form>
  )
}