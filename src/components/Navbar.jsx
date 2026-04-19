import ringLogo from '../assets/ring.jpg'

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={ringLogo} alt="ring" className="h-12 w-12 object-contain" />
                    <span
                        className="font-serif text-2xl tracking-widest"
                        style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}
                    >
                        Zafaf
                    </span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#2C2C2A' }}>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">Vendors</a>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">Categories</a>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">How it works</a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button className="text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-[#c9a84c] transition-colors" style={{ color: '#2C2C2A' }}>
                        Login
                    </button>
                    <button className="text-sm font-medium px-4 py-2 rounded-xl text-white transition-colors" style={{ backgroundColor: '#c9a84c' }}>
                        Join as vendor
                    </button>
                </div>
            </div>
        </nav>
    )
}
