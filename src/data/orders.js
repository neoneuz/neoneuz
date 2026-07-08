// Buyurtmalar uchun namunaviy ma'lumotlar — backend ulanmaguncha shu yerda saqlanadi.
// Mavjud mahsulot/manzil/to'lov/yetkazib berish ma'lumotlaridan foydalaniladi (checkout oqimi bilan bir xil shakl).

import { products } from './products'
import { mockAddresses } from './account'
import { deliveryMethods, getDeliveryFee, findPaymentMethod } from './checkout'

// Buyurtmaning "baxtli yo'l" bosqichlari — bekor qilingan buyurtmalar bu ro'yxatdan tashqarida ko'rsatiladi.
export const ORDER_STATUS_FLOW = ['processing', 'confirmed', 'shipped', 'delivered']

export const ORDER_STATUS_META = {
  processing: {
    label: 'Qabul qilindi',
    description: "Buyurtmangiz qabul qilindi va tayyorlanmoqda",
    tone: 'amber',
  },
  confirmed: {
    label: 'Tasdiqlandi',
    description: "To'lov tasdiqlandi, buyurtma yig'ilmoqda",
    tone: 'sky',
  },
  shipped: {
    label: "Jo'natildi",
    description: 'Buyurtma kuryer xizmatiga topshirildi',
    tone: 'indigo',
  },
  delivered: {
    label: 'Yetkazib berildi',
    description: 'Buyurtma muvaffaqiyatli yetkazildi',
    tone: 'accent',
  },
  cancelled: {
    label: 'Bekor qilindi',
    description: 'Buyurtma bekor qilindi',
    tone: 'red',
  },
}

const TONE_BADGE_CLASSES = {
  amber: 'text-amber-400 bg-amber-400/10',
  sky: 'text-sky-400 bg-sky-400/10',
  indigo: 'text-indigo-400 bg-indigo-400/10',
  accent: 'text-neone-accent bg-neone-accent/10',
  red: 'text-red-400 bg-red-500/10',
}

export function getStatusMeta(status) {
  return ORDER_STATUS_META[status] || ORDER_STATUS_META.processing
}

export function getStatusBadgeClass(status) {
  return TONE_BADGE_CLASSES[getStatusMeta(status).tone] || TONE_BADGE_CLASSES.amber
}

export function getStatusStepIndex(status) {
  return ORDER_STATUS_FLOW.indexOf(status)
}

// Faqat hali jo'natilmagan buyurtmalarni bekor qilish mumkin.
export function canCancelOrder(order) {
  return order.status === 'processing' || order.status === 'confirmed'
}

// Jo'natilgan/yetkazilgan/bekor qilingan buyurtmalarni kuzatish mantiqiy emas.
export function isOrderTrackable(order) {
  return order.status === 'processing' || order.status === 'confirmed' || order.status === 'shipped'
}

export const cancelReasons = [
  "Fikrimni o'zgartirdim",
  "Noto'g'ri mahsulot yoki o'lcham tanladim",
  "Yetkazib berish juda uzoq davom etadi",
  "Boshqa joydan arzonroq narxda topdim",
  "Boshqa sabab",
]

const UZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

