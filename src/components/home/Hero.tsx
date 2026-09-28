import heroImg from "@/assets/project-featured.jpg";
import { CTA, Arrow } from "@/components/brand";
import { LOCATION, FOUNDED } from "@/lib/contact";

const SEGMENTS = [
  { id: "residential", name: "Residential", note: "3–10 kW rooftop · PM Surya Ghar" },
  { id: "commercial", name: "Commercial", note: "Solar EPC · rooftop & ground-mounted" },
  { id: "industrial", name: "Industrial", note: "Solar EPC · rooftop & ground-mounted" },
] as const;

function focusSegment(i: number) {
  window.dispatchEvent(new CustomEvent("segment:focus", { detail: i }));
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-paper">
      <img
        src={heroImg}
        alt="Sandstone home in Rajasthan with a rooftop solar array at golden hour"
        width={1920}
        height={1200}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full animate-[settle_2.8s_var(--ease-out-expo)_both] object-cover object-[62%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.185 0.022 248 / 0.55) 0%, oklch(0.185 0.022 248 / 0.05) 28%, oklch(0.185 0.022 248 / 0.15) 50%, oklch(0.185 0.022 248 / 0.92) 100%), linear-gradient(90deg, oklch(0.185 0.022 248 / 0.55) 0%, transparent 65%)",
        }}
      />

      <div className="shell flex min-h-[100svh] flex-col pt-[112px] md:pt-[128px]">
        <p
          className="label flex items-center gap-3 text-paper/75 opacity-0"
          style={{ animation: "fade-in 1.2s 0.9s var(--ease-out-expo) forwards" }}
        >
          <span className="inline-block h-px w-8 bg-gold" />
          {LOCATION} · Since {FOUNDED}
        </p>

        <div className="mt-auto pb-10 md:pb-14">
          <h1 className="display text-[clamp(3.4rem,10.5vw,10rem)] leading-[0.9]">
            <span className="rise">
              <span style={{ animationDelay: "0.15s" }}>Complete solar</span>
            </span>
            <span className="rise">
              <span style={{ animationDelay: "0.28s" }}>
                solutions<span className="text-gold">.</span>
              </span>
            </span>
          </h1>

          <div
            className="mt-7 flex flex-col gap-8 opacity-0 md:mt-9 md:flex-row md:items-end md:justify-between"
            style={{ animation: "fade-in 1.4s 0.7s var(--ease-out-expo) forwards" }}
          >
            <p className="max-w-[30ch] text-[1.2rem] leading-[1.45] text-paper/85 md:text-[1.45rem]">
              Residential, commercial and industrial solar installations in Jaipur, including EPC,
              subsidy assistance and electricity-board work.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <CTA href="#contact">Get Free Solar Consultation</CTA>
              <a href="#solutions" className="link-line text-[0.98rem] text-paper/90">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>

        {/* The three kinds of property, stated up front */}
        <ol
          className="grid grid-cols-3 border-t border-paper/20 opacity-0"
          style={{ animation: "fade-in 1.4s 1s var(--ease-out-expo) forwards" }}
        >
          {SEGMENTS.map((s, i) => (
            <li key={s.id} className={i > 0 ? "border-l border-paper/20" : ""}>
              <a
                href="#solutions"
                onClick={() => focusSegment(i)}
                className={`group relative flex h-full flex-col gap-1 py-4 pr-2 md:py-6 md:pr-6 ${
                  i > 0 ? "pl-3 md:pl-6" : ""
                }`}
              >
                <span className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                <span className="label text-paper/45">0{i + 1}</span>
                <span className="flex items-center justify-between gap-2">
                  <span className="display text-[clamp(1.15rem,3.4vw,2.1rem)]">{s.name}</span>
                  <Arrow className="hidden text-paper/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold md:block" />
                </span>
                <span className="hidden text-[0.85rem] text-paper/60 md:block">{s.note}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
