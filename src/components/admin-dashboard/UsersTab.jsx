import { useState } from 'react'
import { Search } from 'lucide-react'

const INITIAL_USERS = [
    { id: 1, name: 'Sara & Ahmed', email: 'sara@example.com', weddingDate: 'June 15, 2026', inquiries: 4, joined: 'Jan 10, 2026', status: 'Active' },
    { id: 2, name: 'Nour & Karim', email: 'nour@example.com', weddingDate: 'July 3, 2026', inquiries: 2, joined: 'Feb 2, 2026', status: 'Active' },
    { id: 3, name: 'Mona & Tamer', email: 'mona@example.com', weddingDate: 'Aug 20, 2026', inquiries: 3, joined: 'Feb 18, 2026', status: 'Active' },
    { id: 4, name: 'Dina & Omar', email: 'dina@example.com', weddingDate: 'Sept 1, 2026', inquiries: 1, joined: 'Mar 5, 2026', status: 'Suspended' },
    { id: 5, name: 'Layla & Youssef', email: 'layla@example.com', weddingDate: 'Oct 10, 2026', inquiries: 5, joined: 'Mar 22, 2026', status: 'Active' },
]

const STATUS_STYLES = {
    Active: { bg: '#e8f5e9', color: '#4caf50' },
    Suspended: { bg: '#fdecea', color: '#e57373' },
}

export default function UsersTab() {
    const [users, setUsers] = useState(INITIAL_USERS)
    const [search, setSearch] = useState('')

    const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const suspend = (id) =>
        setUsers((p) => p.map((u) => u.id === id ? { ...u, status: 'Suspended' } : u))

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Users</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage all registered couples.</p>
            </div>

            {/* Search */}
            <div className="relative mb-5 w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#888780' }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors w-full"
                    style={{ color: '#2C2C2A' }} />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['Name', 'Email', 'Wedding Date', 'Inquiries', 'Joined', 'Status', 'Actions'].map((h) => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={7} className="px-5 py-10 text-center text-sm" style={{ color: '#888780' }}>No users found.</td></tr>
                        ) : filtered.map((u, i) => {
                            const s = STATUS_STYLES[u.status]
                            return (
                                <tr key={u.id} className={i < filtered.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium whitespace-nowrap" style={{ color: '#2C2C2A' }}>{u.name}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{u.email}</td>
                                    <td className="px-5 py-3.5 whitespace-nowrap" style={{ color: '#888780' }}>{u.weddingDate}</td>
                                    <td className="px-5 py-3.5 text-center" style={{ color: '#888780' }}>{u.inquiries}</td>
                                    <td className="px-5 py-3.5 whitespace-nowrap" style={{ color: '#888780' }}>{u.joined}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-2">
                                            <button className="text-xs font-medium hover:underline" style={{ color: '#c9a84c' }}>View</button>
                                            {u.status !== 'Suspended' && (
                                                <button onClick={() => suspend(u.id)}
                                                    className="text-xs font-medium hover:underline" style={{ color: '#e57373' }}>
                                                    Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
