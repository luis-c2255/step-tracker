import { useState } from 'react'
import { useData } from '../context/DataContext'
import { getAvailableMonths } from '../utils/calculations'
import StepForm from '../components/steps/StepForm'
import StepTable from '../components/steps/StepTable'
import MonthPicker from '../components/steps/MonthPicker'

export default function Steps() {
  const { steps } = useData()
  const currentMonth = new Date().toISOString().slice(0, 7)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const months = getAvailableMonths(steps)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-white">Steps</h1>
        <MonthPicker months={months} selected={selectedMonth} onChange={setSelectedMonth} />
      </div>
      <StepForm />
      <StepTable monthKey={selectedMonth} />
    </div>
  )
}