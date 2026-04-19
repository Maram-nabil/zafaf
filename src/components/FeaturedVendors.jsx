const vendors = [
    {
        name: 'Lens & Love Studio',
        category: 'Photography',
        rating: 4.9,
        reviews: 128,
        price: 8500,
        badge: 'Featured',
        badgeColor: '#c9a84c',
    },
    {
        name: 'Nile Beats DJ',
        category: 'DJ & Music',
        rating: 4.8,
        reviews: 94,
        price: 5000,
        badge: 'Top Rated',
        badgeColor: '#2C2C2A',
    },
    {
        name: 'Bloom Decor',
        category: 'Venue & Decor',
        rating: 4.7,
        reviews: 76,
        price: 12000,
        badge: 'Featured',
        badgeColor: '#c9a84c',
    },
    {
        name: 'Royal Catering Co.',
        category: 'Catering',
        rating: 4.9,
        reviews: 210,
        price: 25000,
        badge: 'Top Rated',
        badgeColor: '#2C2C2A',
    },
    {
        name: 'Glow Makeup Artists',
        category: 'Makeup & Beauty',
        rating: 4.8,
        reviews: 155,
        price: 3500,
        badge: 'Featured',
        badgeColor: '#c9a84c',
    },
    {
        name: 'Cairo Frames',
        category: 'Videography',
        rating: 4.6,
        reviews: 63,
        price: 9000,
        badge: 'Top Rated',
        badgeColor: '#2C2C2A',
    },
]

export default function FeaturedVendors() {
    return (
        <section className="py-16 px-6" style={{ backgroundColor: '#fafafa' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: '#c9a84c' }}>
                        Handpicked
                    </p>
                    <h2 className="font-serif text-3xl" style={{ color: '#2C2C2A' }}>
                        Featured Vendors
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((v) => (
                        <div key={v.name} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                            {/* Uniform gray image placeholder */}
                            <div className="h-48 relative flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d1d1" strokeWidth="1.2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                <span
                                    className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full text-white"
                                    style={{ backgroundColor: v.badgeColor }}
                                >
                                    {v.badge}
                                </span>
                            </div>

                            {/* Card body */}
                            <div className="p-5">
                                <p className="text-xs mb-1" style={{ color: '#888780' }}>{v.category}</p>
                                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: '#2C2C2A' }}>{v.name}</h3>

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= Math.round(v.rating) ? '#c9a84c' : '#e5e7eb'}>
                                            <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                                        </svg>
                                    ))}
                                    <span className="text-xs ml-1" style={{ color: '#888780' }}>{v.rating} ({v.reviews})</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs" style={{ color: '#888780' }}>Starting from</span>
                                        <p className="font-semibold text-sm" style={{ color: '#c9a84c' }}>
                                            {v.price.toLocaleString()} EGP
                                        </p>
                                    </div>
                                    <button className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]" style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
