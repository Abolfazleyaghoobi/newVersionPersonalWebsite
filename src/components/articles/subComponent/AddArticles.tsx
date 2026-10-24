type AddArticlesProps = {
  send: {
    atricleProps: {
      articles: any
      setArticles: React.Dispatch<React.SetStateAction<any[]>>
      editingArticleId: number | null
      setEditingArticleId: React.Dispatch<React.SetStateAction<number | null>>
      title: string
      selectedTags: string[]
      setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
      setTitle: React.Dispatch<React.SetStateAction<string>>
      status: "draft" | "published"
      setStatus: React.Dispatch<React.SetStateAction<"draft" | "published">>
      showForm: boolean
      setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    }
  }
}

import ArticleEditor from "@/components/editor/ArticleEditor"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const AddArticles = ({ send }: AddArticlesProps) => {
  // use useState to manage articles state

  const [content, setContent] = useState("")

  const [coverImage, setCoverImage] = useState<File | null>(null)

  const availableTags = [
    "React",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "CSS",
    "Node.js",
  ]

  const handleCreateArticle = () => {
    if (!send.atricleProps.title.trim()) {
      alert("لطفاً عنوان مقاله را وارد کن.")
      return
    }

    if (send.atricleProps.editingArticleId !== null) {
      send.atricleProps.setArticles((currentArticles) =>
        currentArticles.map((article) =>
          article.id === send.atricleProps.editingArticleId
            ? {
                ...article,
                title: send.atricleProps.title.trim(),
                status,
                tags: [...send.atricleProps.selectedTags],
              }
            : article
        )
      )
    } else {
      const newArticle = {
        id: Date.now(),
        title: send.atricleProps.title.trim(),
        status,
        tags: [...send.atricleProps.selectedTags],
      }

      send.atricleProps.setArticles((currentArticles) => [
        newArticle,
        ...currentArticles,
      ])
    }

    send.atricleProps.setTitle("")
    setContent("")
    setCoverImage(null)
    send.atricleProps.setSelectedTags([])
    send.atricleProps.setStatus("draft")
    send.atricleProps.setEditingArticleId(null)
    send.atricleProps.setShowForm(false)
  }

  return (
    <div className="rounded-xl border bg-background p-5">
      <h3 className="mb-4 text-lg font-semibold">
        {send.atricleProps.editingArticleId !== null
          ? "ویرایش مقاله"
          : "ساخت مقاله جدید"}
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="عنوان مقاله"
          value={send.atricleProps.title}
          onChange={(event) => send.atricleProps.setTitle(event.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2"
        />
        {/* cover image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">تصویر کاور مقاله</label>

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

              <p className="text-sm text-muted-foreground">{coverImage.name}</p>
            </div>
          )}
        </div>
        {/* status */}
        <div className="space-y-2">
          <label htmlFor="article-status" className="block text-sm font-medium">
            وضعیت مقاله
          </label>

          <select
            id="article-status"
            value={send.atricleProps.status}
            onChange={(event) =>
              send.atricleProps.setStatus(
                event.target.value as "draft" | "published"
              )
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
              const isSelected = send.atricleProps.selectedTags.includes(tag)

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    send.atricleProps.setSelectedTags((currentTags) =>
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
            {send.atricleProps.selectedTags.length === 0
              ? "هنوز تگی انتخاب نکرده‌ای."
              : `${send.atricleProps.selectedTags.length} تگ انتخاب شده است.`}
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
            {send.atricleProps.editingArticleId !== null
              ? "ذخیره تغییرات"
              : "ایجاد مقاله"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => send.atricleProps.setShowForm(false)}
          >
            بستن فرم
          </Button>
        </div>
      </div>
    </div>
  )
}
