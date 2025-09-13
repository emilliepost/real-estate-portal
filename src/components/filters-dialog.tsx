"use client"

import * as React from "react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Calendar } from "@/components/ui/calendar"

export function FiltersDialog() {
  const [open, setOpen] = React.useState(false)
  const [fromDate, setFromDate] = React.useState<Date | undefined>()
  const [toDate, setToDate] = React.useState<Date | undefined>()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filtry</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Filtry</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Row 1: Location + Property type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Zadejte lokalitu</label>
              <Input placeholder="Praha" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Typ nemovitosti</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Vyberte" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Byt</SelectItem>
                  <SelectItem value="house">Dům</SelectItem>
                  <SelectItem value="land">Pozemek</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Price + Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cena, od–do (Kč)</label>
              <div className="flex gap-2">
                <Input placeholder="Min" type="number" inputMode="numeric" />
                <Input placeholder="Max" type="number" inputMode="numeric" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Výmera, od–do (m²)</label>
              <div className="flex gap-2">
                <Input placeholder="Min" type="number" inputMode="numeric" />
                <Input placeholder="Max" type="number" inputMode="numeric" />
              </div>
            </div>
          </div>

          {/* Row 3: Dispositions */}
          <div>
            <label className="block text-sm font-medium mb-2">Dispozice</label>
            <ToggleGroup type="multiple" className="flex flex-wrap gap-2">
              {["1+kk","1+1","2+kk","2+1","3+kk","3+1","4+kk","4+1","Jiné"].map((v) => (
                <ToggleGroupItem key={v} value={v} className="px-3">
                  {v}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Row 4: Move-in dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">K nastěhování od</label>
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} className="rounded-md border" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">K nastěhování do</label>
              <Calendar mode="single" selected={toDate} onSelect={setToDate} className="rounded-md border" />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setOpen(false)}>Zrušit filtry</Button>
            <Button onClick={() => setOpen(false)}>Zobrazit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
