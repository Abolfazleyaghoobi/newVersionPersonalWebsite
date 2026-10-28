
import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      sessionStorage.setItem("accessToken", data.accessToken);

      alert(`خوش آمدی ${data.user.name}`);

      // بعداً کاربر را به پنل مدیریت هدایت می‌کنیم.
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "خطایی رخ داد",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border bg-background p-6 shadow-sm"
      >
        <div className="space-y-2 text-right">
          <h1 className="text-2xl font-bold">ورود به پنل مدیریت</h1>
          <p className="text-sm text-muted-foreground">
            برای ورود، ایمیل و رمز عبورت را وارد کن.
          </p>
        </div>

        <div className="space-y-2 text-right">
          <label htmlFor="email" className="text-sm font-medium">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-md border bg-background px-3 py-2 text-left outline-none focus:ring-2 focus:ring-ring"
            dir="ltr"
          />
        </div>

        <div className="space-y-2 text-right">
          <label htmlFor="password" className="text-sm font-medium">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-md border bg-background px-3 py-2 text-left outline-none focus:ring-2 focus:ring-ring"
            dir="ltr"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </main>
  );
}
