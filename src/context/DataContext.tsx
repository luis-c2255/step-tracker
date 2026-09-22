import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '../api'
import type { StepEntry, WeWardsActivity, CardCollection } from '../types'

interface DataContextType {
  isLoading: boolean

  steps: StepEntry[]
  addStep: (entry: Omit<StepEntry, 'id'>) => Promise<void>
  updateStep: (id: string, entry: Omit<StepEntry, 'id'>) => Promise<void>
  deleteStep: (id: string) => Promise<void>

  activities: WeWardsActivity[]
  addActivity: (entry: Omit<WeWardsActivity, 'id'>) => Promise<void>
  updateActivity: (id: string, entry: Omit<WeWardsActivity, 'id'>) => Promise<void>
  deleteActivity: (id: string) => Promise<void>

  collections: CardCollection[]
  addCollection: (entry: Omit<CardCollection, 'id'>) => Promise<void>
  updateCollection: (id: string, entry: Omit<CardCollection, 'id'>) => Promise<void>
  deleteCollection: (id: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [steps, setSteps] = useState<StepEntry[]>([])
  const [activities, setActivities] = useState<WeWardsActivity[]>([])
  const [collections, setCollections] = useState<CardCollection[]>([])

  // Load everything once, when the app first starts
  useEffect(() => {
    async function loadAll() {
      const [stepsData, activitiesData, collectionsData] = await Promise.all([
        api.getSteps(),
        api.getActivities(),
        api.getCollections(),
      ])
      setSteps(stepsData)
      setActivities(activitiesData)
      setCollections(collectionsData)
      setIsLoading(false)
    }
    loadAll()
  }, [])

  // --- Steps CRUD ---
  const addStep = async (entry: Omit<StepEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() }
    await api.createStep(newEntry)
    setSteps(prev => [...prev, newEntry])
  }
  const updateStep = async (id: string, entry: Omit<StepEntry, 'id'>) => {
    const updated = { ...entry, id }
    await api.updateStep(updated)
    setSteps(prev => prev.map(s => (s.id === id ? updated : s)))
  }
  const deleteStep = async (id: string) => {
    await api.deleteStep(id)
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  // --- Activities CRUD ---
  const addActivity = async (entry: Omit<WeWardsActivity, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() }
    await api.createActivity(newEntry)
    setActivities(prev => [...prev, newEntry])
  }
  const updateActivity = async (id: string, entry: Omit<WeWardsActivity, 'id'>) => {
    const updated = { ...entry, id }
    await api.updateActivity(updated)
    setActivities(prev => prev.map(a => (a.id === id ? updated : a)))
  }
  const deleteActivity = async (id: string) => {
    await api.deleteActivity(id)
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  // --- Collections CRUD ---
  const addCollection = async (entry: Omit<CardCollection, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() }
    await api.createCollection(newEntry)
    setCollections(prev => [...prev, newEntry])
  }
  const updateCollection = async (id: string, entry: Omit<CardCollection, 'id'>) => {
    const updated = { ...entry, id }
    await api.updateCollection(updated)
    setCollections(prev => prev.map(c => (c.id === id ? updated : c)))
  }
  const deleteCollection = async (id: string) => {
    await api.deleteCollection(id)
    setCollections(prev => prev.filter(c => c.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        steps, addStep, updateStep, deleteStep,
        activities, addActivity, updateActivity, deleteActivity,
        collections, addCollection, updateCollection, deleteCollection,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within a DataProvider')
  return context
}