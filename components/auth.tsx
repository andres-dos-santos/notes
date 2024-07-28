import { ArrowUpRight } from 'lucide-react'
import { FormEvent, useRef, useState } from 'react'

import { Avatar } from './avatar'

import { supabase } from '@/data/supabase'

import { setSession } from '@/app/actions'

export function Auth() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (emailRef.current && passwordRef.current) {
      const { value: email } = emailRef.current
      const { value: password } = passwordRef.current

      const { data } = await supabase.auth.signUp({ email, password })

      if (data.session) setSession(data.session)
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>
        <Avatar />
      </button>

      <aside
        data-open={open}
        className="group h-[795px] absolute top-[43px] left-1 rounded-l-[6px] bg-zinc-800/20 backdrop-blur-xl data-[open=true]:border z-50 w-0 transition-all duration-300 data-[open=true]:w-96"
      >
        <div className="transition-all duration-100 group-data-[open=true]:duration-1000 opacity-0 group-data-[open=true]:opacity-100 p-5 mt-10">
          <h1 className="text-xl -tracking-wider truncate">Notes</h1>

          <p className="text-[13px] -tracking-wide my-5 truncate">
            Be free to think anything
          </p>

          <form action="" onSubmit={onSubmit}>
            <label htmlFor="">
              <input
                ref={emailRef}
                type="text"
                className="text-[13px] h-8 w-full bg-zinc-100 dark:bg-zinc-900/50 outline-none px-2.5 border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 -tracking-wide"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label htmlFor="">
              <input
                ref={passwordRef}
                type="password"
                className="text-[13px] mt-2.5 h-8 w-full bg-zinc-100 dark:bg-zinc-900/50 outline-none px-2.5 border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 -tracking-wide"
                placeholder="your secret password"
              />
            </label>

            <button
              type="submit"
              className="mt-5 text-sm h-8 w-full bg-zinc-800 dark:bg-white outline-none px-2.5 border border-white transition-all duration-300 -tracking-wide flex items-center justify-center hover:ring-2 hover:ring-zinc-200/50"
            >
              <ArrowUpRight
                size={16}
                className="text-white dark:text-zinc-900"
              />

              <p className="text-[13px] font-medium text-white dark:text-zinc-900">
                Let's go
              </p>
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}

/** <Sheet>
      <SheetTrigger>
        <User size={15} />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="p-5 mt-10">
          <h1 className="text-xl -tracking-wider">
            Welcome to Notes, make your ideas come to life
          </h1>

          <p className="text-sm font-medium -tracking-wide text-zinc-500 dark:text-zinc-400 my-10">
            At Notes, we believe that keeping things simple in your everyday
            life helps reduce anxiety and stress in a busy world.
          </p>

          <form action="" onSubmit={onSubmit}>
            <label htmlFor="">
              <input
                ref={emailRef}
                type="text"
                className="text-sm h-10 w-full bg-zinc-100 dark:bg-zinc-800 outline-none px-2.5 border focus:border-zinc-500 -tracking-wide"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label htmlFor="" className="mt-5 flex flex-col">
              <input
                ref={passwordRef}
                type="password"
                className="text-sm h-10 w-full bg-zinc-100 dark:bg-zinc-800 outline-none px-2.5 border focus:border-zinc-500 -tracking-wide"
                placeholder="Your secret password"
              />
            </label>

            <button
              type="submit"
              className="mt-5 text-sm h-10 w-full bg-zinc-800 dark:bg-white outline-none px-2.5 border -tracking-wide flex items-center justify-center"
            >
              <p className="text-xs font-medium text-white dark:text-zinc-900">
                Let's go
              </p>
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet> */
