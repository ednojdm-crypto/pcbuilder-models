import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ConfiguradorPage from './pages/ConfiguradorPage'
import PrecosPage from './pages/PrecosPage'
import JogosPage from './pages/JogosPage'
import GuiaPage from './pages/GuiaPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/configurador" element={<ConfiguradorPage />} />
      <Route path="/precos" element={<PrecosPage />} />
      <Route path="/jogos" element={<JogosPage />} />
      <Route path="/guia" element={<GuiaPage />} />
    </Routes>
  )
}
