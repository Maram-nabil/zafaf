import { MessageSquare, TrendingUp, Star, Eye } from 'lucide-react'

const STATUS_STYLES = {
    pending: { bg: '#fdf6e7', color: '#c9a84c', label: 'Pending' },
    confirmed: { bg: '#e8f5e9', color: '#4caf50', label: 'Confirmed' },
    rejected: { bg: '#fdecea', color: '#e57373', label: 'Rejected' },
}

export default function OverviewTab({ vendor, inquiries = [] }) {
    const stats = [
        { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: '#c9a84c' },
        { label: 'Pending', value: inquiries.filter(i => i.status === 'pending').length, icon: TrendingUp, color: '#7cb9a8' },
        { label: 'Confirmed', value: inquiries.filter(i => i.status === 'confirmed').length, icon: Star, color: '#4caf50' },
        { label: 'Avg Rating', value: vendor?.avgRating ? vendor.avgRating.toFixed(1) : '0', icon: Star, color: '#c9a84c' },
    ]

    const recent = inquiries.slice(0, 4)

    return (
        <div className="px-8 py-8">
            {/* Welcome */}
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>
                    Welcome back, {vendor?.businessName || 'Vendor'}! 👋
                </h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>
                    Here's what's happening with your profile today.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(({ label, value, icon: Icon, color }) => (
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

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl border border-gray-100">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>Recent Inquiries</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-50">
                                {['Couple Name', 'Event Date', 'Message', 'Status'].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recent.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-5 py-8 text-center text-sm" style={{ color: '#888780' }}>
                                        No inquiries yet.
                                    </td>
                                </tr>
                            ) : recent.map((row, i) => {
                                const s = STATUS_STYLES[row.status] ?? STATUS_STYLES.pending
                                return (
                                    <tr key={row._id} className={i < recent.length - 1 ? 'border-b border-gray-50' : ''}>
                                        <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>
                                            {row.userId?.name || 'Couple'}
                                        </td>
                                        <td className="px-5 py-3.5" style={{ color: '#888780' }}>
                                            {row.eventDate ? new Date(row.eventDate).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-5 py-3.5 max-w-[200px] truncate" style={{ color: '#888780' }}>
                                            {row.message}
                                        </td>
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
        </div>
    )
}
