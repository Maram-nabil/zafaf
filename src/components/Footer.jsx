export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-10 px-6 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <ellipse cx="16" cy="20" rx="10" ry="4" stroke="#c9a84c" strokeWidth="2" fill="none" />
                        <rect x="6" y="16" width="20" height="4" fill="white" />
                        <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#c9a84c" strokeWidth="2" fill="none" />
                        <line x1="6" y1="16" x2="6" y2="20" stroke="#c9a84c" strokeWidth="2" />
                        <line x1="26" y1="16" x2="26" y2="20" stroke="#c9a84c" strokeWidth="2" />
                        <polygon points="16,5 19.5,10 16,12 12.5,10" fill="#c9a84c" />
                        <polygon points="16,12 12.5,10 16,14" fill="#c9a84c" opacity="0.5" />
                        <polygon points="16,12 19.5,10 16,14" fill="#c9a84c" opacity="0.75" />
                    </svg>
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
