import { User } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getUserEmail } from '@/app/actions'

export function Avatar() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    getUserEmail().then((value) => setName(value ? value.slice(0, 2) : null))
  }, [])

  return name ? (
    <span className="text-[11px] font-medium uppercase">{name}</span>
  ) : (
    <User size={15} />
  )
}
