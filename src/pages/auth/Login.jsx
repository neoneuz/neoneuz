import { useState } from 'react'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

export default function Login({ onBack, onLoggedIn, onGoRegister, onGoForgotPassword }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
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
    if (!form.email) nextErrors.email = 'Email kiriting'
    if (!form.password) nextErrors.password = 'Parol kiriting'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    const res = await login(form)
    setSubmitting(false)
    if (res.success) {
      onLoggedIn()
    } else {
      setErrors({ form: res.error })
    }
  }

  return (
    <AuthLayout
      title="Hisobga kirish"
      subtitle="Xaridlaringizni davom ettirish uchun tizimga kiring"
      onBack={onBack}
      footer={
        <span>
          Hisobingiz yo'qmi?{' '}
          <button onClick={onGoRegister} className="text-neone-accent font-medium hover:underline focus-ring">
            Ro'yxatdan o'ting
          </button>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.form && (
          <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{errors.form}</p>
        )}
        <FormField
          label="Email"
          type="email"
          placeholder="email@misol.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <div className="relative">
          <FormField
            label="Parol"
            type={showPassword ? 'text' : 'password'}
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            error={errors.password}
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

        <div className="flex justify-end -mt-1">
          <button type="button" onClick={onGoForgotPassword} className="text-neone-accent text-sm hover:underline focus-ring">
            Parolni unutdingizmi?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center gap-2 bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring disabled:opacity-60"
        >
          {submitting ? (
            'Kirilmoqda...'
          ) : (
            <>
              <LogIn size={18} /> Kirish
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
