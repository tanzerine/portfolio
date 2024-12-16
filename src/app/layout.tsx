import '@fontsource/press-start-2p'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TYL Portfolio',
  description: 'Portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}