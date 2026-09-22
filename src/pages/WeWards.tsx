import ActivityForm from '../components/wewards/ActivityForm'
import ActivityTable from '../components/wewards/ActivityTable'

export default function WeWards() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">WeWards</h1>
      <ActivityForm />
      <ActivityTable />
    </div>
  )
}