import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { REGIONS } from '../../constants'
import type { Region } from '../../types'

export default function CollectionForm() {
  const { addCollection } = useData()

  const [region, setRegion] = useState<Region>('Europe')
  const [name, setName] = useState('')
  const [cards, setCards] = useState<string[]>(Array(9).fill(''))
  const [imageUrl, setImageUrl] = useState('')

  function updateCard(index: number, value: string) {
    const next = [...cards]
    next[index] = value
    setCards(next)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    addCollection({ region, name: name.trim(), cards, imageUrl: imageUrl.trim() || undefined })

    setName('')
    setCards(Array(9).fill(''))
    setImageUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-4 md:p-6 space-y-4">
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
            placeholder="e.g. Wonders of the World"
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

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 px-6 transition-colors"
      >
        Add Collection
      </button>
    </form>
  )
}