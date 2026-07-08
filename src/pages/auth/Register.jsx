import { useState } from 'react'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

export default function Register({ onBack, onRegistered, onGoLogin }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
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
    if (!form.firstName) nextErrors.firstName = 'Ismingizni kiriting'
    if (!form.email) nextErrors.email = 'Email kiriting'
    if (!form.phone) nextErrors.phone = 'Telefon raqamingizni kiriting'
    if (!form.password) nextErrors.password = 'Parol kiriting'
    else if (form.password.length < 6) nextErrors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak"
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Parollar mos emas'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    const res = await register(form)
    setSubmitting(false)
    if (res.success) {
      onRegistered(form.email)
    } else {
      setErrors({ form: res.error })
    }
  }

  return (
    <AuthLayout
      title="Ro'yxatdan o'tish"
      subtitle="Yangi hisob yaratib, xaridlarni boshlang"
      onBack={onBack}
      footer={
        <span>
          Hisobingiz bormi?{' '}
          <button onClick={onGoLogin} className="text-neone-accent font-medium hover:underline focus-ring">
            Kirish
          </button>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.form && (
          <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{errors.form}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Ism" placeholder="Aziz" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} error={errors.firstName} />
          <FormField label="Familiya" placeholder="Karimov" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </div>
        <FormField
          label="Email"
          type="email"
          placeholder="email@misol.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          label="Telefon raqam"
          type="tel"
          placeholder="+998 90 123 45 67"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
        <div className="relative">
          <FormField
            label="Parol"
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
          label="Parolni tasdiqlang"
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
            'Yuborilmoqda...'
          ) : (
            <>
              <UserPlus size={18} /> Ro'yxatdan o'tish
            </>
          )}
        </button>

        <p className="text-neone-muted text-xs text-center leading-relaxed">
          Davom etish orqali siz NEONE-ning{' '}
          <span className="text-white">Foydalanish shartlari</span> va{' '}
          <span className="text-white">Maxfiylik siyosati</span>ga rozilik bildirasiz.
        </p>
      </form>
    </AuthLayout>
  )
}
