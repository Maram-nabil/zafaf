import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#c9a84c] transition-colors'

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#2C2C2A' }}>{label}</label>
            {children}
        </div>
    )
}

function PasswordField({ label, name, value, onChange }) {
    const [show, setShow] = useState(false)
    return (
        <Field label={label}>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••"
                    className={inputCls + ' pr-11'}
                    style={{ color: '#2C2C2A' }}
                />
                <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#888780' }}
                    aria-label={show ? 'Hide password' : 'Show password'}>
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </Field>
    )
}

export default function SettingsTab() {
    const [profile, setProfile] = useState({
        name: 'Sara & Ahmed',
        email: 'sara@example.com',
        phone: '+20 100 987 6543',
        weddingDate: '2026-06-15',
    })

    const [passwords, setPasswords] = useState({
        current: '', newPass: '', confirm: '',
    })

    const handleProfile = (e) =>
        setProfile((p) => ({ ...p, [e.target.name]: e.target.value }))

    const handlePw = (e) =>
        setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }))

    return (
        <div className="px-8 py-8 max-w-xl">
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Settings</h1>
                <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage your profile and account preferences.</p>
            </div>

            {/* Edit Profile */}
            <section className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
                <h2 className="text-sm font-semibold mb-4" style={{ color: '#2C2C2A' }}>Edit Profile</h2>
                <div className="flex flex-col gap-4">
                    <Field label="Full Name">
                        <input name="name" value={profile.name} onChange={handleProfile}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </Field>
                    <Field label="Email">
                        <input name="email" type="email" value={profile.email} onChange={handleProfile}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </Field>
                    <Field label="Phone">
                        <input name="phone" type="tel" value={profile.phone} onChange={handleProfile}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </Field>
                    <Field label="Wedding Date">
                        <input name="weddingDate" type="date" value={profile.weddingDate} onChange={handleProfile}
                            className={inputCls} style={{ color: '#2C2C2A' }} />
                    </Field>
                    <button
                        className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity mt-1"
                        style={{ backgroundColor: '#c9a84c' }}>
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Change Password */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
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
        </div>
    )
}
