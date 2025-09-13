'use client'

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Img = { url: string; alt?: string }

export default function Gallery({ images }: { images: Img[] }) {
  const [i, setI] = React.useState(0)
  const safe = images.length > 0 ? images : [{ url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop" }]
  const cur = safe[Math.min(i, safe.length - 1)]

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden ring-1 ring-border">
        <Image src={cur.url} alt={cur.alt ?? "photo"} fill className="object-cover" sizes="100vw" priority />
      </div>
      {safe.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {safe.map((img, idx) => (
            <button
              key={img.url + idx}
              onClick={() => setI(idx)}
              className={cn(
                "relative h-20 w-32 shrink-0 rounded-md overflow-hidden ring-1 ring-border",
                idx === i && "ring-2 ring-foreground"
              )}
              aria-label={`photo ${idx + 1}`}
            >
              <Image src={img.url} alt={img.alt ?? "thumb"} fill className="object-cover" sizes="128px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
