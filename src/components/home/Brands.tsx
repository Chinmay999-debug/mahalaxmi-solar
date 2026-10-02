import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/brand";
import { BrandMarquee } from "@/components/BrandMarquee";
import { BRANDS } from "@/lib/content";

export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="border-y border-ink/10 bg-paper text-ink">
      <div className="shell grid gap-6 pt-20 md:grid-cols-12 md:items-end md:pt-28">
        <Reveal className="md:col-span-7">
          <Marker className="text-ink/55">Equipment</Marker>
          <h2 id="brands-title" className="display mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)]">
            Brands We Work With
          </h2>
        </Reveal>
      </div>

      {/* Editorial strip: hairline rules framing the moving logos */}
      <Reveal variant="fade" delay={150} className="mt-12 md:mt-16">
        <div className="shell">
          <div className="border-y border-ink/12 py-7 md:py-9">
            <BrandMarquee brands={BRANDS} className="-mx-5 md:mx-0" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
