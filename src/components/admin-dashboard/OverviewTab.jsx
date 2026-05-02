import { useState } from 'react'
import { Store, Users, Clock, MessageSquare } from 'lucide-react'

const STATS = [
    { label: 'Total Vendors', value: '576', icon: Store, color: '#c9a84c' },
    { label: 'Total Users', value: '1,240', icon: Users, color: '#7cb9a8' },
    { label: 'Pending Approvals', value: '12', icon: Clock, color: '#e57373' },
    { label: 'Total Inquiries', value: '3,847', icon: MessageSquare, color: '#c9a84c' },
]

const ACTIVITY = [
    { text: 'New vendor registered: Cairo Frames', time: '2 min ago' },
    { text: 'New inquiry submitted', time: '5 min ago' },
    { text: 'Review posted on Lens & Love', time: '12 min ago' },
    { text: 'New user registered', time: '1 hour ago' },
]

const PENDING = [
    { id: 1, name: 'Cairo Frames', category: 'Videography', city: 'Cairo', date: 'Today' },
    { id: 2, name: 'Nile Flowers', category: 'Venue & Decor', city: 'Alexandria', date: 'Yesterday' },
    { id: 3, name: 'Star Catering', category: 'Catering', city: 'Giza', date: '2 days ago' },
]

export default function OverviewTab() {
    const [pending, setPending] = useState(PENDING)

    const remove = (id) => setPending((p) => p.filter((r) => r.id !== id))

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Overview</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Welcome back, Admin. Here's what's happening.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium" style={{ color: '#888780' }}>{label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: color + '1a' }}>
                                <Icon size={15} style={{ color }} />
                            </div>
                        </div>
                        <p className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>{value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Activity feed */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h2 className="text-sm font-semibold mb-4" style={{ color: '#2C2C2A' }}>Recent Activity</h2>
                    <div className="flex flex-col gap-3">
                        {ACTIVITY.map((a, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#c9a84c' }} />
                                <div>
                                    <p className="text-sm" style={{ color: '#2C2C2A' }}>{a.text}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending approvals */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>Pending Vendor Approvals</h2>
                    </div>
                    {pending.length === 0 ? (
                        <p className="px-5 py-8 text-sm text-center" style={{ color: '#888780' }}>
                            No pending approvals.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50">
                                        {['Business Name', 'Category', 'City', 'Date', 'Actions'].map((h) => (
                                            <th key={h} className="text-left px-5 py-3 text-xs font-medium"
                                                style={{ color: '#888780' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map((row, i) => (
                                        <tr key={row.id} className={i < pending.length - 1 ? 'border-b border-gray-50' : ''}>
                                            <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{row.name}</td>
                                            <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.category}</td>
                                            <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.city}</td>
                                            <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.date}</td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex gap-2">
                                                    <button onClick={() => remove(row.id)}
                                                        className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-green-50"
                                                        style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                                                        Approve
                                                    </button>
                                                    <button onClick={() => remove(row.id)}
                                                        className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-red-50"
                                                        style={{ borderColor: '#e57373', color: '#e57373' }}>
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
