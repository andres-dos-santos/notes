'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState } from 'react'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight, LoaderCircle, MenuIcon } from 'lucide-react'
import isToday from 'dayjs/plugin/isToday'

import { supabase } from '@/data/supabase'

dayjs.extend(isToday)

let interval: NodeJS.Timeout

// async function getContent() {
//   // PEGAR O CONTEÚDO DO DIA
//   const html = localStorage.getItem('preview-content')

//   await supabase.from('notes').insert({ html })
// }

const TODAY = dayjs().format('YYYY-MM-DD')

async function saveContent(textHtml: string) {
  await supabase.from('notes').insert({ html: textHtml, date: TODAY })
}

async function updateContent(textHtml: string) {
  await supabase.from('notes').update({ html: textHtml }).eq('date', TODAY)
}

export function Editor(props: { html: string | undefined }) {
  const [loading, setLoading] = useState(false)
  const [daysAhead, setDaysAhead] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Untitled' }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content:
      props.html ||
      `Oi Andres, hoje é dia ${dayjs().format('DD [de] MMM')}, mantenha o foco...`,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  useEffect(() => {
    interval = setInterval(() => {
      if (editor) localStorage.setItem('preview-content', editor.getHTML())
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [editor])

  const date = dayjs().add(daysAhead, 'day').format('MMM DD')

  const formattedDate = date === dayjs().format('MMM DD') ? 'Today' : date

  return (
    <>
      <header className="absolute top-0 w-full bg-zinc-800 z-10 flex items-center px-5 h-10 border-b dark:border-zinc-800 justify-between">
        <strong className="font-medium text-[11px] text-zinc-300">
          Welcome back
        </strong>

        <nav className="flex items-center justify-center gap-2.5 flex-1">
          <button onClick={() => setDaysAhead((prev) => prev - 1)}>
            <ChevronLeft size={16} />
          </button>

          <p className="font-semibold text-[11px] text-zinc-300">
            {formattedDate}
          </p>

          <button onClick={() => setDaysAhead((prev) => prev + 1)}>
            <ChevronRight size={16} />
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            disabled={!editor}
            onClick={() => {
              setLoading(true)

              props.html
                ? updateContent(editor!.getHTML()).finally(() =>
                    setLoading(false),
                  )
                : saveContent(editor!.getHTML()).finally(() =>
                    setLoading(false),
                  )
            }}
            className="disabled:cursor-not-allowed disabled:text-blue-800 text-blue-500"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={14} />
            ) : (
              <p className="text-[9px] tracking-wide font-semibold">SAVE</p>
            )}
          </button>

          <MenuIcon size={18} />
        </div>
      </header>

      <EditorContent
        className="pb-5 pt-20 w-full min-h-[800px] prose prose-p:text-xs prose-p:font-medium overflow-auto prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
        editor={editor}
      />
    </>
  )
}
