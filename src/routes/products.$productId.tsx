import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ShoppingBag, Truck, Shield, Heart, ArrowLeft } from "lucide-react";
import { products, reviews } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary">← Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Nordic` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "Product" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-3 animate-fade-in">
          <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-soft">
            <img src={gallery[active]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition ${active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:pt-4 animate-slide-up">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl lg:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>
          <p className="mt-6 font-display text-4xl">${product.price}</p>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => add(product)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <button aria-label="Wishlist" className="h-14 w-14 rounded-full border border-border hover:border-primary hover:text-primary transition flex items-center justify-center">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border p-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Free shipping</p>
                <p className="text-xs text-muted-foreground">2-4 business days</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">2-year warranty</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24">
        <h2 className="font-display text-3xl mb-6">Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < r.rating ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{r.text}"</p>
              <p className="mt-4 text-sm font-medium">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
