import { useData } from '../../context/DataContext'
import { isComplete } from '../../utils/calculations'
import { Award } from 'lucide-react'

export default function CompletedCollections() {
  const { collections } = useData()
  const completed = collections.filter(c => isComplete(c.cards))

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Completed Collections</h2>

      {completed.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">
          No completed collections yet — keep collecting!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {completed.map(col => (
            <div
              key={col.id}
              className="bg-slate-800 rounded-xl p-4 flex flex-col items-center text-center gap-2 border border-emerald-500/30 overflow-hidden"
            >
              {col.imageUrl ? (
                <img
                  src={col.imageUrl}
                  alt={col.name}
                  className="w-3/5 aspect-square object-cover rounded-lg"
                  onError={e => {
                    // If the URL is broken, hide the image and fall back gracefully
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="bg-emerald-500/20 text-emerald-400 rounded-full p-3">
                  <Award size={24} />
                </div>
              )}
              <p className="text-white font-medium text-sm">{col.name}</p>
              <p className="text-slate-400 text-xs">{col.region}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}