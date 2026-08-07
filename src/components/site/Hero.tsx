import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import hero from "@/assets/hero-complex.jpg";

export const Hero = () => {
  return (
    <section className="relative bg-hero overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-foreground text-xs font-medium border border-accent/20">
            <Sparkles className="h-3.5 w-3.5" /> Built for modern housing societies
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] text-balance">
            Run your society like a{" "}
            <span className="italic text-primary">well-loved home</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-balance">
            One calm, transparent platform for billing, complaints, visitors, notices and meetings —
            so committees stop chasing and residents stop guessing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/app" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all text-sm">
              Launch SocietyConnect App Workspace <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Bank-grade security</div>
            <div className="hidden sm:flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> No setup fee</div>
          </div>
        </div>
        <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-foreground/5">
            <img src={hero} alt="Modern residential complex with floating dashboard cards" width={1536} height={1152} className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 bg-card rounded-2xl p-4 shadow-elegant border border-border animate-float">
            <div className="h-10 w-10 rounded-xl bg-success/15 grid place-items-center text-success">✓</div>
            <div>
              <div className="text-sm font-semibold">Bill paid</div>
              <div className="text-xs text-muted-foreground">Flat A-402 · ₹4,250</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-2 hidden md:block bg-card rounded-2xl p-4 shadow-elegant border border-border animate-float" style={{ animationDelay: "1.2s" }}>
            <div className="text-xs text-muted-foreground">Collection rate</div>
            <div className="text-2xl font-display font-semibold text-primary">96.4%</div>
          </div>
        </div>
      </div>
    </section>
  );
};
