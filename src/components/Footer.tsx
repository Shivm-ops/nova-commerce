import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-display text-lg">N</div>
              <span className="font-display text-xl font-semibold">Nordic</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Considered objects for everyday life. Designed in Copenhagen, shipped worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full border border-border hover:bg-card hover:border-primary transition flex items-center justify-center" aria-label="social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground">All products</Link></li>
              <li><a href="#" className="hover:text-foreground">New arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Best sellers</a></li>
              <li><a href="#" className="hover:text-foreground">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Journal</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 Nordic. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
