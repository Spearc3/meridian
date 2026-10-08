import { Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ServiceIcon from "../components/ServiceIcon";
// three.js is the bulk of the site's JavaScript and only this page uses it:
// split it out so other pages never download it, and so the hero copy paints
// before the WebGL scenes are parsed.
const Globe = lazy(() => import("../components/Globe"));
const HeroWaves = lazy(() => import("../components/HeroWaves"));
import MemoryWall from "../components/MemoryWall";
import personalImage from "../assets/tpl-memory-03.jpg";
import corporateImage from "../assets/tpl-memory-05.jpg";
import { company, headlineStats, memories, regions } from "../tpl";

/** What the desk can put to work on any plan, personal or corporate. */
const readyToOffer = [
  { icon: "air", label: "Air travel & ticketing" },
  { icon: "hotel", label: "Hotels & ground handling" },
  { icon: "visa", label: "Visa consultation" },
  { icon: "insurance", label: "Travel insurance" },
  { icon: "lounge", label: "Airport lounges" },
  { icon: "chauffeur", label: "Chauffeur services" },
];

/** The two crafts — each a doorway to its own page. */
const crafts = [
  {
    to: "/personal-travel",
    image: personalImage,
    imageAlt: "A Travel Port Leisure group on holiday",
    eyebrow: "Personal Travels",
    title: (
      <>
        The art of <em className="text-primary">the journey.</em>
      </>
    ),
    body: "Leisure is personal. We shape every itinerary around how you like to travel — the pace, the places and the small details that turn a trip into a memory.",
    tags: ["Leisure holidays", "Luxury & FIT", "Group tours", "Cruises"],
    cta: "Explore personal travel",
  },
  {
    to: "/corporate",
    image: corporateImage,
    imageAlt: "A corporate incentive group travelling with Travel Port Leisure",
    eyebrow: "Corporate & Business",
    title: (
      <>
        The discipline of <em className="text-primary">business travel.</em>
      </>
    ),
    body: "Business travel runs on precision. We manage the moving parts — ticketing, accommodation, visas and ground transport — so your people arrive ready, and every conference and incentive tour reflects the standards of your organization.",
    tags: ["Travel management", "MICE", "Incentive tours", "Global aviation"],
    cta: "Explore corporate travel",
  },
];

/** The deck's three promises, each with what stands behind it. */
const principles = [
  {
    icon: "experience",
    title: "Powered by experience",
    body: "A team of veteran travel professionals, led by more than 25 years in the travel industry.",
  },
  {
    icon: "excellence",
    title: "Driven by excellence",
    body: "Precision, efficiency and attention to detail — from a single ticket to a conference abroad.",
  },
  {
    icon: "service",
    title: "Focused on service",
    body: "One travel desk for every part of the trip, with agents around the globe.",
  },
];

export default function Home() {
  const layerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  // Parallax + fade on scroll, written straight to the two elements once per
  // frame. Routing scrollY through React state re-rendered the entire page on
  // every scroll event, which is what made scrolling stutter on phones.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      if (layerRef.current) layerRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      if (copyRef.current) copyRef.current.style.opacity = String(Math.max(0, 1 - y / 500));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div ref={layerRef} className="absolute inset-0 will-change-transform">
          <Suspense fallback={null}>
            <HeroWaves />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/40 to-abyss" />
          {/* Left-weighted scrim under the copy column only. */}
          <div className="absolute inset-0 bg-gradient-to-r from-abyss/85 via-abyss/40 to-transparent" />
        </div>

        <div
          ref={copyRef}
          className="text-legible container-editorial relative z-10 flex h-full flex-col justify-end pb-24 will-change-[opacity]"
        >
          <p className="eyebrow animate-reveal">
            {company.name} · Colombo, Sri Lanka
          </p>
          <h1
            className="text-display mt-6 text-[13vw] leading-[0.85] animate-reveal md:text-[9rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Explore the
            <br />
            <span className="italic text-primary">Unexplored.</span>
          </h1>
          <p
            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground/90 animate-reveal"
            style={{ animationDelay: "0.25s" }}
          >
            Veteran travel professionals for both sides of travel — the holiday
            that should feel effortless, and the business trip that has to run
            like clockwork.
          </p>
          <div
            className="mt-10 flex flex-col gap-4 animate-reveal sm:flex-row"
            style={{ animationDelay: "0.35s" }}
          >
            <Link
              to="/personal-travel"
              className="group inline-flex items-center justify-between gap-6 border border-primary bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground [text-shadow:none] transition-colors hover:bg-mist"
            >
              Personal Travels
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/corporate"
              className="group inline-flex items-center justify-between gap-6 border border-foreground/40 bg-abyss/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              Corporate &amp; Business
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted-foreground md:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.28em]">
              Scroll
            </span>
            <ArrowDown size={14} className="animate-floaty" />
          </div>
        </div>
      </section>

      {/* Dynamic plans + the network behind them */}
      <section id="network" className="relative scroll-mt-20 overflow-hidden py-28">
        <div className="container-editorial grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Dynamic travel plans</p>
            <h2 className="text-display mt-6 text-5xl leading-[0.95] md:text-7xl">
              Plans that move
              <br />
              <em className="text-primary">as you do.</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Every itinerary is built around you and stays flexible — we
              adapt it with you as plans change. Behind it sits a global network
              of agents across seven regions, and the expertise to put it to
              work for a family holiday or a company-wide incentive tour.
            </p>

            <p className="eyebrow mt-12">Expertise, ready to be offered</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {readyToOffer.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <ServiceIcon name={item.icon} size={36} />
                  <span className="text-sm leading-snug text-foreground/90">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
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
              <Suspense fallback={null}>
                <Globe />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Where we take you: every destination pinned on the globe above */}
        <div className="container-editorial mt-20">
          <Reveal>
            <p className="eyebrow">Where we take you</p>
            <h3 className="text-display mt-4 text-4xl md:text-5xl">
              Seven regions, one travel desk.
            </h3>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border/50 pt-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {regions.map((region, i) => (
              <Reveal key={region.name} delay={(i % 4) * 0.06}>
                <h4 className="text-display text-2xl leading-tight text-primary">
                  {region.name}
                </h4>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {region.places.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Two crafts */}
      <section id="paths" className="relative scroll-mt-20 py-28">
        <div className="container-editorial">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="text-display max-w-3xl text-5xl leading-[0.95] md:text-7xl">
                Two kinds of travel.
                <br />
                <em className="text-primary">Both, done properly.</em>
              </h2>
              <p className="max-w-sm text-muted-foreground">
                A holiday and a business trip ask for different things. We know
                the difference — and the craft behind each.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 space-y-24 md:space-y-32">
            {crafts.map((craft, i) => (
              <div
                key={craft.to}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
              >
                <Reveal
                  className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                >
                  <Link
                    to={craft.to}
                    className="group block aspect-[4/3] overflow-hidden bg-secondary"
                    aria-label={craft.cta}
                  >
                    <img
                      src={craft.image}
                      alt={craft.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </Link>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}
                >
                  <p className="eyebrow">{craft.eyebrow}</p>
                  <h3 className="text-display mt-4 text-4xl leading-tight md:text-5xl">
                    {craft.title}
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                    {craft.body}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {craft.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-border/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={craft.to}
                    className="group mt-10 inline-flex items-center gap-3 border-b border-primary/70 pb-2 text-sm uppercase tracking-[0.24em] text-primary"
                  >
                    {craft.cta}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-28">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-3">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="h-full bg-abyss p-10">
                  <ServiceIcon name={item.icon} size={56} />
                  <h3 className="text-display mt-8 text-3xl leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Memories */}
      <section id="memories" className="relative scroll-mt-20 py-28">
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
                Corporate incentive tours, group journeys and cruises we have
                arranged for our clients.
              </p>
            </Reveal>
          </div>

          <MemoryWall items={memories} />
        </div>
      </section>

      {/* Where next */}
      <section className="relative py-28">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow">Connect with us</p>
            <h2 className="text-display mt-4 text-5xl md:text-6xl">
              Where are you headed next?
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2">
            {[
              {
                to: "/personal-travel#plan",
                eyebrow: "Planning a holiday?",
                line: "Tell us where, when and who's coming — we'll shape the trip around you.",
                cta: "Start planning",
              },
              {
                to: "/corporate#proposal",
                eyebrow: "Planning for your team?",
                line: "Travel management, conferences and incentive tours, proposed to your brief.",
                cta: "Request a proposal",
              },
            ].map((item, i) => (
              <Reveal key={item.to} delay={i * 0.08} className="h-full">
                <Link
                  to={item.to}
                  className="group flex h-full flex-col justify-between gap-10 bg-secondary/40 p-10 transition-colors hover:bg-secondary/70 md:p-14"
                >
                  <div>
                    <p className="eyebrow">{item.eyebrow}</p>
                    <p className="text-display mt-4 text-3xl leading-snug">
                      {item.line}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-primary">
                    {item.cta}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-sm text-muted-foreground">
              Or call our hotline on{" "}
              <a href={`tel:${company.hotlineHref}`} className="gold-underline text-foreground">
                {company.hotline}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
