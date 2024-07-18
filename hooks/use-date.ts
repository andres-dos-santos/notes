import dayjs from 'dayjs'
import { create } from 'zustand'

type Store = {
  date: string
  setDate: (date: string) => void
}

export const useDate = create<Store>()((set) => ({
  date: dayjs().format('YYYY-MM-DD'),
  setDate: (date) => set(() => ({ date })),
}))
