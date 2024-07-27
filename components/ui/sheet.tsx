import { createContext, ReactNode, useContext, useState } from 'react'

const SheetContext = createContext(
  {} as { open: boolean; setOpen(open: boolean): void },
)

export function Sheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetContent({ children }: { children: ReactNode }) {
  const { open } = useContext(SheetContext)

  return (
    <aside
      data-open={open}
      className="group w-0 data-[open=true]:border-r data-[open=true]:w-96 transition-[width] duration-300 absolute top-10 left-0 rounded-l-lg h-[802px] bg-background z-50"
    >
      <div className="opacity-0 group-data-[open=true]:opacity-100 transition-opacity duration-100">
        {children}
      </div>
    </aside>
  )
}

export function SheetTrigger({ children }: { children: ReactNode }) {
  const { open, setOpen } = useContext(SheetContext)

  return <button onClick={() => setOpen(!open)}>{children}</button>
}
