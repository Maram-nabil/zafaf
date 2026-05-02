import { useState } from 'react'
import { LayoutDashboard, Store, Users, MessageSquare, Grid, Settings, LogOut } from 'lucide-react'
import ringLogo from '../assets/ring.jpg'
import OverviewTab from '../components/admin-dashboard/OverviewTab'
import VendorsTab from '../components/admin-dashboard/VendorsTab'
import UsersTab from '../components/admin-dashboard/UsersTab'
import InquiriesTab from '../components/admin-dashboard/InquiriesTab'
import CategoriesTab from '../components/admin-dashboard/CategoriesTab'
import SettingsTab from '../components/admin-dashboard/SettingsTab'

const NAV_ITEMS = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'vendors', label: 'Vendors', icon: Store },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { key: 'categories', label: 'Categories', icon: Grid },
    { key: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    const renderTab = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />
            case 'vendors': return <VendorsTab />
            case 'users': return <UsersTab />
            case 'inquiries': return <InquiriesTab />
            case 'categories': return <CategoriesTab />
            case 'settings': return <SettingsTab />
            default: return <OverviewTab />
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
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors hover:bg-red-50"
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
