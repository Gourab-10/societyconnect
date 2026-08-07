import { MessageSquareWarning, Receipt, Wrench, ShieldAlert, CalendarX, FolderSearch } from "lucide-react";

const items = [
  { icon: Receipt, title: "Payment confusion", text: "Unclear bills, missing receipts, awkward dues chases." },
  { icon: Wrench, title: "Maintenance delays", text: "Complaints lost in WhatsApp. No status, no accountability." },
  { icon: MessageSquareWarning, title: "Communication chaos", text: "Notices buried under memes. Important things get missed." },
  { icon: ShieldAlert, title: "Security blind spots", text: "Paper registers, unknown visitors, no audit trail." },
  { icon: CalendarX, title: "Booking conflicts", text: "Double-booked clubhouse, opaque availability." },
  { icon: FolderSearch, title: "Lost documents", text: "Bye-laws, NOCs and minutes nobody can find." },
];

export const Problems = () => (
  <section className="py-24 md:py-32 border-t border-border/60">
    <div className="container">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent uppercase tracking-widest">The everyday friction</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
          Society life shouldn't feel like a second job.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          We studied real complaints from residents and committees. These are the six wounds we set out to heal.
        </p>
      </div>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <div key={it.title} className="group p-7 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1">
            <div className="h-11 w-11 rounded-xl bg-accent-soft grid place-items-center text-accent-foreground">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
