export const dynamic = 'force-dynamic'

import { ListingGrid } from "@/components/listing-grid"
import { FiltersDialog } from "@/components/filters-dialog"
import { db } from "@/db/client"
import { projects, media, units } from "@/db/schema"
import { and, eq, ilike, gte, lte, sql, or } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"
import type { PropertyCardProps } from "@/components/property-card"
import { formatCzk } from "@/lib/format"

type SearchParams = Record<string, string | string[] | undefined>
type Row = {
  id: string
  name: string
  slug: string
  address: string
  deliveryFrom: number | null
  deliveryTo: number | null
  minPrice: string | null
  unitCount: number
  cover: string | null
}

function priceLabel(minPrice: string | null): string {
  return minPrice ? `od ${formatCzk(minPrice)}` : "ceny na dotaz"
}

function toCard(r: Row): PropertyCardProps {
  return {
    imageUrl: r.cover ?? "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
    title: r.name,
    address: r.address,
    priceCzk: priceLabel(r.minPrice),
    href: `/project/${r.slug}`,
    meta: [
      r.deliveryFrom && r.deliveryTo ? `${r.deliveryFrom}–${r.deliveryTo}` :
      (r.deliveryFrom ?? r.deliveryTo ?? "")
    ].filter(Boolean) as string[],
    labels: r.unitCount > 0 ? ["Dostupné"] : [],
  }
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const q = typeof sp.q === "string" ? sp.q.trim() : ""
  const layout = typeof sp.layout === "string" ? sp.layout : ""
  const minRaw = typeof sp.min === "string" ? sp.min : ""
  const maxRaw = typeof sp.max === "string" ? sp.max : ""
  const minVal = minRaw ? Number(minRaw) : undefined
  const maxVal = maxRaw ? Number(maxRaw) : undefined

  const conds = []

  if (q) {
    conds.push(or(ilike(projects.name, `%${q}%`), ilike(projects.address, `%${q}%`)))
  }
  if (layout) {
    conds.push(eq(units.layout, layout))
  }
  // NOTE: units.priceCzk is a NUMERIC column typed as string in Drizzle -> pass strings here
  if (minVal !== undefined) {
    conds.push(gte(units.priceCzk, String(minVal)))
  }
  if (maxVal !== undefined) {
    conds.push(lte(units.priceCzk, String(maxVal)))
  }

  const rows = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      address: projects.address,
      deliveryFrom: projects.deliveryFrom,
      deliveryTo: projects.deliveryTo,
      minPrice: sql<string | null>`min(${units.priceCzk})`,
      unitCount: sql<number>`count(${units.id})`,
      cover: sql<string | null>`max(${media.url})`,
    })
    .from(projects)
    .leftJoin(units, eq(units.projectId, projects.id))
    .leftJoin(media, and(eq(media.entityType, "project"), eq(media.entityId, projects.id)))
    .where(conds.length > 0 ? and(...conds) : undefined)
    .groupBy(projects.id)
    .limit(24)

  const cards: PropertyCardProps[] = rows.map(toCard)

  return (
    <main className="p-8 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Real Estate Portal</h1>
          <Badge variant="secondary">{rows.length} projekt(y)</Badge>
        </div>
        <FiltersDialog />
      </header>

      <ListingGrid items={cards} />
    </main>
  )
}
