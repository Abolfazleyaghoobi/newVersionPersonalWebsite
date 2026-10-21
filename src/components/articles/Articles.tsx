// TODO نیاز من به بهینه سازی

import { useState } from "react"
// Icon components
import { Plus, Trash2, Pencil } from "lucide-react"

// import editor component
import ArticleEditor from "@/components/editor/ArticleEditor"

// components button
import { Button } from "@/components/ui/button"

// Articles component
export function Articles() {
  const [articles, setArticles] = useState<
    {
      id: number
      title: string
      status: "draft" | "published"
      tags: string[]
    }[]
  >([
    {
      id: 1,
      title: "آموزش React",
      status: "published",
      tags: ["React", "Frontend"],
    },
    {
      id: 2,
      title: "آشنایی با TypeScript",
      status: "draft",
      tags: ["TypeScript"],
    },
    {
      id: 3,
      title: "شروع کار با Tailwind CSS",
      status: "published",
      tags: ["CSS", "Frontend"],
    },
  ])

  // use useState to manage articles state
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const availableTags = [
    "React",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "CSS",
    "Node.js",
  ]

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleCreateArticle = () => {
    if (!title.trim()) {
      alert("لطفاً عنوان مقاله را وارد کن.")
      return
    }

    if (editingArticleId !== null) {
      setArticles((currentArticles) =>
        currentArticles.map((article) =>
          article.id === editingArticleId
            ? {
                ...article,
                title: title.trim(),
                status,
                tags: [...selectedTags],
              }
            : article
        )
      )
    } else {
      const newArticle = {
        id: Date.now(),
        title: title.trim(),
        status,
        tags: [...selectedTags],
      }

      setArticles((currentArticles) => [newArticle, ...currentArticles])
    }

    setTitle("")
    setContent("")
    setCoverImage(null)
    setSelectedTags([])
    setStatus("draft")
    setEditingArticleId(null)
    setShowForm(false)
  }

  const handleDeleteArticle = (id: number) => {
    const confirmed = window.confirm(
      "آیا مطمئنی که می‌خواهی این مقاله را حذف کنی؟"
    )

    if (!confirmed) return

    setArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== id)
    )
  }

  const handleEditArticle = (id: number) => {
    const article = articles.find((item) => item.id === id)

    if (!article) return

    setEditingArticleId(article.id)
    setTitle(article.title)
    setStatus(article.status)
    setSelectedTags([...article.tags])
    setShowForm(true)
  }


  
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
          <h3 className="mb-4 text-lg font-semibold">
            {editingArticleId !== null ? "ویرایش مقاله" : "ساخت مقاله جدید"}
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان مقاله"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2"
            />
            {/* cover image */}
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
            {/* status */}
            <div className="space-y-2">
              <label
                htmlFor="article-status"
                className="block text-sm font-medium"
              >
                وضعیت مقاله
              </label>

              <select
                id="article-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "draft" | "published")
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشرشده</option>
              </select>
            </div>
            {/* tags */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">تگ‌های مقاله</label>

              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag)

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSelectedTags((currentTags) =>
                          isSelected
                            ? currentTags.filter((item) => item !== tag)
                            : [...currentTags, tag]
                        )
                      }}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      }`}
                    >
                      {tag}
                      {isSelected && " ×"}
                    </button>
                  )
                })}
              </div>

              <p className="text-sm text-muted-foreground">
                {selectedTags.length === 0
                  ? "هنوز تگی انتخاب نکرده‌ای."
                  : `${selectedTags.length} تگ انتخاب شده است.`}
              </p>
            </div>
            {/* content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">محتوای مقاله</label>

              <ArticleEditor content={content} onChange={setContent} />
            </div>
            {/* buttons */}
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleCreateArticle}>
                {editingArticleId !== null ? "ذخیره تغییرات" : "ایجاد مقاله"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                بستن فرم
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4">عنوان مقاله</th>
              <th className="p-4">تگ‌ها</th>
              <th className="p-4">وضعیت</th>
              <th className="p-4">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-4 font-medium">{article.title}</td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.length > 0 ? (
                      article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2.5 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">بدون تگ</span>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={` px-2.5 py-2.5 w-45 rounded-[9px] flex items-center justify-between text-xs ${
                      article.status === "published"
                        ? "bg-[#474747] text-green-100"
                        : "bg-[#1b1b1b] text-yellow-100"
                    }`}
                  >
                    {article.status === "published" ? "منتشرشده" : "پیش‌نویس"}

                    <td className="">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditArticle(article.id)}
                          aria-label="ویرایش مقاله"
                          title="ویرایش مقاله"
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteArticle(article.id)}
                          aria-label="حذف مقاله"
                          title="حذف مقاله"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
