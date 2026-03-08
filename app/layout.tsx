import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsonshift.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  title: 'JSONShift – Free Online JSON, CSV, YAML, XML & TOML Converter',
  description: 'Convert between JSON, CSV, YAML, XML, and TOML instantly. Free online data format converter. No signup required. All conversions happen in your browser.',
  keywords: ['json converter', 'csv to json', 'json to csv', 'yaml converter', 'xml to json', 'toml converter', 'data format converter'],
  openGraph: {
    title: 'JSONShift – Free Online JSON, CSV, YAML, XML & TOML Converter',
    description: 'Convert between JSON, CSV, YAML, XML, and TOML instantly. Free online data format converter. No signup required.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JSONShift – Free Online JSON, CSV, YAML, XML & TOML Converter',
    description: 'Convert between JSON, CSV, YAML, XML, and TOML instantly. Free online data format converter.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
