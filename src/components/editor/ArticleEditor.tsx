import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
// TODO نیاز من به توضیحات بیشتر 
interface ArticleEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function ArticleEditor({
  content,
  onChange,
}: ArticleEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "min-h-64 w-full rounded-lg border bg-background p-4 outline-none",
        dir: "rtl",
      },
    },
  })

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          تیتر
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          ضخیم
        </button>
        
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          ایتالیک
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          بازگشت
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          انجام دوباره
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          لیست
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          بلوک کد
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
