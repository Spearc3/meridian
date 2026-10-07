import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Binoculars, Target } from "lucide-react";
import Reveal from "../components/Reveal";
import Globe from "../components/Globe";
import HeroWaves from "../components/HeroWaves";
import MemoryWall from "../components/MemoryWall";
import Process from "../components/Process";
import personalImage from "../assets/tpl-halong-cruise.jpg";
import corporateImage from "../assets/tpl-vietnam-partner.jpg";
import {
  company,
  globalReach,
  headlineStats,
  memories,
  pillars,
  regions,
  visionMission,
  whoWeAre,
} from "../tpl";

const doors = [
  {
    to: "/personal-travel",
    image: personalImage,
    eyebrow: "Personal Travels",
    title: "Curated holidays. Cherished memories.",
    detail: "Leisure, luxury and group journeys, cruises and tailor-made itineraries.",
    cta: "Plan a holiday",
  },
  {
    to: "/corporate",
    image: corporateImage,
    eyebrow: "Corporate & Business",
    title: "Smart solutions for modern businesses.",
    detail: "Corporate travel management, MICE, and incentive and dealer tours.",
    cta: "Request a proposal",
  },
];

export default function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            The leisure arm of {company.parent} · Colombo, Sri Lanka
          </p>
          <h1
            className="text-display mt-6 text-[13vw] leading-[0.85] animate-reveal md:text-[9rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Explore the
            <br />
            <span className="italic text-primary">Unexplored.</span>
          </h1>
          <div
            className="mt-10 flex flex-col items-start justify-between gap-6 animate-reveal md:flex-row md:items-end"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="max-w-md text-base leading-relaxed text-foreground/85">
              A team of veteran travel professionals who believe corporate travel
              should be seamless, prestigious and impeccably executed — for
              corporate, incentive, leisure and group travel worldwide.
            </p>
            <Link
              to="/#paths"
              className="group inline-flex items-center gap-3 border-b border-primary/70 pb-2 text-sm uppercase tracking-[0.28em] text-primary"
            >
              Find your journey
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

      {/* Two doors */}
      <section id="paths" className="scroll-mt-20 container-editorial relative z-10 -mt-px py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {doors.map((door, i) => (
            <Reveal key={door.to} delay={i * 0.1}>
              <Link to={door.to} className="group relative block aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={door.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <p className="eyebrow">{door.eyebrow}</p>
                  <h2 className="text-display mt-3 text-4xl leading-tight md:text-5xl">
                    {door.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-foreground/80">
                    {door.detail}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary">
                    {door.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section id="about" className="relative scroll-mt-20 py-32">
        <div className="container-editorial grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Who we are</p>
            <h2 className="text-display mt-6 text-5xl leading-[0.95] md:text-6xl">
              Every journey reflects
              <br />
              <em className="text-primary">your organization.</em>
            </h2>
            <Link
              to="/about"
              className="mt-8 inline-block gold-underline text-sm uppercase tracking-[0.24em] text-primary"
            >
              More about us →
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {whoWeAre.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
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
      </section>

      {/* Vision & mission */}
      <section className="relative py-16">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-center">
              Guided by our purpose. Driven by our commitment.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {visionMission.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="h-full border border-border/60 bg-secondary/30 p-10">
                  <span className="grid h-11 w-11 place-items-center border border-primary/50 text-primary">
                    {i === 0 ? <Binoculars size={18} /> : <Target size={18} />}
                  </span>
                  <h3 className="text-display mt-6 text-3xl">{item.label}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The network / globe */}
      <section id="network" className="relative scroll-mt-20 overflow-hidden py-32">
        <div className="container-editorial grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our global network</p>
            <h2 className="text-display mt-6 text-6xl leading-[0.95] md:text-7xl">
              Connecting businesses
              <br />
              <em className="text-primary">across borders.</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              We leverage a strong global travel network to deliver seamless
              corporate and leisure travel experiences across the world's most
              sought-after destinations. Through strategic partnerships and
              industry expertise, we ensure exceptional service standards
              wherever your journey takes you.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
              {headlineStats.map((stat) => (
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

        {/* Regional coverage */}
        <div className="container-editorial mt-24">
          <Reveal>
            <p className="eyebrow">Regional coverage</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border/50 pt-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {regions.map((region, i) => (
              <Reveal key={region.name} delay={(i % 4) * 0.06}>
                <h3 className="text-display text-2xl leading-tight text-primary">
                  {region.name}
                </h3>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {region.places.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 border-t border-border/50 pt-10">
              <p className="eyebrow">Our global reach includes</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {globalReach.map((item) => (
                  <span
                    key={item}
                    className="border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Memories */}
      <section id="memories" className="relative scroll-mt-20 py-32">
        <div className="container-editorial">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">From the field</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                Memories we created.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-muted-foreground">
                Dealer tours, partner tours, incentive trips and group holidays
                we have arranged for our clients.
              </p>
            </Reveal>
          </div>

          <MemoryWall items={memories} />
        </div>
      </section>

      <Process />

      {/* Plan a journey */}
      <section className="relative py-32">
        <div className="container-editorial">
          <Reveal>
            <div className="grid grid-cols-1 gap-12 border border-border/60 bg-secondary/40 p-10 md:grid-cols-2 md:p-16">
              <div>
                <p className="eyebrow">Connect with us</p>
                <h3 className="text-display mt-4 text-4xl md:text-5xl">
                  Let's plan the
                  <br />
                  next one together.
                </h3>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <p className="text-muted-foreground">
                  We truly appreciate your time, trust and partnership. Tell us
                  about your next corporate, incentive, leisure or group journey,
                  or call our hotline on {company.hotline}.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
                >
                  Request a proposal
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