// Sanani "18-iyun, 2026" yoki (withTime=true) "18-iyun, 2026 \u00b7 14:20" ko'rinishida formatlaydi.
export function formatOrderDate(iso, withTime = false) {
  if (!iso) return ''
  const d = new Date(iso)
  const datePart = `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}, ${d.getFullYear()}`
  if (!withTime) return datePart
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${datePart} \u00b7 ${hh}:${mm}`
}

function findProduct(id) {
  return products.find((p) => p.id === id)
}

function findDelivery(id) {
  return deliveryMethods.find((d) => d.id === id)
}

// Savat qatori bilan bir xil shakl — CartContext'dagi buildLine mantig'iga mos (Reorder tugmasi shu shaklga tayanadi).
function line(productId, qty, size, color) {
  const product = findProduct(productId)
  const resolvedSize = size || product?.sizes?.[0]
  const resolvedColor = color || product?.colors?.[0]
  return {
    id: `${productId}::${resolvedColor}::${resolvedSize}`,
    product,
    color: resolvedColor,
    size: resolvedSize,
    qty,
  }
}

function computeSubtotal(items) {
  return items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
}

function buildMockOrder({
  id,
  createdAt,
  status,
  items,
  addressIndex = 0,
  deliveryId,
  paymentMethodId,
  statusHistory,
  cancelReason,
  trackingNumber,
  carrier,
  currentLocation,
  estimatedDelivery,
  deliveredAt,
}) {
  const delivery = findDelivery(deliveryId)
  const payment = findPaymentMethod(paymentMethodId)
  const subtotal = computeSubtotal(items)
  const deliveryFee = getDeliveryFee(deliveryId, subtotal)

  return {
    id,
    createdAt,
    status,
    items,
    address: mockAddresses[addressIndex] || mockAddresses[0],
    delivery,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethodId: payment?.id,
    paymentMethodName: payment?.name,
    statusHistory,
    cancelReason: cancelReason || null,
    trackingNumber: trackingNumber || null,
    carrier: carrier || null,
    currentLocation: currentLocation || null,
    estimatedDelivery: estimatedDelivery || null,
    deliveredAt: deliveredAt || null,
  }
}

export const mockOrders = [
  buildMockOrder({
    id: 'NEONE-70521934',
    createdAt: '2026-07-05T09:12:00',
    status: 'processing',
    items: [line('neo-t-001', 1, 'L'), line('neo-cap-001', 1)],
    addressIndex: 0,
    deliveryId: 'standard',
    paymentMethodId: 'payme',
    statusHistory: [{ status: 'processing', at: '2026-07-05T09:12:00' }],
    estimatedDelivery: '2026-07-10',
  }),
  buildMockOrder({
    id: 'NEONE-70498827',
    createdAt: '2026-07-06T09:00:00',
    status: 'confirmed',
    items: [line('nike-am270', 1, '41'), line('neo-cap-001', 2)],
    addressIndex: 0,
    deliveryId: 'express',
    paymentMethodId: 'mastercard',
    statusHistory: [
      { status: 'processing', at: '2026-07-06T09:00:00' },
      { status: 'confirmed', at: '2026-07-06T11:30:00' },
    ],
    estimatedDelivery: '2026-07-08',
  }),
  buildMockOrder({
    id: 'NEONE-70345561',
    createdAt: '2026-07-02T08:00:00',
    status: 'shipped',
    items: [line('nike-am270', 1, '42')],
    addressIndex: 1,
    deliveryId: 'express',
    paymentMethodId: 'uzcard',
    statusHistory: [
      { status: 'processing', at: '2026-07-02T08:00:00' },
      { status: 'confirmed', at: '2026-07-02T09:30:00' },
      { status: 'shipped', at: '2026-07-03T07:15:00' },
    ],
    trackingNumber: 'BTS4471029UZ',
    carrier: 'BTS Express',
    currentLocation: 'Toshkent tarqatish markazi',
    estimatedDelivery: '2026-07-08',
  }),
  buildMockOrder({
    id: 'NEONE-70102284',
    createdAt: '2026-06-18T10:00:00',
    status: 'delivered',
    items: [line('neo-t-004', 2, 'M'), line('neo-j-003', 1, 'L')],
    addressIndex: 0,
    deliveryId: 'standard',
    paymentMethodId: 'click',
    statusHistory: [
      { status: 'processing', at: '2026-06-18T10:00:00' },
      { status: 'confirmed', at: '2026-06-18T13:40:00' },
      { status: 'shipped', at: '2026-06-19T08:00:00' },
      { status: 'delivered', at: '2026-06-21T15:45:00' },
    ],
    deliveredAt: '2026-06-21T15:45:00',
  }),
  buildMockOrder({
    id: 'NEONE-70088841',
    createdAt: '2026-06-05T11:00:00',
    status: 'cancelled',
    items: [line('neo-h-002', 1, 'L')],
    addressIndex: 1,
    deliveryId: 'standard',
    paymentMethodId: 'visa',
    statusHistory: [
      { status: 'processing', at: '2026-06-05T11:00:00' },
      { status: 'cancelled', at: '2026-06-06T09:20:00' },
    ],
    cancelReason: "Fikrimni o'zgartirdim",
  }),
  buildMockOrder({
    id: 'NEONE-69944412',
    createdAt: '2026-05-22T13:00:00',
    status: 'delivered',
    items: [line('neo-t-005', 1, 'M'), line('neo-t-006', 1, 'L')],
    addressIndex: 0,
    deliveryId: 'pickup',
    paymentMethodId: 'humo',
    statusHistory: [
      { status: 'processing', at: '2026-05-22T13:00:00' },
      { status: 'confirmed', at: '2026-05-22T15:00:00' },
      { status: 'shipped', at: '2026-05-23T10:00:00' },
      { status: 'delivered', at: '2026-05-23T16:20:00' },
    ],
    deliveredAt: '2026-05-23T16:20:00',
  }),
]

// Eng so'nggi buyurtma ro'yxat boshida turishi uchun.
mockOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
