export default function FormField({ label, error, className = '', ...inputProps }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-white text-sm font-medium mb-1.5">{label}</span>}
      <input
        {...inputProps}
        className={`w-full bg-neone-card border rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-neone-muted outline-none transition-colors focus-ring ${
          error ? 'border-red-500' : 'border-neone-border focus:border-neone-accent'
        }`}
      />
      {error && <span className="block text-red-500 text-xs mt-1.5">{error}</span>}
    </label>
  )
}
