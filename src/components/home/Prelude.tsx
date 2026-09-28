import { Reveal } from "@/components/Reveal";
import { SunMark } from "@/components/brand";

export function Prelude() {
  return (
    <section className="bg-paper">
      <div className="shell grid gap-10 py-24 md:grid-cols-12 md:py-36 lg:py-44">
        <Reveal className="md:col-span-3">
          <div className="flex items-center gap-3 text-ink">
            <SunMark className="h-6 w-6" />
            <span className="label text-[0.8rem] text-ink/70">Complete Solar Solution</span>
          </div>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal>
            <p className="display text-[clamp(2rem,4.4vw,4.1rem)] leading-[1.06] text-ink">
              From the first site visit to after-sales service, one team handles your solar work.{" "}
              <span className="text-ink/40">
                Consultation, planning, installation, subsidy paperwork, electricity-board work,
                commissioning and AMC.
              </span>
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap gap-x-10 gap-y-3 md:mt-14">
            {["Solar EPC", "Rooftop", "Ground-mounted", "On-grid", "Hybrid"].map((t) => (
              <span key={t} className="label text-[0.8rem] text-ink/70">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
