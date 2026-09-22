import { useData } from '../../context/DataContext'
import { countCollected, isComplete } from '../../utils/calculations'
import { Trash2, Pencil } from 'lucide-react'
import type { CardCollection, Region } from '../../types'

interface RegionTableProps {
  region: Region
  collections: CardCollection[]
  onEdit: (collection: CardCollection) => void
}

export default function RegionTable({ region, collections, onEdit }: RegionTableProps) {
  const { deleteCollection } = useData()

  if (collections.length === 0) return null

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">{region}</h2>
      <div className="bg-slate-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3">Collection</th>
              {Array.from({ length: 9 }, (_, i) => (
                <th key={i} className="px-3 py-3 text-center">{i + 1}</th>
              ))}
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {collections.map(col => {
              const total = countCollected(col.cards)
              const complete = isComplete(col.cards)
              return (
                <tr key={col.id} className="border-b border-slate-700/50 text-white">
                  <td className="px-4 py-3 font-medium">
                    {col.name}
                    {complete && (
                      <span className="ml-2 inline-block bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full">
                        Complete
                      </span>
                    )}
                  </td>
                  {col.cards.map((card, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      {card.trim() ? (
                        <span title={card} className="text-emerald-400">●</span>
                      ) : (
                        <span className="text-slate-600">○</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">{total}/9</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEdit(col)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      aria-label="Edit collection"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteCollection(col.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                      aria-label="Delete collection"
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
    </div>
  )
}