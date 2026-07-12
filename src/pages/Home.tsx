import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Globe from "../components/Globe";
import HeroWaves from "../components/HeroWaves";
import { destinations, experiences, packages, stays } from "../data";

export default function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = destinations.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${offset * 0.35}px)` }}
        >
          <HeroWaves />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/30 to-abyss" />
        </div>

        <div
          className="container-editorial relative z-10 flex h-full flex-col justify-end pb-24"
          style={{ opacity: Math.max(0, 1 - offset / 500) }}
        >
          <p className="eyebrow animate-reveal">
            A travel atelier · Est. 2019
          </p>
          <h1
            className="text-display mt-6 text-[14vw] leading-[0.85] animate-reveal md:text-[10rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Be the <span className="italic text-primary">director</span>
            <br />
            in your story.
          </h1>
          <div
            className="mt-10 flex flex-col items-start justify-between gap-6 animate-reveal md:flex-row md:items-end"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="max-w-md text-base leading-relaxed text-foreground/85">
              We are the desk behind you. You decide where the story begins, who
              is in it, and how it ends — we arrange the rooms, the guides, the
              tide tables and everything else you would rather not think about.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border-b border-primary/70 pb-2 text-sm uppercase tracking-[0.28em] text-primary"
            >
              Start your story
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.28em]">
              Scroll
            </span>
            <ArrowDown size={14} className="animate-floaty" />
          </div>
        </div>
      </section>

      {/* The Atlas / globe */}
      <section className="relative overflow-hidden py-32">
        <div className="container-editorial grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">The Atlas</p>
            <h2 className="text-display mt-6 text-6xl leading-[0.95] md:text-7xl">
              Pick a point.
              <br />
              We'll do <em className="text-primary">the rest.</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Rotate the globe. Hover any point of light — each is a place we
              have walked, vetted and can arrange down to the hour. Choose one
              and it becomes the first line of your journey.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
              {[
                { value: "72", label: "Countries" },
                { value: "340", label: "Journeys planned" },
                { value: "9y", label: "Planning them" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-display text-4xl text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative h-full w-full">
              <Globe />
            </div>
          </div>
        </div>
      </section>

      {/* Featured voyages */}
      <section className="relative py-32">
        <div className="container-editorial">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Featured Voyages</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                This season's compass.
              </h2>
            </div>
            <Link
              to="/destinations"
              className="hidden shrink-0 gold-underline text-sm uppercase tracking-[0.24em] text-primary md:inline-block"
            >
              View the full atlas →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((dest, i) => (
              <Reveal key={dest.slug} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <Link to={`/destinations/${dest.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        loading="lazy"
                        width={1200}
                        height={1500}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent opacity-70" />
                      <div className="absolute left-4 top-4 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                        {dest.issue}
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {dest.region}
                      </p>
                      <h3 className="text-display mt-2 text-3xl transition-colors group-hover:text-primary">
                        {dest.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stays */}
      <section className="relative py-32">
        <div className="container-editorial">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Where you sleep</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                Rooms on the register.
              </h2>
            </div>
            <Link
              to="/stays"
              className="hidden shrink-0 gold-underline text-sm uppercase tracking-[0.24em] text-primary md:inline-block"
            >
              All stays →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {stays.slice(0, 3).map((stay, i) => (
              <Reveal key={stay.slug} delay={i * 0.1}>
                <Link to="/stays" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                      {stay.kind}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-display text-3xl">{stay.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {stay.region}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-primary">
                    From {stay.from}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="relative py-32">
        <div className="container-editorial">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">What you do</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                Hours worth getting up for.
              </h2>
            </div>
            <Link
              to="/experiences"
              className="hidden shrink-0 gold-underline text-sm uppercase tracking-[0.24em] text-primary md:inline-block"
            >
              All experiences →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {experiences.slice(0, 4).map((experience, i) => (
              <Reveal key={experience.slug} delay={(i % 2) * 0.1}>
                <Link to="/experiences" className="group flex gap-6">
                  <div className="relative aspect-square w-36 shrink-0 overflow-hidden bg-secondary">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                      {experience.region} · {experience.duration}
                    </p>
                    <h3 className="text-display mt-2 text-2xl leading-tight transition-colors group-hover:text-primary">
                      {experience.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {experience.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journeys */}
      <section className="relative py-32">
        <div className="container-editorial">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">How you travel</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                Six ways to be away.
              </h2>
            </div>
            <Link
              to="/packages"
              className="hidden shrink-0 gold-underline text-sm uppercase tracking-[0.24em] text-primary md:inline-block"
            >
              All journeys →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.slice(0, 3).map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.1}>
                <Link
                  to="/packages"
                  className="group block border border-border/60 bg-secondary/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
                    <div className="absolute left-4 top-4 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                      {pkg.style}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-display text-3xl transition-colors group-hover:text-primary">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {pkg.tagline}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {pkg.duration} ·{" "}
                      <span className="text-primary">{pkg.from}</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* From the founder */}
      <section className="relative py-40">
        <div className="container-editorial max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow">From the founder</p>
            <blockquote className="text-display mt-8 text-4xl leading-tight md:text-6xl">
              "We don't sell trips, and we don't direct your journey for you. We
              hand you the chair —
              <span className="italic text-primary">
                {" "}
                and carry everything else.
              </span>
              "
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              — Luca Marchetti, Founder
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bespoke */}
      <section className="relative py-32">
        <div className="container-editorial">
          <Reveal>
            <div className="grid grid-cols-1 gap-12 border border-border/60 bg-secondary/40 p-10 md:grid-cols-2 md:p-16">
              <div>
                <p className="eyebrow">Bespoke</p>
                <h3 className="text-display mt-4 text-4xl md:text-5xl">
                  A journey written for one.
                </h3>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <p className="text-muted-foreground">
                  Every Meridian voyage is composed like an essay — a beginning,
                  a slow unfolding, and a return you'll never fully make. Tell us
                  where you'd like the story to start.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
                >
                  Begin your commission
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
