import { useState } from 'react'
import { useData } from '../context/DataContext'
import { REGIONS } from '../constants'
import CollectionForm from '../components/cards/CollectionForm'
import RegionTable from '../components/cards/RegionTable'
import CollectionEditModal from '../components/cards/CollectionEditModal'
import type { CardCollection } from '../types'

export default function Cards() {
  const { collections } = useData()
  const [editingCollection, setEditingCollection] = useState<CardCollection | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Cards</h1>
      <CollectionForm />

      <div className="space-y-8">
        {REGIONS.map(region => (
          <RegionTable
            key={region}
            region={region}
            collections={collections.filter(c => c.region === region)}
            onEdit={setEditingCollection}
          />
        ))}
      </div>

      {editingCollection && (
        <CollectionEditModal
          collection={editingCollection}
          onClose={() => setEditingCollection(null)}
        />
      )}
    </div>
  )
}