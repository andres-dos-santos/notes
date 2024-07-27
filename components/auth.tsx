import { User } from 'lucide-react'
import { FormEvent, useRef } from 'react'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

import { supabase } from '@/data/supabase'

export function Auth() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (emailRef.current && passwordRef.current) {
      const { value: email } = emailRef.current
      const { value: password } = passwordRef.current

      const { data } = await supabase.auth.signUp({ email, password })

      console.log(data)
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <User size={15} />
      </SheetTrigger>

      <SheetContent>
        <div className="p-5 mt-10">
          <h1 className="text-lg italic">
            Welcome to Notes, make your ideas come to life
          </h1>

          <p className="text-[13px] font-medium -tracking-wide text-zinc-400 dark:text-zinc-500 my-10">
            At Notes, we believe that keeping things simple in your everyday
            life helps reduce anxiety and stress in a busy world.
          </p>

          <form action="" onSubmit={onSubmit}>
            <label htmlFor="">
              <input
                ref={emailRef}
                type="text"
                className="text-sm h-10 w-full bg-zinc-100 outline-none px-2.5 border focus:border-zinc-500 -tracking-wide"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label htmlFor="" className="mt-5 flex flex-col">
              <input
                ref={passwordRef}
                type="password"
                className="text-sm h-10 w-full bg-zinc-100 outline-none px-2.5 border focus:border-zinc-500 -tracking-wide"
                placeholder="Your secret password"
              />
            </label>

            <button
              type="submit"
              className="mt-5 text-sm h-10 w-full bg-zinc-800 outline-none px-2.5 border -tracking-wide flex items-center justify-center"
            >
              <p className="text-xs font-medium text-white">Let's go</p>
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
