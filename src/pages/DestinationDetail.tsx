import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { destinations, experiences, stays } from "../data";

export default function DestinationDetail() {
  const { slug } = useParams();
  const index = destinations.findIndex((d) => d.slug === slug);

  if (index === -1) return <Navigate to="/404" replace />;

  const dest = destinations[index];
  const next = destinations[(index + 1) % destinations.length];
  const localStays = stays.filter((s) => s.destination === dest.slug);
  const localExperiences = experiences.filter(
    (e) => e.destination === dest.slug,
  );

  const facts = [
    { label: "Coordinates", value: dest.coordinates },
    { label: "Season", value: dest.season },
    { label: "Duration", value: dest.duration },
    { label: "Issue", value: dest.issue },
  ];

  return (
    <>
      <section className="relative flex h-[80svh] items-end overflow-hidden pt-24">
        <img
          src={dest.image}
          alt={dest.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/50 via-abyss/30 to-abyss" />
        <div className="container-editorial relative z-10 pb-16">
          <p className="eyebrow animate-reveal">
            {dest.issue} · {dest.category}
          </p>
          <h1
            className="text-display mt-6 text-7xl leading-[0.9] animate-reveal md:text-9xl"
            style={{ animationDelay: "0.1s" }}
          >
            {dest.name}
          </h1>
          <p
            className="mt-6 text-sm uppercase tracking-[0.28em] text-primary animate-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            {dest.region}
          </p>
        </div>
      </section>

      <section className="container-editorial grid grid-cols-1 gap-16 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-display text-3xl leading-tight text-foreground/90 md:text-4xl">
              {dest.standfirst}
            </p>
          </Reveal>
          <div className="mt-10 space-y-8 text-lg leading-relaxed text-muted-foreground">
            {dest.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <figure className="mt-12">
              <img
                src={dest.gallery}
                alt={dest.name}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {dest.region}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <aside className="space-y-10 border-l border-border/50 lg:col-span-5 lg:pl-12">
          <Reveal>
            <p className="eyebrow">The particulars</p>
            <dl className="mt-6 space-y-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border/40 pb-3"
                >
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="text-display text-right text-xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-border/60 p-8">
              <p className="eyebrow">From the field notes</p>
              <ul className="mt-5 space-y-4">
                {dest.notes.map((note) => (
                  <li key={note.label}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-primary">
                      {note.label}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {note.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              Commission this voyage
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </aside>
      </section>

      {localStays.length > 0 && (
        <section className="container-editorial pb-24">
          <Reveal>
            <div className="border-t border-border/50 pt-12">
              <p className="eyebrow">Where you'd sleep</p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {localStays.map((stay) => (
                  <Link key={stay.slug} to="/stays" className="group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={stay.image}
                        alt={stay.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 border border-primary/60 bg-abyss/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                        {stay.kind}
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="text-display text-3xl transition-colors group-hover:text-primary">
                        {stay.name}
                      </h3>
                      <p className="shrink-0 text-sm text-primary">
                        {stay.from}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {stay.standfirst}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {localExperiences.length > 0 && (
        <section className="container-editorial pb-24">
          <Reveal>
            <div className="border-t border-border/50 pt-12">
              <p className="eyebrow">What you'd do</p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {localExperiences.map((experience) => (
                  <Link
                    key={experience.slug}
                    to="/experiences"
                    className="group flex gap-6"
                  >
                    <div className="relative aspect-square w-32 shrink-0 overflow-hidden bg-secondary">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                        {experience.duration} · {experience.intensity}
                      </p>
                      <h3 className="text-display mt-2 text-2xl leading-tight transition-colors group-hover:text-primary">
                        {experience.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {experience.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="container-editorial pb-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-t border-border/50 pt-12 md:flex-row md:items-center">
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-3 gold-underline text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-primary"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              The full atlas
            </Link>

            <Link
              to={`/destinations/${next.slug}`}
              className="group text-right"
            >
              <p className="eyebrow">Next voyage</p>
              <p className="text-display mt-2 text-4xl transition-colors group-hover:text-primary">
                {next.name} →
              </p>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
