import { LoaderCircle, MenuIcon } from 'lucide-react'
import { Suspense } from 'react'

import { DatePicker } from './date-picker'
import { ThemeChanger } from './theme-changer'

export function Header({ loading }: { loading: boolean }) {
  return (
    <header className="absolute top-0 w-full bg-zinc-200 dark:bg-zinc-800 z-10 flex items-center px-5 h-16 sm:h-10 border-b dark:border-zinc-800 justify-between">
      <div className="hidden sm:flex w-[40%]">
        <strong className="font-medium text-[11px] text-zinc-700 dark:text-zinc-300">
          Welcome back
        </strong>
      </div>

      <Suspense>
        <DatePicker />
      </Suspense>

      <div className="flex items-center justify-end gap-5 w-[40%]">
        <div className="hidden sm:flex items-center justify-center gap-2.5">
          {loading && <LoaderCircle className="animate-spin" size={14} />}
          <p className="text-[10px] tracking-wide font-medium text-zinc-500 dark:text-zinc-400">
            CTRL + S to save
          </p>
        </div>

        <ThemeChanger />

        <MenuIcon size={18} />
      </div>
    </header>
  )
}
