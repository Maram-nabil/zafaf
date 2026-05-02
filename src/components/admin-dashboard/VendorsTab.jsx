import { useState } from 'react'
import { Search } from 'lucide-react'

const INITIAL_VENDORS = [
    { id: 1, name: 'Lens & Love Studio', category: 'Photography', city: 'Cairo', rating: 4.9, status: 'Approved' },
    { id: 2, name: 'Golden Moments', category: 'Photography', city: 'Cairo', rating: 4.8, status: 'Approved' },
    { id: 3, name: 'Nile Beats DJ', category: 'DJ & Music', city: 'Cairo', rating: 4.8, status: 'Approved' },
    { id: 4, name: 'Cairo Frames', category: 'Videography', city: 'Cairo', rating: null, status: 'Pending' },
    { id: 5, name: 'Nile Flowers', category: 'Venue & Decor', city: 'Alexandria', rating: null, status: 'Pending' },
    { id: 6, name: 'Dream Shots', category: 'Photography', city: 'Cairo', rating: 4.4, status: 'Suspended' },
]

const CATEGORIES = ['All', 'Photography', 'DJ & Music', 'Venue & Decor', 'Catering', 'Makeup & Beauty', 'Wedding Cake', 'Wedding Cars', 'Videography']
const STATUSES = ['All', 'Approved', 'Pending', 'Suspended']

const STATUS_STYLES = {
    Approved: { bg: '#e8f5e9', color: '#4caf50' },
    Pending: { bg: '#fdf6e7', color: '#c9a84c' },
    Suspended: { bg: '#fdecea', color: '#e57373' },
}

export default function VendorsTab() {
    const [vendors, setVendors] = useState(INITIAL_VENDORS)
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('All')
    const [statFilter, setStatFilter] = useState('All')

    const filtered = vendors.filter((v) => {
        const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
        const matchCat = catFilter === 'All' || v.category === catFilter
        const matchStat = statFilter === 'All' || v.status === statFilter
        return matchSearch && matchCat && matchStat
    })

    const suspend = (id) =>
        setVendors((p) => p.map((v) => v.id === id ? { ...v, status: 'Suspended' } : v))

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
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
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
                            const s = STATUS_STYLES[v.status]
                            return (
                                <tr key={v.id} className={i < filtered.length - 1 ? 'border-b border-gray-50' : ''}>
                                    <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2A' }}>{v.name}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{v.category}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>{v.city}</td>
                                    <td className="px-5 py-3.5" style={{ color: '#888780' }}>
                                        {v.rating ? `⭐ ${v.rating}` : '—'}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: s.bg, color: s.color }}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-2">
                                            <button className="text-xs font-medium hover:underline" style={{ color: '#c9a84c' }}>View</button>
                                            <button className="text-xs font-medium hover:underline" style={{ color: '#888780' }}>Edit</button>
                                            {v.status !== 'Suspended' && (
                                                <button onClick={() => suspend(v.id)}
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
