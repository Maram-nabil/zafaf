import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import ringLogo from '../assets/ring.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LoginPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-7">
                        <img src={ringLogo} alt="Zafaf" className="h-14 w-14 object-contain mb-2" />
                        <span
                            className="font-serif text-2xl tracking-widest"
                            style={{ color: '#2C2C2A', letterSpacing: '0.15em' }}
                        >
                            Zafaf
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif text-2xl font-semibold text-center mb-1" style={{ color: '#2C2C2A' }}>
                        Welcome Back
                    </h1>
                    <p className="text-sm text-center mb-7" style={{ color: '#888780' }}>
                        Sign in to your account
                    </p>

                    {/* Form */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                                style={{ color: '#2C2C2A' }}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                                    style={{ color: '#2C2C2A' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: '#888780' }}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                            style={{ backgroundColor: '#c9a84c' }}
                        >
                            Login
                        </button>
                    </div>

                    {/* Register link */}
                    <p className="text-sm text-center mt-5" style={{ color: '#888780' }}>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium hover:underline" style={{ color: '#c9a84c' }}>
                            Register
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs" style={{ color: '#888780' }}>or continue as</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Guest type buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/register?type=user')}
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                            style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
                        >
                            I'm a Couple
                        </button>
                        <button
                            onClick={() => navigate('/register?type=vendor')}
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
                            style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
                        >
                            I'm a Vendor
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
