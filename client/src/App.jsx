import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Match from './pages/Match'
import Recap from './pages/Recap'
import History from './pages/History'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
        <Route path="/recap/:id" element={<Recap />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}
