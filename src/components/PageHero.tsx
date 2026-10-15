import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, intro, children }: Props) {
  return (
    // Full screen until scrolled: the page's flight background shows through,
    // and this is its first stop. min-h, not h, so a long title on a short
    // phone screen grows the hero instead of clipping.
    <section data-flight className="relative flex min-h-[100svh] w-full items-end overflow-hidden pt-24">
      {/* Left-weighted scrim under the copy column only, so the type reads on
          any photograph while the right side stays vivid. */}
      <div className="absolute inset-0 bg-gradient-to-r from-abyss/70 via-abyss/25 to-transparent" />
      <div className="text-legible container-editorial relative z-10 pb-16">
        <p className="eyebrow animate-reveal">{eyebrow}</p>
        <h1
          className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-8 max-w-xl text-lg text-foreground/85 animate-reveal"
            style={{ animationDelay: "0.25s" }}
          >
            {intro}
          </p>
        )}
        {children && (
          <div className="mt-10 animate-reveal" style={{ animationDelay: "0.35s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
