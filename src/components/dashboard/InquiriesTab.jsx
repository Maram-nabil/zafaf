import { useState } from 'react'

const STATUS_STYLES = {
    pending: { bg: '#fdf6e7', color: '#c9a84c', label: 'Pending' },
    confirmed: { bg: '#e8f5e9', color: '#4caf50', label: 'Confirmed' },
    rejected: { bg: '#fdecea', color: '#e57373', label: 'Rejected' },
}

const FILTERS = ['All', 'pending', 'confirmed', 'rejected']
const FILTER_LABELS = { All: 'All', pending: 'Pending', confirmed: 'Confirmed', rejected: 'Rejected' }

export default function InquiriesTab({ inquiries = [], updateStatus }) {
    const [filter, setFilter] = useState('All')

    const visible = filter === 'All' ? inquiries : inquiries.filter((i) => i.status === filter)

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Inquiries</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage all incoming inquiries from couples.</p>
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
                        {FILTER_LABELS[f]}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['Couple Name', 'Event Date', 'Message', 'Status', 'Actions'].map((h) => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-sm" style={{ color: '#888780' }}>
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : visible.map((row, i) => {
                            const s = STATUS_STYLES[row.status] ?? STATUS_STYLES.pending
                            return (
                                <tr key={row._id} className={i < visible.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium whitespace-nowrap" style={{ color: '#2C2C2A' }}>
                                        {row.userId?.name || 'Couple'}
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap" style={{ color: '#888780' }}>
                                        {row.eventDate ? new Date(row.eventDate).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="px-5 py-3.5 max-w-[220px] truncate" style={{ color: '#888780' }}>
                                        {row.message}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {s.label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {row.status === 'pending' ? (
                                            <div className="flex gap-2">
                                                <button onClick={() => updateStatus(row._id, 'confirmed')}
                                                    className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-green-50"
                                                    style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                                                    Confirm
                                                </button>
                                                <button onClick={() => updateStatus(row._id, 'rejected')}
                                                    className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-red-50"
                                                    style={{ borderColor: '#e57373', color: '#e57373' }}>
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs" style={{ color: '#c9c9c9' }}>—</span>
                                        )}
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
