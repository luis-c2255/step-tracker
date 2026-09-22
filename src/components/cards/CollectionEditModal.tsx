import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { REGIONS } from '../../constants'
import { X } from 'lucide-react'
import type { CardCollection, Region } from '../../types'

interface CollectionEditModalProps {
  collection: CardCollection
  onClose: () => void
}

export default function CollectionEditModal({ collection, onClose }: CollectionEditModalProps) {
  const { updateCollection } = useData()

  const [region, setRegion] = useState<Region>(collection.region)
  const [name, setName] = useState(collection.name)
  const [cards, setCards] = useState<string[]>([...collection.cards])
  const [imageUrl, setImageUrl] = useState(collection.imageUrl ?? '')

  function updateCard(index: number, value: string) {
    const next = [...cards]
    next[index] = value
    setCards(next)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    updateCollection(collection.id, { region, name: name.trim(), cards, imageUrl: imageUrl.trim() || undefined })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Edit Collection</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Region</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value as Region)}
                className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Collection Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Image URL (optional — shown when completed)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Card Names (leave blank for empty slots)</label>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mt-1">
              {cards.map((card, index) => (
                <input
                  key={index}
                  type="text"
                  value={card}
                  onChange={e => updateCard(index, e.target.value)}
                  placeholder={`${index + 1}`}
                  className="bg-slate-700 text-white rounded-lg px-2 py-2 text-sm text-center"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 px-6 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}