import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../services/api'

const FALLBACK_PACKAGES = [
    { name: 'Basic Package', desc: '4 hours coverage · 200 edited photos', price: 8500 },
    { name: 'Standard Package', desc: '8 hours coverage · 400 edited photos + video highlights', price: 15000 },
    { name: 'Premium Package', desc: 'Full day · unlimited photos · cinematic video + album', price: 25000 },
]

function Stars({ count }) {
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="13" height="13" viewBox="0 0 12 12"
                    fill={s <= Math.round(count ?? 0) ? '#c9a84c' : '#e5e7eb'}>
                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                </svg>
            ))}
        </span>
    )
}

function PhotoPlaceholder({ label }) {
    return (
        <div className="rounded-xl flex items-center justify-center aspect-square"
            style={{ backgroundColor: '#f5f5f5' }}>
            <span className="text-xs" style={{ color: '#c0bdb8' }}>{label}</span>
        </div>
    )
}

export default function VendorProfilePage() {
    const { id } = useParams()

    const [vendor, setVendor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [date, setDate] = useState('')
    const [eventType, setEventType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        setLoading(true)
        api.getVendor(id)
            .then((data) => {
                setVendor(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        if (!id) return
        api.getVendorReviews(id)
            .then((data) => setReviews(Array.isArray(data) ? data : []))
            .catch(() => setReviews([]))
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm" style={{ color: '#888780' }}>Loading vendor...</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (!vendor) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <p className="font-serif text-2xl" style={{ color: '#2C2C2A' }}>Vendor not found</p>
                    <Link to="/vendors" className="text-sm font-medium hover:underline"
                        style={{ color: '#c9a84c' }}>
                        ← Back to Vendors
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    // Normalise field names — API (MongoDB) first, mock data as fallback
    const vendorName = vendor.businessName || vendor.name
    const vendorRating = vendor.avgRating ?? vendor.rating
    const vendorReviews = vendor.reviewCount ?? vendor.reviews
    const vendorPrice = vendor.priceMin ?? vendor.price
    const vendorBio = vendor.bio || `We are a professional ${(vendor.category || '').toLowerCase()} service based in ${vendor.city} with years of experience. We specialize in creating unforgettable wedding experiences tailored to every couple's vision.`
    const vendorBadge = vendor.badge ?? null
    const portfolio = Array.isArray(vendor.portfolio) && vendor.portfolio.length > 0
        ? vendor.portfolio
        : null
    const packages = Array.isArray(vendor.packages) && vendor.packages.length > 0
        ? vendor.packages
        : FALLBACK_PACKAGES

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: '#888780' }}>
                    <Link to="/vendors" className="hover:text-[#c9a84c] transition-colors">Vendors</Link>
                    <span>→</span>
                    <span style={{ color: '#888780' }}>{vendor.category}</span>
                    <span>→</span>
                    <span className="font-medium" style={{ color: '#2C2C2A' }}>{vendorName}</span>
                </nav>

                {/* Cover photo */}
                <div className="relative mb-16">
                    <div className="w-full rounded-2xl flex items-center justify-center overflow-hidden"
                        style={{ height: 250, backgroundColor: '#f0eeec' }}>
                        {vendor.coverImage
                            ? <img src={vendor.coverImage} alt="cover" className="w-full h-full object-cover" />
                            : <span className="text-sm" style={{ color: '#c0bdb8' }}>cover photo</span>
                        }
                    </div>
                    <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-full border-4 border-white overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: '#e8e5e2' }}>
                        {vendor.logo
                            ? <img src={vendor.logo} alt="logo" className="w-full h-full object-cover" />
                            : <span className="text-xs" style={{ color: '#c0bdb8' }}>logo</span>
                        }
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* LEFT — main content */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {/* Info card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h1 className="font-serif text-3xl font-semibold mb-3" style={{ color: '#2C2C2A' }}>
                                {vendorName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                                {vendorBadge && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
                                        style={{ backgroundColor: '#c9a84c' }}>
                                        {vendorBadge}
                                    </span>
                                )}
                                <span className="flex items-center gap-1" style={{ color: '#2C2C2A' }}>
                                    <Stars count={vendorRating} />
                                    <span className="font-medium">{vendorRating}</span>
                                    <span style={{ color: '#888780' }}>({vendorReviews} reviews)</span>
                                </span>
                                <span style={{ color: '#888780' }}>📍 {vendor.city}</span>
                                <span style={{ color: '#888780' }}>{vendor.category}</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#555552' }}>
                                {vendorBio}
                            </p>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>
                                Portfolio
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {portfolio
                                    ? portfolio.map((url, i) => (
                                        <img key={i} src={url} alt={`portfolio ${i + 1}`}
                                            className="rounded-xl aspect-square object-cover w-full" />
                                    ))
                                    : ['photo 1', 'photo 2', 'photo 3', 'photo 4', 'photo 5', 'photo 6'].map((label) => (
                                        <PhotoPlaceholder key={label} label={label} />
                                    ))
                                }
                            </div>
                        </div>

                        {/* Packages */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>
                                Packages & Pricing
                            </h2>
                            <div className="flex flex-col gap-3">
                                {packages.map((pkg, i) => (
                                    <div key={pkg.name || i}
                                        className="flex items-center justify-between rounded-xl px-4 py-3 border border-gray-100">
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>{pkg.name}</p>
                                            <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{pkg.desc || pkg.description}</p>
                                        </div>
                                        <span className="font-semibold text-sm whitespace-nowrap ml-4" style={{ color: '#c9a84c' }}>
                                            {pkg.price?.toLocaleString() ?? '—'} EGP
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>
                                Reviews ({vendorReviews ?? 0})
                            </h2>
                            <div className="flex flex-col gap-3">
                                {reviews.length === 0 ? (
                                    <p className="text-sm py-4 text-center" style={{ color: '#888780' }}>
                                        No reviews yet.
                                    </p>
                                ) : reviews.map((review) => (
                                    <div key={review._id} className="rounded-xl border border-gray-100 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>
                                                {review.userId?.name || 'Anonymous'}
                                            </span>
                                            <span style={{ color: '#c9a84c', letterSpacing: '0.05em' }}>
                                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                            </span>
                                        </div>
                                        <p className="text-sm leading-relaxed mb-2" style={{ color: '#555552' }}>
                                            {review.comment}
                                        </p>
                                        <p className="text-xs" style={{ color: '#888780' }}>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT — sidebar */}
                    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">

                        {/* Booking card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <p className="text-xs mb-1" style={{ color: '#888780' }}>Starting from</p>
                            <p className="font-serif text-3xl font-semibold mb-4" style={{ color: '#c9a84c' }}>
                                {vendorPrice?.toLocaleString() ?? '—'} EGP
                            </p>
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none"
                                    style={{ color: date ? '#2C2C2A' : '#888780' }}
                                />
                                <input
                                    type="text"
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                    placeholder="Event type"
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none"
                                    style={{ color: '#2C2C2A' }}
                                />
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your message..."
                                    rows={3}
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none resize-none"
                                    style={{ color: '#2C2C2A' }}
                                />
                            </div>
                            <button
                                className="w-full py-2.5 rounded-xl text-white text-sm font-medium mb-2 hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: '#c9a84c' }}>
                                Send Inquiry
                            </button>
                            <button
                                className="w-full py-2.5 rounded-xl text-sm font-medium border hover:bg-[#c9a84c] hover:text-white transition-colors"
                                style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
                                Contact Vendor
                            </button>
                        </div>

                        {/* Stats card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            {[
                                { label: 'Response time', value: vendor.responseTime || 'Within 2 hours' },
                                { label: 'Experience', value: vendor.experience || '10+ years' },
                                { label: 'Weddings done', value: vendor.weddingsDone || '200+' },
                                { label: 'Cities covered', value: vendor.citiesCovered || 'Cairo, Alex, Hurghada' },
                            ].map((stat) => (
                                <div key={stat.label}
                                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm" style={{ color: '#888780' }}>{stat.label}</span>
                                    <span className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-10">
                <Footer />
            </div>
        </div >
    )
}
