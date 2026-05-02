import { useNavigate } from 'react-router-dom'
import { Camera, Music, Sparkles, UtensilsCrossed } from 'lucide-react'

const STATUS_STYLES = {
    Pending: { bg: '#fdf6e7', color: '#c9a84c' },
    Confirmed: { bg: '#e8f5e9', color: '#4caf50' },
    Rejected: { bg: '#fdecea', color: '#e57373' },
}

const CATEGORY_ICONS = {
    Photography: Camera,
    'DJ & Music': Music,
    'Venue & Decor': Sparkles,
    Catering: UtensilsCrossed,
}

const INQUIRIES = [
    {
        id: 1,
        vendorId: 1,
        vendor: 'Lens & Love Studio',
        category: 'Photography',
        date: 'June 15, 2026',
        status: 'Pending',
        message: 'We loved your portfolio and would love to discuss packages for our big day.',
    },
    {
        id: 2,
        vendorId: 4,
        vendor: 'Nile Beats DJ',
        category: 'DJ & Music',
        date: 'June 15, 2026',
        status: 'Confirmed',
        message: 'Can you provide a playlist preview and let us know your availability?',
    },
    {
        id: 3,
        vendorId: 5,
        vendor: 'Bloom Decor',
        category: 'Venue & Decor',
        date: 'June 15, 2026',
        status: 'Pending',
        message: 'We are interested in a full floral setup for an outdoor ceremony.',
    },
    {
        id: 4,
        vendorId: 7,
        vendor: 'Royal Catering',
        category: 'Catering',
        date: 'June 15, 2026',
        status: 'Rejected',
        message: 'Looking for a buffet menu for approximately 200 guests.',
    },
]

export default function InquiriesTab() {
    const navigate = useNavigate()

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
                {INQUIRIES.map((inq) => {
                    const s = STATUS_STYLES[inq.status]
                    const Icon = CATEGORY_ICONS[inq.category] ?? Camera
                    return (
                        <div key={inq.id}
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
                                            {inq.vendor}
                                        </p>
                                        <p className="text-xs mt-0.5" style={{ color: '#888780' }}>
                                            {inq.category} · {inq.date}
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                                        style={{ backgroundColor: s.bg, color: s.color }}>
                                        {inq.status}
                                    </span>
                                </div>
                                <p className="text-sm mt-2 line-clamp-2 leading-relaxed" style={{ color: '#888780' }}>
                                    {inq.message}
                                </p>
                                <button
                                    onClick={() => navigate(`/vendors/${inq.vendorId}`)}
                                    className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                                    style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                                    View Vendor
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
