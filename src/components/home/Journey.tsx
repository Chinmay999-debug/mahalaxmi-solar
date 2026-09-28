import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { CTA, Marker } from "@/components/brand";

const STEPS = [
  ["Consultation", "We discuss your property, your electricity bill and what you want from solar."],
  [
    "Site Assessment",
    "Our team visits to check the roof or land — structure, direction and shade.",
  ],
  [
    "System Planning",
    "We recommend the system size, layout, on-grid or hybrid setup and components.",
  ],
  ["EPC & Installation", "We procure the equipment and install the system on site."],
  [
    "Subsidy & Board Assistance",
    "PM Surya Ghar subsidy paperwork and electricity-board applications.",
  ],
  ["Commissioning", "The system is tested, switched on and handed over to you."],
  ["AMC & After-Sales", "One year of free AMC, and service whenever you need it after that."],
] as const;

const N = STEPS.length;
const pad = (n: number) => String(n).padStart(2, "0");

// Sun path geometry (SVG units): a half circle rising from the left horizon
const CX = 300;
const CY = 300;
const R = 270;

function pointAt(t: number) {
  const a = Math.PI * (1 - t);
  // Rounded so server and client render identical attribute strings
  const round = (v: number) => Math.round(v * 100) / 100;
  return { x: round(CX + R * Math.cos(a)), y: round(CY - R * Math.sin(a)) };
}

/** 0 → 1 as the element scrolls through the viewport (sticky scene). */
function useStickyProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return [ref, p] as const;
}

function Heading() {
  return (
    <>
      <Marker index="04" className="text-paper/55">
        How we work
      </Marker>
      <h2 className="display mt-5 text-[clamp(2.4rem,4vw,3.9rem)] leading-[1]">
        Seven steps,{" "}
        <span className="text-paper/45">from your first call to after-sales service.</span>
      </h2>
    </>
  );
}

/** The sun path — shared by both layouts. */
function Arc({ t, active, labelSize = 12 }: { t: number; active: number; labelSize?: number }) {
  const sun = pointAt(t);
  const arc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
  return (
    <svg viewBox="0 0 600 320" className="block w-full overflow-visible" aria-hidden>
      <path d={arc} stroke="oklch(0.976 0.007 85 / 0.2)" strokeDasharray="2 6" fill="none" />
      <path
        d={arc}
        stroke="var(--gold)"
        strokeWidth="1.5"
        fill="none"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - t}
      />
      <line x1="0" x2="600" y1={CY} y2={CY} stroke="oklch(0.976 0.007 85 / 0.3)" />
      {STEPS.map(([name], i) => {
        const pt = pointAt((i + 0.5) / N);
        const done = i <= active;
        return (
          <g key={name}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={i === active ? 5 : 3.5}
              fill={done ? "var(--gold)" : "var(--ink)"}
              stroke={done ? "var(--gold)" : "oklch(0.976 0.007 85 / 0.5)"}
            />
            <text
              x={pt.x}
              y={Math.round(pt.y + labelSize * 2)}
              textAnchor="middle"
              className="font-mono"
              fontSize={labelSize}
              fill={i === active ? "var(--gold)" : "oklch(0.976 0.007 85 / 0.4)"}
            >
              {pad(i + 1)}
            </text>
          </g>
        );
      })}
      <circle cx={sun.x} cy={sun.y} r="30" fill="var(--gold)" opacity="0.12" />
      <circle cx={sun.x} cy={sun.y} r="17" fill="var(--gold)" opacity="0.24" />
      <circle cx={sun.x} cy={sun.y} r="8.5" fill="var(--gold)" />
    </svg>
  );
}

/**
 * Desktop: one pinned viewport. All seven steps are listed and connected;
 * scrolling moves the sun along its path and highlights the current step.
 */
