import Link from "next/link"
import Image from "next/image"
import { db } from "@/db/client"
import { projects, units, media } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { formatCzk } from "@/lib/format"

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const proj = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
  if (proj.length === 0) {
    return (
      <main className="p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Projekt nenalezen</h1>
        <p className="text-muted-foreground">Zkontrolujte adresu URL.</p>
        <Link href="/" className="underline">Zpět na přehled</Link>
      </main>
    )
  }
  const p = proj[0]

  const images = await db.select().from(media)
    .where(and(eq(media.entityType, "project"), eq(media.entityId, p.id)))

  const list = await db.select().from(units)
    .where(eq(units.projectId, p.id))

  return (
    <main className="p-8 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link href="/">Domů</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{p.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* cover */}
      {images[0]?.url && (
        <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden ring-1 ring-border">
          <Image
            src={images[0].url}
            alt={p.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{p.name}</h1>
        <p className="text-muted-foreground">{p.address}</p>
        <div className="flex flex-wrap gap-2">
          {p.deliveryFrom && p.deliveryTo && <Badge variant="secondary">{p.deliveryFrom}–{p.deliveryTo}</Badge>}
          {p.deliveryFrom && !p.deliveryTo && <Badge variant="secondary">{p.deliveryFrom}</Badge>}
          {!p.deliveryFrom && p.deliveryTo && <Badge variant="secondary">{p.deliveryTo}</Badge>}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Dostupné jednotky</h2>
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">Žádné jednotky zatím neevidujeme.</p>
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Číslo</TableHead>
                  <TableHead>Dispozice</TableHead>
                  <TableHead>Podlaží</TableHead>
                  <TableHead>Výmera (m²)</TableHead>
                  <TableHead className="text-right">Cena</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.unitNumber ?? "-"}</TableCell>
                    <TableCell>{u.layout ?? "-"}</TableCell>
                    <TableCell>{u.floor ?? "-"}</TableCell>
                    <TableCell>{u.areaM2 ?? "-"}</TableCell>
                    <TableCell className="text-right">{formatCzk(u.priceCzk as any)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </main>
  )
}
