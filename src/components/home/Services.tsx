import engineering from "@/assets/engineering.jpg";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/brand";

const groups = [
  {
    name: "Installation",
    note: "Rooftop or on the ground",
    items: [
      ["Solar EPC", "Design, equipment procurement and installation of the whole system."],
      ["Rooftop Solar", "Installations on residential, commercial and industrial rooftops."],
      ["Ground-Mounted Solar", "For open land and larger sites, or where roof space isn't enough."],
    ],
  },
  {
    name: "System type",
    note: "Our speciality",
    items: [
      [
        "On-Grid Solar",
        "Connected to the electricity grid, with the board paperwork handled by us.",
      ],
      ["Hybrid Solar", "Solar with battery backup for when grid power is not available."],
    ],
  },
  {
    name: "Paperwork & maintenance",
    note: "Before and after installation",
    items: [
      ["PM Surya Ghar & Subsidy", "Help with the PM Surya Ghar subsidy process for homes."],
      ["Electricity Board Work", "Applications and paperwork with the electricity board."],
      [
        "AMC & After-Sales",
        "After-sales support and maintenance assistance, with panel cleaning available on request.",
      ],
    ],
  },
];

export function Services() {
  let n = 0;
  return (
    <section id="services" className="bg-paper text-ink">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Image column — sticks while the index scrolls on large screens */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Marker index="03" className="text-ink/55">
                  Services
                </Marker>
                <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)]">
                  What we do.{" "}
                  <span className="text-ink/40">Installation, paperwork and maintenance.</span>
                </h2>
              </Reveal>
              <Reveal variant="clip" className="mt-10 overflow-hidden rounded-[3px] lg:mt-14">
                <img
                  src={engineering}
                  alt="Installer fastening a mounting rail for solar panels"
                  loading="lazy"
                  width={1408}
                  height={1600}
                  className="aspect-[4/3] w-full object-cover object-[center_40%] lg:aspect-[5/4]"
                />
              </Reveal>
            </div>
          </div>

          {/* Service index */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
            {groups.map((g) => (
              <div key={g.name} className="mb-14 last:mb-0 md:mb-20">
                <Reveal className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
                  <h3 className="text-[0.95rem] font-medium">{g.name}</h3>
                  <span className="label text-right text-ink/50">{g.note}</span>
                </Reveal>
                <ul>
                  {g.items.map(([title, desc]) => {
                    n += 1;
                    return (
                      <Reveal
                        as="li"
                        key={title}
                        className="group relative grid grid-cols-[2.2rem_1fr] gap-x-3 border-b border-ink/12 py-6 md:grid-cols-[3rem_1fr] md:py-7"
                      >
                        <span className="label pt-2 text-ink/40 transition-colors group-hover:text-gold-deep">
                          {String(n).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="display text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.02] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                            {title}
                          </h4>
                          <p className="mt-2 max-w-[44ch] text-[1rem] leading-relaxed text-ink/60">
                            {desc}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                        />
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
