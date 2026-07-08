import { formatSom } from '../../data/products'

export default function OrderRecap({
  items,
  subtotal,
  deliveryFee,
  ctaLabel,
  onCta,
  ctaDisabled = false,
  ctaLoading = false,
  ctaIcon: CtaIcon,
  note,
}) {
  const hasDelivery = typeof deliveryFee === 'number'
  const total = subtotal + (hasDelivery ? deliveryFee : 0)
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <aside className="bg-neone-panel border border-neone-border rounded-2xl p-5 h-fit lg:sticky lg:top-28">
      <h2 className="text-white font-bold mb-4">Buyurtma xulosasi</h2>

      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1 -mr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.product.img}
              alt={item.product.name}
              className="w-12 h-12 rounded-lg object-cover bg-neone-card shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-medium truncate">{item.product.name}</p>
              <p className="text-neone-muted text-[11px]">
                {item.size ? `${item.size} \u00b7 ` : ''}
                {item.qty} dona
              </p>
            </div>
            <span className="text-white text-xs font-medium shrink-0">{formatSom(item.product.price * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-neone-border mt-4 pt-4 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neone-muted">Mahsulotlar ({totalQty})</span>
          <span className="text-white">{formatSom(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neone-muted">Yetkazib berish</span>
          <span className="text-white">
            {!hasDelivery ? 'Keyingi bosqichda' : deliveryFee === 0 ? 'Bepul' : formatSom(deliveryFee)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-neone-border">
          <span className="text-white font-semibold">Jami</span>
          <span className="text-white font-bold text-base">{formatSom(total)}</span>
        </div>
      </div>

      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          disabled={ctaDisabled || ctaLoading}
          className="w-full mt-5 flex items-center justify-center gap-2 bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring disabled:opacity-60"
        >
          {ctaLoading ? (
            'Ishlov berilmoqda...'
          ) : (
            <>
              {CtaIcon && <CtaIcon size={18} />}
              {ctaLabel}
            </>
          )}
        </button>
      )}

      {note && <p className="text-neone-muted text-xs mt-3 text-center leading-relaxed">{note}</p>}
    </aside>
  )
}
