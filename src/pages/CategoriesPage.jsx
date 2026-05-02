import { useNavigate } from 'react-router-dom'
import {
    Camera,
    Music,
    Sparkles,
    UtensilsCrossed,
    Smile,
    CakeSlice,
    Car,
    Video,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CATEGORIES = [
    {
        name: 'Photographers',
        icon: Camera,
        vendors: 124,
        description: 'Capture your special moments forever',
        param: 'Photography',
    },
    {
        name: 'DJ & Music',
        icon: Music,
        vendors: 87,
        description: 'Set the perfect mood for your celebration',
        param: 'DJ & Music',
    },
    {
        name: 'Venue & Decor',
        icon: Sparkles,
        vendors: 96,
        description: 'Transform your space into a dream setting',
        param: 'Venue & Decor',
    },
    {
        name: 'Catering',
        icon: UtensilsCrossed,
        vendors: 73,
        description: 'Delight your guests with exceptional cuisine',
        param: 'Catering',
    },
    {
        name: 'Makeup & Beauty',
        icon: Smile,
        vendors: 58,
        description: 'Look and feel your absolute best',
        param: 'Makeup & Beauty',
    },
    {
        name: 'Wedding Cake',
        icon: CakeSlice,
        vendors: 45,
        description: 'The sweetest part of your special day',
        param: 'Wedding Cake',
    },
    {
        name: 'Wedding Cars',
        icon: Car,
        vendors: 32,
        description: 'Arrive in style on your big day',
        param: 'Wedding Cars',
    },
    {
        name: 'Videography',
        icon: Video,
        vendors: 61,
        description: 'Relive your wedding day again and again',
        param: 'Videography',
    },
]

export default function CategoriesPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-14 text-center">
                <h1
                    className="font-serif text-4xl font-semibold mb-3"
                    style={{ color: '#2C2C2A' }}
                >
                    Browse by Category
                </h1>
                <p className="text-base" style={{ color: '#888780' }}>
                    Find the perfect vendor for every part of your wedding
                </p>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon
                        return (
                            <div
                                key={cat.name}
                                onClick={() => navigate(`/vendors?category=${encodeURIComponent(cat.param)}`)}
                                className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col items-center text-center active:shadow-md transition-shadow cursor-pointer"
                            >
                                {/* Icon */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                                    style={{ backgroundColor: '#fdf6e7' }}
                                >
                                    <Icon size={28} style={{ color: '#c9a84c' }} strokeWidth={1.5} />
                                </div>

                                {/* Name */}
                                <h2
                                    className="font-serif text-xl font-semibold mb-1"
                                    style={{ color: '#2C2C2A' }}
                                >
                                    {cat.name}
                                </h2>

                                {/* Vendor count */}
                                <p className="text-xs mb-3" style={{ color: '#888780' }}>
                                    {cat.vendors} vendors
                                </p>

                                {/* Description */}
                                <p className="text-sm leading-relaxed mb-6" style={{ color: '#888780' }}>
                                    {cat.description}
                                </p>

                                {/* CTA */}
                                <span
                                    className="mt-auto w-full py-3 rounded-xl text-sm font-medium border flex items-center justify-center min-h-[44px]"
                                    style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
                                >
                                    Browse Vendors
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-6 pb-16">
                <div
                    className="max-w-7xl mx-auto rounded-2xl px-8 py-12 flex flex-col items-center text-center gap-5"
                    style={{ backgroundColor: '#f9e4e4' }}
                >
                    <h2
                        className="font-serif text-2xl font-semibold"
                        style={{ color: '#2C2C2A' }}
                    >
                        Can't find what you're looking for?
                    </h2>
                    <p className="text-sm" style={{ color: '#888780' }}>
                        Explore our full directory of verified wedding vendors across Egypt.
                    </p>
                    <button
                        onClick={() => navigate('/vendors')}
                        className="px-8 py-3 rounded-xl text-white text-sm font-medium transition-opacity min-h-[44px]"
                        style={{ backgroundColor: '#c9a84c' }}
                    >
                        Browse All Vendors
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}
