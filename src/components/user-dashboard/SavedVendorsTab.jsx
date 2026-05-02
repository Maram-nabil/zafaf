import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

const INITIAL_SAVED = [
    { id: 1, name: 'Lens & Love Studio', category: 'Photography', city: 'Cairo Maadi', rating: 4.9, reviews: 128, price: 8500, badge: 'Featured' },
    { id: 5, name: 'Bloom Decor', category: 'Venue & Decor', city: 'Cairo', rating: 4.7, reviews: 76, price: 12000, badge: 'Featured' },
    { id: 8, name: 'Glow Makeup', category: 'Makeup & Beauty', city: 'Cairo', rating: 4.5, reviews: 41, price: 3500, badge: 'Featured' },
]

function Stars({ rating }) {
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

export default function SavedVendorsTab() {
    const navigate = useNavigate()
    const [saved, setSaved] = useState(INITIAL_SAVED)

    const unsave = (id) => setSaved((prev) => prev.filter((v) => v.id !== id))

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>
                    Saved Vendors
                </h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>
                    {saved.length} vendor{saved.length !== 1 ? 's' : ''} saved to your list.
                </p>
            </div>

            {saved.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 py-16 flex flex-col items-center gap-3">
                    <Heart size={32} style={{ color: '#e5e7eb' }} />
                    <p className="text-sm" style={{ color: '#888780' }}>No saved vendors yet.</p>
                    <button
                        onClick={() => navigate('/vendors')}
                        className="mt-1 text-xs font-medium px-4 py-2 rounded-xl border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                        style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                        Browse Vendors
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {saved.map((v) => (
                        <div key={v.id}
                            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">

                            {/* Image placeholder */}
                            <div className="h-40 relative flex items-center justify-center"
                                style={{ backgroundColor: '#f5f5f5' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                    stroke="#d1d1d1" strokeWidth="1.2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                {v.badge && (
                                    <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full text-white"
                                        style={{ backgroundColor: '#c9a84c' }}>
                                        {v.badge}
                                    </span>
                                )}
                                {/* Unsave button */}
                                <button
                                    onClick={() => unsave(v.id)}
                                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                                    aria-label="Remove from saved">
                                    <Heart size={14} fill="#c9a84c" style={{ color: '#c9a84c' }} />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-serif text-base font-semibold mb-0.5" style={{ color: '#2C2C2A' }}>
                                    {v.name}
                                </h3>
                                <p className="text-xs mb-2" style={{ color: '#888780' }}>
                                    {v.category} · {v.city}
                                </p>
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Stars rating={v.rating} />
                                    <span className="text-xs" style={{ color: '#888780' }}>
                                        {v.rating} ({v.reviews})
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs" style={{ color: '#888780' }}>from </span>
                                        <span className="text-sm font-semibold" style={{ color: '#c9a84c' }}>
                                            {v.price.toLocaleString()} EGP
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/vendors/${v.id}`)}
                                        className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                                        style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
