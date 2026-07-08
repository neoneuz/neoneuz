import { createContext, useContext, useState } from 'react'
import { mockUser, mockAddresses, defaultNotificationSettings } from '../data/account'

const AuthContext = createContext(null)

// Haqiqiy backend ulanmaguncha barcha so'rovlar shu yerda simulyatsiya qilinadi.
function mockRequest(result, delay = 700) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState(mockAddresses)
  const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings)
  const [pendingEmail, setPendingEmail] = useState(null) // OTP/parolni tiklash oqimi uchun

  const isAuthenticated = !!user

  async function login({ email, password }) {
    if (!email || !password) {
      return { success: false, error: "Email va parolni kiriting" }
    }
    await mockRequest(null)
    setUser({ ...mockUser, email })
    return { success: true }
  }

  async function register({ firstName, lastName, email, phone, password }) {
    if (!firstName || !email || !password) {
      return { success: false, error: "Barcha majburiy maydonlarni to'ldiring" }
    }
    await mockRequest(null)
    setPendingEmail(email)
    setUser({ ...mockUser, firstName, lastName, email, phone: phone || mockUser.phone })
    return { success: true }
  }

  async function requestPasswordReset({ email }) {
    if (!email) return { success: false, error: 'Email kiriting' }
    await mockRequest(null)
    setPendingEmail(email)
    return { success: true }
  }

  async function verifyOtp({ code }) {
    if (!code || code.length < 4) {
      return { success: false, error: 'Kodni to\u2018liq kiriting' }
    }
    await mockRequest(null)
    return { success: true }
  }

  async function resetPassword({ password }) {
    if (!password || password.length < 6) {
      return { success: false, error: "Parol kamida 6 belgidan iborat bo'lishi kerak" }
    }
    await mockRequest(null)
    setPendingEmail(null)
    return { success: true }
  }

  async function updateProfile(updates) {
    await mockRequest(null, 500)
    setUser((u) => ({ ...u, ...updates }))
    return { success: true }
  }

  async function changePassword({ currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) {
      return { success: false, error: 'Barcha maydonlarni to\u2018ldiring' }
    }
    if (newPassword.length < 6) {
      return { success: false, error: "Yangi parol kamida 6 belgidan iborat bo'lishi kerak" }
    }
    await mockRequest(null, 600)
    return { success: true }
  }

  function logout() {
    setUser(null)
  }

  async function addAddress(address) {
    await mockRequest(null, 400)
    const newAddress = { ...address, id: `addr-${Date.now()}` }
    setAddresses((prev) => {
      const next = newAddress.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev
      return [...next, newAddress]
    })
    return { success: true }
  }

  async function updateAddress(id, updates) {
    await mockRequest(null, 400)
    setAddresses((prev) =>
      prev.map((a) => {
        if (updates.isDefault && a.id !== id) return { ...a, isDefault: false }
        return a.id === id ? { ...a, ...updates } : a
      })
    )
    return { success: true }
  }

  async function deleteAddress(id) {
    await mockRequest(null, 300)
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    return { success: true }
  }

  async function updateNotificationSettings(next) {
    await mockRequest(null, 300)
    setNotificationSettings(next)
    return { success: true }
  }

  async function deleteAccount() {
    await mockRequest(null, 600)
    setUser(null)
    return { success: true }
  }

  const value = {
    user,
    isAuthenticated,
    pendingEmail,
    addresses,
    notificationSettings,
    login,
    register,
    requestPasswordReset,
    verifyOtp,
    resetPassword,
    updateProfile,
    changePassword,
    logout,
    addAddress,
    updateAddress,
    deleteAddress,
    updateNotificationSettings,
    deleteAccount,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth AuthProvider ichida ishlatilishi kerak')
  return ctx
}
