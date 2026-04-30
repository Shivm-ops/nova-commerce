import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { API_URL } from "@/config";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal > 100 ? 0 : 9;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          total_price: total,
          status: "paid",
          items: items.map((i) => ({
            product_id: Number(i.product.id),
            quantity: i.qty,
            price: i.product.price,
          })),
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clear();
        navigate({ to: `/order-confirmation/${order.id}` });
      } else {
        setIsProcessing(false);
        const errorText = await response.text();
        alert(`Server Error: ${response.status} - ${errorText}`);
      }
    } catch (err) {
      setIsProcessing(false);
      console.error("Checkout failed:", err);
      alert(`Network Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  if (items.length === 0 && !isProcessing) {
    navigate({ to: "/products" });
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div>
          <h1 className="font-display text-4xl mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    required
                    type="email"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ZIP / Postal Code</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Method
              </h2>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Test Mode Enabled</p>
                  <p className="text-sm text-muted-foreground">No real payment will be processed.</p>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition"
            >
              Complete Purchase — ${total.toLocaleString()}
            </button>
          </form>
        </div>

        <aside className="rounded-2xl border border-border bg-muted/30 p-6 self-start lg:sticky lg:top-20">
          <h2 className="font-display text-xl mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 text-sm">
                <img src={item.product.image} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground">Qty: {item.qty}</p>
                </div>
                <p className="font-medium">${(item.product.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
            <div className="flex justify-between text-lg font-semibold pt-2"><span>Total</span><span>${total.toLocaleString()}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
