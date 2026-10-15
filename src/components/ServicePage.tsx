import { useState } from "react";
import ServiceIcon from "./ServiceIcon";
import { Eyebrow } from "./ui";
import { EnquiryChat, PageHero, PageMemories, Process, ServiceStrip } from "./sections";
import { openAdvisor } from "../advisor";
import {
  company,
  corporatePrinciples,
  corporateServices,
  destinations,
  essentials,
  personalServices,
  principles,
  tel,
} from "../tpl";

/** Personal Travels and Corporate & Business: one layout, two audiences. */
export default function ServicePage({ corporate = false }: { corporate?: boolean }) {
  const [destination, setDestination] = useState("");
  const track = corporate ? "corporate" : "personal";

  return (
    <main className="travel-page inner-page">
      <PageHero
        eyebrow={corporate ? "Corporate & Business" : "Personal Travels"}
        title={corporate ? "Smart solutions for" : "Curated holidays."}
        accent={corporate ? "modern businesses." : "Cherished memories."}
        description={
          corporate
            ? "Corporate travel management, MICE and incentive tours — the complex logistics handled, so your people arrive ready."
            : "Holidays, group getaways, cruises and tailor-made journeys — planned around you by veteran travel professionals in Colombo."
        }
        image={(corporate ? destinations[0] : destinations[1]).image}
        cta={{ label: corporate ? "Request a proposal" : "Start planning", track }}
      />

      {corporate && (
        <section className="section">
          <div className="travel-shell">
            <Eyebrow>We stand apart</Eyebrow>
            <div className="section-intro">
              <h2>
                Engaging events.
                <br />
                <em>Lasting impact.</em>
              </h2>
              <div className="prose">
                <p>
                  We are a team of veteran travel professionals who believe that corporate travel should be seamless,
                  prestigious, and impeccably executed — in a market often saturated with limited-exposure providers.
                </p>
                <p>
                  We stand apart. We specialize in the complex logistics of MICE (Meetings, Incentives, Conferences
                  &amp; Exhibitions) and Corporate Incentive Tours, ensuring that every journey reflects the standards of
                  your organization.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section service-section">
        <div className="travel-shell">
          <div className="section-heading">
            <div>
              <Eyebrow>{corporate ? "What we manage" : "Ways to travel"}</Eyebrow>
              <h2>
                {corporate ? "Business travel," : "Your journey,"}
                <br />
                <em>{corporate ? "end to end." : "your way."}</em>
              </h2>
            </div>
          </div>
          <ServiceStrip items={corporate ? corporateServices : personalServices} />
          {corporate ? (
            <p className="section-description service-afterword">
              Plus visa consultation, travel insurance, airport lounge access and chauffeur services for every traveller.
            </p>
          ) : (
            <div className="essentials-band">
              <Eyebrow>The essentials, handled</Eyebrow>
              <ServiceStrip items={essentials} compact />
            </div>
          )}
          {corporate && (
            <div className="principles">
              {principles.map((item, i) => (
                <div key={item.title} className="principle">
                  <ServiceIcon name={item.icon} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{corporatePrinciples[i]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageMemories corporate={corporate} />

      <section className="section destination-collection">
        <div className="travel-shell">
          <div className="section-heading">
            <div>
              <Eyebrow>Where we take you</Eyebrow>
              <h2>
                Across the world.
                <br />
                <em>Built around you.</em>
              </h2>
            </div>
          </div>
          <div className="destination-grid">
            {destinations.map((d) => (
              <button
                key={d.slug}
                type="button"
                className="destination-tile"
                onClick={() => {
                  setDestination(d.name);
                  openAdvisor({ track, place: d.name });
                }}
              >
                <img src={d.image} alt={d.name} loading="lazy" width={1536} height={1024} />
                <div>
                  <span className="eyebrow">{d.region}</span>
                  <h3>
                    {d.name}
                    <span aria-hidden="true">↗</span>
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="section enquiry-section" id={corporate ? "proposal" : "plan"}>
        <div className="travel-shell enquiry-layout">
          <div>
            <Eyebrow>{corporate ? "Request a proposal" : "Plan your trip"}</Eyebrow>
            <h2>
              {corporate ? "Let’s plan" : "A holiday for"}
              <br />
              <em>{corporate ? "the next one." : "you and yours?"}</em>
            </h2>
            <p className="section-description">
              {corporate
                ? "Share the brief — a conference, an incentive for your top performers, or your team's everyday travel — and we'll come back with a tailored proposal."
                : "Tell us a little about the trip and we'll come back with ideas, an itinerary and a quotation."}
            </p>
            <p className="hotline">
              Or call <a href={tel(company.phone)}>{company.phone}</a>
            </p>
          </div>
          <EnquiryChat destination={destination} mode={track} />
        </div>
      </section>
    </main>
  );
}
