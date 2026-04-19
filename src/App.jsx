import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VendorsPage from './pages/VendorsPage'
import VendorProfilePage from './pages/VendorProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendors/:id" element={<VendorProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
