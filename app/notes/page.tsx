'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { toast } from 'sonner'
import isToday from 'dayjs/plugin/isToday'

import { supabase } from '@/data/supabase'

import { useSaveAfterKeydown } from '@/hooks/use-save-after-keydown'
import { Header } from '@/components/header'

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
      await supabase.from('notes').insert({ html, date: TODAY })

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

  return (
    <div className="flex flex-col items-center justify-center sm:h-[800px]">
      <Header loading={loading} />

      {editor ? (
        <EditorContent
          className="pb-5 px-10 pt-20 sm:w-full min-h-[800px] prose prose-p:text-xs prose-p:font-medium overflow-auto prose-zinc dark:prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
          editor={editor}
        />
      ) : null}
    </div>
  )
}
