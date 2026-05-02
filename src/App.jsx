import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VendorsPage from './pages/VendorsPage'
import VendorProfilePage from './pages/VendorProfilePage'
import CategoriesPage from './pages/CategoriesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VendorDashboard from './pages/VendorDashboard'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendors/:id" element={<VendorProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
