import { ListingGrid } from "@/components/listing-grid"
import { FiltersDialog } from "@/components/filters-dialog"
import { db } from "@/db/client"
import { projects, media } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"

function toCard(p: any, imageUrl?: string) {
  return {
    imageUrl: imageUrl ?? "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
    title: p.name,
    address: p.address,
    priceCzk: "ceny na dotaz",
    href: `/project/${p.slug}`,
    meta: [
      p.deliveryFrom && p.deliveryTo ? `${p.deliveryFrom}–${p.deliveryTo}` : p.deliveryFrom ?? p.deliveryTo ?? ""
    ].filter(Boolean),
    labels: ["Dostupné"],
  }
}

export default async function HomePage() {
  const rows = await db.select().from(projects).limit(12)
  const cards = []
  for (const p of rows) {
    const cover = await db.select().from(media)
      .where(and(eq(media.entityType, "project"), eq(media.entityId, p.id)))
      .limit(1)
    cards.push(toCard(p, cover[0]?.url))
  }

  return (
    <main className="p-8 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Real Estate Portal</h1>
          <Badge variant="secondary">{rows.length} projekt(y)</Badge>
        </div>
        <FiltersDialog />
      </header>

      <ListingGrid items={cards as any} />
    </main>
  )
}
