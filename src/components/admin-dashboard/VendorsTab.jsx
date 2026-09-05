import { useState } from 'react'
import { Search } from 'lucide-react'
import { api } from '../../services/api'

const CATEGORIES = ['All', 'Photography', 'DJ & Music', 'Venue & Decor', 'Catering', 'Makeup & Beauty', 'Wedding Cake', 'Wedding Cars', 'Videography']

const STATUS_STYLES = {
    approved: { bg: '#e8f5e9', color: '#4caf50', label: 'Approved' },
    pending: { bg: '#fdf6e7', color: '#c9a84c', label: 'Pending' },
    rejected: { bg: '#fdecea', color: '#e57373', label: 'Rejected' },
}

function getVendorStatus(v) {
    if (v.isApproved) return 'approved'
    if (v.status === 'rejected') return 'rejected'
    return 'pending'
}

export default function VendorsTab({ vendors = [], setVendors }) {
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('All')
    const [statFilter, setStatFilter] = useState('All')

    const filtered = vendors.filter((v) => {
        const matchSearch = (v.businessName || '').toLowerCase().includes(search.toLowerCase())
        const matchCat = catFilter === 'All' || v.category === catFilter
        const vStatus = getVendorStatus(v)
        const matchStat = statFilter === 'All' || vStatus === statFilter.toLowerCase()
        return matchSearch && matchCat && matchStat
    })

    const approve = (id) => {
        api.approveVendor(id).then(() =>
            setVendors(prev => prev.map(v => v._id === id ? { ...v, isApproved: true } : v))
        ).catch(() => { })
    }

    const reject = (id) => {
        api.rejectVendor(id).then(() =>
            setVendors(prev => prev.map(v => v._id === id ? { ...v, status: 'rejected', isApproved: false } : v))
        ).catch(() => { })
    }

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Vendors</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage all registered vendors.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#888780' }} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search vendors..."
                        className="pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors w-52"
                        style={{ color: '#2C2C2A' }} />
                </div>
                <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none bg-white focus:border-[#c9a84c]"
                    style={{ color: '#888780' }}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <select value={statFilter} onChange={(e) => setStatFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none bg-white focus:border-[#c9a84c]"
                    style={{ color: '#888780' }}>
                    {['All', 'Approved', 'Pending', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
                </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['Business Name', 'Category', 'City', 'Rating', 'Status', 'Actions'].map((h) => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: '#888780' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} className="px-5 py-10 text-center text-sm" style={{ color: '#888780' }}>No vendors found.</td></tr>
                        ) : filtered.map((v, i) => {
                            const vStatus = getVendorStatus(v)
                            const s = STATUS_STYLES[vStatus]
                            return (
                                <tr key={v._id} className={i < filtered.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{v.businessName}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{v.category}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{v.city || '—'}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>
                                        {v.avgRating ? `⭐ ${v.avgRating.toFixed(1)}` : '—'}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {s.label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-2">
                                            {vStatus === 'pending' && (
                                                <>
                                                    <button onClick={() => approve(v._id)}
                                                        className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-green-50"
                                                        style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                                                        Approve
                                                    </button>
                                                    <button onClick={() => reject(v._id)}
                                                        className="text-xs px-3 py-1 rounded-lg border transition-colors hover:bg-red-50"
                                                        style={{ borderColor: '#e57373', color: '#e57373' }}>
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {vStatus === 'approved' && (
                                                <button onClick={() => reject(v._id)}
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
