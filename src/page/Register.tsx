
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "@/services/auth.service";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);
      alert("ثبت‌نام موفق بود! حالا وارد حساب کاربری‌ات شو.");
      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "خطایی رخ داد",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-muted/40 p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border bg-background p-6 shadow-sm"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">ساخت حساب کاربری</h1>
          <p className="text-sm text-muted-foreground">
            برای ورود به پنل مدیریت، ثبت‌نام کن.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            نام
          </label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="name"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="register-email" className="text-sm font-medium">
            ایمیل
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            dir="ltr"
            className="w-full rounded-md border bg-background px-3 py-2 text-left outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="register-password" className="text-sm font-medium">
            رمز عبور
          </label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            رمز عبور باید حداقل ۸ کاراکتر داشته باشد.
          </p>
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
          {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>

        <p className="text-center text-sm">
          قبلاً حساب ساخته‌ای؟{" "}
          <Link to="/login" className="text-primary underline">
            وارد شو
          </Link>
        </p>
      </form>
    </main>
  );
}
