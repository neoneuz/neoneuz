import { getStatusMeta, getStatusBadgeClass } from '../../data/orders'

export default function OrderStatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md ${getStatusBadgeClass(status)} ${className}`}
    >
      {getStatusMeta(status).label}
    </span>
  )
}
