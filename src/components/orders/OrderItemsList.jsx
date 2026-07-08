import { formatSom } from '../../data/products'

export default function OrderItemsList({ items }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <img src={item.product.img} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover bg-neone-card shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
            <p className="text-neone-muted text-xs mt-0.5">
              {item.size ? `${item.size} \u00b7 ` : ''}
              {item.qty} dona
            </p>
          </div>
          <span className="text-white text-sm font-medium shrink-0">{formatSom(item.product.price * item.qty)}</span>
        </div>
      ))}
    </div>
  )
}
