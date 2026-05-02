import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

const CATEGORIES = [
    'Photographers', 'DJ & Music', 'Venue & Decor', 'Catering',
    'Makeup & Beauty', 'Wedding Cake', 'Wedding Cars', 'Videography',
]
const CITIES = ['Cairo', 'Alexandria', 'Giza', 'Hurghada']

export default function ProfileTab() {
    const [form, setForm] = useState({
        businessName: 'Lens & Love Studio',
        category: 'Photographers',
        city: 'Cairo',
        bio: 'We specialize in capturing the most precious moments of your wedding day with a blend of documentary and fine-art photography.',
        phone: '+20 100 123 4567',
        priceMin: '8000',
        priceMax: '25000',
    })

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

    return (
        <div className="px-8 py-8 max-w-2xl">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>My Profile</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Update your business information visible to couples.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">

                {/* Business Name */}
                <Field label="Business Name">
                    <input name="businessName" value={form.businessName} onChange={handleChange}
                        className={inputCls} style={{ color: '#2C2C2A' }} />
                </Field>

                {/* Category */}
                <Field label="Category">
                    <select name="category" value={form.category} onChange={handleChange}
                        className={inputCls + ' bg-white'} style={{ color: '#2C2C2A' }}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </Field>

                {/* City */}
                <Field label="City">
                    <select name="city" value={form.city} onChange={handleChange}
                        className={inputCls + ' bg-white'} style={{ color: '#2C2C2A' }}>
                        {CITIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </Field>

                {/* Bio */}
                <Field label="Bio">
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={4}
                        className={inputCls + ' resize-none'} style={{ color: '#2C2C2A' }} />
                </Field>

                {/* Phone */}
                <Field label="Phone">
                    <input name="phone" value={form.phone} onChange={handleChange}
                        className={inputCls} style={{ color: '#2C2C2A' }} />
                </Field>

                {/* Price range */}
                <Field label="Price Range (EGP)">
                    <div className="flex items-center gap-3">
                        <input name="priceMin" value={form.priceMin} onChange={handleChange}
                            placeholder="Min" className={inputCls} style={{ color: '#2C2C2A' }} />
                        <span className="text-sm" style={{ color: '#888780' }}>–</span>
                        <input name="priceMax" value={form.priceMax} onChange={handleChange}
                            placeholder="Max" className={inputCls} style={{ color: '#2C2C2A' }} />
                    </div>
                </Field>

                {/* Portfolio */}
                <Field label="Portfolio Images">
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}
                                className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#c9a84c] transition-colors"
                                style={{ borderColor: '#e5e7eb' }}>
                                <ImagePlus size={20} style={{ color: '#c9a84c' }} />
                                <span className="text-xs" style={{ color: '#888780' }}>Upload</span>
                            </div>
                        ))}
                    </div>
                </Field>

                <button
                    className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                    style={{ backgroundColor: '#c9a84c' }}>
                    Save Changes
                </button>
            </div>
        </div>
    )
}

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>{label}</label>
            {children}
        </div>
    )
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors'
