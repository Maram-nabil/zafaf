import { useNavigate } from 'react-router-dom'
import { Camera, Music, Sparkles, UtensilsCrossed } from 'lucide-react'

const STATUS_STYLES = {
    pending: { bg: '#fdf6e7', color: '#c9a84c', label: 'Pending' },
    confirmed: { bg: '#e8f5e9', color: '#4caf50', label: 'Confirmed' },
    rejected: { bg: '#fdecea', color: '#e57373', label: 'Rejected' },
}

const CATEGORY_ICONS = {
    Photography: Camera,
    'DJ & Music': Music,
    'Venue & Decor': Sparkles,
    Catering: UtensilsCrossed,
}

export default function InquiriesTab({ inquiries = [] }) {
    const navigate = useNavigate()

    if (inquiries.length === 0) {
        return (
            <div className="px-8 py-8">
                <div className="mb-7">
                    <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>My Inquiries</h1>
                    <p className="text-sm mt-1" style={{ color: '#888780' }}>Track the status of your vendor inquiries.</p>
                </div>
                <p className="text-sm" style={{ color: '#888780' }}>No inquiries yet.</p>
            </div>
        )
    }

    return (
        <div className="px-8 py-8">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>
                    My Inquiries
                </h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>
                    Track the status of your vendor inquiries.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {inquiries.map((inq) => {
                    const s = STATUS_STYLES[inq.status] ?? STATUS_STYLES.pending
                    const category = inq.vendorId?.category
                    const Icon = CATEGORY_ICONS[category] ?? Camera
                    return (
                        <div key={inq._id}
                            className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">

                            {/* Icon */}
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: '#fdf6e7' }}>
                                <Icon size={20} style={{ color: '#c9a84c' }} strokeWidth={1.5} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>
                                            {inq.vendorId?.businessName || 'Vendor'}
                                        </p>
                                        <p className="text-xs mt-0.5" style={{ color: '#888780' }}>
                                            {category && `${category} · `}
                                            {inq.eventDate ? new Date(inq.eventDate).toLocaleDateString() : ''}
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                                        style={{ backgroundColor: s.bg, color: s.color }}>
                                        {s.label}
                                    </span>
                                </div>
                                <p className="text-sm mt-2 line-clamp-2 leading-relaxed" style={{ color: '#888780' }}>
                                    {inq.message}
                                </p>
                                {inq.vendorId?._id && (
                                    <button
                                        onClick={() => navigate(`/vendors/${inq.vendorId._id}`)}
                                        className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                                        style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                                        View Vendor
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
