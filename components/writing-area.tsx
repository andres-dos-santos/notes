'use client'

import { KeyboardEvent, useRef } from 'react'

export function WritingArea() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  function onSubmitTitle(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      e.preventDefault()

      console.log(titleRef.current?.value)

      inputRef.current?.focus()
    }
  }

  return (
    <div className="mt-10 flex flex-col items-start h-[90%]">
      <input
        ref={titleRef}
        type="text"
        placeholder="Untitled"
        className="bg-white dark:bg-zinc-950/20 text-2xl font-bold placeholder:text-zinc-500 outline-none -tracking-wide"
        onKeyDown={(e) => onSubmitTitle(e)}
      />

      <textarea
        ref={inputRef}
        defaultValue="Tem que ver esse aula antes https://www.youtube.com/watch?v=-SDxID3BS4I"
        className="leading-7 mt-10 outline-none bg-white dark:bg-zinc-950/20 text-xs resize-none w-full h-full"
      />
    </div>
  )
}
