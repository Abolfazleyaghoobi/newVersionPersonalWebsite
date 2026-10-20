import { BrowserRouter, Routes, Route, NavLink } from "react-router"

// Icon components
import {
  LayoutDashboard,
  FileText,
  Users as UsersIcon,
  Tags as TagsIcon,
} from "lucide-react"

// Dashboard component
function Dashboard() {
  return <h1 className="text-2xl font-bold">داشبورد</h1>
}


// Articles component
function Articles() {
  return <h1 className="text-2xl font-bold">مدیریت مقالات</h1>
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
  { to: "/users", label: "کاربران", icon: Users },
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
              {link.label}
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
