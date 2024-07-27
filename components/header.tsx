import { ReactNode } from 'react'

export function Header({ children }: { children: ReactNode }) {
  return (
    <header className="relative w-full bg-white dark:bg-zinc-950 flex items-center gap-4 px-5 h-16 sm:h-10">
      {children}
    </header>
  )
}
