'use client'

import { Suspense, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { toast } from 'sonner'
import { LoaderCircle, MenuIcon, Plus } from 'lucide-react'
import isToday from 'dayjs/plugin/isToday'

import { Header } from '@/components/header'
import { DatePicker } from '@/components/date-picker'
import { SaveMessage } from '@/components/save-message'
import { ThemeChanger } from '@/components/theme-changer'
import { Auth } from '@/components/auth'

import { supabase } from '@/data/supabase'

import { useSaveAfterKeydown } from '@/hooks/use-save-after-keydown'
import { getSession } from '../actions'

dayjs.extend(isToday)

const TODAY = dayjs().format('YYYY-MM-DD')

// const savedAsDraft = localStorage.getItem('preview-content')

interface Data {
  id: string
  html: string
  date: string
}

async function getContent(date: string) {
  const { data } = await supabase
    .from('notes')
    .select('id,html,date')
    .eq('date', date)

  return data ? data[0] : ({} as Data)
}

export default function Home(props: { searchParams: { from: string } }) {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
    content: '',
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

      toast('Unable to find publisher.')

      return
    }

    if (!data?.html) {
      const cookie = await getSession()

      await supabase
        .from('notes')
        .insert({ html, date: TODAY, user_id: cookie?.value })

      setLoading(false)

      return
    }

    // if (data?.html !== html || savedAsDraft === html) {
    if (data?.html !== html) {
      await supabase.from('notes').update({ html }).eq('id', data?.id)
    }

    setLoading(false)
  }

  useSaveAfterKeydown(handleSave)

  // useSaveLocalStorage(editor)

  useEffect(() => {
    if (editor) {
      editor.commands.clearContent()

      getContent(props.searchParams.from).then((data) => {
        if (data) {
          setData(data)

          if (data.html) editor.commands.insertContent(data.html)

          return
        }

        editor.commands.insertContent(
          `Oi Andres, hoje é dia ${dayjs(props.searchParams.from).format('DD [de] MMM')}, mantenha o foco...`,
        )
      })
    }
  }, [props.searchParams.from, editor])

  useEffect(() => {}, [])

  return (
    <div className="sm:max-w-[1240px] min-h-screen sm:min-h-[800px] sm:h-[800px] sm:mx-auto sm:w-[calc(100vw_-_24rem)] relative">
      <Header>
        <Auth />

        <Suspense>
          <DatePicker />
        </Suspense>

        <button className="group transition-all duration-200 hover:bg-zinc-200 hover:dark:bg-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 h-7 w-7 rounded-lg flex items-center justify-center border dark:border-zinc-800 hover:dark:border-zinc-700">
          <Plus size={14} />
        </button>

        <div className="flex items-center justify-end gap-5 w-[40%] ml-auto">
          <SaveMessage>
            {loading && <LoaderCircle className="animate-spin" size={14} />}
          </SaveMessage>

          <ThemeChanger />

          <MenuIcon size={18} />
        </div>
      </Header>

      <div className="flex-col items-center justify-center flex border dark:border-zinc-800 overflow-auto bg-zinc-100/50 dark:bg-zinc-900 relative rounded-lg">
        {editor ? (
          <EditorContent
            className="pb-5 px-10 pt-20 sm:w-full min-h-[800px] prose prose-p:text-[12.5px] prose-p:font-medium overflow-auto prose-zinc dark:prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
            editor={editor}
          />
        ) : null}
      </div>
    </div>
  )
}
