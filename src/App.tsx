import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ThoughtsPage } from './pages/ThoughtsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/thoughts" element={<ThoughtsPage />} />
      </Route>
    </Routes>
  )
}

export default App
