import { useEffect, useRef, useState } from "react";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { CTA, Wordmark } from "@/components/brand";

const links = [
  { label: "Home", href: "#top" },
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 600 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 600) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-700 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid && !open ? "bg-paper/90 shadow-[0_1px_0_var(--border)] backdrop-blur-md" : ""}`}
      >
        <div
          className={`shell flex items-center justify-between transition-[height] duration-700 ease-out-expo ${
            solid ? "h-[68px]" : "h-[84px]"
          }`}
        >
          <a
            href="#top"
            aria-label="Mahalaxmi Solar Service — home"
            onClick={() => setOpen(false)}
            className={`relative z-10 transition-colors duration-500 ${light || open ? "text-paper" : "text-ink"}`}
          >
            <Wordmark tone={light || open ? "light" : "dark"} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-[0.9rem] transition-colors duration-300 ${
                  light ? "text-paper/75 hover:text-paper" : "text-ink/65 hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={PHONE_HREF}
              className={`label hidden transition-colors xl:inline ${
                light ? "text-paper/70 hover:text-paper" : "text-ink/60 hover:text-ink"
              }`}
            >
              {PHONE_DISPLAY}
            </a>
            <CTA href="#contact" tone={light ? "paper" : "ink"} className="!py-2.5 !text-[0.88rem]">
              Get Free Consultation
            </CTA>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`relative z-10 flex items-center gap-3 rounded-full py-2 pr-2 pl-4 text-[0.9rem] font-medium transition-colors lg:hidden ${
              light || open ? "bg-paper/12 text-paper backdrop-blur" : "bg-ink/6 text-ink"
            }`}
          >
            {open ? "Close" : "Menu"}
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-current/15">
              <span
                className={`absolute h-px w-3.5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
              />
              <span
                className={`absolute h-px w-3.5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`grain fixed inset-0 z-40 flex flex-col bg-ink text-paper transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pt-24">
          <ol>
            {links.map((l, i) => (
              <li
                key={l.label}
                className="border-b border-paper/10 transition-[opacity,transform] duration-700 ease-out-expo"
                style={{
                  transitionDelay: open ? `${120 + i * 50}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                }}
              >
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3.5"
                >
                  <span className="display text-[clamp(2.4rem,9vw,3.6rem)]">{l.label}</span>
                  <span className="label text-paper/40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="shell grid grid-cols-2 gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a
            href={PHONE_HREF}
            tabIndex={open ? 0 : -1}
            className="rounded-full border border-paper/25 py-3.5 text-center text-[0.95rem]"
          >
            Call us
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className="rounded-full border border-paper/25 py-3.5 text-center text-[0.95rem]"
          >
            WhatsApp
          </a>
          <a
            href="#contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="col-span-2 rounded-full bg-gold py-4 text-center text-[0.95rem] font-medium text-ink"
          >
            Get Free Solar Consultation
          </a>
        </div>
      </div>
    </>
  );
}
