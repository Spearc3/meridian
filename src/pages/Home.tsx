import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, X } from "lucide-react";
import DestinationExplorer from "../components/DestinationExplorer";
import ServiceIcon from "../components/ServiceIcon";
import { Button, Eyebrow } from "../components/ui";
import { buttonClass } from "../components/buttonClass";
import { scrollTrack } from "../scrollTrack";
import { openAdvisor } from "../advisor";
import heroOcean from "../assets/hero-ocean.jpg";
import personalImage from "../assets/tpl-memory-03.jpg";
import corporateImage from "../assets/tpl-memory-05.jpg";
import { company, memories, principles, readyToOffer, tel } from "../tpl";
import { usePageMeta } from "../usePageMeta";

/** The two crafts — each a doorway to its own page. */
const crafts = [
  {
    number: "01",
    label: "Personal Travels",
    title: "The art of",
    accent: "the journey.",
    description:
      "Leisure is personal. We shape every itinerary around how you like to travel — the pace, the places and the small details that turn a trip into a memory.",
    tags: ["Leisure holidays", "Luxury & FIT", "Group tours", "Cruises"],
    image: personalImage,
    alt: "A Travel Port Leisure group on holiday",
    to: "/personal-travel",
    cta: "Explore personal travel",
  },
  {
    number: "02",
    label: "Corporate & Business",
    title: "The discipline of",
    accent: "business travel.",
    description:
      "Business travel runs on precision. We manage the moving parts — ticketing, accommodation, visas and ground transport — so your people arrive ready, and every conference and incentive tour reflects the standards of your organization.",
    tags: ["Travel management", "MICE", "Incentive tours", "Global aviation"],
    image: corporateImage,
    alt: "A corporate incentive group travelling with Travel Port Leisure",
    to: "/corporate",
    cta: "Explore corporate travel",
  },
];

const stats = [
  ["7", "Continents"],
  ["35+", "Destinations"],
  ["25+", "Years industry expertise"],
];

