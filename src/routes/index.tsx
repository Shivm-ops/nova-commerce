import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Shield, RefreshCcw, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories, testimonials } from "@/data/products";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Nordic — Considered objects for everyday life" },
      { name: "description", content: "Curated audio, wearables, lighting and home goods. Designed in Copenhagen, shipped worldwide." },
    ],
  }),
});

function Home() {
  const featured = products.slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs">
              <Sparkles className="h-3 w-3 text-primary" /> New season collection
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-medium">
              Objects, made <span className="text-gradient italic">considered.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              A small, curated marketplace of premium goods — audio, wearables, lighting and home pieces designed to last decades, not seasons.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#featured" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-card transition">
                Explore featured
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          {[
            { icon: Truck, label: "Free shipping over $100" },
            { icon: RefreshCcw, label: "30-day easy returns" },
            { icon: Shield, label: "2-year warranty" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Browse</p>
            <h2 className="mt-2 font-display text-4xl">Shop by category</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className="group rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-elegant transition-all"
            >
              <div className="text-3xl mb-3 transition-transform group-hover:scale-110">{c.emoji}</div>
              <p className="font-medium text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Explore →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Featured</p>
            <h2 className="mt-2 font-display text-4xl">This week's edit</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Loved by 12,000+ customers</p>
          <h2 className="mt-2 font-display text-4xl">Words from our community</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition">
              <blockquote className="text-base leading-relaxed">"{t.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
