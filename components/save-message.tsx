import { ReactNode } from 'react'

export function SaveMessage({ children }: { children: ReactNode }) {
  return (
    <div className="hidden sm:flex items-center justify-center gap-2.5">
      {children}
      <p className="text-[10px] tracking-wide font-medium text-zinc-500 dark:text-zinc-400">
        CTRL + S to save
      </p>
    </div>
  )
}
