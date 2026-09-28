import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/brand";
import { TESTIMONIALS } from "@/lib/content";

/** Renders only once real reviews are added to TESTIMONIALS in src/lib/content.ts. */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  const [lead, ...rest] = TESTIMONIALS;

  return (
    <section aria-labelledby="reviews-title" className="bg-ivory text-ink">
      <div className="shell py-24 md:py-36">
        <Marker className="text-ink/55">
          <span id="reviews-title">Customer reviews</span>
        </Marker>
        {lead && (
          <Reveal as="figure" className="mt-10 max-w-[64rem]">
            <blockquote className="display text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.08]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-[1rem]">
              <span className="font-medium">{lead.name}</span>
              {lead.context && <span className="text-ink/60">{lead.context}</span>}
              {lead.system && <span className="label self-center text-ink/50">{lead.system}</span>}
            </figcaption>
          </Reveal>
        )}
        {rest.length > 0 && (
          <div className="mt-16 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-3">
            {rest.map((t, i) => (
              <Reveal as="figure" key={`${t.name}-${i}`} delay={i * 80}>
                <blockquote className="text-[1.1rem] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-[0.95rem]">
                  <span className="font-medium">{t.name}</span>
                  {t.context && <span className="text-ink/60"> · {t.context}</span>}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
