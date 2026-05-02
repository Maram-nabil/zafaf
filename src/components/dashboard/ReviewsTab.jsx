const REVIEWS = [
    { id: 1, name: 'Sarah & Ahmed', rating: 5, date: 'March 12, 2026', comment: 'Absolutely stunning photos! Lens & Love captured every emotion perfectly. We couldn\'t be happier with the results.' },
    { id: 2, name: 'Nour & Karim', rating: 5, date: 'Feb 28, 2026', comment: 'Professional, creative, and so easy to work with. Our wedding album is a true work of art.' },
    { id: 3, name: 'Hana & Sherif', rating: 4, date: 'Jan 15, 2026', comment: 'Great experience overall. The photos were beautiful and delivered on time. Highly recommend!' },
    { id: 4, name: 'Layla & Youssef', rating: 5, date: 'Dec 5, 2025', comment: 'We are obsessed with our photos. Every single shot tells a story. Thank you so much!' },
    { id: 5, name: 'Mona & Tamer', rating: 5, date: 'Nov 20, 2025', comment: 'From the first meeting to the final delivery, everything was seamless and magical.' },
]

const AVG = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

function Stars({ rating, size = 14 }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width={size} height={size} viewBox="0 0 12 12"
                    fill={s <= rating ? '#c9a84c' : '#e5e7eb'}>
                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                </svg>
            ))}
        </div>
    )
}

export default function ReviewsTab() {
    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Reviews</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>See what couples are saying about you.</p>
            </div>

            {/* Overall rating */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-8 mb-6">
                <div className="text-center">
                    <p className="font-serif text-6xl font-semibold" style={{ color: '#c9a84c' }}>{AVG}</p>
                    <Stars rating={Math.round(Number(AVG))} size={18} />
                    <p className="text-xs mt-1.5" style={{ color: '#888780' }}>{REVIEWS.length} reviews</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = REVIEWS.filter((r) => r.rating === star).length
                        const pct = Math.round((count / REVIEWS.length) * 100)
                        return (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-xs w-4 text-right" style={{ color: '#888780' }}>{star}</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="#c9a84c">
                                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                                </svg>
                                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#c9a84c' }} />
                                </div>
                                <span className="text-xs w-6" style={{ color: '#888780' }}>{count}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Review list */}
            <div className="flex flex-col gap-4">
                {REVIEWS.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>{r.name}</p>
                                <Stars rating={r.rating} />
                            </div>
                            <span className="text-xs" style={{ color: '#888780' }}>{r.date}</span>
                        </div>
                        <p className="text-sm leading-relaxed mt-2" style={{ color: '#888780' }}>{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
