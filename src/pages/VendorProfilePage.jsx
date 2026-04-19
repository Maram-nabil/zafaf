import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PACKAGES = [
    { name: 'Basic Package', desc: '4 hours coverage · 200 edited photos', price: 8500 },
    { name: 'Standard Package', desc: '8 hours coverage · 400 edited photos + video highlights', price: 15000 },
    { name: 'Premium Package', desc: 'Full day · unlimited photos · cinematic video + album', price: 25000 },
]

const REVIEWS = [
    { name: 'Sarah & Ahmed', rating: 5, text: 'Absolutely amazing work! They captured every moment perfectly. Highly recommend for any couple.', date: 'March 2026' },
    { name: 'Nour & Karim', rating: 5, text: 'Professional and creative, and so easy to work with. The photos were beyond our expectations.', date: 'February 2026' },
]

const SIMILAR = [
    { id: 2, name: 'Golden Moments', price: 6000 },
    { id: 3, name: 'Nour Photography', price: 12000 },
    { id: 6, name: 'Dream Shots', price: 4500 },
]

function Stars({ count }) {
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="13" height="13" viewBox="0 0 12 12" fill={s <= count ? '#c9a84c' : '#e5e7eb'}>
                    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8.02 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                </svg>
            ))}
        </span>
    )
}

function PhotoPlaceholder({ label }) {
    return (
        <div className="rounded-xl flex items-center justify-center aspect-square" style={{ backgroundColor: '#f5f5f5' }}>
            <span className="text-xs" style={{ color: '#c0bdb8' }}>{label}</span>
        </div>
    )
}

export default function VendorProfilePage() {
    const [date, setDate] = useState('')
    const [eventType, setEventType] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: '#888780' }}>
                    <Link to="/vendors" className="hover:text-[#c9a84c] transition-colors">Vendors</Link>
                    <span>→</span>
                    <span className="hover:text-[#c9a84c] cursor-pointer transition-colors">Photographers</span>
                    <span>→</span>
                    <span className="font-medium" style={{ color: '#2C2C2A' }}>Lens & Love Studio</span>
                </nav>

                {/* Cover photo */}
                <div className="relative mb-16">
                    <div
                        className="w-full rounded-2xl flex items-center justify-center"
                        style={{ height: 250, backgroundColor: '#f0eeec' }}
                    >
                        <span className="text-sm" style={{ color: '#c0bdb8' }}>cover photo</span>
                    </div>
                    {/* Avatar overlapping cover */}
                    <div
                        className="absolute -bottom-10 left-8 w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                        style={{ backgroundColor: '#e8e5e2' }}
                    >
                        <span className="text-xs" style={{ color: '#c0bdb8' }}>logo</span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* LEFT — main content */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {/* Info card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h1 className="font-serif text-3xl font-semibold mb-3" style={{ color: '#2C2C2A' }}>
                                Lens & Love Studio
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#c9a84c' }}>
                                    Featured
                                </span>
                                <span className="flex items-center gap-1" style={{ color: '#2C2C2A' }}>
                                    <Stars count={5} />
                                    <span className="font-medium">4.9</span>
                                    <span style={{ color: '#888780' }}>(128 reviews)</span>
                                </span>
                                <span style={{ color: '#888780' }}>📍 Cairo, Maadi</span>
                                <span style={{ color: '#888780' }}>Photography & Video</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#555552' }}>
                                We are a professional wedding photography studio based in Cairo with over 10 years of experience.
                                We specialize in capturing timeless moments with a blend of candid and artistic styles.
                                Our team is dedicated to making your special day unforgettable through stunning visuals.
                            </p>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>Portfolio</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {['photo 1', 'photo 2', 'photo 3', 'photo 4', 'photo 5', 'photo 6'].map((label) => (
                                    <PhotoPlaceholder key={label} label={label} />
                                ))}
                            </div>
                        </div>

                        {/* Packages */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>Packages & Pricing</h2>
                            <div className="flex flex-col gap-3">
                                {PACKAGES.map((pkg) => (
                                    <div
                                        key={pkg.name}
                                        className="flex items-center justify-between rounded-xl px-4 py-3 border border-gray-100"
                                    >
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>{pkg.name}</p>
                                            <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{pkg.desc}</p>
                                        </div>
                                        <span className="font-semibold text-sm whitespace-nowrap ml-4" style={{ color: '#c9a84c' }}>
                                            {pkg.price.toLocaleString()} EGP
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-serif text-xl font-semibold mb-4" style={{ color: '#2C2C2A' }}>Reviews (128)</h2>
                            <div className="flex flex-col gap-3">
                                {REVIEWS.map((r) => (
                                    <div key={r.name} className="rounded-xl border border-gray-100 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>{r.name}</span>
                                            <Stars count={r.rating} />
                                        </div>
                                        <p className="text-sm leading-relaxed mb-2" style={{ color: '#555552' }}>{r.text}</p>
                                        <p className="text-xs" style={{ color: '#888780' }}>{r.date}</p>
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
                                8,500 EGP
                            </p>
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none"
                                    style={{ color: date ? '#2C2C2A' : '#888780' }}
                                    placeholder="Event date"
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
                                style={{ backgroundColor: '#c9a84c' }}
                            >
                                Send Inquiry
                            </button>
                            <button
                                className="w-full py-2.5 rounded-xl text-sm font-medium border hover:bg-[#c9a84c] hover:text-white transition-colors"
                                style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
                            >
                                Contact Vendor
                            </button>
                        </div>

                        {/* Stats card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            {[
                                { label: 'Response time', value: 'Within 2 hours' },
                                { label: 'Experience', value: '10+ years' },
                                { label: 'Weddings done', value: '200+' },
                                { label: 'Cities covered', value: 'Cairo, Alex, Hurghada' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm" style={{ color: '#888780' }}>{stat.label}</span>
                                    <span className="text-sm font-semibold" style={{ color: '#2C2C2A' }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Similar vendors */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="font-serif text-base font-semibold mb-3" style={{ color: '#2C2C2A' }}>Similar Vendors</h3>
                            <div className="flex flex-col gap-2">
                                {SIMILAR.map((v) => (
                                    <Link
                                        key={v.id}
                                        to={`/vendors/${v.id}`}
                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d1d1" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="M21 15l-5-5L5 21" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: '#2C2C2A' }}>{v.name}</p>
                                            <p className="text-xs" style={{ color: '#c9a84c' }}>from {v.price.toLocaleString()} EGP</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-10">
                <Footer />
            </div>
        </div>
    )
}
