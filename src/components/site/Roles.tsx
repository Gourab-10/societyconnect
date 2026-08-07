import { Home, Briefcase, Shield } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    key: "resident", icon: Home, label: "Residents",
    title: "Pay, complain, approve — in three taps.",
    points: ["See every charge with itemized clarity", "Raise a complaint with a photo, track it like a delivery", "Approve visitors with an OTP from anywhere", "Book the clubhouse without a phone call"],
  },
  {
    key: "committee", icon: Briefcase, label: "Committee",
    title: "Govern with proof, not memory.",
    points: ["Generate all bills in one click", "Audit-ready reports any auditor will love", "Decisions logged, voted, and timestamped", "Onboard a new committee in an afternoon"],
  },
  {
    key: "guard", icon: Shield, label: "Security",
    title: "A guard interface even Dada can use.",
    points: ["Big buttons. Almost no typing.", "Works offline, syncs when connected", "One-tap photo capture", "Voice notes for handover"],
  },
];

export const Roles = () => {
  const [active, setActive] = useState(0);
  const r = roles[active];
  return (
    <section id="roles" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent uppercase tracking-widest">Built for everyone in the gate</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
            Three experiences. One source of truth.
          </h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto">
            {roles.map((role, i) => (
              <button
                key={role.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-smooth shrink-0 ${
                  active === i
                    ? "bg-gradient-primary text-primary-foreground border-transparent shadow-elegant"
                    : "bg-card border-border hover:border-foreground/20"
                }`}
              >
                <div className={`h-10 w-10 rounded-xl grid place-items-center ${active === i ? "bg-primary-foreground/15" : "bg-accent-soft text-accent-foreground"}`}>
                  <role.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{role.label}</div>
                  <div className={`text-xs ${active === i ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Tap to explore</div>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-8 p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-elegant">
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-balance max-w-xl">{r.title}</h3>
            <ul className="mt-8 space-y-4">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 h-6 w-6 rounded-full bg-accent/20 text-accent-foreground grid place-items-center text-xs font-bold">✓</span>
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
