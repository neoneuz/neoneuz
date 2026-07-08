import { createContext, useContext, useState } from 'react'
import { products } from '../data/products'

const WishlistContext = createContext(null)

// Haqiqiy backend ulanmaguncha barcha so'rovlar shu yerda simulyatsiya qilinadi.
function mockRequest(result, delay = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay))
}

// Boshlang'ich sevimlilar ro'yxati — demo uchun oldindan to'ldirilgan
const initialWishlist = [products[1], products[4], products[5]]

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(initialWishlist)

  function isWishlisted(productId) {
    return items.some((p) => p.id === productId)
  }

  async function toggleWishlist(product) {
    await mockRequest(null)
    setItems((prev) => (prev.some((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]))
    return { success: true }
  }

  async function removeFromWishlist(productId) {
    await mockRequest(null, 250)
    setItems((prev) => prev.filter((p) => p.id !== productId))
    return { success: true }
  }

  const value = {
    items,
    count: items.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist WishlistProvider ichida ishlatilishi kerak')
  return ctx
}
