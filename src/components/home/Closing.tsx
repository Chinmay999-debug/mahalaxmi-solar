import { useEffect, useRef, useState, type FormEvent } from "react";
import dusk from "@/assets/cta-dusk.jpg";
import { Reveal } from "@/components/Reveal";
import { Arrow, CTA, Marker, Wordmark } from "@/components/brand";
import {
  EMAIL_DISPLAY,
  EMAIL_HREF,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  whatsappLink,
} from "@/lib/contact";

const PROPERTY_TYPES = ["Home", "Business", "Industry"] as const;

function ConsultationForm() {
  const [type, setType] = useState<(typeof PROPERTY_TYPES)[number]>("Home");
  const [sentLink, setSentLink] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const message = [
      "Hello Mahalaxmi Solar Service, I would like a free solar consultation.",
      "",
      `Property: ${type}`,
      `Name: ${name}`,
      `Location: ${location}`,
      ...(note ? [`Requirement: ${note}`] : []),
    ].join("\n");
    const link = whatsappLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
    setSentLink(link);
  };

  const reset = () => {
    formRef.current?.reset();
    setType("Home");
    setSentLink(null);
  };

  const field =
    "w-full border-0 border-b border-ink/25 bg-transparent px-0 pt-1 pb-3 text-[1.05rem] text-ink placeholder:text-ink/40 focus:border-ink focus:ring-0 focus:outline-none";

  if (sentLink) {
    return (
      <div
        role="status"
        className="flex min-h-[460px] flex-col justify-between rounded-[3px] bg-paper p-6 text-ink sm:p-8 md:p-10"
      >
        <div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gold">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <p className="display mt-6 text-[2.2rem] leading-[1.05]">Almost done.</p>
          <p className="mt-3 max-w-[34ch] text-[1.05rem] leading-relaxed text-ink/70">
            WhatsApp has opened with your details filled in. Press <strong>send</strong> there and
            our team will get back to you.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          <a
            href={sentLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-full bg-ink py-3.5 pr-3.5 pl-6 text-[1rem] font-medium text-paper transition-colors hover:bg-ink-2"
          >
            WhatsApp didn&rsquo;t open? Try again
            <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10">
              <Arrow />
            </span>
          </a>
          <p className="text-[0.92rem] text-ink/60">
            Or call us on{" "}
            <a
              href={PHONE_HREF}
              className="text-ink underline decoration-ink/30 underline-offset-4"
            >
              {PHONE_DISPLAY}
            </a>
            .{" "}
            <button
              type="button"
              onClick={reset}
              className="text-ink underline decoration-ink/30 underline-offset-4"
            >
              Start a new request
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-[3px] bg-paper p-6 text-ink sm:p-8 md:p-10"
    >
      <p className="display text-[2rem] leading-[1.05]">Request a free consultation</p>
      <p className="mt-2 text-[0.95rem] text-ink/60">We&rsquo;ll reply on WhatsApp.</p>

      <fieldset className="mt-8">
        <legend className="label text-ink/60">Property</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {PROPERTY_TYPES.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border py-2.5 text-center text-[0.95rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                type === t ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label text-ink/60">Name</span>
          <input name="name" required autoComplete="name" className={`${field} mt-1`} />
        </label>
        <label className="block">
          <span className="label text-ink/60">Location</span>
          <input
            name="location"
            required
            autoComplete="address-level2"
            placeholder="Area, city"
            className={`${field} mt-1`}
          />
        </label>
      </div>
      <label className="mt-6 block">
        <span className="label text-ink/60">
          Requirement <span className="text-ink/40">(optional)</span>
        </span>
        <input
          name="note"
          placeholder="System size or a short message"
          className={`${field} mt-1`}
        />
      </label>

      <button
        type="submit"
        className="group mt-9 flex w-full items-center justify-between rounded-full bg-gold py-3.5 pr-3.5 pl-6 text-[1rem] font-medium text-ink transition-colors duration-500 hover:bg-ink hover:text-paper"
      >
        Get Free Solar Consultation
        <span className="grid h-8 w-8 place-items-center rounded-full bg-current/10">
          <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5" />
        </span>
      </button>
      <p className="mt-4 text-[0.88rem] leading-relaxed text-ink/60">
        Opens WhatsApp with your details filled in. Prefer to talk?{" "}
        <a href={PHONE_HREF} className="text-ink underline decoration-ink/30 underline-offset-4">
          Call {PHONE_DISPLAY}
        </a>
      </p>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink text-paper">
      <img
        src={dusk}
        alt=""
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.185 0.022 248 / 0.35) 0%, oklch(0.185 0.022 248 / 0.7) 55%, oklch(0.185 0.022 248 / 0.96) 100%)",
        }}
      />

      <div className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <Marker index="07" className="text-paper/60">
              Contact
            </Marker>
            <h2 className="display mt-6 text-[clamp(3rem,7.4vw,7rem)] leading-[0.92]">
              Ready to switch
              <br />
              to solar<span className="text-gold">?</span>
            </h2>
            <p className="mt-8 max-w-[38ch] text-[1.15rem] leading-relaxed text-paper/75">
              Tell us about your property. We&rsquo;ll get in touch to discuss the right solar
              system.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="label text-paper/50">Call</p>
              <a
                href={PHONE_HREF}
                className="display mt-2 block text-[clamp(1.9rem,3vw,2.5rem)] leading-none transition-colors hover:text-gold"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <p className="label text-paper/50">WhatsApp</p>
              <CTA
                tone="ghost-light"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="mt-2"
              >
                WhatsApp Us
              </CTA>
            </div>
            <div>
              <p className="label text-paper/50">Email</p>
              <a href={EMAIL_HREF} className="link-line mt-2 text-[1.05rem]">
                {EMAIL_DISPLAY}
              </a>
            </div>
            <div>
              <p className="label text-paper/50">Based in</p>
              <p className="mt-2 text-[1.05rem]">{LOCATION}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="lg:col-span-5 lg:col-start-8">
          <ConsultationForm />
        </Reveal>
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Explore",
    items: [
      { label: "Solutions", href: "#solutions" },
      { label: "PM Surya Ghar", href: "#pm-surya-ghar" },
      { label: "Services", href: "#services" },
      { label: "How we work", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Solar EPC", href: "#services" },
      { label: "Rooftop & Ground-Mounted", href: "#services" },
      { label: "On-Grid & Hybrid", href: "#services" },
      { label: "Subsidy Assistance", href: "#pm-surya-ghar" },
      { label: "Electricity Board Work", href: "#services" },
      { label: "AMC & After-Sales", href: "#services" },
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
];

export function Footer() {
  return (
    <footer className="grain bg-ink pb-24 text-paper md:pb-0">
      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-[30ch] text-[1rem] leading-relaxed text-paper/60">
              Solar installation, subsidy assistance and AMC for homes, businesses and industry in
              Jaipur.
            </p>
          </div>
          {footerCols.map((c) => (
            <nav
              key={c.title}
              aria-label={c.title}
              className={c.title === "Contact" ? "md:col-span-3" : "md:col-span-2 lg:col-span-2"}
            >
              <p className="label text-paper/45">{c.title}</p>
              <ul className="mt-5 space-y-2.5">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      {...(it.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="text-[0.98rem] text-paper/75 transition-colors hover:text-gold"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden
          className="display mt-20 text-[clamp(4rem,23.5vw,22rem)] leading-[0.8] tracking-[-0.03em] text-paper/[0.07] select-none md:mt-28"
        >
          Mahalaxmi
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 text-[0.85rem] text-paper/45">
          <span>
            © {new Date().getFullYear()} Mahalaxmi Solar Service · {LOCATION}
          </span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-paper">
            Back to top <Arrow className="-rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Persistent mobile actions — appear after the hero, step aside at the contact section. */
export function MobileQuoteBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const r = contact?.getBoundingClientRect();
      const atContact = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-[1fr_1fr_1.6fr] gap-1 rounded-full bg-ink/92 p-1 shadow-[0_10px_40px_-10px_oklch(0.185_0.022_248/0.6)] backdrop-blur-md transition-[transform,opacity] duration-500 ease-out-expo md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
    >
      <a
        href={PHONE_HREF}
        tabIndex={show ? 0 : -1}
        className="rounded-full py-3 text-center text-[0.9rem] text-paper"
      >
        Call
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        tabIndex={show ? 0 : -1}
        className="rounded-full py-3 text-center text-[0.9rem] text-paper"
      >
        WhatsApp
      </a>
      <a
        href="#contact"
        tabIndex={show ? 0 : -1}
        className="rounded-full bg-gold py-3 text-center text-[0.9rem] font-medium text-ink"
      >
        Free Consultation
      </a>
    </div>
  );
}
