import { useEditor, EditorContent } from "@tiptap/react"
import type { ChangeEvent } from "react"
import Link from "@tiptap/extension-link"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { NodeSelection } from "@tiptap/pm/state"
import { uploadArticleImage } from "@/services/media.service";

interface ArticleEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function ArticleEditor({
  content,
  onChange,
}: ArticleEditorProps) {
  const parseEditorContent = (value: string) => {
  if (!value) return ""

  try {
    const parsed = JSON.parse(value)

    if (parsed?.type === "doc") {
      return parsed
    }
  } catch {
    // محتوای قدیمی HTML است
  }

  return value
}
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https"],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: parseEditorContent(content),
    immediatelyRender: false,
 onUpdate: ({ editor }) => {
  onChange(JSON.stringify(editor.getJSON()))
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
          "[&_li]:my-1 " +
          "[&_img]:!w-[150px] [&_img]:!h-auto [&_img]:!max-w-full " +
          "[&_img]:rounded-lg [&_img]:cursor-pointer",
        dir: "rtl",
      },
    },
  })


const handleImageUpload = async (
  event: ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];

  if (!file || !editor) return;

  if (file.type !== "image/webp") {
    alert("فعلاً فقط تصویر با فرمت WebP پشتیبانی می‌شود.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
    event.target.value = "";
    return;
  }

  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    alert("ابتدا وارد حساب کاربری‌ات شو.");
    event.target.value = "";
    return;
  }

  try {
    const imageUrl = await uploadArticleImage(file, token);
console.log("Image URL:", imageUrl);
    editor
      .chain()
      .focus()
      .setImage({
        src: imageUrl,
        alt: file.name,
      })
      .run();
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "آپلود تصویر ناموفق بود.",
    );
  } finally {
    event.target.value = "";
  }
};


 const handleDeleteImage = () => {
  if (!editor) return

  const { selection } = editor.state

  if (
    !(selection instanceof NodeSelection) ||
    selection.node.type.name !== "image"
  ) {
    alert("ابتدا روی تصویر موردنظر کلیک کن.")
    return
  }

  editor.chain().focus().deleteSelection().run()
}

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-md border px-3 py-1 text-sm">
          انتخاب تصویر
      <input
  type="file"
  accept="image/webp"
  onChange={handleImageUpload}
/>
        </label>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleDeleteImage}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          حذف تصویر
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
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
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          ضخیم
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          ایتالیک
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (!editor) return

            const url = window.prompt("آدرس لینک را وارد کن:")
            if (!url) return

            try {
              const parsedUrl = new URL(url)

              if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                alert("فقط لینک‌های HTTP و HTTPS مجاز هستند.")
                return
              }

              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: parsedUrl.href })
                .run()
            } catch {
              alert("آدرس لینک معتبر نیست.")
            }
          }}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          افزودن لینک
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          بازگشت
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          انجام دوباره
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          لیست نقطه‌ای
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor}
          className="rounded-md border px-3 py-1 text-sm"
        >
          لیست شماره‌دار
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
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