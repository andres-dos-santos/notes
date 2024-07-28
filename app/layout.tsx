import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

import './globals.css'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Notes app',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex items-center justify-center overflow-hidden',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class">
          <div className="flex items-center justify-center">{children}</div>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  )
}
