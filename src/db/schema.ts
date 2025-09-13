import { pgTable, text, timestamp, numeric, integer, uuid } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  address: text('address').notNull(),
  district: text('district'),
  municipality: text('municipality'),
  lat: numeric('lat', { precision: 10, scale: 6 }),
  lng: numeric('lng', { precision: 10, scale: 6 }),
  deliveryFrom: integer('delivery_from'),
  deliveryTo: integer('delivery_to'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const units = pgTable('units', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  unitNumber: text('unit_number'),
  layout: text('layout'),
  floor: integer('floor'),
  areaM2: numeric('area_m2', { precision: 10, scale: 2 }),
  balconyM2: numeric('balcony_m2', { precision: 10, scale: 2 }),
  gardenM2: numeric('garden_m2', { precision: 10, scale: 2 }),
  priceCzk: numeric('price_czk', { precision: 14, scale: 2 }),
  status: text('status').$type<'available'|'reserved'|'sold'>().default('available'),
  urlToSource: text('url_to_source'),
  lastSeenAt: timestamp('last_seen_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: text('entity_type').notNull(), // 'project' | 'unit'
  entityId: uuid('entity_id').notNull(),
  url: text('url').notNull(),
  kind: text('kind').$type<'image'|'plan'>().default('image'),
  createdAt: timestamp('created_at').defaultNow(),
})
