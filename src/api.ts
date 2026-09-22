import type { StepEntry, WeWardsActivity, CardCollection } from './types'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API request failed: ${res.status}`)
  // DELETE responses have no body to parse
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  // Steps
  getSteps: () => request<StepEntry[]>('/api/steps'),
  createStep: (entry: StepEntry) =>
    request('/api/steps', { method: 'POST', body: JSON.stringify(entry) }),
  updateStep: (entry: StepEntry) =>
    request('/api/steps', { method: 'PUT', body: JSON.stringify(entry) }),
  deleteStep: (id: string) =>
    request(`/api/steps?id=${id}`, { method: 'DELETE' }),

  // Activities
  getActivities: () => request<WeWardsActivity[]>('/api/activities'),
  createActivity: (entry: WeWardsActivity) =>
    request('/api/activities', { method: 'POST', body: JSON.stringify(entry) }),
  updateActivity: (entry: WeWardsActivity) =>
    request('/api/activities', { method: 'PUT', body: JSON.stringify(entry) }),
  deleteActivity: (id: string) =>
    request(`/api/activities?id=${id}`, { method: 'DELETE' }),

  // Collections
  getCollections: () => request<CardCollection[]>('/api/collections'),
  createCollection: (entry: CardCollection) =>
    request('/api/collections', { method: 'POST', body: JSON.stringify(entry) }),
  updateCollection: (entry: CardCollection) =>
    request('/api/collections', { method: 'PUT', body: JSON.stringify(entry) }),
  deleteCollection: (id: string) =>
    request(`/api/collections?id=${id}`, { method: 'DELETE' }),
}