import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import portrait from "../assets/about-portrait.jpg";
import hero from "../assets/hero-ocean.jpg";

const stats = [
  { value: "2019", label: "Founded in Genoa" },
  { value: "12", label: "In the atelier" },
  { value: "72", label: "Countries indexed" },
  { value: "340", label: "Journeys composed" },
];

const paragraphs = [
  "Meridian began in a room above a Genoese bookshop in 2019, with a shortwave radio, a wall of pinned maps, and a single unshakeable belief: that the person travelling should be the one telling the story.",
  "We are twelve — planners, fixers, a cartographer, and a sommelier of quiet places. We do not run tours. We compose roughly forty private journeys a season, each one built around a family, a couple, or a single traveller who knew what they wanted and needed someone to arrange it.",
  "Our job is the invisible half: the room that faces the right way, the guide who is worth the early start, the tide table that decides your Tuesday. You keep the pen. We keep the logistics, the contingencies, and the phone number you call at 3am."
];

export default function About() {
  return (
    <>
      <section className="container-editorial pt-40 pb-24">
        <p className="eyebrow animate-reveal">The Atelier</p>
        <h1
          className="text-display mt-6 max-w-5xl text-6xl leading-[0.95] animate-reveal md:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          A small studio, <em className="text-primary">seven time zones</em>, and
          one job: to make your journey yours.
        </h1>
      </section>

      <section className="container-editorial grid grid-cols-1 items-start gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative overflow-hidden">
              <img
                src={portrait}
                alt="Luca Marchetti"
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 border-r border-t border-primary/60 bg-abyss/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-primary backdrop-blur">
                Luca Marchetti · Founder
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

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

      <section className="container-editorial py-32 text-center">
        <Reveal>
          <p className="eyebrow">Manifesto</p>
          <blockquote className="text-display mx-auto mt-8 max-w-4xl text-4xl leading-tight md:text-6xl">
            You are the editor.
            <span className="italic text-primary"> We are merely the press.</span>
          </blockquote>
          <Link
            to="/contact"
            className="mt-12 inline-block gold-underline text-sm uppercase tracking-[0.24em] text-primary"
          >
            Work with the atelier →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
