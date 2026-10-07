import { Link } from "react-router-dom";
import { Binoculars, Target } from "lucide-react";
import Reveal from "../components/Reveal";
import ServiceIcon from "../components/ServiceIcon";
import hero from "../assets/hero-ocean.jpg";
import {
  clients,
  coreServices,
  headlineStats,
  leadership,
  pillars,
  visionMission,
  whoWeAre,
} from "../tpl";

const stats = [
  ...headlineStats.slice(0, 2),
  { value: String(clients.length), label: "Corporate clients" },
  headlineStats[2],
];

export default function About() {
  return (
    <>
      <section className="container-editorial pt-40 pb-24">
        <p className="eyebrow animate-reveal">Who we are</p>
        <h1
          className="text-display mt-6 max-w-5xl text-4xl leading-[1.05] animate-reveal sm:text-6xl sm:leading-[0.95] md:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Veteran travel professionals who{" "}
          <em className="text-primary">stand apart.</em>
        </h1>
      </section>

      <section className="container-editorial grid grid-cols-1 items-start gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-abyss p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">
                    {pillar.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pillar.detail}
                  </p>
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
              Narahenpita, Colombo, with partners on the ground in France and the
              Netherlands.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="container-editorial pb-32">
        <Reveal>
          <p className="eyebrow">
            Guided by our purpose. Driven by our commitment.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visionMission.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="h-full border border-border/60 bg-secondary/30 p-10">
                <span className="grid h-11 w-11 place-items-center border border-primary/50 text-primary">
                  {i === 0 ? <Binoculars size={18} /> : <Target size={18} />}
                </span>
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
      <section className="container-editorial pb-32">
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
              unforgettable journeys worldwide — nearly a century of combined
              expertise at your travel desk.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
                </div>
                <div className="mt-5 border-t border-border/50 pt-4">
                  <h3 className="text-display text-3xl">{person.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-primary">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {person.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core services */}
      <section className="container-editorial pb-32">
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
                <ServiceIcon name={service.icon} size={24} />
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
      <section className="relative overflow-hidden py-40">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/60 to-abyss" />
        <div className="container-editorial relative grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
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

      {/* Corporate portfolio */}
      <section className="container-editorial py-32">
        <Reveal>
          <p className="eyebrow">Our elite corporate portfolio</p>
          <h2 className="text-display mt-4 max-w-2xl text-5xl md:text-6xl">
            The organizations that travel with us.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px border border-border/50 bg-border/50 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client, i) => (
            <Reveal key={client} delay={(i % 4) * 0.05}>
              <div className="flex h-full min-h-[92px] items-center justify-center bg-abyss px-5 py-6 text-center transition-colors hover:bg-secondary/30">
                <span className="text-display text-xl leading-tight text-foreground/85">
                  {client}
                </span>
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
