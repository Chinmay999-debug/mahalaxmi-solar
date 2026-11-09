import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Arrow, Marker } from "@/components/brand";
import { CLIENTS, type ClientExperience } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Unapproved drafts are previewable locally (`npm run dev`) and never in a production build. */
const SHOW_DRAFTS = import.meta.env.DEV;

/** Two-letter monogram, used in place of a photo until one is supplied. */
function initials(c: ClientExperience) {
  const source = (c.name ?? c.organization)
    .replace(/^(Dr|Mr|Mrs|Ms|Shri|Smt)\.?\s+/i, "")
    .replace(/\s+Ji\b/gi, "");
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Typographic opening quote, drawn so it renders identically everywhere. */
function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden className={className} fill="currentColor">
      <path d="M0 36V22.4C0 9.9 6.3 2.4 18.4 0l1.9 4.6C13.4 6.6 10 11 9.6 17.2H19V36H0Zm27.6 0V22.4C27.6 9.9 33.9 2.4 46 0l2 4.6C41 6.6 37.6 11 37.2 17.2h9.4V36H27.6Z" />
    </svg>
  );
}

function ClientCard({ client }: { client: ClientExperience }) {
  const heading = client.name ?? client.organization;
  const subline = client.name ? client.organization : undefined;
  const meta = [client.designation, client.location].filter(Boolean).join(" · ");
  const { status, text } = client.review;
  // The live site publishes approved reviews only. Drafts appear solely in the
  // local dev preview, clearly badged, so the wording can be checked with the client.
  const isDraft = status !== "approved";
  const shown = !isDraft || SHOW_DRAFTS ? text.trim() : "";

  return (
    <figure className="relative flex h-full flex-col rounded-[2px] border border-ink/10 bg-paper px-7 pt-8 pb-7 transition-colors duration-500 hover:border-ink/20 md:px-9 md:pt-9 md:pb-8">
      <span aria-hidden className="absolute top-0 left-7 h-px w-12 bg-gold md:left-9" />

      <div className="flex items-start justify-between gap-4">
        <QuoteMark className="h-7 w-auto shrink-0 text-gold md:h-8" />
        {shown && isDraft && (
          <span className="label rounded-full border border-dashed border-gold-deep/50 px-2.5 py-1 text-[0.68rem] text-gold-deep">
            Draft · awaiting client approval
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-1 flex-col md:mt-7">
        {shown ? (
          <blockquote className="display text-[clamp(1.32rem,1.55vw,1.5rem)] leading-[1.34] text-ink/90">
            {shown}
          </blockquote>
        ) : (
          <p className="display text-[clamp(1.32rem,1.55vw,1.5rem)] leading-[1.34] text-ink/40 italic">
            Client feedback coming soon.
          </p>
        )}
      </div>

      <figcaption className="mt-8 flex items-start gap-4 border-t border-ink/12 pt-6 md:mt-10">
        {client.photo ? (
          <img
            src={client.photo}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="display grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-deep/35 bg-ivory/60 text-[1.15rem] leading-none text-gold-deep"
          >
            {initials(client)}
          </span>
        )}
        <span className="min-h-[4.75rem] min-w-0">
          <span className="display block text-[1.5rem] leading-[1.1] text-ink">{heading}</span>
          {subline && (
            <span className="mt-1 block text-[0.95rem] leading-snug text-ink/65">{subline}</span>
          )}
          {meta && <span className="label mt-1.5 block text-ink/45">{meta}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

const navButton =
  "grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-25";

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const total = CLIENTS.length;
  // Range of cards fully in view, so the indicator is honest on wide screens too.
  const [visible, setVisible] = useState<[number, number]>([0, 0]);
  const [edges, setEdges] = useState({ start: true, end: false });
  // Card an in-flight smooth scroll is heading to, so rapid clicks keep advancing.
  const target = useRef<number | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const cards = Array.from(el.children) as HTMLElement[];
    const inView = cards
      .map((c, i) => ({ r: c.getBoundingClientRect(), i }))
      .filter(({ r }) => r.left >= box.left - 2 && r.right <= box.right + 2)
      .map(({ i }) => i);
    const a = inView[0];
    const b = inView[inView.length - 1];
    if (a !== undefined && b !== undefined) setVisible([a, b]);
    const max = el.scrollWidth - el.clientWidth;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft >= max - 2;
    clearTimeout(idle.current);
    idle.current = setTimeout(() => (target.current = null), 160);
    setEdges({ start, end });
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (total === 0) return null;

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[Math.max(0, Math.min(total - 1, i))] as HTMLElement | undefined;
    if (!el || !card) return;
    target.current = Math.max(0, Math.min(total - 1, i));
    const padStart = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - padStart, behavior: "smooth" });
  };

  const [first, last] = visible;
  const counter = first === last ? pad(first + 1) : `${pad(first + 1)}–${pad(last + 1)}`;

  return (
    <section id="clients" aria-labelledby="clients-title" className="bg-ivory text-ink">
      <div className="shell pt-24 md:pt-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Marker className="text-ink/55">Client experiences</Marker>
            <h2 id="clients-title" className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
              Trusted by our clients.
            </h2>
          </Reveal>

          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo((target.current ?? first) - 1)}
                  disabled={edges.start}
                  aria-label="Previous client"
                  aria-controls="clients-track"
                  className={navButton}
                >
                  <Arrow className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo((target.current ?? first) + 1)}
                  disabled={edges.end}
                  aria-label="Next client"
                  aria-controls="clients-track"
                  className={navButton}
                >
                  <Arrow />
                </button>
              </div>

              <div className="flex flex-1 items-center gap-1.5" aria-hidden>
                {CLIENTS.map((c, i) => (
                  <button
                    key={c.organization}
                    type="button"
                    tabIndex={-1}
                    onClick={() => goTo(i)}
                    className="group flex h-6 flex-1 items-center"
                  >
                    <span
                      className={`h-px w-full transition-colors duration-500 ${
                        i >= first && i <= last ? "bg-ink" : "bg-ink/15 group-hover:bg-ink/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span
                className="label shrink-0 text-right whitespace-nowrap text-ink/50"
                aria-live="polite"
              >
                {counter} <span className="text-ink/30">/ {pad(total)}</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <ul
        id="clients-track"
        ref={trackRef}
        onScroll={measure}
        aria-label="Clients"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-24 [padding-inline:max(1.25rem,calc((100vw-1440px)/2+1.25rem))] [scroll-padding-inline:max(1.25rem,calc((100vw-1440px)/2+1.25rem))] md:mt-16 md:gap-6 md:pb-36 md:[padding-inline:max(2.5rem,calc((100vw-1440px)/2+2.5rem))] md:[scroll-padding-inline:max(2.5rem,calc((100vw-1440px)/2+2.5rem))] xl:[padding-inline:max(3.5rem,calc((100vw-1440px)/2+3.5rem))] xl:[scroll-padding-inline:max(3.5rem,calc((100vw-1440px)/2+3.5rem))]"
      >
        {CLIENTS.map((client, i) => (
          <Reveal
            as="li"
            key={`${client.organization}-${i}`}
            delay={Math.min(i, 3) * 70}
            variant="fade"
            className="w-full shrink-0 snap-start sm:w-[360px] lg:w-[380px]"
          >
            <div className="h-full">
              <ClientCard client={client} />
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
