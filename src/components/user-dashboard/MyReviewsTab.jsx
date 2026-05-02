import { useState } from 'react'
import { Pencil, X, Check } from 'lucide-react'

const INITIAL_REVIEWS = [
    {
        id: 1,
        vendor: 'Lens & Love Studio',
        category: 'Photography',
        rating: 5,
        date: 'March 12, 2026',
        comment: 'Absolutely stunning photos! Every shot was perfectly composed and the team made us feel so comfortable throughout the day.',
    },
    {
        id: 2,
        vendor: 'Bloom Decor',
        category: 'Venue & Decor',
        rating: 4,
        date: 'March 14, 2026',
        comment: 'Beautiful floral arrangements and great attention to detail. The venue looked like a dream. Would definitely recommend.',
    },
    {
        id: 3,
        vendor: 'Nile Beats DJ',
        category: 'DJ & Music',
        rating: 5,
        date: 'March 14, 2026',
        comment: 'The music was perfect all night. He read the crowd so well and kept everyone dancing until the very end!',
    },
]

function Stars({ rating, onChange }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <button
                    key={s}
                    type="button"
                    onClick={() => onChange?.(s)}
                    className={onChange ? 'cursor-pointer' : 'cursor-default'}
                    aria-label={`${s} star`}
                >
                    <svg width="14" height="14" viewBox="0 0 12 12"
                        fill={s <= rating ? '#c9a84c' : '#e5e7eb'}>
                        <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                    </svg>
                </button>
            ))}
        </div>
    )
}

export default function MyReviewsTab() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS)
    const [editingId, setEditingId] = useState(null)
    const [editDraft, setEditDraft] = useState({})

    const startEdit = (r) => {
        setEditingId(r.id)
        setEditDraft({ comment: r.comment, rating: r.rating })
    }

    const cancelEdit = () => setEditingId(null)

    const saveEdit = (id) => {
        setReviews((prev) =>
            prev.map((r) => r.id === id ? { ...r, ...editDraft } : r)
        )
        setEditingId(null)
    }

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>
                    My Reviews
                </h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>
                    Reviews you've written for vendors.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {reviews.map((r) => {
                    const isEditing = editingId === r.id
                    return (
                        <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>{r.vendor}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{r.category}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs" style={{ color: '#888780' }}>{r.date}</span>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => startEdit(r)}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#c9a84c] transition-colors"
                                            style={{ color: '#888780' }}
                                            aria-label="Edit review">
                                            <Pencil size={13} />
                                        </button>
                                    ) : (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => saveEdit(r.id)}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors hover:bg-green-50"
                                                style={{ borderColor: '#4caf50', color: '#4caf50' }}
                                                aria-label="Save">
                                                <Check size={13} />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-red-50 transition-colors"
                                                style={{ color: '#e57373' }}
                                                aria-label="Cancel">
                                                <X size={13} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stars */}
                            {isEditing ? (
                                <Stars
                                    rating={editDraft.rating}
                                    onChange={(val) => setEditDraft((p) => ({ ...p, rating: val }))}
                                />
                            ) : (
                                <Stars rating={r.rating} />
                            )}

                            {/* Comment */}
                            {isEditing ? (
                                <textarea
                                    value={editDraft.comment}
                                    onChange={(e) => setEditDraft((p) => ({ ...p, comment: e.target.value }))}
                                    rows={3}
                                    className="mt-3 w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors resize-none"
                                    style={{ color: '#2C2C2A' }}
                                />
                            ) : (
                                <p className="text-sm mt-2 leading-relaxed" style={{ color: '#888780' }}>
                                    {r.comment}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
