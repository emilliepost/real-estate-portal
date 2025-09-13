import 'dotenv/config'
import { db } from '../src/db/client'
import { projects, units, media } from '../src/db/schema'

async function main() {
  // insert projects
  const inserted = await db.insert(projects).values([
    { name: 'Rezidence Vinohrady', slug: 'rezidence-vinohrady', address: 'Korunní 123, Praha 2', deliveryFrom: 2025, deliveryTo: 2026 },
    { name: 'Bydlení u parku', slug: 'bydleni-u-parku', address: 'Na Švihance, Praha 3', deliveryFrom: 2025, deliveryTo: 2025 },
  ]).returning({ id: projects.id, slug: projects.slug })

  const vino = inserted.find(p => p.slug === 'rezidence-vinohrady')!
  const park = inserted.find(p => p.slug === 'bydleni-u-parku')!

  // insert a few units
  await db.insert(units).values([
    { projectId: vino.id, unitNumber: 'A1', layout: '2+kk', floor: 2, areaM2: '58', priceCzk: '7990000' },
    { projectId: vino.id, unitNumber: 'A2', layout: '3+kk', floor: 3, areaM2: '72', priceCzk: '9250000' },
    { projectId: park.id, unitNumber: 'B1', layout: '1+kk', floor: 1, areaM2: '35', priceCzk: '5650000' },
  ])

  // cover images for projects
  await db.insert(media).values([
    { entityType: 'project', entityId: vino.id, url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop', kind: 'image' },
    { entityType: 'project', entityId: park.id, url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop', kind: 'image' },
  ])

  console.log('Seed complete.')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
