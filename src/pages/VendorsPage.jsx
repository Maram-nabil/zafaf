import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../services/api'

const FALLBACK_VENDORS = [
    { id: 1, name: 'Lens & Love Studio', category: 'Photography', city: 'Cairo Maadi', rating: 4.9, reviews: 128, price: 8500, badge: 'Featured' },
    { id: 2, name: 'Golden Moments', category: 'Photography', city: 'Cairo Heliopolis', rating: 4.8, reviews: 94, price: 6000, badge: null },
    { id: 3, name: 'Nour Photography', category: 'Photography', city: 'Cairo Zamalek', rating: 4.7, reviews: 76, price: 12000, badge: 'Top Rated' },
    { id: 4, name: 'Nile Beats DJ', category: 'DJ & Music', city: 'Cairo', rating: 4.8, reviews: 94, price: 5000, badge: 'Top Rated' },
    { id: 5, name: 'Bloom Decor', category: 'Venue & Decor', city: 'Cairo', rating: 4.7, reviews: 76, price: 12000, badge: 'Featured' },
    { id: 6, name: 'Dream Shots', category: 'Photography', city: 'Cairo Nasr City', rating: 4.4, reviews: 38, price: 4500, badge: null },
    { id: 7, name: 'Royal Catering', category: 'Catering', city: 'Cairo', rating: 4.6, reviews: 52, price: 15000, badge: null },
    { id: 8, name: 'Glow Makeup', category: 'Makeup & Beauty', city: 'Cairo', rating: 4.5, reviews: 41, price: 3500, badge: 'Featured' },
    { id: 9, name: 'Sweet Moments', category: 'Wedding Cake', city: 'Cairo', rating: 4.3, reviews: 29, price: 2000, badge: null },
]

const CATEGORIES = [
    { name: 'Photographers', count: 124 },
    { name: 'DJ & Music', count: 87 },
    { name: 'Venue & Decor', count: 96 },
    { name: 'Catering', count: 73 },
    { name: 'Makeup & Beauty', count: 58 },
    { name: 'Wedding Cake', count: 45 },
]

const CITIES = [
    { name: 'Cairo', count: 280 },
    { name: 'Alexandria', count: 120 },
    { name: 'Giza', count: 95 },
    { name: 'Hurghada', count: 48 },
]

function StarRow({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="12" height="12" viewBox="0 0 12 12"
                    fill={s <= Math.round(rating) ? '#c9a84c' : '#e5e7eb'}>
                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                </svg>
            ))}
        </div>
    )
}

function FilterCard({ title, children }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#2C2C2A' }}>
                {title}
            </p>
            {children}
        </div>
    )
}

