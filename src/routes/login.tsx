import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Nordic" },
      { name: "description", content: "Sign in to your Nordic account or create a new one." },
    ],
  }),
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-display text-xl">N</div>
          <h1 className="mt-5 font-display text-3xl">{mode === "login" ? "Welcome back" : "Create account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to continue shopping" : "Join Nordic to save your favorites"}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 p-1 bg-muted rounded-full text-sm">
          <button onClick={() => setMode("login")} className={`py-2 rounded-full transition ${mode === "login" ? "bg-card shadow-soft font-medium" : "text-muted-foreground"}`}>Sign in</button>
          <button onClick={() => setMode("register")} className={`py-2 rounded-full transition ${mode === "register" ? "bg-card shadow-soft font-medium" : "text-muted-foreground"}`}>Register</button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Full name" className="w-full h-12 pl-10 pr-3 rounded-xl bg-muted border border-transparent focus:border-ring focus:bg-card outline-none text-sm" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="email" placeholder="you@example.com" className="w-full h-12 pl-10 pr-3 rounded-xl bg-muted border border-transparent focus:border-ring focus:bg-card outline-none text-sm" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="password" placeholder="Password" className="w-full h-12 pl-10 pr-3 rounded-xl bg-muted border border-transparent focus:border-ring focus:bg-card outline-none text-sm" />
          </div>
          {mode === "login" && (
            <div className="flex justify-end">
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
          )}
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition">
            {mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
      <p className="mt-6 text-center text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to home</Link>
      </p>
    </div>
  );
}
