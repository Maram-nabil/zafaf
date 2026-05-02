import { MessageSquare, TrendingUp, Star, Eye } from 'lucide-react'

const STATS = [
    { label: 'Total Inquiries', value: '24', icon: MessageSquare, color: '#c9a84c' },
    { label: 'This Month', value: '8', icon: TrendingUp, color: '#7cb9a8' },
    { label: 'Avg Rating', value: '4.9', icon: Star, color: '#c9a84c' },
    { label: 'Profile Views', value: '1,240', icon: Eye, color: '#7cb9a8' },
]

const INQUIRIES = [
    { id: 1, couple: 'Sarah & Ahmed', date: 'June 15, 2026', message: 'We loved your work and would love to discuss...', status: 'Pending' },
    { id: 2, couple: 'Nour & Karim', date: 'July 3, 2026', message: 'Are you available for our date?', status: 'Confirmed' },
    { id: 3, couple: 'Mona & Tamer', date: 'Aug 20, 2026', message: 'What packages do you offer for full-day shoots?', status: 'Pending' },
    { id: 4, couple: 'Dina & Omar', date: 'Sept 1, 2026', message: 'Can you travel to Alexandria for our wedding?', status: 'Rejected' },
]

const STATUS_STYLES = {
    Pending: { bg: '#fdf6e7', color: '#c9a84c' },
    Confirmed: { bg: '#e8f5e9', color: '#4caf50' },
    Rejected: { bg: '#fdecea', color: '#e57373' },
}

export default function OverviewTab() {
    return (
        <div className="px-8 py-8">
            {/* Welcome */}
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>
                    Welcome back, Lens & Love! 👋
                </h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>
                    Here's what's happening with your profile today.
                </p>
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

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl border border-gray-100">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>Recent Inquiries</h2>
                    <span className="text-xs" style={{ color: '#c9a84c' }}>View all</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-50">
                                {['Couple Name', 'Event Date', 'Message', 'Status', 'Action'].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {INQUIRIES.map((row, i) => {
                                const s = STATUS_STYLES[row.status]
                                return (
                                    <tr key={row.id} className={i < INQUIRIES.length - 1 ? 'border-b border-gray-50' : ''}>
                                        <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{row.couple}</td>
                                        <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.date}</td>
                                        <td className="px-5 py-3.5 max-w-[200px] truncate" style={{ color: '#888780' }}>{row.message}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                                style={{ backgroundColor: s.bg, color: s.color }}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <button className="text-xs font-medium hover:underline" style={{ color: '#c9a84c' }}>
                                                View
                                            </button>
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
