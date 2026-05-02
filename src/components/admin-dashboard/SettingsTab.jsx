import { useState } from 'react'

function Toggle({ checked, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
            <div>
                <p className="text-sm font-medium" style={{ color: '#2C2C2A' }}>{label}</p>
                {description && (
                    <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                style={{ backgroundColor: checked ? '#c9a84c' : '#e5e7eb' }}
                role="switch"
                aria-checked={checked}>
                <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                    style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
                />
            </button>
        </div>
    )
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors'

export default function SettingsTab() {
    const [siteName, setSiteName] = useState('Zafaf')
    const [contactEmail, setContactEmail] = useState('admin@zafaf.com')
    const [maintenance, setMaintenance] = useState(false)
    const [allowVendors, setAllowVendors] = useState(true)

    return (
        <div className="px-8 py-8 max-w-xl">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Settings</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Configure global platform settings.</p>
            </div>

            {/* Site info */}
            <section className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
                <h2 className="text-sm font-semibold mb-4" style={{ color: '#2C2C2A' }}>Site Information</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>Site Name</label>
                        <input value={siteName} onChange={(e) => setSiteName(e.target.value)}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>Contact Email</label>
                        <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </div>
                    <button
                        className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                        style={{ backgroundColor: '#c9a84c' }}>
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Toggles */}
            <section className="bg-white rounded-xl border border-gray-100 px-6 py-2">
                <Toggle
                    checked={maintenance}
                    onChange={setMaintenance}
                    label="Maintenance Mode"
                    description="Show a maintenance page to all visitors"
                />
                <Toggle
                    checked={allowVendors}
                    onChange={setAllowVendors}
                    label="Allow New Vendor Registrations"
                    description="Let new vendors sign up and submit profiles"
                />
            </section>
        </div>
    )
}
