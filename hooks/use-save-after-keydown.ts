import { useEffect } from 'react'

export function useSaveAfterKeydown(fn: () => Promise<void>) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()

        fn()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fn])
}
