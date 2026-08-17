import { Reveal } from "@/components/Reveal";
import residential from "@/assets/residential.jpg";
import commercial from "@/assets/commercial.jpg";
import industrial from "@/assets/industrial.jpg";
import engineering from "@/assets/engineering.jpg";
import projectFeatured from "@/assets/project-featured.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const stats = [
  { value: "500+", label: "Installations" },
  { value: "8 MW+", label: "Installed" },
  { value: "12+", label: "Years Experience" },
  { value: "25 Years", label: "Panel Performance" },
];

export function Statement() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-44">
        <Reveal>
          <p className="eyebrow text-olive">Why Solar</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="display mt-12 max-w-[24ch] text-[clamp(2.2rem,6vw,5rem)] text-foreground">
            Your roof is more than <span className="text-olive italic">a roof.</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-14 ml-auto max-w-lg text-[1.02rem] leading-[1.75] text-muted-foreground md:mt-24 md:text-[1.12rem]">
            It can generate the electricity your property uses every day — turning unused space
            into a long-term energy asset.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-2 border-t border-foreground/15 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className={`border-b border-foreground/15 py-10 md:border-b-0 md:py-14 ${
                i % 2 === 1 ? "border-l pl-6 md:pl-10" : "pr-6"
              } ${i > 0 ? "md:border-l md:border-foreground/15 md:pl-10" : ""}`}
            >
              <div className="text-[clamp(1.9rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em] text-foreground">
                {s.value}
              </div>
              <div className="mt-4 text-[0.82rem] tracking-[0.04em] text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionText({
  index,
  title,
  copy,
  light = false,
}: {
  index: string;
  title: string;
  copy: string;
  light?: boolean;
}) {
  return (
    <div className={light ? "text-softwhite" : ""}>
      <span className={`eyebrow ${light ? "text-gold" : "text-olive"}`}>{index}</span>
      <h3 className="display mt-6 text-[clamp(1.9rem,3.6vw,3.1rem)]">{title}</h3>
      <p
        className={`mt-6 max-w-md text-[1rem] leading-[1.75] ${
          light ? "text-softwhite/75" : "text-muted-foreground"
        }`}
      >
        {copy}
      </p>
      <a
        href="#quote"
        className={`link-underline mt-10 text-[0.85rem] font-medium ${
          light ? "text-softwhite" : "text-foreground"
        }`}
      >
        Explore <span aria-hidden>→</span>
      </a>
    </div>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="bg-softwhite">
      <div className="mx-auto max-w-[1440px] px-6 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[clamp(2rem,5vw,4.2rem)]">
            Solar for the way you live and work.
          </h2>
        </Reveal>

        <div className="mt-20 grid items-center gap-12 md:mt-32 md:grid-cols-12 md:gap-16">
          <Reveal className="media md:col-span-7">
            <img
              src={residential}
              alt="Contemporary Indian house with rooftop solar array"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-[46vh] w-full object-cover md:h-[64vh]"
            />
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <SolutionText
              index="01 — Residential"
              title="Residential Solar"
              copy="Solar designed around your home and your energy needs."
            />
          </Reveal>
        </div>

        <div className="mt-24 grid items-center gap-12 md:mt-40 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4 md:order-1">
            <SolutionText
              index="02 — Commercial"
              title="Commercial Solar"
              copy="Turn unused rooftop space into a long-term energy asset."
            />
          </Reveal>
          <Reveal delay={120} className="media md:order-2 md:col-span-7 md:col-start-6">
            <img
              src={commercial}
              alt="Commercial rooftop covered with solar panels"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-[46vh] w-full object-cover md:h-[64vh]"
            />
          </Reveal>
        </div>
      </div>

      <Reveal className="media relative mt-24 md:mt-40">
        <img
          src={industrial}
          alt="Industrial rooftop solar installation in Rajasthan"
          loading="lazy"
          width={1920}
          height={1008}
          className="h-[62vh] w-full object-cover md:h-[86vh]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.213 0.028 232.5 / 0.82) 0%, oklch(0.213 0.028 232.5 / 0.25) 62%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 mx-auto flex max-w-[1440px] items-end px-6 pb-14 md:items-center md:px-10 md:pb-0">
          <SolutionText
            index="03 — Industrial"
            title="Industrial Solar"
            copy="Scalable systems designed for high-consumption facilities."
            light
          />
        </div>
      </Reveal>
    </section>
  );
}

