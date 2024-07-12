import { Editor } from '@/components/editor'

export default function Home() {
  return (
    <div className="p-16 h-full">
      {/* <header className="flex items-center justify-center gap-8 px-5 bg-zinc-200/50 dark:bg-zinc-800/50 w-full h-16 rounded-xl">
        <div className="flex items-center gap-2.5">
          <p className="text-xs">Inter Std</p>

          <ChevronsUpDown size={14} />
        </div>

        <div className="flex items-center gap-2.5">
          <p className="text-xs">14</p>

          <ChevronsUpDown size={14} />
        </div>

        <Bold size={14} />

        <Underline size={14} />

        <Italic size={14} />

        <Baseline size={14} />

        <AlignLeft size={14} />

        <AlignJustify size={14} />

        <AlignRight size={14} />

        <form
          action=""
          className="flex-1 flex items-center bg-white dark:bg-zinc-950 h-10 max-w-[18rem] rounded-md px-4"
        >
          <Search size={14} />

          <input
            type="text"
            placeholder="Search"
            className="dark:bg-zinc-950 max-w-[12rem] outline-none px-4 h-10 bg-white text-xs"
          />
        </form>
      </header> */}

      <Editor />
    </div>
  )
}
