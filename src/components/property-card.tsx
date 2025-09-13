import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type PropertyCardProps = {
  imageUrl: string
  title: string
  address: string
  priceCzk: string
  href?: string
  meta?: string[]
  labels?: string[]
}

export function PropertyCard({ imageUrl, title, address, priceCzk, meta = [], labels = [], href }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[16/10]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {labels.map((l) => (
            <Badge key={l} className="bg-black/70 text-white hover:bg-black">{l}</Badge>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold leading-tight line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{address}</p>

        {meta.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {meta.map((m) => (
              <Badge key={m} variant="secondary">{m}</Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3">
          <div className="text-base font-semibold">{priceCzk}</div>
          {href ? (
            <Button asChild size="sm"><Link href={href}>Detail</Link></Button>
          ) : (
            <Button size="sm" disabled>Detail</Button>
          )}
        </div>
      </div>
    </Card>
  )
}
