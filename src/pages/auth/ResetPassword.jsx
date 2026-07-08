import { useState } from 'react'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

export default function ResetPassword({ onBack, onReset }) {
  const { resetPassword } = useAuth()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: null }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.password) nextErrors.password = 'Yangi parolni kiriting'
    else if (form.password.length < 6) nextErrors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak"
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Parollar mos emas'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    const res = await resetPassword(form)
    setSubmitting(false)
    if (res.success) {
      onReset()
    } else {
      setErrors({ form: res.error })
    }
  }

  return (
    <AuthLayout title="Yangi parol o'rnatish" subtitle="Hisobingiz uchun yangi parol yarating" onBack={onBack}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.form && (
          <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{errors.form}</p>
        )}
        <div className="relative">
          <FormField
            label="Yangi parol"
            type={showPassword ? 'text' : 'password'}
            placeholder="Kamida 6 belgi"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            error={errors.password}
            autoComplete="new-password"
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
          label="Yangi parolni tasdiqlang"
          type={showPassword ? 'text' : 'password'}
          placeholder="Parolni qayta kiriting"
          value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center gap-2 bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring disabled:opacity-60"
        >
          {submitting ? (
            'Saqlanmoqda...'
          ) : (
            <>
              <KeyRound size={18} /> Parolni saqlash
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
