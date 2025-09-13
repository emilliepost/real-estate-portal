import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // turn "bydleni-u-parku" into "Bydleni U Parku"
  const plain = decodeURIComponent(slug).replace(/-/g, " ")
  const name = plain.replace(/\b\w/g, (l) => l.toUpperCase())

  const project = {
    name,
    address: "Korunní 123, Praha 2",
    meta: ["12 jednotek", "1–4+kk", "2026"],
    description:
      "Popis projektu zatím testovací. Brzy napojíme reálná data a zobrazíme dostupné jednotky v tomto projektu.",
  }

  return (
    <main className="p-8 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link href="/">Domů</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{project.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <p className="text-muted-foreground">{project.address}</p>
        <div className="flex flex-wrap gap-2">
          {project.meta.map((m) => (<Badge key={m} variant="secondary">{m}</Badge>))}
        </div>
      </header>

      <section className="prose max-w-none">
        <p>{project.description}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Dostupné jednotky</h2>
        <p className="text-sm text-muted-foreground">Seznam jednotek bude napojen po zprovoznění databáze.</p>
      </section>
    </main>
  )
}
