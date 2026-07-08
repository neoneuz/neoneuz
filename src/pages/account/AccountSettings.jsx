import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import Toggle from '../../components/ui/Toggle'
import { useAuth } from '../../context/AuthContext'

const languages = ['O\u2018zbekcha', 'Русский', 'English']
const currencies = ["so'm (UZS)", 'USD ($)']

export default function AccountSettings({ onNavigate, onLogout, onBack, onAccountDeleted }) {
  const { deleteAccount } = useAuth()
  const [language, setLanguage] = useState(languages[0])
  const [currency, setCurrency] = useState(currencies[0])
  const [twoFactor, setTwoFactor] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await deleteAccount()
    setDeleting(false)
    onAccountDeleted()
  }

  return (
    <AccountLayout title="Hisob sozlamalari" active="account-settings" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="flex flex-col gap-4 max-w-xl">
        <div className="bg-neone-panel border border-neone-border rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Umumiy sozlamalar</h2>

          <div className="mb-5">
            <p className="text-white text-sm font-medium mb-2">Til</p>
            <div className="flex gap-2 flex-wrap">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-4 py-2 rounded-lg border text-sm focus-ring ${
                    language === l ? 'border-neone-accent text-white bg-neone-card' : 'border-neone-border text-neone-muted hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-sm font-medium mb-2">Valyuta</p>
            <div className="flex gap-2 flex-wrap">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-2 rounded-lg border text-sm focus-ring ${
                    currency === c ? 'border-neone-accent text-white bg-neone-card' : 'border-neone-border text-neone-muted hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-neone-panel border border-neone-border rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Xavfsizlik</h2>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm font-medium">Ikki bosqichli autentifikatsiya</p>
              <p className="text-neone-muted text-xs mt-0.5">Kirishda qo'shimcha tasdiqlash kodi so'raladi</p>
            </div>
            <Toggle checked={twoFactor} onChange={setTwoFactor} label="Ikki bosqichli autentifikatsiya" />
          </div>
        </div>

        <div className="bg-neone-panel border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-400" />
            <h2 className="text-white font-bold">Xavfli hudud</h2>
          </div>
          <p className="text-neone-muted text-sm mb-4">
            Hisobingizni o'chirish barcha ma'lumotlaringizni butunlay yo'q qiladi. Bu amalni ortga qaytarib bo'lmaydi.
          </p>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-2 border border-red-500/40 text-red-400 text-sm px-4 py-2.5 rounded-lg hover:bg-red-500/10 focus-ring"
            >
              <Trash2 size={14} /> Hisobni o'chirish
            </button>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white text-sm">Rostdan ham o'chirmoqchimisiz?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-95 focus-ring disabled:opacity-60"
              >
                {deleting ? "O'chirilmoqda..." : 'Ha, o\u2018chirish'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-neone-muted text-sm hover:text-white focus-ring"
              >
                Bekor qilish
              </button>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}
