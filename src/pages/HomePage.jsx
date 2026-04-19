import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedVendors from '../components/FeaturedVendors'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Categories />
            <FeaturedVendors />
            <HowItWorks />
            <Footer />
        </div>
    )
}
