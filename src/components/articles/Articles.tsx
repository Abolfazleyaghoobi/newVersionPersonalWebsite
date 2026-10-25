// TODO نیاز من به بهینه سازی

import { useState } from "react"
// Icon components
import { Plus, Trash2, Pencil } from "lucide-react"

// import editor component

// components button
import { Button } from "@/components/ui/button"
import { AddArticles } from "./subComponent/AddArticles"

// Articles component
export function Articles() {

  // states
  const [showForm, setShowForm] = useState(false)
const [articles, setArticles] = useState<
  {
    id: number
    title: string
    content: string
    coverImage: File | null
    status: "draft" | "published"
    tags: string[]
  }[]
>([
  {
    id: 1,
    title: "آموزش React",
    content: "",
    coverImage: null,
    status: "published",
    tags: ["React", "Frontend"],
  },
  {
    id: 2,
    title: "آشنایی با TypeScript",
    content: "",
    coverImage: null,
    status: "draft",
    tags: ["TypeScript"],
  },
  {
    id: 3,
    title: "شروع کار با Tailwind CSS",
    content: "",
    coverImage: null,
    status: "published",
    tags: ["CSS", "Frontend"],
  },
])
const [editingArticleId, setEditingArticleId] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)


  // send state to AddArticles component
  const sendStateToAddArticles = {
     atricleProps: {
      articles,
      setArticles,
        editingArticleId,
      setEditingArticleId,
      title,
      setTitle,
      selectedTags,
      setSelectedTags,
      status,
      setStatus,
      showForm,
      setShowForm,
      content,
      setContent,
      coverImage,
      setCoverImage,

     }
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
  setContent(article.content)
  setCoverImage(article.coverImage)
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

      {showForm && <AddArticles send={sendStateToAddArticles}/>}

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
