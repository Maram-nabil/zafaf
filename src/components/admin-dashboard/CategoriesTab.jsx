import { useState } from 'react'
import { Pencil, Check, X, Plus } from 'lucide-react'

const INITIAL_CATS = [
    { id: 1, name: 'Photographers', count: 124 },
    { id: 2, name: 'DJ & Music', count: 87 },
    { id: 3, name: 'Venue & Decor', count: 96 },
    { id: 4, name: 'Catering', count: 73 },
    { id: 5, name: 'Makeup & Beauty', count: 58 },
    { id: 6, name: 'Wedding Cake', count: 45 },
    { id: 7, name: 'Wedding Cars', count: 32 },
    { id: 8, name: 'Videography', count: 61 },
]

export default function CategoriesTab() {
    const [cats, setCats] = useState(INITIAL_CATS)
    const [editingId, setEditingId] = useState(null)
    const [draft, setDraft] = useState('')
    const [adding, setAdding] = useState(false)
    const [newName, setNewName] = useState('')

    const startEdit = (cat) => { setEditingId(cat.id); setDraft(cat.name) }
    const cancelEdit = () => setEditingId(null)
    const saveEdit = (id) => {
        if (draft.trim()) setCats((p) => p.map((c) => c.id === id ? { ...c, name: draft.trim() } : c))
        setEditingId(null)
    }

    const addCategory = () => {
        if (!newName.trim()) return
        setCats((p) => [...p, { id: Date.now(), name: newName.trim(), count: 0 }])
        setNewName('')
        setAdding(false)
    }

    return (
        <div className="px-8 py-8 max-w-2xl">
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl font-semibold" style={{ color: '#2C2C2A' }}>Categories</h1>
                    <p className="text-sm mt-1" style={{ color: '#888780' }}>Manage vendor categories.</p>
                </div>
                <button
                    onClick={() => setAdding(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#c9a84c' }}>
                    <Plus size={15} />
                    Add New Category
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Add new row */}
                {adding && (
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-[#fdf6e7]">
                        <input
                            autoFocus
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                            placeholder="Category name..."
                            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#c9a84c]"
                            style={{ color: '#2C2C2A' }}
                        />
                        <button onClick={addCategory}
                            className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors hover:bg-green-50"
                            style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                            <Check size={13} />
                        </button>
                        <button onClick={() => { setAdding(false); setNewName('') }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-red-50 transition-colors"
                            style={{ color: '#e57373' }}>
                            <X size={13} />
                        </button>
                    </div>
                )}

                {cats.map((cat, i) => (
                    <div key={cat.id}
                        className={`flex items-center justify-between px-5 py-4 ${i < cats.length - 1 ? 'border-b border-gray-50' : ''}`}>
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            {editingId === cat.id ? (
                                <input
                                    autoFocus
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(cat.id)}
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#c9a84c]"
                                    style={{ color: '#2C2C2A' }}
                                />
                            ) : (
                                <p className="text-sm font-medium" style={{ color: '#2C2C2A' }}>{cat.name}</p>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                                style={{ backgroundColor: '#f5f5f3', color: '#888780' }}>
                                {cat.count} vendors
                            </span>
                        </div>

                        <div className="flex items-center gap-2 ml-4 shrink-0">
                            {editingId === cat.id ? (
                                <>
                                    <button onClick={() => saveEdit(cat.id)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors hover:bg-green-50"
                                        style={{ borderColor: '#4caf50', color: '#4caf50' }}>
                                        <Check size={13} />
                                    </button>
                                    <button onClick={cancelEdit}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-red-50 transition-colors"
                                        style={{ color: '#e57373' }}>
                                        <X size={13} />
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => startEdit(cat)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#c9a84c] transition-colors"
                                    style={{ color: '#888780' }}
                                    aria-label="Edit category">
                                    <Pencil size={13} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
