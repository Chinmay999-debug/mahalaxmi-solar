import { useRef, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/hooks/use-in-view";
import { CTA, Marker } from "@/components/brand";
import { whatsappLink } from "@/lib/contact";

const SIZES = [3, 5, 6, 8, 10];

const assistance = [
  ["PM Surya Ghar application", "We help you apply under the scheme for your home."],
  ["Subsidy paperwork", "Documents and follow-up for your subsidy claim."],
  ["Electricity-board work", "Applications and paperwork with the electricity board."],
];

export function SuryaGhar() {
  const [selected, setSelected] = useState(2);
  const [scaleRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const kw = SIZES[selected] ?? 6;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move the selection, as in a native radio group
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const step = keys[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (selected + step + SIZES.length) % SIZES.length;
    setSelected(next);
    buttons.current[next]?.focus();
  };

  return (
    <section id="pm-surya-ghar" className="bg-sand text-ink">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Marker index="02" className="text-ink/60">
              PM Surya Ghar · For homes
            </Marker>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
              Solar for your home,
              <br />
              <em className="text-sand-deep">with PM Surya Ghar</em> assistance.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-[1.08rem] leading-relaxed text-ink/70">
              Residential rooftop systems from 3 kW to 10 kW under the PM Surya Ghar scheme. We help
              with the application, the subsidy paperwork and the electricity-board process.
            </p>
          </Reveal>
        </div>

        {/* Capacity scale — bar height is proportional to system size */}
        <div ref={scaleRef} className="mt-16 md:mt-24">
          <p className="label text-ink/65">Choose a system size</p>
          <div
            role="radiogroup"
            aria-label="Residential system size"
            onKeyDown={onKeyDown}
            className="mt-4 grid h-[280px] grid-cols-5 gap-2 border-b border-ink/40 sm:h-[320px] sm:gap-3 md:h-[400px] md:gap-5"
          >
            {SIZES.map((size, i) => {
              const on = i === selected;
              return (
                <button
                  key={size}
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={`${size} kW`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setSelected(i)}
                  className="group flex h-full flex-col justify-end rounded-t-[2px] text-left focus-visible:outline-offset-4"
                >
                  <span className="flex flex-col pb-3 sm:flex-row sm:items-baseline sm:gap-1.5">
                    <span
                      className={`display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] transition-colors duration-500 ${
                        on ? "text-ink" : "text-ink/60 group-hover:text-ink"
                      }`}
                    >
                      {size}
                    </span>
                    <span className={`label mt-1 sm:mt-0 ${on ? "text-ink" : "text-ink/60"}`}>
                      kW
                    </span>
                  </span>
                  <span
                    className="relative block w-full origin-bottom rounded-t-[2px] transition-[transform,background-color] duration-[1200ms] ease-out-expo"
                    style={{
                      height: `${(size / 10) * 58}%`,
                      transform: inView ? "scaleY(1)" : "scaleY(0)",
                      transitionDelay: inView ? `${i * 90}ms, 0ms` : "0ms",
                      backgroundColor: on ? "var(--ink)" : "oklch(0.185 0.022 248 / 0.12)",
                      backgroundImage: on
                        ? "repeating-linear-gradient(0deg, oklch(0.8 0.13 78 / 0.9) 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, oklch(0.8 0.13 78 / 0.35) 0 1px, transparent 1px 25%)"
                        : "repeating-linear-gradient(0deg, oklch(0.185 0.022 248 / 0.16) 0 1px, transparent 1px 14px)",
                    }}
                  >
                    {/* Selected marker — the sun above the chosen system */}
                    <span
                      aria-hidden
                      className={`absolute -top-[3px] left-0 h-[3px] w-full bg-gold transition-opacity duration-500 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[1.1rem] text-ink/75" aria-live="polite">
              Selected: <span className="display text-[1.7rem] text-ink">{kw} kW</span> rooftop
              system · on-grid or hybrid
            </p>
            <CTA
              tone="ink"
              href={whatsappLink(
                `Hello Mahalaxmi Solar Service, I would like to know more about a ${kw} kW rooftop solar system for my home under PM Surya Ghar.`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              Ask about a {kw} kW system
            </CTA>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-ink/20 md:mt-28 md:grid-cols-3">
          {assistance.map(([title, text], i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 90}
              className={`border-b border-ink/20 py-6 md:border-b-0 md:py-8 ${i > 0 ? "md:border-l md:pl-8" : "md:pr-8"}`}
            >
              <span className="label text-sand-deep">0{i + 1}</span>
              <h3 className="display mt-3 text-[2rem]">{title}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-ink/65">{text}</p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 max-w-[60ch] text-[0.9rem] leading-relaxed text-ink/55">
          Subsidy eligibility and amounts are decided under the PM Surya Ghar scheme. We&rsquo;ll
          explain what applies to your home.
        </p>
      </div>
    </section>
  );
}