export function Engineering() {
  const points = ["Site Assessment", "System Design", "Quality Installation", "Ongoing Support"];
  return (
    <section id="about" className="bg-navy text-softwhite">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 md:grid-cols-12 md:gap-20 md:px-10 md:py-40">
        <Reveal className="media md:col-span-5">
          <img
            src={engineering}
            alt="Technician mounting a solar panel rail on a rooftop"
            loading="lazy"
            width={1408}
            height={1600}
            className="h-[52vh] w-full object-cover md:h-[76vh]"
          />
        </Reveal>
        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.6rem)]">
              Good solar starts with good engineering.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-lg text-[1rem] leading-[1.8] text-softwhite/70">
              Every installation begins with understanding the property, the energy requirement and
              the conditions that affect system performance.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal
                key={p}
                delay={140 + i * 80}
                className="border-t border-softwhite/15 py-6 pr-6"
              >
                <span className="text-[0.72rem] text-gold">0{i + 1}</span>
                <div className="mt-2 text-[1.05rem] font-medium">{p}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const smallProjects = [
  { img: project2, title: "25 kW Commercial", place: "Jaipur, Rajasthan" },
  { img: project3, title: "100 kW Industrial", place: "Rajasthan" },
  { img: project4, title: "8 kW Villa", place: "Jaipur, Rajasthan" },
];

export function Projects() {
  return (
    <section id="projects" className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5vw,4.2rem)]">Built to perform.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-[0.98rem] leading-relaxed text-muted-foreground">
              A look at the systems we've designed and installed.
            </p>
          </Reveal>
        </div>

        <Reveal className="group mt-16 md:mt-24">
          <div className="media">
            <img
              src={projectFeatured}
              alt="Featured 5.5 kW residential solar installation in Jaipur"
              loading="lazy"
              width={1920}
              height={1200}
              className="h-[52vh] w-full object-cover md:h-[88vh]"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground/15 pt-6">
            <h3 className="text-[1.4rem] font-medium tracking-[-0.02em] md:text-[1.9rem]">
              5.5 kW Residential Solar
            </h3>
            <span className="text-[0.88rem] text-muted-foreground">Jaipur, Rajasthan</span>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-3 md:gap-8">
          {smallProjects.map((p, i) => (
            <Reveal key={p.title} delay={i * 110} className={i === 1 ? "md:mt-20" : ""}>
              <div className="media">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  className="h-[42vh] w-full object-cover md:h-[52vh]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-foreground/15 pt-4">
                <h4 className="text-[1.02rem] font-medium">{p.title}</h4>
                <span className="text-[0.8rem] text-muted-foreground">{p.place}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 md:mt-28">
          <a href="#projects" className="link-underline text-[0.92rem] font-medium">
            View All Projects <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const savings = [
  { value: "₹8,000", label: "Monthly electricity bill" },
  { value: "5.5 kW", label: "Indicative system" },
  { value: "₹60,000+", label: "Potential annual savings" },
  { value: "4–6 years", label: "Indicative payback" },
];

export function Savings() {
  return (
    <section className="bg-softwhite">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <h2 className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.8rem)]">
            What could solar save you?
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {savings.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 border-t border-foreground/15 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:py-11"
            >
              <div
                className={`text-[clamp(1.8rem,4.6vw,3.4rem)] leading-none font-semibold tracking-[-0.045em] ${
                  i === 2 ? "text-gold" : "text-foreground"
                }`}
              >
                {s.value}
              </div>
              <div className="text-[0.92rem] text-muted-foreground md:text-[1rem]">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-foreground/15 pt-8">
          <p className="text-[0.8rem] text-muted-foreground italic">Indicative estimates only.</p>
          <a href="#quote" className="link-underline text-[0.92rem] font-medium">
            Calculate Your Savings <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const steps = ["Consult", "Assess", "Install", "Power Up"];

export function Process() {
  return (
    <section id="process" className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <h2 className="display max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.6rem)]">
            From first conversation to first unit of power.
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-y-12 md:mt-28 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 110} className="border-t border-foreground/20 pt-6 pr-6">
              <div className="text-[0.78rem] tracking-[0.14em] text-gold">0{i + 1}</div>
              <div className="mt-4 text-[1.25rem] font-medium tracking-[-0.02em] md:text-[1.5rem]">
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="bg-softwhite">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <blockquote className="max-w-[24ch] text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.12] font-normal tracking-[-0.03em]">
            “Since switching to solar, our electricity costs have become far more predictable.”
          </blockquote>
        </Reveal>
        <Reveal delay={120} className="mt-14 border-t border-foreground/15 pt-6 md:mt-20">
          <div className="text-[1rem] font-medium">Rohit Sharma</div>
          <div className="mt-1 text-[0.86rem] text-muted-foreground">
            Residential Customer · Jaipur
          </div>
        </Reveal>
      </div>
    </section>
  );
}