export default function VendorsPage() {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getVendors()
            .then((data) => {
                setVendors(Array.isArray(data) ? data : FALLBACK_VENDORS)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setVendors(FALLBACK_VENDORS)
                setLoading(false)
            })
    }, [])

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [maxPrice, setMaxPrice] = useState(50000)
    const [minRating, setMinRating] = useState(null)
    const [sort, setSort] = useState('Top Rated')
    const [searchText, setSearchText] = useState('')
    const [searchCity, setSearchCity] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const toggleCategory = (name) =>
        setSelectedCategories((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        )

    const toggleCity = (name) =>
        setSelectedCities((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        )

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm" style={{ color: '#888780' }}>Loading vendors...</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-3xl font-semibold" style={{ color: '#2C2C2A' }}>
                            All Vendors
                        </h1>
                        <p className="text-sm mt-1" style={{ color: '#888780' }}>
                            Browse 576 verified vendors across Egypt
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none w-52"
                            style={{ color: '#2C2C2A' }}
                        />
                        <select
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white"
                            style={{ color: '#888780' }}
                        >
                            <option value="">All Cities</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Alexandria">Alexandria</option>
                            <option value="Giza">Giza</option>
                            <option value="Hurghada">Hurghada</option>
                        </select>
                        <button
                            className="px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#c9a84c' }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6 items-start">

                {/* Sidebar */}
                <aside className="w-56 shrink-0 flex-col gap-4 hidden md:flex">
                    <FilterCard title="Category">
                        {CATEGORIES.map((cat) => (
                            <label key={cat.name} className="flex items-center justify-between py-1 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => toggleCategory(cat.name)}
                                        style={{ accentColor: '#c9a84c' }}
                                    />
                                    <span className="text-sm"
                                        style={{ color: selectedCategories.includes(cat.name) ? '#c9a84c' : '#2C2C2A' }}>
                                        {cat.name}
                                    </span>
                                </div>
                                <span className="text-xs" style={{ color: '#888780' }}>{cat.count}</span>
                            </label>
                        ))}
                    </FilterCard>

                    <FilterCard title="City">
                        {CITIES.map((city) => (
                            <label key={city.name} className="flex items-center justify-between py-1 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCities.includes(city.name)}
                                        onChange={() => toggleCity(city.name)}
                                        style={{ accentColor: '#c9a84c' }}
                                    />
                                    <span className="text-sm"
                                        style={{ color: selectedCities.includes(city.name) ? '#c9a84c' : '#2C2C2A' }}>
                                        {city.name}
                                    </span>
                                </div>
                                <span className="text-xs" style={{ color: '#888780' }}>{city.count}</span>
                            </label>
                        ))}
                    </FilterCard>

                    <FilterCard title="Price Range">
                        <input
                            type="range"
                            min={0}
                            max={50000}
                            step={500}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                            style={{ accentColor: '#c9a84c' }}
                        />
                        <div className="flex justify-between mt-2 text-xs">
                            <span style={{ color: '#888780' }}>0 EGP</span>
                            <span style={{ color: '#c9a84c' }}>{maxPrice.toLocaleString()} EGP</span>
                        </div>
                    </FilterCard>

                    <FilterCard title="Min Rating">
                        {[5.0, 4.0, 3.0].map((r) => (
                            <button
                                key={r}
                                onClick={() => setMinRating(minRating === r ? null : r)}
                                className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg text-sm transition-all mb-1"
                                style={{
                                    backgroundColor: minRating === r ? '#fdf6e7' : 'transparent',
                                    color: minRating === r ? '#c9a84c' : '#2C2C2A',
                                    border: minRating === r ? '1px solid #c9a84c' : '1px solid transparent',
                                }}
                            >
                                <StarRow rating={5} />
                                <span className="text-xs font-medium">{r.toFixed(1)}+</span>
                            </button>
                        ))}
                    </FilterCard>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Results bar */}
                    <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3">
                        <p className="text-sm" style={{ color: '#2C2C2A' }}>
                            Showing <span className="font-semibold">124 results</span> for{' '}
                            <span style={{ color: '#c9a84c' }}>Photographers</span> in{' '}
                            <span style={{ color: '#c9a84c' }}>Cairo</span>
                        </p>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white"
                            style={{ color: '#2C2C2A' }}
                        >
                            <option>Top Rated</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                            <option>Newest</option>
                        </select>
                    </div>

                    {/* Vendors grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {vendors.map((v) => {
                            const vendorId = v._id || v.id
                            const vendorName = v.businessName || v.name
                            const vendorRating = v.avgRating ?? v.rating
                            const vendorReviews = v.reviewCount ?? v.reviews
                            const vendorPrice = v.priceMin ?? v.price
                            const vendorBadge = v.badge ?? null
                            return (
                                <Link
                                    key={vendorId}
                                    to={`/vendors/${vendorId}`}
                                    className="bg-white rounded-xl overflow-hidden border border-gray-100 active:shadow-md transition-shadow block"
                                >
                                    <div className="h-44 relative flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d1d1" strokeWidth="1.2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                        {vendorBadge && (
                                            <span
                                                className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full text-white"
                                                style={{ backgroundColor: '#c9a84c' }}
                                            >
                                                {vendorBadge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-serif text-base font-semibold mb-0.5" style={{ color: '#2C2C2A' }}>
                                            {vendorName}
                                        </h3>
                                        <p className="text-xs mb-2" style={{ color: '#888780' }}>
                                            {v.category} · {v.city}
                                        </p>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <StarRow rating={vendorRating} />
                                            <span className="text-xs" style={{ color: '#888780' }}>
                                                {vendorRating} ({vendorReviews})
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs" style={{ color: '#888780' }}>from </span>
                                                <span className="text-sm font-semibold" style={{ color: '#c9a84c' }}>
                                                    {vendorPrice?.toLocaleString() ?? '—'} EGP
                                                </span>
                                            </div>
                                            <span
                                                className="text-xs px-3 py-2 rounded-lg border min-h-[44px] flex items-center"
                                                style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
                                            >
                                                View Profile
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-1 mt-10">
                        <button
                            className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:border-[#c9a84c] transition-colors"
                            style={{ color: '#888780' }}
                        >
                            Previous
                        </button>
                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className="w-9 h-9 rounded-lg text-sm font-medium transition-colors"
                                style={{
                                    backgroundColor: currentPage === p ? '#c9a84c' : 'white',
                                    color: currentPage === p ? 'white' : '#2C2C2A',
                                    border: `1px solid ${currentPage === p ? '#c9a84c' : '#e5e7eb'}`,
                                }}
                            >
                                {p}
                            </button>
                        ))}
                        <span className="px-2 text-sm" style={{ color: '#888780' }}>...</span>
                        <button
                            onClick={() => setCurrentPage(12)}
                            className="w-9 h-9 rounded-lg text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: currentPage === 12 ? '#c9a84c' : 'white',
                                color: currentPage === 12 ? 'white' : '#2C2C2A',
                                border: `1px solid ${currentPage === 12 ? '#c9a84c' : '#e5e7eb'}`,
                            }}
                        >
                            12
                        </button>
                        <button
                            className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:border-[#c9a84c] transition-colors"
                            style={{ color: '#888780' }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
