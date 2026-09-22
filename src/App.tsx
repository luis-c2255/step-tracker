import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Steps from './pages/Steps'
import Cards from './pages/Cards'
import WeWards from './pages/WeWards'

function App() {
  return (
    <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/steps" element={<Steps />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/wewards" element={<WeWards />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </DataProvider>
  )
}

export default App