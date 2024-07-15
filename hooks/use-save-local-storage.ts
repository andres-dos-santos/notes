import type { Editor } from '@tiptap/react'
import { useEffect } from 'react'

let interval: NodeJS.Timeout

export function useSaveLocalStorage(editor: Editor | null) {
  useEffect(() => {
    interval = setInterval(() => {
      if (editor) localStorage.setItem('preview-content', editor.getHTML())
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [editor])
}
