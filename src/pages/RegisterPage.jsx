import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import ringLogo from '../assets/ring.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CATEGORIES = [
    'Photographers',
    'DJ & Music',
    'Venue & Decor',
    'Catering',
    'Makeup & Beauty',
    'Wedding Cake',
    'Wedding Cars',
    'Videography',
]

const CITIES = ['Cairo', 'Alexandria', 'Giza', 'Hurghada']

function InputField({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>{label}</label>
            {children}
        </div>
    )
}

function TextInput({ name, value, onChange, placeholder, type = 'text' }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors"
            style={{ color: '#2C2C2A' }}
        />
    )
}

function SelectInput({ name, value, onChange, options, placeholder }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors bg-white"
            style={{ color: value ? '#2C2C2A' : '#888780' }}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    )
}

function PasswordInput({ label, name, value, onChange, placeholder }) {
    const [show, setShow] = useState(false)
    return (
        <InputField label={label}>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                    style={{ color: '#2C2C2A' }}
                />
                <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#888780' }}
                    aria-label={show ? 'Hide password' : 'Show password'}
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </InputField>
    )
}

function CoupleForm() {
    const [form, setForm] = useState({
        fullName: '', email: '', password: '', confirmPassword: '', weddingDate: '',
    })
    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

    return (
        <div className="flex flex-col gap-4">
            <InputField label="Full Name">
                <TextInput name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" />
            </InputField>
            <InputField label="Email">
                <TextInput name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" type="email" />
            </InputField>
            <PasswordInput label="Password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            <PasswordInput label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            <InputField label="Wedding Date (optional)">
                <TextInput name="weddingDate" value={form.weddingDate} onChange={handleChange} placeholder="" type="date" />
            </InputField>
            <button
                className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                style={{ backgroundColor: '#c9a84c' }}
            >
                Create Account
            </button>
        </div>
    )
}

function VendorForm() {
    const [form, setForm] = useState({
        businessName: '', ownerName: '', email: '', password: '',
        confirmPassword: '', category: '', city: '', phone: '',
    })
    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

    return (
        <div className="flex flex-col gap-4">
            <InputField label="Business Name">
                <TextInput name="businessName" value={form.businessName} onChange={handleChange} placeholder="Your business name" />
            </InputField>
            <InputField label="Owner Name">
                <TextInput name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Your full name" />
            </InputField>
            <InputField label="Email">
                <TextInput name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" type="email" />
            </InputField>
            <PasswordInput label="Password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            <PasswordInput label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            <InputField label="Category">
                <SelectInput name="category" value={form.category} onChange={handleChange} options={CATEGORIES} placeholder="Select a category" />
            </InputField>
            <InputField label="City">
                <SelectInput name="city" value={form.city} onChange={handleChange} options={CITIES} placeholder="Select a city" />
            </InputField>
            <InputField label="Phone Number">
                <TextInput name="phone" value={form.phone} onChange={handleChange} placeholder="+20 1XX XXX XXXX" type="tel" />
            </InputField>
            <button
                className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                style={{ backgroundColor: '#c9a84c' }}
            >
                Join as Vendor
            </button>
        </div>
    )
}

export default function RegisterPage() {
    const [searchParams] = useSearchParams()
    const initialType = searchParams.get('type') === 'vendor' ? 'vendor' : 'couple'
    const [activeType, setActiveType] = useState(initialType)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-[480px] bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

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
                    <h1 className="font-serif text-2xl font-semibold text-center mb-6" style={{ color: '#2C2C2A' }}>
                        Create Account
                    </h1>

                    {/* Toggle */}
                    <div
                        className="flex rounded-xl p-1 mb-7"
                        style={{ backgroundColor: '#f5f5f3' }}
                    >
                        {[
                            { key: 'couple', label: "I'm a Couple" },
                            { key: 'vendor', label: "I'm a Vendor" },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveType(key)}
                                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    backgroundColor: activeType === key ? '#c9a84c' : 'transparent',
                                    color: activeType === key ? '#fff' : '#888780',
                                    boxShadow: activeType === key ? '0 1px 4px rgba(201,168,76,0.25)' : 'none',
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    {activeType === 'couple' ? <CoupleForm /> : <VendorForm />}

                    {/* Login link */}
                    <p className="text-sm text-center mt-6" style={{ color: '#888780' }}>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium hover:underline" style={{ color: '#c9a84c' }}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}
