import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { categories, destinations } from "../data";
import hero from "../assets/hero-ocean.jpg";

export default function Destinations() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? destinations
      : destinations.filter((d) => d.category === active);

  return (
    <>
      <section className="relative flex h-[70svh] items-end overflow-hidden pt-24">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-abyss/40 to-abyss" />
        <div className="container-editorial relative z-10 pb-16">
          <p className="eyebrow animate-reveal">The Atlas · Volume II</p>
          <h1
            className="text-display mt-6 text-7xl leading-[0.9] animate-reveal md:text-9xl"
            style={{ animationDelay: "0.15s" }}
          >
            Destinations,
            <br />
            <em className="text-primary">chosen slowly.</em>
          </h1>
        </div>
      </section>

      <section className="container-editorial py-24">
        <div className="mb-12 flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                active === category
                  ? "border-primary/60 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((dest, i) => (
            <Reveal key={dest.slug} delay={(i % 3) * 0.1}>
              <Link to={`/destinations/${dest.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-primary">
                      {dest.category}
                    </p>
                    <h3 className="text-display mt-2 text-4xl">{dest.name}</h3>
                    <p className="mt-1 text-sm text-foreground/80">
                      {dest.region}
                    </p>
                  </div>
                  <div className="absolute right-4 top-4 h-10 w-10 -rotate-90 border border-primary/60 bg-abyss/50 backdrop-blur transition-all group-hover:rotate-0">
                    <div className="grid h-full place-items-center text-primary">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32">
        <Reveal>
          <div className="border-t border-border/50 pt-12 text-center">
            <p className="eyebrow">Can't find your place?</p>
            <h3 className="text-display mt-4 text-4xl md:text-5xl">
              Every atlas has a blank page.
            </h3>
            <Link
              to="/contact"
              className="mt-8 inline-block gold-underline text-sm uppercase tracking-[0.24em] text-primary"
            >
              Commission a private voyage →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
