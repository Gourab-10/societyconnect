import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 md:p-20 shadow-elegant">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-primary-foreground text-balance leading-[1.05]">
            Give your society the calm it deserves.
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
            Set up your first flat in under a minute. Migrate your data with us, free of charge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 shadow-glow">
              Start free <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
