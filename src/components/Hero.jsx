export default function Hero() {
    return (
        <section className="py-20 px-6" style={{ backgroundColor: '#f9e4e4' }}>
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#c9a84c' }}>
                    Wedding &amp; Events Directory
                </p>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-5" style={{ color: '#2C2C2A' }}>
                    Find Everything in One Place
                </h1>

                <p className="text-base md:text-lg mb-10" style={{ color: '#888780' }}>
                    Photographers, venues, catering, DJ — verified vendors across Egypt
                </p>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-sm p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for a vendor..."
                        className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ color: '#2C2C2A' }}
                    />
                    <div className="w-px bg-gray-100 hidden md:block" />
                    <select
                        className="px-4 py-3 rounded-xl text-sm outline-none bg-white"
                        style={{ color: '#888780' }}
                    >
                        <option value="">City</option>
                        <option value="cairo">Cairo</option>
                        <option value="alex">Alexandria</option>
                        <option value="giza">Giza</option>
                        <option value="sharm">Sharm El-Sheikh</option>
                    </select>
                    <button
                        className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#c9a84c' }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    )
}
