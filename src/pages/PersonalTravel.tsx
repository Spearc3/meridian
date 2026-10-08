import Reveal from "../components/Reveal";
import ServiceIcon from "../components/ServiceIcon";
import PageHero from "../components/PageHero";
import ServiceGrid from "../components/ServiceGrid";
import MemoryWall from "../components/MemoryWall";
import Process from "../components/Process";
import EnquiryForm from "../components/EnquiryForm";
import hero from "../assets/tpl-memory-02.jpg";
import {
  essentials,
  memories,
  personalEnquiry,
  personalServices,
} from "../tpl";

export default function PersonalTravel() {
  return (
    <>
      <PageHero
        image={hero}
        eyebrow="Personal Travels"
        title={
          <>
            Curated holidays.
            <br />
            <em className="text-primary">Cherished memories.</em>
          </>
        }
        intro="Holidays, group getaways, cruises and tailor-made journeys — planned around you by veteran travel professionals in Colombo."
      >
        <a
          href="#plan"
          className="gold-underline text-sm uppercase tracking-[0.24em] text-primary"
        >
          Start planning →
        </a>
      </PageHero>

      <section className="container-editorial py-24">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Ways to travel</p>
            <h2 className="text-display mt-4 text-5xl md:text-6xl">
              Your journey, <em className="text-primary">your way.</em>
            </h2>
          </Reveal>
        </div>
        <ServiceGrid items={personalServices} />
      </section>

      {/* Where we take you */}
      {/* Essentials */}
      <section className="container-editorial py-24">
        <Reveal>
          <div className="border border-border/60 bg-secondary/30 p-10 md:p-14">
            <p className="eyebrow">The essentials, handled</p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {essentials.map((item) => (
                <div key={item.title}>
                  <ServiceIcon name={item.icon} size={48} />
                  <h3 className="text-display mt-5 text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-editorial py-24">
        <Reveal>
          <p className="eyebrow">From the field</p>
          <h2 className="text-display mt-4 mb-14 text-5xl md:text-6xl">
            Journeys we've arranged.
          </h2>
        </Reveal>
        <MemoryWall items={memories.filter((m) => m.audience === "personal")} />
      </section>

      <Process />

      <section id="plan" className="container-editorial scroll-mt-24 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Plan your trip</p>
            <h2 className="text-display mt-4 text-5xl leading-[0.95]">
              A holiday for you and <em className="text-primary">yours?</em>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Tell us a little about the trip and we'll come back with ideas,
              an itinerary and a quotation.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <EnquiryForm fields={personalEnquiry} subject="Holiday enquiry" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
