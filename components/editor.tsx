'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

import { supabase } from '@/data/supabase'

let interval: NodeJS.Timeout

// async function getContent() {
//   // PEGAR O CONTEÚDO DO DIA
//   const html = localStorage.getItem('preview-content')

//   await supabase.from('notes').insert({ html })
// }

async function saveContent(textHtml: string) {
  // SE JÁ TEM CONTEÚDO NO DIA TEM QUE ATUALIZAR
  const html = localStorage.getItem('preview-content')

  if (!html) return

  if (textHtml !== html) {
    await supabase.from('notes').insert({ html })
  }
}

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Untitled' }),
    ],
    // content: Content,
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

  useEffect(() => {
    interval = setInterval(() => {
      if (editor) saveContent(editor.getHTML())
    }, 1000 * 60) // 1 minute

    return () => {
      clearInterval(interval)
    }
  }, [editor])

  return (
    <EditorContent
      className="min-h-[800px] prose prose-p:text-xs prose-p:font-medium overflow-auto prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
      editor={editor}
    />
  )
}
