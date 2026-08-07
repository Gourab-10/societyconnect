import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter", price: "Free", sub: "Up to 25 flats",
    features: ["Flats & residents", "Notice board", "Complaints", "Email support"],
    cta: "Start free", featured: false,
  },
  {
    name: "Pro", price: "₹9", sub: "per flat / month",
    features: ["Everything in Starter", "UPI billing & receipts", "Visitor & security app", "Amenity bookings", "Priority support"],
    cta: "Start 30-day trial", featured: true,
  },
  {
    name: "Enterprise", price: "Custom", sub: "Builders & 500+ flats",
    features: ["Everything in Pro", "White-label & SSO", "Dedicated onboarding", "Tally / QuickBooks export", "SLA & account manager"],
    cta: "Talk to sales", featured: false,
  },
];

export const Pricing = () => (
  <section id="pricing" className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-accent uppercase tracking-widest">Pricing</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
          Honest pricing. No per-feature surprises.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Free for small societies. A fair flat fee as you grow. That's it.
        </p>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((t) => (
          <div key={t.name} className={`p-8 rounded-3xl border transition-smooth ${
            t.featured
              ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-[1.02]"
              : "bg-card border-border shadow-soft hover:shadow-elegant"
          }`}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              {t.featured && <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-semibold">Popular</span>}
            </div>
            <div className="mt-6">
              <span className="font-display text-5xl font-semibold">{t.price}</span>
              <div className={`text-sm mt-1 ${t.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t.sub}</div>
            </div>
            <ul className="mt-8 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.featured ? "text-accent" : "text-success"}`} /> {f}
                </li>
              ))}
            </ul>
            <Button className={`mt-8 w-full h-11 ${t.featured ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-foreground text-background hover:bg-foreground/90"}`}>
              {t.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
