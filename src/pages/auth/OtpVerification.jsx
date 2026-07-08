import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'

const CODE_LENGTH = 4
const RESEND_SECONDS = 45

export default function OtpVerification({ email, onBack, onVerified, purpose = 'register' }) {
  const { verifyOtp } = useAuth()
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [secondsLeft])

  function handleChange(index, value) {
    const v = value.replace(/\D/g, '').slice(-1)
    setDigits((d) => {
      const next = [...d]
      next[index] = v
      return next
    })
    setError('')
    if (v && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!text) return
    e.preventDefault()
    setDigits(Array.from({ length: CODE_LENGTH }, (_, i) => text[i] || ''))
    inputsRef.current[Math.min(text.length, CODE_LENGTH - 1)]?.focus()
  }

  function handleResend() {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(''))
    inputsRef.current[0]?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < CODE_LENGTH) {
      setError("Kodni to'liq kiriting")
      return
    }
    setSubmitting(true)
    const res = await verifyOtp({ code })
    setSubmitting(false)
    if (res.success) {
      onVerified()
    } else {
      setError(res.error)
    }
  }

  return (
    <AuthLayout
      title="Tasdiqlash kodi"
      subtitle={
        email
          ? `${email} manziliga yuborilgan 4 xonali kodni kiriting`
          : "Telefon raqamingizga yuborilgan 4 xonali kodni kiriting"
      }
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className={`w-12 h-14 text-center text-xl font-bold bg-neone-card border rounded-xl text-white outline-none focus-ring ${
                error ? 'border-red-500' : 'border-neone-border focus:border-neone-accent'
              }`}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring disabled:opacity-60"
        >
          {submitting ? (
            'Tekshirilmoqda...'
          ) : (
            <>
              <ShieldCheck size={18} /> Tasdiqlash
            </>
          )}
        </button>

        <p className="text-center text-sm text-neone-muted">
          {secondsLeft > 0 ? (
            <>Kodni qayta yuborish {secondsLeft}s</>
          ) : (
            <button type="button" onClick={handleResend} className="text-neone-accent font-medium hover:underline focus-ring">
              Kodni qayta yuborish
            </button>
          )}
        </p>
      </form>
    </AuthLayout>
  )
}
