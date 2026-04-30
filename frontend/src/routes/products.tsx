import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop all — Nordic" },
      { name: "description", content: "Browse our full collection. Filter by category, price and search to find your next considered piece." },
    ],
  }),
});

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [q, setQ] = useState(search.q ?? "");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);

  useEffect(() => {
    console.log("Fetching products...");
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Products loaded:", data.length);
        setDbProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const category = search.category;

  const filtered = useMemo(() => {
    return dbProducts.filter((p) => {
      if (category && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [dbProducts, category, maxPrice, q]);

  const setCategory = (slug?: string) =>
    navigate({ search: (prev) => ({ ...prev, category: slug }) });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Collection</p>
        <h1 className="mt-2 font-display text-5xl">All products</h1>
        <p className="mt-3 text-muted-foreground">{filtered.length} pieces</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Filters */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-20 space-y-8">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full h-11 pl-9 pr-3 rounded-full bg-muted text-sm border border-transparent focus:border-ring focus:bg-card outline-none"
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <div className="flex flex-col gap-1">
                <button onClick={() => setCategory(undefined)} className={`text-left text-sm py-1.5 px-3 rounded-lg transition ${!category ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  All
                </button>
                {categories.map((c) => (
                  <button key={c.slug} onClick={() => setCategory(c.slug)} className={`text-left text-sm py-1.5 px-3 rounded-lg transition ${category === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Max price</h3>
              <input
                type="range"
                min={50}
                max={1500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-full accent-[var(--color-primary)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>$50</span>
                <span className="font-medium text-foreground">${maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="lg:hidden mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 animate-fade-in">
              {filtered.map((p) => <ProductCard key={p.id} product={{ ...p, id: String(p.id) }} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
