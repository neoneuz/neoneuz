import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import FormField from '../../components/ui/FormField'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPassword({ onBack, onCodeSent, onGoLogin }) {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) {
      setError('Email kiriting')
      return
    }
    setSubmitting(true)
    const res = await requestPasswordReset({ email })
    setSubmitting(false)
    if (res.success) {
      onCodeSent(email)
    } else {
      setError(res.error)
    }
  }

  return (
    <AuthLayout
      title="Parolni unutdingizmi?"
      subtitle="Hisobingizga bog'langan email manzilni kiriting, sizga tasdiqlash kodini yuboramiz"
      onBack={onBack}
      footer={
        <span>
          Parolingiz esingizdami?{' '}
          <button onClick={onGoLogin} className="text-neone-accent font-medium hover:underline focus-ring">
            Kirish
          </button>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-[42px] text-neone-muted" />
          <FormField
            label="Email"
            type="email"
            placeholder="email@misol.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            error={error}
            className="[&_input]:pl-9"
            autoComplete="email"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center gap-2 bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring disabled:opacity-60"
        >
          {submitting ? (
            'Yuborilmoqda...'
          ) : (
            <>
              <Send size={18} /> Kodni yuborish
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
