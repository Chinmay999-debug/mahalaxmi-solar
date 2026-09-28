import { useEffect, useRef, useState } from "react";
import residential from "@/assets/residential.jpg";
import commercial from "@/assets/commercial.jpg";
import industrial from "@/assets/industrial.jpg";
import { Reveal } from "@/components/Reveal";
import { Arrow, Marker } from "@/components/brand";

const properties = [
  {
    id: "residential",
    segment: "Residential",
    title: "Homes",
    image: residential,
    alt: "Contemporary home with rooftop solar panels",
    line: "Rooftop solar for homes, with help on the PM Surya Ghar scheme.",
    specs: [
      ["Capacity", "3 – 10 kW"],
      ["Scheme", "PM Surya Ghar"],
      ["Mounting", "Rooftop"],
      ["System", "On-grid / Hybrid"],
    ],
    cta: "Plan a home system",
  },
  {
    id: "commercial",
    segment: "Commercial",
    title: "Businesses",
    image: commercial,
    alt: "Large solar array across a commercial building rooftop",
    line: "Solar systems for shops, offices, institutions and other commercial properties.",
    specs: [
      ["Service", "Solar EPC"],
      ["Mounting", "Rooftop / Ground-mounted"],
      ["System", "On-grid / Hybrid"],
    ],
    cta: "Discuss your commercial project",
  },
  {
    id: "industrial",
    segment: "Industrial",
    title: "Industry",
    image: industrial,
    alt: "Solar panels covering a large industrial shed roof",
    line: "Solar EPC for factories and industrial sites, on the roof or on open ground.",
    specs: [
      ["Service", "Solar EPC"],
      ["Mounting", "Rooftop / Ground-mounted"],
      ["System", "On-grid / Hybrid"],
    ],
    cta: "Discuss your industrial project",
  },
];

function Specs({ specs }: { specs: string[][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 border-t border-paper/20">
      {specs.map(([k, v]) => (
        <div key={k} className="border-b border-paper/15 py-3">
          <dt className="label text-paper/50">{k}</dt>
          <dd className="mt-1 text-[1.02rem] text-paper">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Solutions() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Hero links jump straight to a property
  useEffect(() => {
    const onFocus = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      setActive(i);
      const track = trackRef.current;
      const card = track?.children[i] as HTMLElement | undefined;
      if (track && card && window.matchMedia("(max-width: 767px)").matches) {
        track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
      }
    };
    window.addEventListener("segment:focus", onFocus);
    return () => window.removeEventListener("segment:focus", onFocus);
  }, []);

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track || !window.matchMedia("(max-width: 767px)").matches) return;
    const w = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setActive(Math.round(track.scrollLeft / w));
  };

  return (
    <section id="solutions" className="grain bg-ink text-paper">
      <div className="shell pt-24 pb-10 md:pt-36 md:pb-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Marker index="01" className="text-paper/55">
              Solutions
            </Marker>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
              Solar for homes, businesses <span className="text-paper/45">and industry.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="text-[1.08rem] leading-relaxed text-paper/65">
              A house, a showroom and a factory each need a different system. We help you choose the
              right size and type for your property.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: expanding panels. Mobile: swipeable full-height cards. */}
      <div className="md:shell pb-24 md:pb-36">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 md:h-[min(82vh,760px)] md:min-h-[580px] md:gap-2 md:overflow-visible md:px-0"
        >
          {properties.map((p, i) => {
            const isActive = active === i;
            return (
              <article
                key={p.id}
                id={p.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative flex min-h-[max(600px,76svh)] w-[86vw] flex-col shrink-0 snap-start overflow-hidden rounded-[3px] transition-[flex-grow] duration-[1100ms] ease-out-expo md:min-h-0 md:w-auto md:shrink md:basis-0"
                style={{ flexGrow: isActive ? 2.6 : 1 }}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out-expo ${
                    isActive ? "md:scale-100" : "md:scale-110"
                  }`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.185 0.022 248 / 0.35) 0%, oklch(0.185 0.022 248 / 0) 30%, oklch(0.185 0.022 248 / 0.25) 55%, oklch(0.185 0.022 248 / 0.94) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 hidden bg-ink/45 transition-opacity duration-700 md:block ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-transparent from-25% to-ink/85 to-60% md:hidden"
                />

                {/* Collapsed desktop state: title set vertically */}
                <span
                  aria-hidden
                  className={`display absolute bottom-7 left-5 hidden rotate-180 text-[clamp(2.2rem,3.2vw,3.2rem)] whitespace-nowrap transition-opacity duration-500 [writing-mode:vertical-rl] md:block lg:left-7 ${
                    isActive ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {p.title}
                </span>

                <div
                  className={`relative flex flex-1 flex-col justify-between gap-10 p-5 transition-opacity md:p-7 lg:p-9 ${
                    isActive
                      ? "md:opacity-100 md:delay-200 md:duration-700"
                      : "md:opacity-0 md:duration-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="label text-paper/80">
                      0{i + 1} — {p.segment}
                    </span>
                    <span className="label rounded-full border border-paper/30 px-2.5 py-1 whitespace-nowrap text-paper/80">
                      {p.specs[0]?.[1]}
                    </span>
                  </div>

                  <div className="md:w-[min(34rem,calc((min(100vw,1440px)-7rem)*0.56-4.5rem))]">
                    <h3 className="display text-[clamp(2.8rem,5vw,5rem)] whitespace-nowrap">
                      {p.title}
                    </h3>
                    <p className="mt-4 mb-6 max-w-[38ch] text-[1.02rem] leading-relaxed text-paper/80">
                      {p.line}
                    </p>
                    <Specs specs={p.specs} />
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-[0.98rem] text-gold transition-colors hover:text-paper"
                    >
                      {p.cta} <Arrow />
                    </a>
                  </div>
                </div>

                {/* Collapsed desktop state: segment label */}
                <span
                  aria-hidden
                  className={`label absolute top-7 left-5 hidden text-paper/70 transition-opacity duration-500 md:block lg:left-7 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  0{i + 1}
                </span>
              </article>
            );
          })}
        </div>

        {/* Mobile position indicator */}
        <div className="mt-6 flex items-center gap-2 px-5 md:hidden" aria-hidden>
          {properties.map((p, i) => (
            <span
              key={p.id}
              className={`h-px flex-1 transition-colors duration-500 ${active === i ? "bg-gold" : "bg-paper/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
