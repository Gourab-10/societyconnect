import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#modules", label: "Modules" },
  { href: "#roles", label: "For You" },
  { href: "#pricing", label: "Pricing" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <Building2 className="h-5 w-5" />
          </span>
          SocietyConnect
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="/app" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md hover:opacity-95 transition-all">
            Launch App Workspace
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm py-1">{l.label}</a>
            ))}
            <Button className="bg-gradient-primary mt-2">Book a demo</Button>
          </div>
        </div>
      )}
    </header>
  );
};
