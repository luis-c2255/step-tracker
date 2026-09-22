import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { getMonthRows } from '../../utils/calculations'
import { Trash2, Pencil, Check, X } from 'lucide-react'

interface StepTableProps {
  monthKey: string
}

interface EditState {
  date: string
  steps: string
  exchangedSteps: string
  coinsEarned: string
}

export default function StepTable({ monthKey }: StepTableProps) {
  const { steps, deleteStep, updateStep } = useData()
  const rows = getMonthRows(steps, monthKey)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState | null>(null)

  function startEdit(row: (typeof rows)[number]) {
    setEditingId(row.id)
    setEditState({
      date: row.date,
      steps: String(row.steps),
      exchangedSteps: String(row.exchangedSteps),
      coinsEarned: String(row.coinsEarned),
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditState(null)
  }

  function saveEdit(id: string) {
    if (!editState) return
    updateStep(id, {
      date: editState.date,
      steps: Number(editState.steps) || 0,
      exchangedSteps: Number(editState.exchangedSteps) || 0,
      coinsEarned: Number(editState.coinsEarned) || 0,
    })
    cancelEdit()
  }

  if (rows.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">
        No entries for this month yet.
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-xl overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-slate-400 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Steps</th>
            <th className="px-4 py-3">Exchanged</th>
            <th className="px-4 py-3">Distance (km)</th>
            <th className="px-4 py-3">% Change</th>
            <th className="px-4 py-3">Coins</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            const isEditing = editingId === row.id

            if (isEditing && editState) {
              return (
                <tr key={row.id} className="border-b border-slate-700/50 text-white bg-slate-700/30">
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      value={editState.date}
                      onChange={e => setEditState({ ...editState, date: e.target.value })}
                      className="bg-slate-700 rounded px-2 py-1 text-sm w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={editState.steps}
                      onChange={e => setEditState({ ...editState, steps: e.target.value })}
                      className="bg-slate-700 rounded px-2 py-1 text-sm w-24"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={editState.exchangedSteps}
                      onChange={e => setEditState({ ...editState, exchangedSteps: e.target.value })}
                      className="bg-slate-700 rounded px-2 py-1 text-sm w-24"
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-500">—</td>
                  <td className="px-4 py-3 text-slate-500">—</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={editState.coinsEarned}
                      onChange={e => setEditState({ ...editState, coinsEarned: e.target.value })}
                      className="bg-slate-700 rounded px-2 py-1 text-sm w-20"
                    />
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => saveEdit(row.id)} className="text-emerald-400 hover:text-emerald-300">
                      <Check size={16} />
                    </button>
                    <button onClick={cancelEdit} className="text-slate-400 hover:text-white">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              )
            }

            return (
              <tr key={row.id} className="border-b border-slate-700/50 text-white">
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.steps.toLocaleString()}</td>
                <td className="px-4 py-3">{row.exchangedSteps.toLocaleString()}</td>
                <td className="px-4 py-3">{row.distance.toFixed(2)}</td>
                <td className="px-4 py-3">
                  {row.percentChange === null ? (
                    <span className="text-slate-500">—</span>
                  ) : (
                    <span className={row.percentChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {row.percentChange >= 0 ? '+' : ''}
                      {row.percentChange.toFixed(1)}%
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{row.coinsEarned}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => startEdit(row)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                    aria-label="Edit entry"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteStep(row.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                    aria-label="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}