import 'dotenv/config'
import { db } from '../src/db/client'
import { projects, units, media } from '../src/db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const rows = await db.select().from(projects)
  const vino = rows.find(r => r.slug === 'rezidence-vinohrady')
  const park = rows.find(r => r.slug === 'bydleni-u-parku')

  if (vino) {
    await db.insert(media).values([
      { entityType: 'project', entityId: vino.id, url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop' },
      { entityType: 'project', entityId: vino.id, url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop' },
    ])
    await db.insert(units).values([
      { projectId: vino.id, unitNumber: 'A3', layout: '2+kk', floor: 4, areaM2: '61', priceCzk: '8450000', status: 'reserved' },
      { projectId: vino.id, unitNumber: 'A4', layout: '3+kk', floor: 5, areaM2: '78', priceCzk: '9890000', status: 'sold' },
    ])
  }

  if (park) {
    await db.insert(media).values([
      { entityType: 'project', entityId: park.id, url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop' },
      { entityType: 'project', entityId: park.id, url: 'https://images.unsplash.com/photo-1560448075-bb4caa6cfc2c?q=80&w=1600&auto=format&fit=crop' },
    ])
    await db.insert(units).values([
      { projectId: park.id, unitNumber: 'B2', layout: '2+kk', floor: 2, areaM2: '49', priceCzk: '6750000', status: 'available' },
      { projectId: park.id, unitNumber: 'B3', layout: '3+kk', floor: 3, areaM2: '70', priceCzk: '8990000', status: 'reserved' },
    ])
  }

  console.log('Extra media + units inserted.')
}
main().then(()=>process.exit(0)).catch((e)=>{ console.error(e); process.exit(1) })
