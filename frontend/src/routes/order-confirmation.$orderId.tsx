import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/order-confirmation/$orderId")({
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/orders`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((o: any) => o.id === Number(orderId));
        setOrder(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) return <div className="py-24 text-center">Loading your receipt...</div>;
  if (!order) return <div className="py-24 text-center">Order not found.</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h1 className="font-display text-4xl">Thank you for your order!</h1>
        <p className="mt-2 text-muted-foreground">Order #ORD-{order.id} · A confirmation email has been sent to {order.customer_email}</p>
      </div>

      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-elegant">
        <div className="bg-muted/30 p-8 border-b border-border flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Receipt for</p>
            <p className="text-lg font-medium mt-1">{order.customer_name}</p>
          </div>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        <div className="p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="pb-4 font-medium">Item</th>
                <th className="pb-4 font-medium text-center">Qty</th>
                <th className="pb-4 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {order.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="py-4 font-medium text-sm">Product ID: {item.product_id}</td>
                  <td className="py-4 text-center text-sm">{item.quantity}</td>
                  <td className="py-4 text-right text-sm">${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 border-t border-border pt-8 flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-semibold border-t border-border pt-3">
                <span>Total</span>
                <span className="font-display">${order.total_price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4 no-print">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition">
          <Home className="h-4 w-4" /> Back to home
        </Link>
        <button 
          onClick={() => {
            const msg = `Hi! My order #ORD-${order.id} for $${order.total_price} has been placed successfully at Nordic Commerce.`;
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition shadow-elegant"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.888 11.888 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </button>
        <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          <ShoppingBag className="h-4 w-4" /> Continue shopping
        </Link>
      </div>
    </div>
  );
}
