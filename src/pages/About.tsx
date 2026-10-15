import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ServiceIcon from "../components/ServiceIcon";
import PageHero from "../components/PageHero";
import FlightBackground from "../components/FlightBackground";
import { aboutFlight } from "../flights";
import {
  coreServices,
  headlineStats,
  leadership,
  pillars,
  visionMission,
  whoWeAre,
} from "../tpl";

export default function About() {
  return (
    <>
      <FlightBackground stops={aboutFlight} />

      <PageHero
        eyebrow="Who we are"
        title={
          <>
            Veteran travel professionals
            <br />
            who <em className="text-primary">stand apart.</em>
          </>
        }
      />

      <section data-flight className="container-editorial grid grid-cols-1 items-start gap-16 pt-24 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex items-center gap-5 bg-abyss p-6">
                  <ServiceIcon name={pillar.icon} size={44} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-primary">
                      {pillar.title}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          {whoWeAre.map((text, i) => (
            <Reveal key={text.slice(0, 24)} delay={i * 0.12}>
              <p>{text}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <p>
              Travel Port Leisure is the leisure arm of Base HP, operating out of
              Narahenpita, Colombo, with agents around the globe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section data-flight className="container-editorial pb-32">
        <Reveal>
          <p className="eyebrow">
            Guided by our purpose. Driven by our commitment.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visionMission.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="h-full border border-border/60 bg-secondary/30 p-10">
                <ServiceIcon name={i === 0 ? "vision" : "mission"} size={64} />
                <h2 className="text-display mt-6 text-3xl">{item.label}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section data-flight className="container-editorial pb-32">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">Our leadership powerhouse</p>
            <h2 className="text-display mt-4 text-5xl md:text-6xl">
              Our strength lies
              <br />
              in our people.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted-foreground">
              A visionary leadership driving excellence, innovation and
              unforgettable journeys worldwide.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 lg:grid-cols-2">
          {leadership.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.1} className="h-full">
              <div className="group flex h-full items-center gap-6 bg-abyss p-6 sm:gap-8 sm:p-8">
                <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-secondary sm:w-40">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-display text-2xl sm:text-3xl">{person.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-primary">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {person.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core services */}
      <section data-flight className="container-editorial pb-32">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Our core services</p>
            <h2 className="text-display mt-4 text-5xl md:text-6xl">
              Precision, efficiency, attention to detail.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Our services are delivered with precision, efficiency, and
              attention to detail, ensuring a smooth and reliable travel
              experience for every client.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <div className="h-full border border-border/60 bg-secondary/20 p-8">
                <ServiceIcon name={service.icon} size={56} />
                <h3 className="text-display mt-5 text-2xl leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* By the numbers */}
      {/* The flight background carries this band now: no photo of its own. */}
      <section data-flight className="relative overflow-hidden py-40">
        <div className="container-editorial relative grid grid-cols-1 gap-12 sm:grid-cols-3">
          {headlineStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="border-t border-primary/60 pt-6">
                <p className="text-display text-6xl text-primary md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32 text-center">
        <Reveal>
          <p className="eyebrow">Our promise</p>
          <blockquote className="text-display mx-auto mt-8 max-w-4xl text-4xl leading-tight md:text-6xl">
            Powered by experience. Driven by excellence.
            <span className="italic text-primary"> Focused on service.</span>
          </blockquote>
          <Link
            to="/contact"
            className="mt-12 inline-block gold-underline text-sm uppercase tracking-[0.24em] text-primary"
          >
            Talk to our travel desk →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
