import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Modern Indian home with rooftop solar panels at golden hour"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.213 0.028 232.5 / 0.62) 0%, oklch(0.213 0.028 232.5 / 0.32) 42%, oklch(0.213 0.028 232.5 / 0.78) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-24">
        <div className="max-w-[62rem]">
          <h1 className="display text-softwhite text-[clamp(2.6rem,7.4vw,6.6rem)]">
            Power your property.
            <br />
            <span className="text-softwhite/70">Own your energy.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[1.02rem] leading-relaxed text-softwhite/80 md:text-[1.1rem]">
            High-performance solar systems designed, installed and supported for homes and
            businesses.
          </p>

          <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9">
            <a
              href="#quote"
              className="bg-gold px-8 py-4 text-[0.8rem] font-semibold tracking-[0.08em] text-navy uppercase transition-colors duration-500 hover:bg-softwhite"
            >
              Get a Free Solar Quote
            </a>
            <a
              href="#projects"
              className="link-underline text-[0.9rem] font-medium text-softwhite/85 hover:text-softwhite"
            >
              Explore Our Work <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="h-14 w-px bg-softwhite/25">
          <div className="h-5 w-px animate-[scrollhint_2.6s_ease-in-out_infinite] bg-softwhite/80" />
        </div>
      </div>

      <style>{`@keyframes scrollhint{0%{transform:translateY(0);opacity:0}30%{opacity:1}100%{transform:translateY(36px);opacity:0}}`}</style>
    </section>
  );
}