export default function Home() {
  usePageMeta(
    "Travel Port Leisure — Explore the Unexplored",
    "Personal holidays, corporate travel and incentive tours from Colombo. Flexible itineraries, seven regions and over 25 years of travel expertise.",
  );

  const [viewing, setViewing] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const photo = viewing === null ? null : memories[viewing];

  // Lightbox: page locked, focus held on the close button, Escape closes, and
  // focus goes back where it was.
  useEffect(() => {
    if (!photo) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      if (e.key === "Tab") {
        e.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [photo]);

  return (
    <>
      <main>
        <section className="home-hero" aria-labelledby="home-title">
          <img src={heroOcean} className="hero-photo" alt="Ocean waves breaking along a tropical coastline" fetchPriority="high" />
          <div className="hero-overlay" />
          <div className="travel-shell hero-content">
            <Eyebrow>{company.name} · Colombo, Sri Lanka</Eyebrow>
            <h1 id="home-title">
              Explore the
              <br />
              <em>Unexplored.</em>
            </h1>
            <p className="hero-description">
              Veteran travel professionals for both sides of travel — the holiday that should feel effortless, and the
              business trip that has to run like clockwork.
            </p>
            <div className="hero-actions">
              <Link to="/personal-travel" className={buttonClass("travelOutline")}>
                Personal Travels
                <ArrowRight size={16} />
              </Link>
              <Link to="/corporate" className={buttonClass("travel")}>
                Corporate &amp; Business
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="travel-shell hero-bottom">
            <span />
            <a href="#dynamic-plans" className="scroll-link">
              Scroll <ArrowDown />
            </a>
          </div>
        </section>

        <section className="section" id="dynamic-plans">
          <div className="travel-shell">
            <Eyebrow>Dynamic travel plans</Eyebrow>
            <div className="section-intro">
              <h2>
                Plans that move
                <br />
                <em>as you do.</em>
              </h2>
              <p className="section-description">
                Every itinerary is built around you and stays flexible — we adapt it with you as plans change. Behind it
                sits a global network of agents, and the expertise to put it to work for a family holiday or a
                company-wide incentive tour.
              </p>
            </div>
            <p className="services-label">Expertise, ready to be offered</p>
            <div className="services">
              {readyToOffer.map((item) => (
                <div key={item.label} className="service-item">
                  <ServiceIcon name={item.icon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="stats">
              {stats.map(([value, label]) => (
                <div key={label} className="stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DestinationExplorer />

        <section className="section">
          <div className="travel-shell">
            <div className="section-heading">
              <h2>
                Two kinds of travel.
                <br />
                <em>Both, done properly.</em>
              </h2>
              <p className="section-description">
                A holiday and a business trip ask for different things. We know the difference — and the craft behind
                each.
              </p>
            </div>
            <div className="travel-types">
              {crafts.map((craft) => (
                <article key={craft.label} className="travel-type">
                  <Link to={craft.to} className="type-image-link">
                    <img className="type-image" src={craft.image} alt={craft.alt} loading="lazy" />
                    <span className="image-index">
                      {craft.number} / {craft.label}
                    </span>
                  </Link>
                  <div className="type-content">
                    <Eyebrow>{craft.label}</Eyebrow>
                    <h3>
                      {craft.title}
                      <br />
                      <em>{craft.accent}</em>
                    </h3>
                    <p className="section-description">{craft.description}</p>
                    <div className="type-tags">
                      {craft.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link to={craft.to} className="text-link">
                      {craft.cta}
                      <ArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="principles">
              {principles.map((item) => (
                <div key={item.title} className="principle">
                  <ServiceIcon name={item.icon} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section memories-section">
          <div className="travel-shell">
            <div className="section-heading">
              <div>
                <Eyebrow>From the field</Eyebrow>
                <h2>
                  Memories <em>we created.</em>
                </h2>
              </div>
              <div className="gallery-controls">
                <Button
                  variant="travelGhost"
                  aria-label="Previous memories"
                  title="Previous memories"
                  onClick={() => scrollTrack(track.current, -1)}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="travelGhost"
                  aria-label="Next memories"
                  title="Next memories"
                  onClick={() => scrollTrack(track.current, 1)}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
            <p className="section-description mb-8">
              Corporate incentive tours, group journeys and cruises we have arranged for our clients.
            </p>
            <div className="memories-track" ref={track}>
              {memories.map((memory, i) => (
                <article key={memory.image} className="memory">
                  <Button
                    variant="travelGhost"
                    className="memory-image-button"
                    aria-label={`View ${memory.alt.toLowerCase()}`}
                    onClick={() => setViewing(i)}
                  >
                    <img src={memory.image} alt={memory.alt} loading="lazy" />
                  </Button>
                  <div className="memory-caption">
                    <h3>{memory.place}</h3>
                    <p>{memory.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="connect-section" id="connect">
          <div className="travel-shell">
            <Eyebrow>Connect with us</Eyebrow>
            <h2>
              Where are you <em>headed next?</em>
            </h2>
            <div className="connect-options">
              <div className="connect-option">
                <h3>Planning a holiday?</h3>
                <p>Tell us where, when and who's coming — we'll shape the trip around you.</p>
                <Button variant="travel" onClick={() => openAdvisor({ track: "personal" })}>
                  Start planning
                  <ArrowRight size={16} />
                </Button>
              </div>
              <div className="connect-option">
                <h3>Planning for your team?</h3>
                <p>Travel management, conferences and incentive tours, proposed to your brief.</p>
                <Button variant="travelOutline" onClick={() => openAdvisor({ track: "corporate" })}>
                  Request a proposal
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            <p className="hotline">
              Or call our hotline on <a href={tel(company.phone)}>{company.phone}</a>.
            </p>
          </div>
        </section>
      </main>

      {photo && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.alt} onClick={() => setViewing(null)}>
          <Button
            ref={closeButton}
            variant="travelGhost"
            className="lightbox-close"
            aria-label="Close photograph"
            onClick={() => setViewing(null)}
          >
            <X />
          </Button>
          <img src={photo.image} alt={photo.alt} onClick={(e) => e.stopPropagation()} />
          <p>
            {photo.place} · {photo.type}
          </p>
        </div>
      )}
    </>
  );
}
