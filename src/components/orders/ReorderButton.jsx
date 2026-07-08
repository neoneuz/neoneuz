import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function ReorderButton({ items, fullWidth = true, size = 'default' }) {
  const { addToCart } = useCart()
  const [status, setStatus] = useState('idle') // idle | loading | done

  async function handleReorder() {
    setStatus('loading')
    for (const item of items) {
      await addToCart(item.product, { color: item.color, size: item.size, qty: item.qty })
    }
    setStatus('done')
    setTimeout(() => setStatus('idle'), 2000)
  }

  const sizeClasses = size === 'sm' ? 'text-sm px-4 py-2.5' : 'text-sm px-5 py-3'

  return (
    <button
      onClick={handleReorder}
      disabled={status === 'loading'}
      className={`flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus-ring disabled:opacity-70 ${sizeClasses} ${
        fullWidth ? 'w-full' : ''
      } ${status === 'done' ? 'bg-white text-black' : 'bg-neone-accent text-black hover:brightness-95'}`}
    >
      {status === 'done' ? (
        <>
          <Check size={16} /> Qo'shildi
        </>
      ) : status === 'loading' ? (
        "Qo'shilmoqda..."
      ) : (
        <>
          <RotateCcw size={16} /> Qayta buyurtma berish
        </>
      )}
    </button>
  )
}
