import { createContext, useContext, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)

// Haqiqiy backend ulanmaguncha barcha so'rovlar shu yerda simulyatsiya qilinadi.
function mockRequest(result, delay = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay))
}

function lineId(productId, color, size) {
  return `${productId}::${color || 'default'}::${size || 'default'}`
}

function buildLine(product, color, size, qty) {
  const resolvedColor = color || product.colors?.[0]
  const resolvedSize = size || product.sizes?.[0]
  return { id: lineId(product.id, resolvedColor, resolvedSize), product, color: resolvedColor, size: resolvedSize, qty }
}

// Boshlang'ich savat — demo uchun bir nechta mahsulot oldindan qo'shilgan
const initialCart = [
  buildLine(products[0], products[0].colors[0], products[0].sizes[2] || products[0].sizes[0], 1),
  buildLine(products[2], products[2].colors[0], products[2].sizes[1] || products[2].sizes[0], 1),
]

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialCart)

  async function addToCart(product, { color, size, qty = 1 } = {}) {
    const id = lineId(product.id, color || product.colors?.[0], size || product.sizes?.[0])
    await mockRequest(null)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, buildLine(product, color, size, qty)]
    })
    return { success: true }
  }

  async function updateQuantity(id, qty) {
    await mockRequest(null, 200)
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))))
    return { success: true }
  }

  async function removeFromCart(id) {
    await mockRequest(null, 250)
    setItems((prev) => prev.filter((i) => i.id !== id))
    return { success: true }
  }

  async function clearCart() {
    await mockRequest(null, 200)
    setItems([])
    return { success: true }
  }

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  const value = {
    items,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart CartProvider ichida ishlatilishi kerak')
  return ctx
}
