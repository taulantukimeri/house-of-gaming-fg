"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/search-context";
import { Icon } from "@/components/icon";
import type { Product } from "@/lib/types";

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  if (!searchOpen) return null;

  function navigate(id: string) {
    closeSearch();
    router.push(`/product/${id}`);
  }

  return (
    <div className="search-overlay" onClick={closeSearch}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="search-esc" onClick={closeSearch}>
            ESC
          </button>
        </div>
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="search-result"
                  onClick={() => navigate(p.id)}
                >
                  <span className="search-result-name">{p.fullName}</span>
                  <span className="search-result-price">{p.price.toFixed(2)} €</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {loading && <p className="search-status">Searching…</p>}
        {!loading && query.length >= 2 && results.length === 0 && (
          <p className="search-status">No results for &ldquo;{query}&rdquo;</p>
        )}
      </div>
    </div>
  );
}
