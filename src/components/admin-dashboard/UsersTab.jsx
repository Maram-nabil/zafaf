import { useState } from 'react'
import { Search } from 'lucide-react'

const STATUS_STYLES = {
    active: { bg: '#e8f5e9', color: '#4caf50', label: 'Active' },
    suspended: { bg: '#fdecea', color: '#e57373', label: 'Suspended' },
}

export default function UsersTab({ users = [] }) {
    const [search, setSearch] = useState('')

    const filtered = users.filter((u) =>
        (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase())
    )

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
                            {['Name', 'Email', 'Role', 'Status'].map((h) => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={4} className="px-5 py-10 text-center text-sm" style={{ color: '#888780' }}>No users found.</td></tr>
                        ) : filtered.map((u, i) => {
                            const statusKey = u.isActive === false ? 'suspended' : 'active'
                            const s = STATUS_STYLES[statusKey]
                            return (
                                <tr key={u._id} className={i < filtered.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium whitespace-nowrap" style={{ color: '#2C2C2A' }}>{u.name}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{u.email}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{u.role || 'user'}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {s.label}
                                        </span>
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
