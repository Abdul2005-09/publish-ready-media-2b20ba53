import { useEffect, useRef, useState } from "react";
import { Heading, Ornament } from "./shared";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function Envelope() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [enter, setEnter] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setEnter(clamp(1 - r.top / window.innerHeight));
      // Read the current position in both directions; never latch the reveal.
      setP(clamp(-r.top / (total || 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const t = clamp(p / 0.3); // flap opening
  const flap = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease-in-out hinge
  const rise = clamp((p - 0.22) / 0.78); // extraction overlaps the opening, without a pause
  const ease = rise * rise * (3 - 2 * rise); // reversible easing without early overshoot
  const settle = ease;

  return (
    <section ref={ref} className="envelope-scroll parchment relative h-[300svh]" aria-label="Invitation letter">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute top-[6svh] text-center transition-opacity duration-500" style={{ opacity: Math.min(enter * 1.5, 1 - rise * 2) }}>
          <Heading>You’re Invited</Heading>
          <Ornament />
        </div>

        {/* Envelope stage */}
        <div
          className="envelope relative aspect-[10/7] w-[min(86vw,400px,52svh)]"
          style={{
            opacity: clamp(enter * 1.4),
            transform: `translateY(calc(${(1 - enter) * 60}px + ${settle * 40}svh)) scale(${0.94 + enter * 0.06 - settle * 0.04})`,
            filter: `drop-shadow(0 ${12 + flap * 10}px ${18 + flap * 12}px oklch(0.3 0.08 30 / 0.3))`,
          }}
        >
          <div className="envelope-back absolute inset-0 rounded-md shadow-paper" />

          {/* Letter (clipped at envelope bottom, hidden behind the front pocket) */}
          <div className="absolute inset-x-[5%] bottom-[3%] top-[-260%] z-10 overflow-hidden">
            <article
              className="letter absolute inset-x-0 bottom-0 aspect-[10/16] rounded-sm px-[8%] py-[9%] text-center"
              style={{
                transform: `translateY(${100 - ease * 150}%)`,
                boxShadow: `0 ${8 + settle * 16}px ${20 + settle * 24}px -12px oklch(0.3 0.08 30 / ${0.25 + settle * 0.25})`,
              }}
            >
              <p className="font-display text-[0.6rem] tracking-[0.35em] text-gold sm:text-xs">✦ With Joy ✦</p>
              <h3 className="mt-2 font-script text-[2rem] leading-none text-primary sm:text-5xl">You Are Invited</h3>
              <Ornament />
              <p className="font-serif text-[0.95rem] italic leading-snug text-foreground sm:text-lg">
                With hearts full of love and gratitude, we joyfully invite you to celebrate the beginning of our forever.
                Your presence and blessings would make our day truly complete.
              </p>
              <p className="mt-3 font-script text-[1.9rem] leading-tight text-primary sm:text-4xl">Dhyaani &amp; Vinotha</p>
              <div className="mx-auto my-3 h-px w-2/3 bg-gold/60" />
              <dl className="space-y-2 font-serif text-[0.85rem] leading-tight text-foreground sm:text-base">
                <div>
                  <dt className="font-display text-[0.6rem] tracking-[0.3em] text-gold sm:text-xs">RECEPTION</dt>
                  <dd>Saturday, 21 November 2026 · 6:00 PM onwards</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.6rem] tracking-[0.3em] text-gold sm:text-xs">MUHURTHAM</dt>
                  <dd>Sunday, 22 November 2026 · 10:00 – 11:50 AM</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.6rem] tracking-[0.3em] text-gold sm:text-xs">VENUE</dt>
                  <dd>The Royal Mahal, Vayalur, Trichy, Tamil Nadu</dd>
                </div>
              </dl>
              <p className="mt-3 font-serif text-[0.9rem] italic text-primary sm:text-base">Your presence, our greatest blessing.</p>
            </article>
          </div>

          <div className="envelope-front absolute inset-0 z-20 rounded-md" />

          {/* Flap */}
          <div
            className="absolute inset-x-0 top-0 h-[62%] origin-top"
            style={{ transformStyle: "preserve-3d", transform: `perspective(900px) rotateX(${flap * 180}deg)`, zIndex: flap > 0.5 ? 5 : 30 }}
          >
            <div className="envelope-flap absolute inset-0" />
            <div className="envelope-flap-inner absolute inset-0" />
            <div
              className="absolute left-1/2 top-full flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-script text-xl text-primary-foreground shadow-paper ring-2 ring-gold sm:size-14"
              style={{ opacity: 1 - flap * 2 }}
            >
              D&amp;V
            </div>
          </div>
        </div>

        <p
          className="absolute bottom-[5svh] font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground"
          style={{ opacity: 1 - flap }}
        >
          SCROLL TO OPEN
        </p>
      </div>
    </section>
  );
}
