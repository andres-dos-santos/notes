'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { Content } from '@/consts/content'

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Untitled' }),
    ],
    content: Content,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  return (
    <EditorContent
      className="min-h-[800px] prose prose-p:text-xs prose-p:font-medium overflow-auto prose-invert prose-sm prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-h4:text-sm"
      editor={editor}
    />
  )
}
