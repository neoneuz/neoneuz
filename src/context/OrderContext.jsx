import { createContext, useContext, useState } from 'react'
import { mockOrders } from '../data/orders'

const OrderContext = createContext(null)

// Haqiqiy backend ulanmaguncha barcha so'rovlar shu yerda simulyatsiya qilinadi.
function mockRequest(result, delay = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay))
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(mockOrders)

  function getOrder(orderId) {
    return orders.find((o) => o.id === orderId) || null
  }

  async function cancelOrder(orderId, reason) {
    await mockRequest(null, 600)
    const now = new Date().toISOString()
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'cancelled',
              cancelReason: reason || o.cancelReason,
              statusHistory: [...o.statusHistory, { status: 'cancelled', at: now }],
            }
          : o
      )
    )
    return { success: true }
  }

  const value = {
    orders,
    getOrder,
    cancelOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders OrderProvider ichida ishlatilishi kerak')
  return ctx
}
