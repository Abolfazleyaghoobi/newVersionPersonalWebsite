import { BrowserRouter, Routes, Route, NavLink } from "react-router"

// Icon components
import {
  LayoutDashboard,
  FileText,
  Users as UsersIcon,
  Newspaper,
  UsersRound,
  Tags as TagsIcon,

} from "lucide-react"
import { Articles } from "./components/articles/Articles"

// components button


// Dashboard component
function Dashboard() {
  const stats = [
    { title: "کل مقالات", value: "۱۲۵", icon: Newspaper },
    { title: "کاربران", value: "۸۰", icon: UsersRound },
    { title: "تگ‌ها", value: "۲۴", icon: TagsIcon },
  ]

  const articles = [
    { title: "آموزش React", status: "منتشرشده" },
    { title: "آشنایی با TypeScript", status: "پیش‌نویس" },
    { title: "شروع کار با Tailwind CSS", status: "منتشرشده" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">داشبورد</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-background p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <Icon size={22} className="text-muted-foreground" />
              </div>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>
      {/* TODO: نیاز من به بررسی */}
      <section className="rounded-xl border bg-background p-5">
        <h3 className="mb-4 text-lg font-semibold">آخرین مقالات</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="p-3">عنوان مقاله</th>
                <th className="p-3">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.title} className="border-b last:border-0">
                  <td className="p-3 font-medium">{article.title}</td>
                  <td className="p-3">{article.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

// Users component
function Users() {
  return <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
}

// Tags component
function Tags() {
  return <h1 className="text-2xl font-bold">مدیریت تگ‌ها</h1>
}

// AdminLayout component
function AdminLayout() {
  const links = [
    { to: "/", label: "داشبورد", icon: LayoutDashboard },
    { to: "/articles", label: "مقالات", icon: FileText },
    { to: "/users", label: "کاربران", icon: UsersIcon },
    { to: "/tags", label: "تگ‌ها", icon: TagsIcon },
  ]

  return (
    <div dir="rtl" className="flex min-h-svh bg-muted/40">
      <aside className="w-64 border-l bg-background p-5">
        <h2 className="mb-8 text-xl font-bold">مدیریت مقالات</h2>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            // TODO"نیاز من بررسی"
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <link.icon className="h-5 w-5" />
                {link.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between rounded-xl border bg-background p-4">
          <h1 className="text-lg font-semibold">پنل مدیریت</h1>

          <div className="text-sm text-muted-foreground">خوش آمدید، مدیر</div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </main>
    </div>
  )
}

// App component
export default function App() {
  return (
    <BrowserRouter>
      <AdminLayout />
    </BrowserRouter>
  )
}
