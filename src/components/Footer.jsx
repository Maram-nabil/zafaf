import ringLogo from '../assets/ring.jpg'

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-10 px-6 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={ringLogo} alt="Zafaf" className="h-10 w-10 object-contain" />
                    <span className="font-serif text-xl tracking-widest" style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}>
                        Zafaf
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-8 text-sm" style={{ color: '#888780' }}>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">About</a>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">Join as vendor</a>
                    <a href="#" className="hover:text-[#c9a84c] transition-colors">Contact</a>
                </div>

                <p className="text-xs" style={{ color: '#888780' }}>
                    © 2026 Zafaf. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
