import { Users, Wallet, Wrench, Megaphone, ShieldCheck, CalendarCheck, FileText, Truck, Vote, BarChart3 } from "lucide-react";

const modules = [
  { icon: Users, title: "Flats & Residents", text: "Owners, tenants, families, vehicles, pets — one source of truth." },
  { icon: Wallet, title: "Billing & Payments", text: "Auto bills, UPI, reminders, receipts, defaulter aging." },
  { icon: Wrench, title: "Complaints", text: "SLA tracking, photos, escalations, resident ratings." },
  { icon: Megaphone, title: "Notice Board", text: "Targeted broadcasts with read receipts and emergency push." },
  { icon: ShieldCheck, title: "Visitor & Security", text: "OTP entry, pre-approvals, delivery flow, panic button." },
  { icon: CalendarCheck, title: "Amenity Booking", text: "Clubhouse, gym, guest rooms — no more double bookings." },
  { icon: FileText, title: "Documents", text: "Bye-laws, AGM minutes, NOCs — searchable forever." },
  { icon: Truck, title: "Vendors & Staff", text: "Contracts, attendance, performance, payouts." },
  { icon: Vote, title: "Polls & AGMs", text: "Digital voting, quorum tracking, proxies, results." },
  { icon: BarChart3, title: "Reports & Audit", text: "Collection, expense, complaint and visitor analytics." },
];

export const Modules = () => (
  <section id="modules" className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent uppercase tracking-widest">Ten modules. One platform.</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
            Everything your society needs. Nothing it doesn't.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Start with the essentials. Switch on the rest as your community grows — every module talks to every other.
        </p>
      </div>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m, i) => (
          <div
            key={m.title}
            className={`p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1 ${
              i === 0 ? "lg:col-span-2 lg:row-span-2 bg-gradient-primary text-primary-foreground border-transparent" : ""
            }`}
          >
            <div className={`h-11 w-11 rounded-xl grid place-items-center ${i === 0 ? "bg-primary-foreground/15 text-primary-foreground" : "bg-accent-soft text-accent-foreground"}`}>
              <m.icon className="h-5 w-5" />
            </div>
            <h3 className={`mt-5 font-display ${i === 0 ? "text-3xl" : "text-lg"} font-semibold`}>{m.title}</h3>
            <p className={`mt-2 text-sm ${i === 0 ? "text-primary-foreground/80 max-w-sm text-base" : "text-muted-foreground"}`}>{m.text}</p>
            {i === 0 && (
              <div className="mt-8 grid grid-cols-3 gap-3">
                {["Owners", "Tenants", "Vehicles"].map((t) => (
                  <div key={t} className="rounded-xl bg-primary-foreground/10 p-3">
                    <div className="text-2xl font-display font-semibold">{t === "Owners" ? "248" : t === "Tenants" ? "92" : "176"}</div>
                    <div className="text-xs text-primary-foreground/70">{t}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
