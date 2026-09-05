import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, User, MessageSquare, Star, Settings, LogOut,
} from 'lucide-react'
import ringLogo from '../assets/ring.jpg'
import OverviewTab from '../components/dashboard/OverviewTab'
import ProfileTab from '../components/dashboard/ProfileTab'
import InquiriesTab from '../components/dashboard/InquiriesTab'
import ReviewsTab from '../components/dashboard/ReviewsTab'
import SettingsTab from '../components/dashboard/SettingsTab'
import { api } from '../services/api'

const NAV_ITEMS = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'profile', label: 'My Profile', icon: User },
    { key: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { key: 'reviews', label: 'Reviews', icon: Star },
    { key: 'settings', label: 'Settings', icon: Settings },
]

export default function VendorDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')
    const [vendor, setVendor] = useState(null)
    const [inquiries, setInquiries] = useState([])
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    useEffect(() => {
        api.getMyVendor().then(data => setVendor(data)).catch(() => { })
        api.getReceivedInquiries()
            .then(data => setInquiries(Array.isArray(data) ? data : []))
            .catch(() => setInquiries([]))
    }, [])

    const updateStatus = async (id, status) => {
        await api.updateInquiryStatus(id, status)
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab vendor={vendor} inquiries={inquiries} />
            case 'profile': return <ProfileTab />
            case 'inquiries': return <InquiriesTab inquiries={inquiries} updateStatus={updateStatus} />
            case 'reviews': return <ReviewsTab />
            case 'settings': return <SettingsTab />
            default: return <OverviewTab vendor={vendor} inquiries={inquiries} />
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col">

                {/* Logo */}
                <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
                    <img src={ringLogo} alt="Zafaf" className="h-9 w-9 object-contain" />
                    <span className="font-serif text-xl tracking-widest" style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}>
                        Zafaf
                    </span>
                </div>

                {/* Vendor identity */}
                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white text-sm font-semibold"
                        style={{ backgroundColor: '#c9a84c' }}>
                        {user.name ? user.name[0].toUpperCase() : 'V'}
                    </div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: '#2C2C2A' }}>
                        {vendor?.businessName || user.name || 'Vendor'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#888780' }}>
                        {vendor?.category || ''}
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                        const active = activeTab === key
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
                                style={{
                                    backgroundColor: active ? '#fdf6e7' : 'transparent',
                                    color: active ? '#c9a84c' : '#888780',
                                }}
                            >
                                <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                                {label}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 pb-5">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors hover:bg-red-50"
                        style={{ color: '#e57373' }}
                    >
                        <LogOut size={17} strokeWidth={1.5} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 overflow-y-auto">
                {renderTab()}
            </main>
        </div>
    )
}
