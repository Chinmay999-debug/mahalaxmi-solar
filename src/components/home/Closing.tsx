import { Reveal } from "@/components/Reveal";
import dusk from "@/assets/cta-dusk.jpg";

export function FinalCTA() {
  return (
    <section id="quote" className="relative overflow-hidden">
      <img
        src={dusk}
        alt="Rooftop solar array at dusk"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.213 0.028 232.5 / 0.72)" }}
      />
      <div className="relative mx-auto flex min-h-[78vh] max-w-[1440px] flex-col justify-center px-6 py-28 md:px-10">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[clamp(2.1rem,5.6vw,4.8rem)] text-softwhite">
            Ready to make your roof work harder?
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <p className="mt-8 max-w-lg text-[1.02rem] leading-relaxed text-softwhite/75">
            Tell us about your property and we'll help you understand what solar could look like
            for you.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9">
            <a
              href="#quote"
              className="bg-gold px-8 py-4 text-[0.8rem] font-semibold tracking-[0.08em] text-navy uppercase transition-colors duration-500 hover:bg-softwhite"
            >
              Get a Free Solar Quote
            </a>
            <a
              href={PHONE_HREF}
              className="link-underline text-[0.9rem] font-medium text-softwhite/85 hover:text-softwhite"
            >
              Talk to an Expert <span aria-hidden>→</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-[0.9rem] font-medium text-softwhite/85 hover:text-softwhite"
            >
              WhatsApp Us <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const cols = [
  {
    title: "Company",
    items: [
      { label: "Solutions", href: "#solutions" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: PHONE_HREF },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: PHONE_DISPLAY, href: PHONE_HREF },
      { label: "WhatsApp", href: WHATSAPP_HREF },
      { label: EMAIL_DISPLAY, href: EMAIL_HREF },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "Instagram", href: "#top" },
      { label: "LinkedIn", href: "#top" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-softwhite">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-[1.15rem] font-semibold tracking-[-0.02em]">
              Surya<span className="text-gold">Grid</span>
            </div>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-softwhite/60">
              Solar designed, installed and supported for homes and businesses.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="eyebrow text-softwhite/40">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i}>
                    <a
                      href="#top"
                      className="text-[0.92rem] text-softwhite/75 transition-colors hover:text-gold"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-softwhite/15 pt-6 text-[0.8rem] text-softwhite/45">
          <span>© {new Date().getFullYear()} SuryaGrid</span>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-softwhite">
              Privacy
            </a>
            <a href="#top" className="hover:text-softwhite">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-softwhite/15 bg-navy/95 px-5 py-3 backdrop-blur-sm md:hidden">
      <a
        href="#quote"
        className="block w-full bg-gold py-3.5 text-center text-[0.8rem] font-semibold tracking-[0.08em] text-navy uppercase"
      >
        Get Free Quote
      </a>
    </div>
  );
}
