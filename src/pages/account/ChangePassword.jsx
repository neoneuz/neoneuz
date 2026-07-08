import { useState } from 'react'
import { Check, Eye, EyeOff, Lock } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

export default function ChangePassword({ onNavigate, onLogout, onBack }) {
  const { changePassword } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
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
    if (!form.currentPassword) nextErrors.currentPassword = 'Joriy parolni kiriting'
    if (!form.newPassword) nextErrors.newPassword = 'Yangi parolni kiriting'
    else if (form.newPassword.length < 6) nextErrors.newPassword = "Parol kamida 6 belgidan iborat bo'lishi kerak"
    if (form.confirmPassword !== form.newPassword) nextErrors.confirmPassword = 'Parollar mos emas'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    const res = await changePassword(form)
    setSubmitting(false)
    if (res.success) {
      setSaved(true)
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSaved(false), 2000)
    } else {
      setErrors({ form: res.error })
    }
  }

  return (
    <AccountLayout title="Parolni o'zgartirish" active="change-password" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <form onSubmit={handleSubmit} className="bg-neone-panel border border-neone-border rounded-2xl p-6 flex flex-col gap-4 max-w-xl">
        {errors.form && (
          <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{errors.form}</p>
        )}
        <div className="relative">
          <FormField
            label="Joriy parol"
            type={showPassword ? 'text' : 'password'}
            value={form.currentPassword}
            onChange={(e) => update('currentPassword', e.target.value)}
            error={errors.currentPassword}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-[38px] text-neone-muted hover:text-white focus-ring"
            aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\u2018rsatish'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <FormField
          label="Yangi parol"
          type={showPassword ? 'text' : 'password'}
          placeholder="Kamida 6 belgi"
          value={form.newPassword}
          onChange={(e) => update('newPassword', e.target.value)}
          error={errors.newPassword}
          autoComplete="new-password"
        />
        <FormField
          label="Yangi parolni tasdiqlang"
          type={showPassword ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className={`mt-2 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all focus-ring disabled:opacity-60 ${
            saved ? 'bg-white text-black' : 'bg-neone-accent text-black hover:brightness-95'
          }`}
        >
          {saved ? (
            <>
              <Check size={18} /> Parol yangilandi
            </>
          ) : submitting ? (
            'Saqlanmoqda...'
          ) : (
            <>
              <Lock size={18} /> Parolni yangilash
            </>
          )}
        </button>
      </form>
    </AccountLayout>
  )
}
