import { PropertyCard, type PropertyCardProps } from "@/components/property-card"

export function ListingGrid({ items }: { items: PropertyCardProps[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <PropertyCard key={i} {...it} />
      ))}
    </div>
  )
}
