import { LoaderCircle, MenuIcon, Plus, User } from 'lucide-react'
import { Suspense } from 'react'

import { DatePicker } from './date-picker'
import { ThemeChanger } from './theme-changer'

export function Header({ loading }: { loading: boolean }) {
  return (
    <header className="w-full bg-white dark:bg-zinc-950 flex items-center gap-4 px-5 h-16 sm:h-10">
      <User size={15} />

      <Suspense>
        <DatePicker />
      </Suspense>

      <button className="group transition-all duration-200 hover:bg-zinc-200 hover:dark:bg-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 h-7 w-7 rounded-lg flex items-center justify-center border dark:border-zinc-800 hover:dark:border-zinc-700">
        <Plus size={14} />
      </button>

      <div className="flex items-center justify-end gap-5 w-[40%] ml-auto">
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
