import { useState } from 'react'
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { formatSom } from '../data/products'
import { FREE_SHIPPING_THRESHOLD } from '../data/checkout'
import { useCart } from '../context/CartContext'
import OrderRecap from '../components/checkout/OrderRecap'
import EmptyState from '../components/EmptyState'

export default function Cart({ onBack, onSelectProduct, onCheckout }) {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart()
  const [removingId, setRemovingId] = useState(null)

  async function handleRemove(id) {
    setRemovingId(id)
    await removeFromCart(id)
    setRemovingId(null)
  }

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Savat</h1>
        {items.length > 0 && <span className="text-neone-muted text-sm">({items.length} ta mahsulot)</span>}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Savatingiz bo'sh"
          message="Yoqtirgan mahsulotlaringizni savatga qo'shing va xaridni davom ettiring"
          ctaLabel="Xarid qilishni boshlash"
          onCta={onBack}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="flex flex-col gap-4">
            {remainingForFreeShipping > 0 && (
              <div className="bg-neone-panel border border-neone-border rounded-xl px-4 py-3 text-sm text-neone-muted">
                Yana <span className="text-neone-accent font-medium">{formatSom(remainingForFreeShipping)}</span>lik xarid
                qiling — yetkazib berish bepul bo'ladi
              </div>
            )}

            {items.map((item) => (
              <div key={item.id} className="bg-neone-panel border border-neone-border rounded-2xl p-4 flex gap-4">
                <button
                  onClick={() => onSelectProduct(item.product)}
                  className="shrink-0 focus-ring rounded-xl overflow-hidden"
                  aria-label={item.product.name}
                >
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-neone-card"
                  />
                </button>

                <div className="min-w-0 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => onSelectProduct(item.product)} className="text-left focus-ring min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removingId === item.id}
                      aria-label="Savatdan o'chirish"
                      className="shrink-0 text-neone-muted hover:text-red-400 focus-ring disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {item.color && (
                      <span
                        className="w-3 h-3 rounded-full border border-neone-border inline-block shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    {item.size && <span className="text-neone-muted text-xs">{item.size}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex items-center gap-1 border border-neone-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        aria-label="Sonini kamaytirish"
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-neone-accent focus-ring disabled:opacity-40"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-white text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        aria-label="Sonini oshirish"
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-neone-accent focus-ring"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-white font-semibold text-sm">{formatSom(item.product.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <OrderRecap items={items} subtotal={subtotal} ctaLabel="Buyurtmani rasmiylashtirish" onCta={onCheckout} />
        </div>
      )}
    </main>
  )
}
