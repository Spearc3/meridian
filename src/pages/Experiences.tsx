import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { experiences } from "../data";

const intensityDots: Record<string, number> = {
  Gentle: 1,
  Moderate: 2,
  Demanding: 3,
};

export default function Experiences() {
  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <p className="eyebrow animate-reveal">The Commissions</p>
        <h1
          className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          Things worth
          <br />
          <em className="text-primary">getting up for.</em>
        </h1>
        <p
          className="mt-8 max-w-2xl text-lg text-muted-foreground animate-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          Not activities. Not excursions. The handful of hours in each place that
          justify every other hour spent getting there.
        </p>
      </section>

      <section className="container-editorial pb-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, i) => (
            <Reveal key={experience.slug} delay={(i % 3) * 0.1}>
              <Link
                to={`/destinations/${experience.destination}`}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-primary">
                      {experience.duration}
                    </span>
                    {/* Three dots: how hard this will actually be. */}
                    <span
                      className="flex gap-1"
                      title={`Intensity: ${experience.intensity}`}
                    >
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 w-1.5 rounded-full ${
                            dot <= intensityDots[experience.intensity]
                              ? "bg-primary"
                              : "bg-foreground/25"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                <p className="eyebrow mt-5">{experience.region}</p>
                <h2 className="text-display mt-3 text-3xl leading-tight transition-colors group-hover:text-primary">
                  {experience.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {experience.summary}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {experience.intensity}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 border border-border/60 bg-secondary/40 p-10 md:grid-cols-2 md:p-16">
            <div>
              <p className="eyebrow">Composed, not booked</p>
              <h3 className="text-display mt-4 text-4xl md:text-5xl">
                Every commission is written for one party.
              </h3>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <p className="text-muted-foreground">
                Nothing here runs to a schedule. We hold the tide tables, the
                weather windows and the guides, and we build the days around
                whoever is travelling.
              </p>
              <Link
                to="/packages"
                className="inline-flex w-fit items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
              >
                See the journeys →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
