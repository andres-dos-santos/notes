import { Heart, Notebook, Plus, ScrollText, Trash2 } from 'lucide-react'
import Link from 'next/link'

export function Menu() {
  return (
    <aside className="w-96 h-full bg-zinc-100 dark:bg-zinc-800/50 p-5 flex flex-col justify-between">
      <ul className="mt-10">
        <li className="flex items-center gap-5 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-12 rounded-md px-5 cursor-pointer">
          <ScrollText size={18} />
          <p className="text-[13px]">All Notes</p>
        </li>

        <li className="flex items-center gap-5 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-12 rounded-md px-5 cursor-pointer">
          <Notebook size={18} />
          <p className="text-[13px]">Notebook</p>
        </li>

        <li className="flex items-center gap-5 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-12 rounded-md px-5 cursor-pointer">
          <Heart size={18} />
          <p className="text-[13px]">Favorite</p>
        </li>

        <li className="flex items-center gap-5 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-12 rounded-md px-5 cursor-pointer">
          <Trash2 size={18} />
          <p className="text-[13px]">Deleted</p>
        </li>
      </ul>

      <Link href="/create">
        <button className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-zinc-950 cursor-pointer">
          <Plus size={20} />
        </button>
      </Link>
    </aside>
  )
}
