import ServiceIcon from "../components/ServiceIcon";
import { Eyebrow } from "../components/ui";
import { PageHero, ServiceStrip } from "../components/sections";
import colombo from "../assets/destinations/colombo.jpg";
import { leadership, pillars } from "../tpl";
import { usePageMeta } from "../usePageMeta";

export default function About() {
  usePageMeta(
    "About Us — Veteran Travel Professionals | Travel Port Leisure",
    "Travel Port Leisure is the leisure arm of Base HP, operating out of Narahenpita, Colombo — veteran travel professionals led by Chairman Harsha Gunasekara and Director/CEO Sameera Fernando.",
  );

  return (
    <main className="inner-page">
      <PageHero eyebrow="Who we are" title="Veteran travel professionals" accent="who stand apart." image={colombo} />

      <section className="section">
        <div className="travel-shell">
          <Eyebrow>Travel Port Leisure · The leisure arm of Base HP</Eyebrow>
          <div className="section-intro">
            <h2>
              Global connections.
              <br />
              <em>Personal commitment.</em>
            </h2>
            <div className="prose">
              <p>
                We are a team of veteran travel professionals who believe that corporate travel should be seamless,
                prestigious, and impeccably executed — in a market often saturated with limited-exposure providers.
              </p>
              <p>
                We stand apart. We specialize in the complex logistics of MICE (Meetings, Incentives, Conferences &amp;
                Exhibitions) and Corporate Incentive Tours, ensuring that every journey reflects the standards of your
                organization.
              </p>
              <p>
                Travel Port Leisure is the leisure arm of Base HP, operating out of Narahenpita, Colombo, with agents
                around the globe.
              </p>
            </div>
          </div>
          <ServiceStrip compact items={pillars} />
        </div>
      </section>

      <section className="section purpose-section">
        <div className="travel-shell">
          <Eyebrow>Guided by our purpose. Driven by our commitment.</Eyebrow>
          <div className="purpose-grid">
            <article className="purpose-entry">
              <ServiceIcon name="excellence" className="service-detail-icon object-contain" />
              <h2>
                Our <em>Vision</em>
              </h2>
              <p className="section-description">
                To be Sri Lanka's most trusted corporate and leisure travel partner, delivering innovative travel
                solutions, unforgettable experiences, and world-class service excellence while setting new benchmarks in
                the travel industry.
              </p>
            </article>
            <article className="purpose-entry">
              <ServiceIcon name="experience" className="service-detail-icon object-contain" />
              <h2>
                Our <em>Mission</em>
              </h2>
              <p className="section-description">
                To create seamless, personalized, and value-driven travel experiences through industry expertise,
                strategic partnerships, operational excellence, and a customer-first approach, ensuring every journey
                exceeds expectations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="travel-shell">
          <Eyebrow>Our leadership powerhouse</Eyebrow>
          <div className="section-heading">
            <h2>
              Our strength lies
              <br />
              <em>in our people.</em>
            </h2>
            <p className="section-description">
              A visionary leadership driving excellence, innovation and unforgettable journeys worldwide.
            </p>
          </div>
          <div className="leadership-grid">
            {leadership.map((person) => (
              <article key={person.name}>
                <img src={person.image} alt={person.name} loading="lazy" width={710} height={858} />
                <h3>{person.name}</h3>
                <p className="eyebrow">{person.role}</p>
                <p className="section-description">{person.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
