import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Store, Users, MessageSquare, Grid, Settings, LogOut } from 'lucide-react'
import ringLogo from '../assets/ring.jpg'
import OverviewTab from '../components/admin-dashboard/OverviewTab'
import VendorsTab from '../components/admin-dashboard/VendorsTab'
import UsersTab from '../components/admin-dashboard/UsersTab'
import InquiriesTab from '../components/admin-dashboard/InquiriesTab'
import CategoriesTab from '../components/admin-dashboard/CategoriesTab'
import SettingsTab from '../components/admin-dashboard/SettingsTab'
import { api } from '../services/api'

const NAV_ITEMS = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'vendors', label: 'Vendors', icon: Store },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { key: 'categories', label: 'Categories', icon: Grid },
    { key: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({})
    const [vendors, setVendors] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.getAdminStats().then(data => setStats(data)).catch(() => { })
        api.getAdminVendors().then(data => setVendors(Array.isArray(data) ? data : [])).catch(() => { })
        api.getAdminUsers().then(data => setUsers(Array.isArray(data) ? data : [])).catch(() => { })
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab stats={stats} vendors={vendors} setVendors={setVendors} />
            case 'vendors': return <VendorsTab vendors={vendors} setVendors={setVendors} />
            case 'users': return <UsersTab users={users} setUsers={setUsers} />
            case 'inquiries': return <InquiriesTab />
            case 'categories': return <CategoriesTab />
            case 'settings': return <SettingsTab />
            default: return <OverviewTab stats={stats} vendors={vendors} setVendors={setVendors} />
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col">

                {/* Logo */}
                <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
                    <img src={ringLogo} alt="Zafaf" className="h-9 w-9 object-contain" />
                    <span className="font-serif text-xl tracking-widest"
                        style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}>
                        Zafaf
                    </span>
                </div>

                {/* Admin label */}
                <div className="px-5 py-3 border-b border-gray-100">
                    <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: '#fdf6e7', color: '#c9a84c' }}>
                        Admin Panel
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                        const active = activeTab === key
                        return (
                            <button key={key} onClick={() => setActiveTab(key)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
                                style={{
                                    backgroundColor: active ? '#fdf6e7' : 'transparent',
                                    color: active ? '#c9a84c' : '#888780',
                                }}>
                                <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                                {label}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 pb-5">
                    <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors hover:bg-red-50"
                        style={{ color: '#e57373' }}>
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
