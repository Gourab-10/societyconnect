import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problems } from "@/components/site/Problems";
import { Modules } from "@/components/site/Modules";
import { Roles } from "@/components/site/Roles";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "SocietyConnect — Calm software for housing societies";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); return m;
    })();
    meta.setAttribute("content", "SocietyConnect is the all-in-one platform for housing societies — billing, complaints, visitors, notices, amenities and AGMs in one calm app.");
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <section id="features"><Problems /></section>
      <Modules />
      <Roles />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
