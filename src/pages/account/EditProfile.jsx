import { useState } from 'react'
import { Check, Save } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

const genders = [
  { value: 'male', label: 'Erkak' },
  { value: 'female', label: 'Ayol' },
  { value: 'other', label: "Aytmayman" },
]

export default function EditProfile({ onNavigate, onLogout, onBack }) {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: user?.birthday || '',
    gender: user?.gender || 'male',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: null }))
    setSaved(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.firstName) nextErrors.firstName = 'Ismingizni kiriting'
    if (!form.email) nextErrors.email = 'Email kiriting'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    const res = await updateProfile(form)
    setSubmitting(false)
    if (res.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (!user) return null

  return (
    <AccountLayout title="Profilni tahrirlash" active="edit-profile" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <form onSubmit={handleSubmit} className="bg-neone-panel border border-neone-border rounded-2xl p-6 flex flex-col gap-4 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Ism" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} error={errors.firstName} />
          <FormField label="Familiya" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </div>
        <FormField label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
        <FormField label="Telefon raqam" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        <FormField label="Tug'ilgan sana" type="date" value={form.birthday} onChange={(e) => update('birthday', e.target.value)} />

        <div>
          <span className="block text-white text-sm font-medium mb-1.5">Jins</span>
          <div className="flex gap-2 flex-wrap">
            {genders.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => update('gender', g.value)}
                className={`px-4 py-2 rounded-lg border text-sm focus-ring ${
                  form.gender === g.value ? 'border-neone-accent text-white bg-neone-card' : 'border-neone-border text-neone-muted hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`mt-2 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all focus-ring disabled:opacity-60 ${
            saved ? 'bg-white text-black' : 'bg-neone-accent text-black hover:brightness-95'
          }`}
        >
          {saved ? (
            <>
              <Check size={18} /> Saqlandi
            </>
          ) : submitting ? (
            'Saqlanmoqda...'
          ) : (
            <>
              <Save size={18} /> O'zgarishlarni saqlash
            </>
          )}
        </button>
      </form>
    </AccountLayout>
  )
}
