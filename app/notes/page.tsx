import { Editor } from '@/components/editor'

import { supabase } from '@/data/supabase'

export const revalidate = 60 // 1 minute

async function getContent(date: string) {
  const { data } = await supabase.from('notes').select().eq('date', date)

  return data ? data[0] : {}
}

export default async function Home(props: { searchParams: { from: string } }) {
  const data = await getContent(props.searchParams.from)

  return (
    <div className="flex flex-col items-center justify-center sm:h-[800px]">
      <Editor html={data?.html} id={data?.id} from={props.searchParams.from} />
    </div>
  )
}
