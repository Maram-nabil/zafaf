import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ringLogo from '../assets/ring.jpg'

const NAV_LINKS = [
    { label: 'Vendors', to: '/vendors' },
    { label: 'Categories', to: '/categories' },
    { label: 'How it works', to: '#how-it-works' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const close = () => setMenuOpen(false)

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2" onClick={close}>
                    <img src={ringLogo} alt="Zafaf" className="h-12 w-12 object-contain" />
                    <span
                        className="font-serif text-2xl tracking-widest"
                        style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}
                    >
                        Zafaf
                    </span>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#2C2C2A' }}>
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link key={label} to={to} className="hover:text-[#c9a84c] transition-colors">
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Desktop buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-[#c9a84c] transition-colors"
                        style={{ color: '#2C2C2A' }}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register?type=vendor"
                        className="text-sm font-medium px-4 py-2 rounded-xl text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#c9a84c' }}
                    >
                        Join as vendor
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    style={{ color: '#2C2C2A' }}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={label}
                            to={to}
                            onClick={close}
                            className="text-sm font-medium py-3 px-3 rounded-xl transition-colors hover:bg-gray-50"
                            style={{ color: '#2C2C2A', minHeight: '44px', display: 'flex', alignItems: 'center' }}
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
                        <Link
                            to="/login"
                            onClick={close}
                            className="text-sm font-medium py-3 px-3 rounded-xl border border-gray-200 text-center transition-colors hover:border-[#c9a84c]"
                            style={{ color: '#2C2C2A', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register?type=vendor"
                            onClick={close}
                            className="text-sm font-medium py-3 px-3 rounded-xl text-white text-center transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#c9a84c', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            Join as vendor
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
