import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Sun, Moon, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { count } = useCart();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <Link to="/" className="text-sm font-medium hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
      <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Shop</Link>
      <Link to="/cart" className="text-sm font-medium hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Cart</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-display text-lg">N</div>
            <span className="font-display text-xl font-semibold tracking-tight">Nordic</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">{navLinks}</nav>

          <div className="hidden md:flex items-center flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products…"
                className="w-full h-10 pl-9 pr-3 rounded-full bg-muted text-sm border border-transparent focus:border-ring focus:bg-card outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggle} aria-label="Toggle theme" className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center transition">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/login" aria-label="Account" className="hidden sm:flex h-10 w-10 rounded-full hover:bg-muted items-center justify-center transition">
              <User className="h-4 w-4" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center transition">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="md:hidden h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="search" placeholder="Search…" className="w-full h-10 pl-9 pr-3 rounded-full bg-muted text-sm outline-none" />
            </div>
            <div className="flex flex-col gap-3" onClick={() => setOpen(false)}>{navLinks}</div>
          </div>
        )}
      </div>
    </header>
  );
}
