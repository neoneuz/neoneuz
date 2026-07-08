import { useState } from 'react'
import { Check, Mail, MessageSquare, Smartphone } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import Toggle from '../../components/ui/Toggle'
import { useAuth } from '../../context/AuthContext'

const channels = [
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'sms', label: 'SMS', icon: MessageSquare },
  { key: 'push', label: 'Push', icon: Smartphone },
]

export default function NotificationSettings({ onNavigate, onLogout, onBack }) {
  const { notificationSettings, updateNotificationSettings } = useAuth()
  const [settings, setSettings] = useState(notificationSettings)
  const [saved, setSaved] = useState(false)

  function toggle(categoryKey, channelKey, value) {
    setSettings((s) => ({
      ...s,
      [categoryKey]: { ...s[categoryKey], [channelKey]: value },
    }))
    setSaved(false)
  }

  async function handleSave() {
    await updateNotificationSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AccountLayout title="Bildirishnoma sozlamalari" active="notification-settings" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="bg-neone-panel border border-neone-border rounded-2xl overflow-hidden max-w-2xl">
        <div className="grid grid-cols-[1fr_repeat(3,64px)] gap-2 px-6 py-3 border-b border-neone-border text-neone-muted text-xs font-semibold uppercase tracking-wide">
          <span>Kategoriya</span>
          {channels.map((c) => (
            <span key={c.key} className="flex flex-col items-center gap-1">
              <c.icon size={14} />
              {c.label}
            </span>
          ))}
        </div>

        {Object.entries(settings).map(([key, category]) => (
          <div key={key} className="grid grid-cols-[1fr_repeat(3,64px)] gap-2 items-center px-6 py-4 border-b border-neone-border last:border-b-0">
            <div>
              <p className="text-white text-sm font-medium">{category.label}</p>
              <p className="text-neone-muted text-xs mt-0.5 pr-2">{category.desc}</p>
            </div>
            {channels.map((c) => (
              <div key={c.key} className="flex justify-center">
                <Toggle
                  checked={category[c.key]}
                  onChange={(v) => toggle(key, c.key, v)}
                  label={`${category.label} - ${c.label}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className={`mt-5 flex items-center justify-center gap-2 font-semibold py-3.5 px-6 rounded-xl transition-all focus-ring ${
          saved ? 'bg-white text-black' : 'bg-neone-accent text-black hover:brightness-95'
        }`}
      >
        {saved ? (
          <>
            <Check size={18} /> Saqlandi
          </>
        ) : (
          "O'zgarishlarni saqlash"
        )}
      </button>
    </AccountLayout>
  )
}
