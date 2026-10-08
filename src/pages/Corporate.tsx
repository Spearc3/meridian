import Reveal from "../components/Reveal";
import ServiceIcon from "../components/ServiceIcon";
import PageHero from "../components/PageHero";
import ServiceGrid from "../components/ServiceGrid";
import MemoryWall from "../components/MemoryWall";
import Process from "../components/Process";
import EnquiryForm from "../components/EnquiryForm";
import hero from "../assets/tpl-memory-01.jpg";
import {
  corporateEnquiry,
  corporateServices,
  essentials,
  memories,
  whoWeAre,
} from "../tpl";

const promises = [
  {
    icon: "experience",
    title: "Powered by experience",
    detail: "A leadership team with 25+ years in the travel industry.",
  },
  {
    icon: "excellence",
    title: "Driven by excellence",
    detail: "Seamless, prestigious and impeccably executed — every time.",
  },
  {
    icon: "service",
    title: "Focused on service",
    detail: "Every journey reflects the standards of your organization.",
  },
];

export default function Corporate() {
  return (
    <>
      <PageHero
        image={hero}
        eyebrow="Corporate & Business"
        title={
          <>
            Smart solutions for
            <br />
            <em className="text-primary">modern businesses.</em>
          </>
        }
        intro="Corporate travel management, MICE and incentive tours — the complex logistics handled, so your people arrive ready."
      >
        <a
          href="#proposal"
          className="gold-underline text-sm uppercase tracking-[0.24em] text-primary"
        >
          Request a proposal →
        </a>
      </PageHero>

      <section className="container-editorial grid grid-cols-1 gap-16 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">We stand apart</p>
          <h2 className="text-display mt-4 text-5xl leading-[0.95] md:text-6xl">
            Engaging events.
            <br />
            <em className="text-primary">Lasting impact.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {whoWeAre.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-editorial py-24">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <p className="eyebrow">What we manage</p>
            <h2 className="text-display mt-4 text-5xl md:text-6xl">
              Business travel, end to end.
            </h2>
          </Reveal>
        </div>
        <ServiceGrid items={corporateServices} />
        <Reveal>
          <p className="mt-10 text-sm text-muted-foreground">
            Plus{" "}
            {essentials.map((e) => e.title.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}{" "}
            for every traveller.
          </p>
        </Reveal>
      </section>

      {/* Promises */}
      <section className="container-editorial py-24">
        <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="h-full bg-abyss p-8">
                <ServiceIcon name={p.icon} size={48} />
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-primary">
                  {p.title}
                </p>
                <p className="text-display mt-4 text-2xl leading-snug">
                  {p.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial py-24">
        <Reveal>
          <p className="eyebrow">From the field</p>
          <h2 className="text-display mt-4 mb-14 text-5xl md:text-6xl">
            Memories we created.
          </h2>
        </Reveal>
        <MemoryWall items={memories.filter((m) => m.audience === "corporate")} />
      </section>

      <Process />

      <section id="proposal" className="container-editorial scroll-mt-24 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Request a proposal</p>
            <h2 className="text-display mt-4 text-5xl leading-[0.95]">
              Let's plan the <em className="text-primary">next one.</em>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Share the brief — a conference, an incentive for your top
              performers, or your team's everyday travel — and we'll come back
              with a tailored proposal.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <EnquiryForm fields={corporateEnquiry} subject="Corporate enquiry" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
