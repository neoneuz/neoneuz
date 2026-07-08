// Checkout va to'lov uchun namunaviy ma'lumotlar — backend ulanmaguncha shu yerda saqlanadi.

export const FREE_SHIPPING_THRESHOLD = 300000

export const deliveryMethods = [
  {
    id: 'standard',
    name: 'Standart yetkazib berish',
    desc: "Toshkent bo'ylab 1-2 kun, viloyatlarga 3-5 kun ichida",
    price: 25000,
    eta: '1-5 kun',
  },
  {
    id: 'express',
    name: 'Tezkor yetkazib berish',
    desc: 'Bugun yoki ertaga yetkaziladi (faqat Toshkent shahri)',
    price: 45000,
    eta: 'Bugun-ertaga',
  },
  {
    id: 'pickup',
    name: "Do'kondan olib ketish",
    desc: "NEONE flagman do'konidan o'zingiz olib ketasiz",
    price: 0,
    eta: '2 soat ichida tayyor',
  },
]

// "standard" usul uchun FREE_SHIPPING_THRESHOLD dan yuqori buyurtmalarda yetkazib berish bepul bo'ladi
// (Header va Footer'dagi "bepul yetkazib berish" bannerlari bilan bir xil shart).
export function getDeliveryFee(deliveryId, subtotal) {
  const method = deliveryMethods.find((d) => d.id === deliveryId)
  if (!method) return 0
  if (method.id === 'standard' && subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return method.price
}

export const paymentMethods = [
  { id: 'click', name: 'Click', type: 'wallet', bg: 'bg-[#0596DE]' },
  { id: 'payme', name: 'Payme', type: 'wallet', bg: 'bg-[#00C4B3]' },
  { id: 'paynet', name: 'Paynet', type: 'wallet', bg: 'bg-[#F7941D]' },
  { id: 'uzcard', name: 'UZCARD', type: 'card', bg: 'bg-[#1D6FB8]' },
  { id: 'humo', name: 'HUMO', type: 'card', bg: 'bg-gradient-to-br from-[#7B2FF7] to-[#F72585]' },
  { id: 'visa', name: 'VISA', type: 'card', bg: 'bg-[#1A1F71]', italic: true },
  { id: 'mastercard', name: 'Mastercard', type: 'card', bg: 'bg-[#1b1b1e]', special: 'mastercard' },
]

export function findPaymentMethod(id) {
  return paymentMethods.find((m) => m.id === id) || null
}

// Karta raqamini "1234 5678 9012 3456" ko'rinishida formatlaydi
export function formatCardNumber(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

// Muddatni "AA/YY" ko'rinishida formatlaydi
export function formatExpiry(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

// Luhn algoritmi — karta raqami to'g'ri formatga mosligini tekshiradi.
// Demo maqsadida: to'g'ri (Luhn) raqam — muvaffaqiyatli to'lov, noto'g'ri raqam — rad etilgan to'lovni simulyatsiya qiladi.
export function isValidCardNumber(value) {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length < 13) return false
  let sum = 0
  let shouldDouble = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10)
    if (shouldDouble) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

export function generateOrderId() {
  return `NEONE-${Date.now().toString().slice(-8)}`
}
