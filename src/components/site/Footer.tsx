import { Building2 } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 py-12">
    <div className="container grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <a href="#" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground"><Building2 className="h-5 w-5" /></span>
          SocietyConnect
        </a>
        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
          The calm operating system for housing societies. Made with care in Bengaluru.
        </p>
      </div>
      <div>
        <div className="text-sm font-semibold mb-3">Product</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#features" className="hover:text-foreground">Features</a></li>
          <li><a href="#modules" className="hover:text-foreground">Modules</a></li>
          <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold mb-3">Company</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-foreground">About</a></li>
          <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          <li><a href="#" className="hover:text-foreground">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="container mt-10 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
      <span>© {new Date().getFullYear()} SocietyConnect. All rights reserved.</span>
      <span>Made for the people who actually live there.</span>
    </div>
  </footer>
);
