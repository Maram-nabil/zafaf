import { Camera, Music, Sparkles, UtensilsCrossed, Smile, Cake, Car, Video } from 'lucide-react'

const categories = [
    { icon: Camera, name: 'Photographers', count: 124 },
    { icon: Music, name: 'DJ & Music', count: 87 },
    { icon: Sparkles, name: 'Venue & Decor', count: 96 },
    { icon: UtensilsCrossed, name: 'Catering', count: 73 },
    { icon: Smile, name: 'Makeup & Beauty', count: 58 },
    { icon: Cake, name: 'Wedding Cake', count: 45 },
    { icon: Car, name: 'Wedding Cars', count: 32 },
    { icon: Video, name: 'Videography', count: 61 },
]

export default function Categories() {
    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: '#c9a84c' }}>
                        Browse
                    </p>
                    <h2 className="font-serif text-3xl" style={{ color: '#2C2C2A' }}>
                        Categories
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => {
                        const Icon = cat.icon
                        return (
                            <div
                                key={cat.name}
                                className="bg-white border border-gray-100 rounded-xl p-4 text-center cursor-pointer hover:border-[#c9a84c] hover:shadow-sm transition-all"
                            >
                                <div className="flex justify-center mb-2">
                                    <Icon size={22} color="#c9a84c" strokeWidth={1.5} />
                                </div>
                                <p className="font-medium text-sm mb-0.5" style={{ color: '#2C2C2A' }}>{cat.name}</p>
                                <p className="text-xs" style={{ color: '#888780' }}>{cat.count} vendors</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
