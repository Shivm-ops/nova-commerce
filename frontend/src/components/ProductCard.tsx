import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative flex flex-col">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-soft"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); add(product); }}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-card/95 backdrop-blur shadow-elegant flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <Link to="/products/$productId" params={{ productId: product.id }} className="block mt-1 font-medium truncate hover:text-primary transition-colors">
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>
        </div>
        <p className="font-display text-lg shrink-0">${product.price}</p>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-square rounded-2xl skeleton" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/3 rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-3 w-1/2 rounded skeleton" />
      </div>
    </div>
  );
}
