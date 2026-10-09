import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Sun on the horizon — the brand mark. */
export function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="none">
      <path d="M6 20a10 10 0 0 1 20 0" fill="currentColor" className="text-gold" />
      <path d="M2 20h28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 24.5h16M12 28.5h8" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
    </svg>
  );
}

const LOGO_SRC = `${import.meta.env.BASE_URL}assets/logo.png`;

/**
 * Client's official solar symbol.
 * Contains only the solar artwork (sun, panels, wave) — no company name or tagline.
 */
export function Wordmark({ className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Mahalaxmi Solar Service"
      width={827}
      height={476}
      className={`h-9 w-auto object-contain md:h-10 ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export const Logo = Wordmark;

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`h-[0.9em] w-[0.9em] ${className}`} fill="none">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type CTAProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: "gold" | "ink" | "paper" | "ghost-light" | "ghost-dark";
  children: ReactNode;
};

const tones: Record<NonNullable<CTAProps["tone"]>, string> = {
  gold: "bg-gold text-ink hover:bg-paper",
  ink: "bg-ink text-paper hover:bg-ink-2",
  paper: "bg-paper text-ink hover:bg-gold",
  "ghost-light": "border border-paper/35 text-paper hover:border-paper hover:bg-paper/10",
  "ghost-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
};

/** Primary call-to-action: pill with a travelling arrow. */
export function CTA({ tone = "gold", className = "", children, ...rest }: CTAProps) {
  return (
    <a
      {...rest}
      className={`group inline-flex items-center justify-center gap-3 rounded-full py-3.5 pr-3.5 pl-6 text-[0.95rem] font-medium tracking-[-0.005em] transition-colors duration-500 ${tones[tone]} ${className}`}
    >
      <span>{children}</span>
      <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-current/10">
        <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-[180%]" />
        <Arrow className="absolute -translate-x-[180%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
      </span>
    </a>
  );
}

/** Small mono section marker, e.g. "(02) Solutions". */
export function Marker({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      {index && <span className="opacity-60">({index})</span>}
      <span>{children}</span>
    </p>
  );
}
