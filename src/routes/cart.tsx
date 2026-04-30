import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your cart — Nordic" },
      { name: "description", content: "Review the items in your cart and proceed to secure checkout." },
    ],
  }),
});

function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center animate-fade-in">
        <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Find something you'll love. Curated, considered, made to last.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          Browse products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-5xl">Your cart</h1>
      <p className="mt-2 text-muted-foreground">{count} {count === 1 ? "item" : "items"}</p>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10">
        <ul className="divide-y divide-border">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="py-6 flex gap-4 sm:gap-6 animate-fade-in">
              <Link to="/products/$productId" params={{ productId: product.id }} className="shrink-0">
                <img src={product.image} alt={product.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover bg-muted" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
                    <Link to="/products/$productId" params={{ productId: product.id }} className="font-medium hover:text-primary transition truncate block">
                      {product.name}
                    </Link>
                  </div>
                  <button onClick={() => remove(product.id)} aria-label="Remove" className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center shrink-0">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(product.id, qty - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-l-full"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-r-full"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-display text-lg">${(product.price * qty).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-20 self-start rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">Free</span> : `$${shipping}`}</dd></div>
            <div className="pt-3 border-t border-border flex justify-between text-base font-semibold"><dt>Total</dt><dd className="font-display text-2xl">${total.toLocaleString()}</dd></div>
          </dl>
          <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition">
            Checkout <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-xs text-center text-muted-foreground">Secure checkout · Encrypted payment</p>
        </aside>
      </div>
    </div>
  );
}
