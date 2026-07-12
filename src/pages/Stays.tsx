import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { stayKinds, stays } from "../data";
import hero from "../assets/dest-norway.jpg";

export default function Stays() {
  const [active, setActive] = useState<string>("All");

  const visible =
    active === "All" ? stays : stays.filter((s) => s.kind === active);

  return (
    <>
      <section className="relative flex h-[70svh] items-end overflow-hidden pt-24">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/50 via-abyss/40 to-abyss" />
        <div className="container-editorial relative z-10 pb-16">
          <p className="eyebrow animate-reveal">The Register · Volume III</p>
          <h1
            className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-9xl"
            style={{ animationDelay: "0.15s" }}
          >
            Rooms worth
            <br />
            <em className="text-primary">the journey.</em>
          </h1>
          <p
            className="mt-8 max-w-xl text-lg text-muted-foreground animate-reveal"
            style={{ animationDelay: "0.25s" }}
          >
            Eight houses we keep on the register. Not the largest, not the
            grandest — the ones we would return to on our own money.
          </p>
        </div>
      </section>

      <section className="container-editorial py-24">
        <div className="mb-12 flex flex-wrap items-center gap-3">
          {stayKinds.map((kind) => (
            <button
              key={kind}
              onClick={() => setActive(kind)}
              className={`min-h-11 border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                active === kind
                  ? "border-primary/60 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {kind}
            </button>
          ))}
        </div>

        <div className="space-y-16 md:space-y-20">
          {visible.map((stay, i) => (
            <Reveal key={stay.slug} delay={(i % 2) * 0.08}>
              {/* Alternating sides: reads as a printed register, not a card grid. */}
              <article
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group relative aspect-[4/3] overflow-hidden bg-secondary lg:col-span-7">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <figcaption className="absolute left-4 top-4 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                    {stay.kind}
                  </figcaption>
                </figure>

                <div className="lg:col-span-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {stay.region}
                  </p>
                  <h2 className="text-display mt-3 text-5xl leading-tight">
                    {stay.name}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {stay.standfirst}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {stay.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-primary">—</span>
                        {amenity}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-end justify-between gap-6 border-t border-border/50 pt-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {stay.rooms}
                      </p>
                      <p className="text-display mt-1 text-2xl text-primary">
                        {stay.from}
                      </p>
                    </div>
                    <Link
                      to={`/destinations/${stay.destination}`}
                      className="gold-underline shrink-0 text-xs uppercase tracking-[0.24em] text-primary"
                    >
                      The destination →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32">
        <Reveal>
          <div className="border-t border-border/50 pt-12 text-center">
            <p className="eyebrow">Something else entirely?</p>
            <h3 className="text-display mt-4 text-4xl md:text-5xl">
              We keep a longer list than we print.
            </h3>
            <Link
              to="/contact"
              className="mt-8 inline-block gold-underline text-sm uppercase tracking-[0.24em] text-primary"
            >
              Ask the atelier →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
