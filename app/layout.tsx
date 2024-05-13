import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { Title, Description } from '../core/meta'

const font = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: Title,
  description: Description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
