import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { packageStyles, packages } from "../data";

export default function Packages() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? packages : packages.filter((p) => p.style === active);

  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <p className="eyebrow animate-reveal">Journeys · Composed</p>
        <h1
          className="text-display mt-6 text-7xl leading-[0.9] animate-reveal md:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          Six ways
          <br />
          <em className="text-primary">to be away.</em>
        </h1>
        <p
          className="mt-8 max-w-2xl text-lg text-muted-foreground animate-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          Each of these is a starting point, not a product. Tell us which one is
          closest and a planner will take it apart and rebuild it around you.
        </p>
      </section>

      <section className="container-editorial pb-32">
        <div className="mb-14 flex flex-wrap items-center gap-3">
          {packageStyles.map((style) => (
            <button
              key={style}
              onClick={() => setActive(style)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                active === style
                  ? "border-primary/60 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {visible.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col border border-border/60 bg-secondary/30">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/20 to-transparent" />
                  <div className="absolute left-5 top-5 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                    {pkg.style}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h2 className="text-display text-4xl md:text-5xl">
                      {pkg.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <p className="text-muted-foreground">{pkg.tagline}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-border/50 py-5">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        Duration
                      </dt>
                      <dd className="text-display mt-1 text-xl">
                        {pkg.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        From
                      </dt>
                      <dd className="text-display mt-1 text-xl text-primary">
                        {pkg.from}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        Best for
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {pkg.bestFor}
                      </dd>
                    </div>
                  </dl>

                  <p className="eyebrow mt-6">The shape of it</p>
                  <ul className="mt-4 space-y-3">
                    {pkg.itinerary.map((leg) => (
                      <li key={leg.day} className="flex gap-4 text-sm">
                        <span className="w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-primary">
                          {leg.day}
                        </span>
                        <span className="text-muted-foreground">{leg.note}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="eyebrow mt-8">Included</p>
                  <ul className="mt-4 space-y-2">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-primary">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="group/cta mt-8 inline-flex w-fit items-center gap-3 border border-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Commission this journey
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/cta:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
