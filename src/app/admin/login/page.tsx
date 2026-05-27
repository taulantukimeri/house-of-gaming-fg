"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid password");
      return;
    }

    // Validate `from` to prevent open-redirect attacks:
    // only allow same-origin relative paths (must start with "/" and not contain "://")
    const rawFrom = searchParams.get("from") ?? "";
    const from =
      rawFrom.startsWith("/") && !rawFrom.includes("://") ? rawFrom : "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <div className="admin-login-box">
      <div className="t-eyebrow" style={{ marginBottom: 8 }}>
        ▲ ADMIN
      </div>
      <h1 className="t-h1" style={{ marginBottom: 8 }}>
        Sign in
      </h1>
      <p className="t-body-sm" style={{ marginBottom: 24 }}>
        Product catalog management for House of Gaming FG.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--mute)",
            }}
          >
            PASSWORD
          </span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      {/* Do not expose env-var names or credential hints in production */}
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="admin-wrap">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
