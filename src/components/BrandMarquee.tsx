import type { Brand } from "@/lib/content";

/**
 * Optical balance: wide wordmarks get a little shorter, compact marks a little
 * taller, so every logo carries a similar visual weight at the same base height.
 */
function logoScale({ width, height, optical = 1 }: Brand) {
  const aspect = width / height;
  return Math.min(1.6, Math.max(0.78, Math.sqrt(3 / aspect))) * optical;
}

function LogoList({ brands, clone = false }: { brands: Brand[]; clone?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={clone || undefined} data-clone={clone || undefined}>
      {brands.map((b) => (
        <li key={b.name} className="marquee-item">
          <img
            src={b.logo}
            alt={clone ? "" : `${b.name} logo`}
            width={b.width}
            height={b.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ height: `calc(var(--logo-h) * ${logoScale(b).toFixed(3)})` }}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite right-to-left logo strip. The sequence is rendered twice and the
 * track moves by exactly half its width, so the loop is seamless. Pauses on
 * hover/focus; becomes a static wrapped row under prefers-reduced-motion.
 */
export function BrandMarquee({ brands, className = "" }: { brands: Brand[]; className?: string }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        <LogoList brands={brands} />
        <LogoList brands={brands} clone />
      </div>
    </div>
  );
}
