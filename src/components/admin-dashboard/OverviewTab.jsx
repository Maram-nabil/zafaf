import { Store, Users, Clock, MessageSquare } from 'lucide-react'
import { api } from '../../services/api'

export default function OverviewTab({ stats = {}, vendors = [], setVendors }) {
    const statCards = [
        { label: 'Total Vendors', value: stats.totalVendors ?? '—', icon: Store, color: '#c9a84c' },
        { label: 'Total Users', value: stats.totalUsers ?? '—', icon: Users, color: '#7cb9a8' },
        { label: 'Pending Approvals', value: stats.pendingVendors ?? '—', icon: Clock, color: '#e57373' },
        { label: 'Total Inquiries', value: stats.totalInquiries ?? '—', icon: MessageSquare, color: '#c9a84c' },
    ]

    const pending = vendors.filter(v => !v.isApproved && v.status !== 'rejected')

    const approve = (id) => {
        api.approveVendor(id).then(() =>
            setVendors(prev => prev.map(v => v._id === id ? { ...v, isApproved: true } : v))
        ).catch(() => { })
    }

    const reject = (id) => {
        api.rejectVendor(id).then(() =>
            setVendors(prev => prev.map(v => v._id === id ? { ...v, status: 'rejected' } : v))
        ).catch(() => { })
    }

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Overview</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Welcome back, Admin. Here's what's happening.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map(({ label, value, icon: Icon, color }) => (
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

            {/* Pending approvals */}
            <div className="bg-white rounded-xl border border-gray-100">
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
                                    {['Business Name', 'Category', 'City', 'Actions'].map((h) => (
                                        <th key={h} className="text-left px-5 py-3 text-xs font-medium"
                                            style={{ color: '#888780' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map((row, i) => (
                                    <tr key={row._id} className={i < pending.length - 1 ? 'border-b border-gray-50' : ''}>
                                        <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{row.businessName}</td>
                                        <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.category}</td>
                                        <td className="px-5 py-3.5" style={{ color: '#888780' }}>{row.city}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex gap-2">
                                                <button onClick={() => approve(row._id)}
                                                    className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-green-50"
                                                    style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                                                    Approve
                                                </button>
                                                <button onClick={() => reject(row._id)}
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
    )
}
