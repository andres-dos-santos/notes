'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import dayjs from 'dayjs'
import { LoaderCircle, MenuIcon } from 'lucide-react'
import isToday from 'dayjs/plugin/isToday'
import { toast } from 'sonner'

import { supabase } from '@/data/supabase'

import { useSaveLocalStorage } from '@/hooks/use-save-local-storage'
import { useSaveAfterKeydown } from '@/hooks/use-save-after-keydown'

import { ThemeChanger } from './theme-changer'
import { DatePicker } from './date-picker'

dayjs.extend(isToday)

const TODAY = dayjs().format('YYYY-MM-DD')

const savedAsDraft = localStorage.getItem('preview-content')

export function Editor(props: {
  html: string | undefined
  id: string | undefined
}) {
  const [loading, setLoading] = useState(false)

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

  async function handleSave() {
    setLoading(true)

    const html = editor?.getHTML()

    if (!html) {
      setLoading(false)

      toast(`Unable to find publisher.`)

      return
    }

    if (!props.html) {
      await supabase.from('notes').insert({ html, date: TODAY })

      return
    }

    if (props.html !== html || savedAsDraft === html) {
      await supabase.from('notes').update({ html }).eq('id', props?.id)
    }

    setLoading(false)
  }

  useSaveAfterKeydown(handleSave)

  useSaveLocalStorage(editor)

  return (
    <>
      <header className="absolute top-0 w-full bg-zinc-200 dark:bg-zinc-800 z-10 flex items-center px-5 h-10 border-b dark:border-zinc-800 justify-between">
        <div className="w-[40%]">
          <strong className="font-medium text-[11px] text-zinc-700 dark:text-zinc-300">
            Welcome back
          </strong>
        </div>

        <DatePicker />

        <div className="flex items-center justify-end gap-5 w-[40%]">
          <div className="flex items-center justify-center gap-2.5">
            {loading && <LoaderCircle className="animate-spin" size={14} />}
            <p className="text-[10px] tracking-wide font-medium text-zinc-500 dark:text-zinc-400">
              CTRL + S to save
            </p>
          </div>

          <ThemeChanger />

          <MenuIcon size={18} />
        </div>
      </header>

      <EditorContent
        className="pb-5 px-10 pt-20 w-full min-h-[800px] prose prose-p:text-xs prose-p:font-medium overflow-auto prose-zinc dark:prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
        editor={editor}
      />
    </>
  )
}
