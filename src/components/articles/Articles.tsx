import { useState } from "react"
// Icon components
import { Plus } from "lucide-react"

// import editor component
import ArticleEditor from "@/components/editor/ArticleEditor"

// components button
import { Button } from "@/components/ui/button"

// Articles component
export function Articles() {
  const articles = [
    { id: 1, title: "آموزش React", status: "منتشرشده" },
    { id: 2, title: "آشنایی با TypeScript", status: "پیش‌نویس" },
    { id: 3, title: "شروع کار با Tailwind CSS", status: "منتشرشده" },
  ]

  // use useState to manage articles state
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">مدیریت مقالات</h2>

        <Button onClick={() => setShowForm(true)}>
          <Plus className="size-4" />
          مقاله جدید
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-background p-5">
          <h3 className="mb-4 text-lg font-semibold">ساخت مقاله جدید</h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان مقاله"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                تصویر کاور مقاله
              </label>

              <input
                type="file"
                accept="image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null
                  setCoverImage(file)
                }}
                className="block w-full rounded-lg border bg-background p-3 text-sm"
              />

              {coverImage && (
                <div className="space-y-2">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="پیش‌نمایش تصویر کاور"
                    className="h-48 w-full rounded-lg border object-cover"
                  />

                  <p className="text-sm text-muted-foreground">
                    {coverImage.name}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">محتوای مقاله</label>

              <ArticleEditor content={content} onChange={setContent} />
            </div>

            <Button onClick={() => setShowForm(false)}>بستن فرم</Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4">عنوان مقاله</th>
              <th className="p-4">وضعیت</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-4 font-medium">{article.title}</td>
                <td className="p-4">{article.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
