import dayjs from 'dayjs'
import { ArrowUpRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="p-10 relative h-[calc(100%_-_80px)]">
      <h1 className="font-bold text-2xl font-urbanist">All Notes</h1>

      <ul className="mt-10 grid grid-cols-3 gap-5">
        <li className="bg-zinc-800/50 h-24 group p-5 relative flex rounded flex-col gap-5 items-start cursor-pointer transition-all duration-300 hover:bg-zinc-700/30">
          <p className="text-[10px] text-zinc-400 font-medium">
            {dayjs().format('YYYY, MMM DD')}
          </p>

          <p className="text-xs group-hover:text-white">It was a good day</p>

          <ArrowUpRight
            size={14}
            className="absolute bottom-2.5 right-2.5 transition-all duration-300 opacity-0 translate-y-2.5 -translate-x-2.5 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </li>
      </ul>

      <div className="absolute bottom-0 right-0 left-0 z-10 w-full h-[200px] bg-gradient-to-t from-zinc-950 via-zinc-900"></div>
    </div>
  )
}
