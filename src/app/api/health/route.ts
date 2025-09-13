import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error("DATABASE_URL missing")
    const sql = neon(url)
    const rows = await sql/* sql */`select current_database() as db, current_user as usr;`
    return NextResponse.json({ ok: true, db: rows[0]?.db, user: rows[0]?.usr })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? String(e) }, { status: 500 })
  }
}
