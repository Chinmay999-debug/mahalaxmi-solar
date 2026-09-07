import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

const links = ["Solutions", "Projects", "About", "Process"];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700 ${
        solid
          ? "border-b border-foreground/10 bg-softwhite/95 py-4 backdrop-blur-sm"
          : "border-b border-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a
          href={PHONE_HREF}
          className={`link-underline text-[0.9rem] font-medium transition-colors duration-300 ${
            solid ? "text-foreground hover:text-gold" : "text-softwhite/85 hover:text-softwhite"
          }`}
        >
          Talk to an Expert <span aria-hidden>→</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                solid
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-softwhite/75 hover:text-softwhite"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={PHONE_HREF}
            className={`text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
              solid ? "text-foreground hover:text-gold" : "text-softwhite/85 hover:text-gold"
            }`}
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className={`text-[0.82rem] font-medium transition-colors duration-300 ${
              solid ? "text-muted-foreground hover:text-foreground" : "text-softwhite/70 hover:text-softwhite"
            }`}
          >
            WhatsApp
          </a>
          <a
            href="#quote"
            className={`border px-6 py-3 text-[0.78rem] font-semibold tracking-[0.06em] uppercase transition-all duration-500 ${
              solid
                ? "border-foreground/20 text-foreground hover:border-foreground hover:bg-navy hover:text-softwhite"
                : "border-softwhite/40 text-softwhite hover:border-gold hover:bg-gold hover:text-navy"
            }`}
          >
            Get a Free Quote
          </a>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <a
            href={PHONE_HREF}
            className={`text-[0.78rem] font-semibold tracking-[0.06em] uppercase ${
              solid ? "text-foreground" : "text-softwhite"
            }`}
          >
            Call
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="text-[0.78rem] font-semibold tracking-[0.06em] text-gold uppercase"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
