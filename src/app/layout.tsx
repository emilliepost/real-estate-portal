import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = { title: "Real Estate Portal" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
