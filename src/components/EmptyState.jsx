export default function EmptyState({ icon: Icon, title, message, ctaLabel, onCta }) {
  return (
    <div className="bg-neone-panel border border-neone-border rounded-2xl p-10 text-center">
      {Icon && <Icon size={28} className="text-neone-muted mx-auto mb-3" />}
      <p className="text-white font-medium">{title}</p>
      {message && <p className="text-neone-muted text-sm mt-1">{message}</p>}
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-5 inline-flex items-center gap-2 bg-neone-accent text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:brightness-95 focus-ring"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
