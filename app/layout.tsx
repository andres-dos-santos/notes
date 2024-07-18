import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

import { cn } from '@/lib/utils'

import './globals.css'
import { ThemeProvider } from 'next-themes'

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
          'min-h-screen bg-background font-sans antialiased flex items-center justify-center',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class">
          <div className="sm:max-w-[1240px] min-h-screen sm:min-h-[800px] sm:h-[800px] sm:mx-auto flex-col items-center justify-center flex border dark:border-zinc-800 shadow-lg dark:shadow-zinc-900 sm:w-[calc(100vw_-_24rem)] overflow-auto bg-zinc-100/50 rounded-md dark:rounded-none dark:bg-zinc-900 relative">
            {children}
          </div>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  )
}
