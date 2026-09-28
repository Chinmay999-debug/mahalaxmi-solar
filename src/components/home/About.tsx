import { Reveal } from "@/components/Reveal";
import { useInView } from "@/hooks/use-in-view";
import { Marker } from "@/components/brand";
import { FOUNDED } from "@/lib/contact";

const facts = [
  {
    value: "Complete service",
    label: "Scope",
    text: "From consultation to AMC, with one point of contact.",
  },
  {
    value: "On-grid & Hybrid",
    label: "Speciality",
    text: "Grid-connected systems, with or without battery backup.",
  },
  {
    value: "Rooftop & Ground",
    label: "Mounting",
    text: "Homes, commercial roofs, industrial sheds and open land.",
  },
  {
    value: "1 Year",
    label: "Free AMC",
    text: "Included for the first year after installation.",
  },
];

function Timeline() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const now = new Date().getFullYear();
  const years = Array.from({ length: now - FOUNDED + 1 }, (_, i) => FOUNDED + i);

  return (
    <div ref={ref} className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
      <span
        className={`display block text-[clamp(8rem,44vw,23rem)] md:text-[clamp(7rem,27vw,23rem)] leading-[0.78] tracking-[-0.03em] transition-[opacity,transform] duration-[1400ms] ease-out-expo ${
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {FOUNDED}
      </span>
      <div className="relative flex-1 pb-2 md:pb-[1.4vw]">
        <div className="flex items-end justify-between">
          {years.map((y, i) => {
            const edge = i === 0 || i === years.length - 1;
            return (
              <span
                key={y}
                className="w-px bg-ink transition-[transform,opacity] duration-700 ease-out-expo"
                style={{
                  height: edge ? 28 : y % 5 === 0 ? 18 : 10,
                  opacity: inView ? (edge ? 1 : 0.35) : 0,
                  transform: inView ? "none" : "scaleY(0)",
                  transformOrigin: "bottom",
                  transitionDelay: `${300 + i * 45}ms`,
                }}
              />
            );
          })}
        </div>
        <div
          className="h-px origin-left bg-ink transition-transform duration-[1600ms] ease-out-expo"
          style={{ transform: inView ? "scaleX(1)" : "scaleX(0)", transitionDelay: "200ms" }}
        />
        <div className="mt-3 flex justify-between">
          <span className="label text-ink/55">Est. Jaipur</span>
          <span className="label text-ink">
            Today <span className="text-gold-deep">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-ivory text-ink">
      <div className="shell py-24 md:py-36">
        <Reveal>
          <Marker index="05" className="text-ink/55">
            About
          </Marker>
        </Reveal>

        <div className="mt-10 md:mt-14">
          <Timeline />
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.02]">
              Serving customers since {FOUNDED}.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[1.08rem] leading-relaxed text-ink/70">
              Mahalaxmi Solar Service is based in Jaipur and installs solar systems for homes,
              commercial properties and industrial sites.
            </p>
          </Reveal>

          {/* Fact sheet — laid out like a drawing's title block */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-baseline justify-between border-b border-ink pb-3">
              <h3 className="text-[0.95rem] font-medium">Why Mahalaxmi Solar</h3>
              <span className="label text-ink/50">At a glance</span>
            </div>
            <dl className="grid sm:grid-cols-2">
              {facts.map((f, i) => (
                <Reveal
                  key={f.value}
                  delay={i * 80}
                  className={`border-b border-ink/15 py-7 sm:py-9 ${
                    i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"
                  }`}
                >
                  <dt>
                    <span className="label text-gold-deep">{f.label}</span>
                    <span className="display mt-2 block text-[clamp(2.2rem,3.6vw,3.3rem)] leading-[1]">
                      {f.value}
                    </span>
                  </dt>
                  <dd className="mt-3 max-w-[34ch] text-[1rem] leading-relaxed text-ink/65">
                    {f.text}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
