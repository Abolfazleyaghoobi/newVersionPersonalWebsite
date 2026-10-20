import { useEditor, EditorContent } from "@tiptap/react"
import Link from "@tiptap/extension-link"
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
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https"],
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
  "min-h-64 w-full rounded-lg border bg-background p-4 outline-none " +
  "[&_h2]:text-2xl [&_h2]:font-bold " +
  "[&_h3]:text-xl [&_h3]:font-bold " +
  "[&_h4]:text-lg [&_h4]:font-semibold " +
  "[&_ul]:list-disc [&_ul]:pr-6 " +
  "[&_ol]:list-decimal [&_ol]:pr-6 " +
  "[&_li]:my-1",
        dir: "rtl",
      },
    },
  })

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          تیتر ۲
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          تیتر ۳
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          تیتر ۴
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
          onClick={() => {
            if (!editor) return

            const url = window.prompt("آدرس لینک را وارد کن:")

            if (url) {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run()
            }
          }}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          افزودن لینک
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
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          if (!editor) return

          const result = editor.chain().focus().toggleBulletList().run()
          console.log("Bullet list:", result)
          console.log("Editor HTML:", editor.getHTML())
        }}
        disabled={!editor}
        className="rounded-md border px-3 py-1 text-sm"
      >
        لیست نقطه‌ای
      </button>

      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          if (!editor) return

          const result = editor.chain().focus().toggleOrderedList().run()
          console.log("Ordered list:", result)
          console.log("Editor HTML:", editor.getHTML())
        }}
        disabled={!editor}
        className="rounded-md border px-3 py-1 text-sm"
      >
        لیست شماره‌دار
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
