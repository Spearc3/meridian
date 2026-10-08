import type { ReactNode } from "react";

type Props = {
  image: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children?: ReactNode;
};

export default function PageHero({ image, eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative flex min-h-[80svh] items-end overflow-hidden pt-24">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Two scrims: top-to-bottom settles the photo into the page; the
          left-weighted one sits under the copy column only, so the type
          reads on any photograph while the right side stays vivid. */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/60 to-abyss" />
      <div className="absolute inset-0 bg-gradient-to-r from-abyss/90 via-abyss/55 to-abyss/10" />
      <div className="text-legible container-editorial relative z-10 pb-16">
        <p className="eyebrow animate-reveal">{eyebrow}</p>
        <h1
          className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        <p
          className="mt-8 max-w-xl text-lg text-foreground/85 animate-reveal"
          style={{ animationDelay: "0.25s" }}
        >
          {intro}
        </p>
        {children && (
          <div className="mt-10 animate-reveal" style={{ animationDelay: "0.35s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
