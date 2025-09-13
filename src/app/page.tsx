import { FiltersDialog } from "@/components/filters-dialog"
import { ListingGrid } from "@/components/listing-grid"

const MOCKS = [
  {
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    title: "Rezidence Vinohrady",
    address: "Korunní 123, Praha 2",
    priceCzk: "od 7 990 000 Kč",
    meta: ["12 jednotek", "1–4+kk", "2026"],
    labels: ["Nové", "Dostupné"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    title: "Bydlení u parku",
    address: "Na Švihance, Praha 3",
    priceCzk: "od 6 450 000 Kč",
    meta: ["8 jednotek", "1–3+kk", "2025"],
    labels: ["Nové"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
    title: "Riverfront",
    address: "Nábřeží 7, Praha 8",
    priceCzk: "od 9 200 000 Kč",
    meta: ["20 jednotek", "2–4+kk", "2026"],
    labels: ["Dostupné"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    title: "Sluneční dvůr",
    address: "Pod Lesem 4, Praha-západ",
    priceCzk: "od 5 900 000 Kč",
    meta: ["10 jednotek", "1–3+kk", "2025"],
    labels: [],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop",
    title: "Urban Loft",
    address: "Karlínské nám., Praha 8",
    priceCzk: "od 10 500 000 Kč",
    meta: ["6 jednotek", "2–4+kk", "2025"],
    labels: ["Nové"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1600&auto=format&fit=crop",
    title: "Zahrady Hostivař",
    address: "K Hrázi 15, Praha 10",
    priceCzk: "od 6 990 000 Kč",
    meta: ["14 jednotek", "1–3+kk", "2026"],
    labels: [],
  },
]

export default function HomePage() {
  return (
    <main className="p-8 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Real Estate Portal</h1>
        <FiltersDialog />
      </header>

      <ListingGrid items={MOCKS} />
    </main>
  )
}
