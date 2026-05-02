import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function Toggle({ checked, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
            <div>
                <p className="text-sm font-medium" style={{ color: '#2C2C2A' }}>{label}</p>
                {description && <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{description}</p>}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                style={{ backgroundColor: checked ? '#c9a84c' : '#e5e7eb' }}
                role="switch"
                aria-checked={checked}
            >
                <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                    style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
                />
            </button>
        </div>
    )
}

function PasswordField({ label, name, value, onChange }) {
    const [show, setShow] = useState(false)
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                    style={{ color: '#2C2C2A' }}
                />
                <button type="button" onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#888780' }}
                    aria-label={show ? 'Hide' : 'Show'}>
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    )
}

export default function SettingsTab() {
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
    const [emailNotifs, setEmailNotifs] = useState(true)
    const [profileVisible, setProfileVisible] = useState(true)

    const handlePw = (e) => setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }))

    return (
        <div className="px-8 py-8 max-w-xl">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Settings</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage your account preferences.</p>
            </div>

            {/* Change password */}
            <section className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
                <h2 className="text-sm font-semibold mb-4" style={{ color: '#2C2C2A' }}>Change Password</h2>
                <div className="flex flex-col gap-4">
                    <PasswordField label="Current Password" name="current" value={passwords.current} onChange={handlePw} />
                    <PasswordField label="New Password" name="newPass" value={passwords.newPass} onChange={handlePw} />
                    <PasswordField label="Confirm New Password" name="confirm" value={passwords.confirm} onChange={handlePw} />
                    <button
                        className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                        style={{ backgroundColor: '#c9a84c' }}>
                        Update Password
                    </button>
                </div>
            </section>

            {/* Preferences */}
            <section className="bg-white rounded-xl border border-gray-100 px-6 py-2 mb-5">
                <Toggle
                    checked={emailNotifs}
                    onChange={setEmailNotifs}
                    label="Email Notifications"
                    description="Receive email alerts for new inquiries and messages"
                />
                <Toggle
                    checked={profileVisible}
                    onChange={setProfileVisible}
                    label="Profile Visibility"
                    description="Show your profile to couples browsing vendors"
                />
            </section>

            {/* Danger zone */}
            <section className="bg-white rounded-xl border border-red-100 p-6">
                <h2 className="text-sm font-semibold mb-1" style={{ color: '#e57373' }}>Danger Zone</h2>
                <p className="text-xs mb-4" style={{ color: '#888780' }}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                    className="px-5 py-2.5 rounded-xl text-sm font-medium border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
                    Delete Account
                </button>
            </section>
        </div>
    )
}
