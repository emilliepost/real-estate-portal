'use client'

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

function getString(sp: URLSearchParams, key: string): string {
  const v = sp.get(key)
  return v ?? ""
}

export function FiltersDialog() {
  const router = useRouter()
  const sp = useSearchParams()
  const current = React.useMemo(() => new URLSearchParams(sp.toString()), [sp])

  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState<string>(getString(current, "q"))
  const [layout, setLayout] = React.useState<string>(getString(current, "layout"))
  const [min, setMin] = React.useState<string>(getString(current, "min"))
  const [max, setMax] = React.useState<string>(getString(current, "max"))

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (layout) params.set("layout", layout)
    if (min) params.set("min", min)
    if (max) params.set("max", max)
    const qs = params.toString()
    router.push(qs ? `/?${qs}` : "/")
    setOpen(false)
  }

  function onClear() {
    setQ("")
    setLayout("")
    setMin("")
    setMax("")
    router.push("/")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filtry</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtry</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="q">Hledat (projekt/adresa)</Label>
            <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="např. Vinohrady, Hostivař…" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Dispozice</Label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger><SelectValue placeholder="Vyberte" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nezáleží</SelectItem>
                  <SelectItem value="1+kk">1+kk</SelectItem>
                  <SelectItem value="2+kk">2+kk</SelectItem>
                  <SelectItem value="3+kk">3+kk</SelectItem>
                  <SelectItem value="4+kk">4+kk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min">Cena od (Kč)</Label>
              <Input id="min" inputMode="numeric" pattern="[0-9]*" value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} placeholder="5000000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max">Cena do (Kč)</Label>
              <Input id="max" inputMode="numeric" pattern="[0-9]*" value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} placeholder="10000000" />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit">Použít</Button>
            <Button type="button" variant="ghost" onClick={onClear}>Vymazat</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
