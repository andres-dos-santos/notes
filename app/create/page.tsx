import { Editor } from '@/components/editor'
import { supabase } from '@/data/supabase'
import dayjs from 'dayjs'

async function getContent() {
  const { data } = await supabase.from('notes').select().eq('date', dayjs())

  return data ? data[0] : {}
}

export default async function Create() {
  const data = await getContent()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Editor html={data?.html} />
    </div>
  )
}
