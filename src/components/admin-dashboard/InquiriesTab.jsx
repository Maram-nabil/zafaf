import { useState } from 'react'

const INITIAL = [
    { id: 1, from: 'Sara & Ahmed', to: 'Lens & Love Studio', date: 'June 1, 2026', status: 'Pending' },
    { id: 2, from: 'Nour & Karim', to: 'Nile Beats DJ', date: 'June 2, 2026', status: 'Confirmed' },
    { id: 3, from: 'Mona & Tamer', to: 'Bloom Decor', date: 'June 3, 2026', status: 'Pending' },
    { id: 4, from: 'Dina & Omar', to: 'Royal Catering', date: 'June 4, 2026', status: 'Rejected' },
    { id: 5, from: 'Layla & Youssef', to: 'Glow Makeup', date: 'June 5, 2026', status: 'Confirmed' },
    { id: 6, from: 'Hana & Sherif', to: 'Dream Shots', date: 'June 6, 2026', status: 'Pending' },
]

const FILTERS = ['All', 'Pending', 'Confirmed', 'Rejected']

const STATUS_STYLES = {
    Pending: { bg: '#fdf6e7', color: '#c9a84c' },
    Confirmed: { bg: '#e8f5e9', color: '#4caf50' },
    Rejected: { bg: '#fdecea', color: '#e57373' },
}

export default function InquiriesTab() {
    const [filter, setFilter] = useState('All')
    const inquiries = INITIAL

    const visible = filter === 'All' ? inquiries : inquiries.filter((i) => i.status === filter)

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Inquiries</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>All inquiries across the platform.</p>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 mb-5">
                {FILTERS.map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium border transition-all"
                        style={{
                            backgroundColor: filter === f ? '#c9a84c' : 'white',
                            color: filter === f ? 'white' : '#888780',
                            borderColor: filter === f ? '#c9a84c' : '#e5e7eb',
                        }}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['From (User)', 'To (Vendor)', 'Date', 'Status'].map((h) => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 ? (
                            <tr><td colSpan={4} className="px-5 py-10 text-center text-sm" style={{ color: '#888780' }}>No inquiries found.</td></tr>
                        ) : visible.map((row, i) => {
                            const s = STATUS_STYLES[row.status]
                            return (
                                <tr key={row.id} className={i < visible.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{row.from}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.to}</td>
                                    <td className="px-5 py-3.5 whitespace-nowrap" style={{ color: '#888780' }}>{row.date}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {row.status}
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
