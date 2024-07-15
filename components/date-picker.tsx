'use client'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function DatePicker() {
  const searchParams = useSearchParams()

  const date = searchParams.get('date')

  return (
    <nav className="flex items-center justify-center gap-2.5 h-full w-[20%]">
      <Link
        href={`/?date=${dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')}`}
      >
        <ChevronLeft size={16} />
      </Link>

      <p className="font-semibold text-[11px] text-zinc-700 dark:text-zinc-300">
        {dayjs(date).format('DD MMM')}
      </p>

      <Link href={`/?date=${dayjs(date).add(1, 'day').format('YYYY-MM-DD')}`}>
        <ChevronRight size={16} />
      </Link>
    </nav>
  )
}
