export function formatCzk(n?: string | number | null) {
  if (n == null) return "cena na dotaz"
  const num = typeof n === "string" ? Number(n) : n
  if (!isFinite(num)) return "cena na dotaz"
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(num)
}
