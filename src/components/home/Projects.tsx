import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { Arrow, CTA, Marker } from "@/components/brand";
import { whatsappLink } from "@/lib/contact";
import { IMAGERY_UNTIL_PROJECTS, PROJECTS, type Project } from "@/lib/content";

// Editorial rhythm: wide, tall, tall, wide…
const crops = ["aspect-[3/2]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[3/2]"];
const frame = "h-[min(58svh,460px)] md:h-[min(64vh,600px)]";

function Caption({ p, index }: { p: Project; index: number }) {
  const heading = p.title ?? p.type;
  const meta = [p.title ? p.type : undefined, p.capacity, p.location].filter(Boolean);
  if (!heading && meta.length === 0) return null;
  return (
    <figcaption className="mt-4 flex items-baseline gap-4">
      <span className="label text-ink/40">{String(index + 1).padStart(2, "0")}</span>
      <span>
        {heading && <span className="display block text-[1.6rem] leading-[1.1]">{heading}</span>}
        {meta.length > 0 && (
          <span className="mt-1 block text-[0.95rem] text-ink/60">{meta.join(" · ")}</span>
        )}
      </span>
    </figcaption>
  );
}

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
  };
  const end = () => {
    const el = ref.current;
    if (el) el.style.scrollSnapType = "";
    setTimeout(() => (drag.current = null), 0);
  };
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current?.moved) e.preventDefault();
  };

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerLeave: end,
      onClickCapture,
    },
  };
}

export function Projects() {
  const hasProjects = PROJECTS.length > 0;
  const { ref: trackRef, handlers } = useDragScroll();
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  const items = hasProjects ? PROJECTS : IMAGERY_UNTIL_PROJECTS;

  return (
    <section id="projects" className="bg-paper text-ink">
      <div className="shell pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Marker index="06" className="text-ink/55">
              Projects
            </Marker>
            {hasProjects ? (
              <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
                Selected work.
                <br />
                <span className="text-ink/40">Homes, businesses and industry.</span>
              </h2>
            ) : (
              <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
                Project portfolio.
                <br />
                <span className="text-ink/40">Coming soon.</span>
              </h2>
            )}
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            {!hasProjects && (
              <p className="text-[1.05rem] leading-relaxed text-ink/65">
                We&rsquo;re adding photos and details of our installations. To see work similar to
                yours,{" "}
                <a
                  href={whatsappLink(
                    "Hello Mahalaxmi Solar Service, I would like to see some of your recent installations.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  ask us on WhatsApp
                </a>
                .
              </p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll left"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll right"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <Arrow />
              </button>
              <div className="ml-3 h-px flex-1 bg-ink/15" aria-hidden>
                <div
                  className="h-px bg-ink transition-[width] duration-300"
                  style={{ width: `${Math.max(10, progress * 100)}%` }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Portfolio strip — aligned to the page grid, bleeding off the right edge */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        {...handlers}
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-24 select-none active:cursor-grabbing [padding-inline:max(1.25rem,calc((100vw-1440px)/2+1.25rem))] [scroll-padding-inline:max(1.25rem,calc((100vw-1440px)/2+1.25rem))] md:mt-16 md:gap-6 md:pb-36 md:[padding-inline:max(2.5rem,calc((100vw-1440px)/2+2.5rem))] md:[scroll-padding-inline:max(2.5rem,calc((100vw-1440px)/2+2.5rem))] xl:[padding-inline:max(3.5rem,calc((100vw-1440px)/2+3.5rem))] xl:[scroll-padding-inline:max(3.5rem,calc((100vw-1440px)/2+3.5rem))]"
      >
        {items.map((p, i) => (
          <figure key={`${p.alt}-${i}`} className="shrink-0 snap-start">
            <div
              className={`media max-w-[86vw] overflow-hidden rounded-[2px] bg-ink/5 ${frame} ${crops[i % crops.length]}`}
            >
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
            {hasProjects && <Caption p={p as Project} index={i} />}
          </figure>
        ))}

        {/* Closing panel */}
        <div
          className={`flex aspect-[4/5] max-w-[86vw] shrink-0 snap-start flex-col justify-between rounded-[2px] bg-ink p-7 text-paper md:p-10 ${frame}`}
        >
          <span className="label text-paper/50">Your project</span>
          <div>
            <p className="display text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[1]">
              Have a roof or site in mind?
            </p>
            <CTA href="#contact" className="mt-7">
              Get Free Solar Consultation
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