function Pinned() {
  const [ref, p] = useStickyProgress<HTMLDivElement>();
  const active = Math.min(N - 1, Math.floor(p * N));
  const step = STEPS[active] ?? STEPS[0];

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / N) * total, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + N * 28}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(45% 55% at ${58 + p * 32}% 80%, oklch(0.72 0.14 60 / ${(0.24 - Math.sin(Math.PI * p) * 0.1).toFixed(3)}) 0%, transparent 70%)`,
          }}
        />

        <div className="shell relative grid grid-cols-12 items-center gap-10 pt-14">
          {/* Steps */}
          <div className="col-span-5">
            <Heading />
            <ol className="relative mt-9">
              <span aria-hidden className="absolute top-4 bottom-4 left-[5px] w-px bg-paper/15" />
              {STEPS.map(([name, text], i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={name} className="relative pl-8">
                    {/* Connector segment below this step fills once it's done */}
                    {i < N - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-[1.3rem] -bottom-[0.95rem] left-[5px] w-px origin-top bg-gold transition-transform duration-500 ease-out-expo"
                        style={{ transform: done ? "scaleY(1)" : "scaleY(0)" }}
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute top-[0.95rem] left-0 h-[11px] w-[11px] rounded-full border transition-colors duration-500 ${
                        on
                          ? "border-gold bg-gold shadow-[0_0_0_5px_oklch(0.8_0.13_78/0.2)]"
                          : done
                            ? "border-gold bg-gold"
                            : "border-paper/40 bg-ink"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={on ? "step" : undefined}
                      className="flex w-full items-baseline gap-4 py-2 text-left"
                    >
                      <span className={`label ${on ? "text-gold" : "text-paper/40"}`}>
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`text-[1.15rem] transition-colors duration-500 ${
                          on
                            ? "text-paper"
                            : done
                              ? "text-paper/70"
                              : "text-paper/50 hover:text-paper/80"
                        }`}
                      >
                        {name}
                      </span>
                    </button>
                    <div
                      className={`grid pl-10 transition-[grid-template-rows,opacity] duration-700 ease-out-expo ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-[1rem] leading-relaxed text-paper/65">
                        <span className="block max-w-[40ch] pb-3">{text}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Sun path */}
          <div className="col-span-7 col-start-6 pl-4">
            <div className="relative mx-auto w-full max-w-[calc((100svh-220px)*600/320)]">
              <Arc t={p} active={active} />
              <div className="absolute inset-x-[22%] bottom-[12%] text-center" aria-hidden>
                <p className="label text-paper/50">
                  Step {pad(active + 1)} of {pad(N)}
                </p>
                <p
                  key={step[0]}
                  className="display mt-2 animate-[fade-in_0.6s_ease-out] text-[clamp(2rem,3vw,3.1rem)] leading-[1.02]"
                >
                  {step[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile & tablet: the arc as an overview, then a connected list that fills as you read. */
function Stacked() {
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      setFill(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const active = Math.min(N - 1, Math.floor(fill * N));

  return (
    <div className="shell pt-24 pb-16 md:pt-32 lg:hidden">
      <Heading />
      <div className="mx-auto mt-10 max-w-[520px] px-2">
        <Arc t={fill} active={active} labelSize={20} />
      </div>
      <ol ref={ref} className="relative mt-12 pl-9 md:grid md:grid-cols-2 md:gap-x-10 md:pl-0">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-paper/15 md:hidden"
        />
        <span
          aria-hidden
          className="absolute top-2 left-[5px] w-px bg-gold md:hidden"
          style={{ height: `max(0px, calc(${fill * 100}% - 1rem))` }}
        />
        {STEPS.map(([name, text], i) => {
          const done = i <= active;
          return (
            <li key={name} className="relative pb-8 md:border-t md:border-paper/15 md:pt-5 md:pb-7">
              <span
                aria-hidden
                className={`absolute top-[0.3rem] -left-9 h-[11px] w-[11px] rounded-full border transition-colors duration-500 md:hidden ${
                  done ? "border-gold bg-gold" : "border-paper/40 bg-ink"
                }`}
              />
              <p className={`label transition-colors ${done ? "text-gold" : "text-paper/50"}`}>
                Step {pad(i + 1)}
              </p>
              <h3 className="display mt-1 text-[1.9rem] leading-[1.05]">{name}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-paper/65">{text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Journey() {
  return (
    <section id="process" className="grain bg-ink text-paper">
      <Pinned />
      <Stacked />
      <div className="shell border-t border-paper/10 py-10 md:py-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-[1.1rem] leading-relaxed text-paper/70">
            You deal with one team throughout — no separate installer, consultant or agent for the
            paperwork.
          </p>
          <CTA href="#contact">Get Free Solar Consultation</CTA>
        </Reveal>
      </div>
    </section>
  );
}
