import { useState } from 'react'
import { MapPin, Pencil, Trash2, Plus, Star } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import AddressFormModal from '../../components/account/AddressFormModal'
import { useAuth } from '../../context/AuthContext'

export default function AddressBook({ onNavigate, onLogout, onBack }) {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  function openAddModal() {
    setEditingAddress(null)
    setModalOpen(true)
  }

  function openEditModal(address) {
    setEditingAddress(address)
    setModalOpen(true)
  }

  async function handleSubmit(form) {
    if (editingAddress) {
      await updateAddress(editingAddress.id, form)
    } else {
      await addAddress(form)
    }
    setModalOpen(false)
    setEditingAddress(null)
  }

  async function handleDelete(id) {
    setDeletingId(id)
    await deleteAddress(id)
    setDeletingId(null)
  }

  return (
    <AccountLayout title="Manzillar kitobi" active="address-book" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-neone-muted text-sm">{addresses.length} ta manzil saqlangan</p>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-neone-accent text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-95 focus-ring"
        >
          <Plus size={16} /> Yangi manzil
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-neone-panel border border-neone-border rounded-2xl p-10 text-center">
          <MapPin size={28} className="text-neone-muted mx-auto mb-3" />
          <p className="text-white font-medium">Hozircha manzil qo'shilmagan</p>
          <p className="text-neone-muted text-sm mt-1">Tez xarid qilish uchun yetkazib berish manzilini qo'shing</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <div key={a.id} className="bg-neone-panel border border-neone-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{a.label}</span>
                  {a.isDefault && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-neone-accent bg-neone-accent/10 px-2 py-0.5 rounded-md">
                      <Star size={10} fill="currentColor" /> Asosiy
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(a)}
                    aria-label="Tahrirlash"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neone-muted hover:text-white hover:bg-neone-card focus-ring"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={deletingId === a.id}
                    aria-label="O'chirish"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neone-muted hover:text-red-400 hover:bg-neone-card focus-ring disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-sm text-neone-muted leading-relaxed">
                <p className="text-white">{a.fullName}</p>
                <p>{a.phone}</p>
                <p>
                  {a.street}
                  {a.apartment ? `, ${a.apartment}` : ''}
                </p>
                <p>
                  {a.district}, {a.region}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <AddressFormModal
          initialAddress={editingAddress}
          onClose={() => {
            setModalOpen(false)
            setEditingAddress(null)
          }}
          onSubmit={handleSubmit}
        />
      )}
    </AccountLayout>
  )
}
