const steps = [
    {
        num: '01',
        title: 'Browse Vendors',
        desc: 'Search through hundreds of verified wedding vendors across Egypt by category or city.',
    },
    {
        num: '02',
        title: 'Compare & Shortlist',
        desc: 'Read reviews, check portfolios, and compare prices to find your perfect match.',
    },
    {
        num: '03',
        title: 'Book with Confidence',
        desc: 'Contact vendors directly and book knowing every listing is verified by our team.',
    },
]

export default function HowItWorks() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: '#c9a84c' }}>
                        Simple Process
                    </p>
                    <h2 className="font-serif text-3xl" style={{ color: '#2C2C2A' }}>
                        How it works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.num}
                            className="rounded-xl p-8"
                            style={{ backgroundColor: '#f9e4e4' }}
                        >
                            <p
                                className="font-serif text-5xl font-bold mb-4 leading-none"
                                style={{ color: '#c9a84c' }}
                            >
                                {step.num}
                            </p>
                            <h3 className="font-serif text-xl font-semibold mb-3" style={{ color: '#2C2C2A' }}>
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#888780' }}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
