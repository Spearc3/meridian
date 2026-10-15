import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import { AdvisorChat } from "./Advisor";
import { Button, Eyebrow } from "./ui";
import { addInterest, openAdvisor, resetChat, startChat, type Track } from "../advisor";
import { memories, process, type Service } from "../tpl";
import { scrollTrack } from "../scrollTrack";

/** A numbered list of services, each opening to its description. */
export function ServiceStrip({ items, compact = false }: { items: Service[]; compact?: boolean }) {
  return (
    <div className={compact ? "service-strip service-strip-compact" : "service-strip"}>
      {items.map((item, i) => (
        <details key={item.title} className="service-entry responsive-detail">
          <summary>
            <ServiceIcon name={item.icon} className="service-detail-icon object-contain" />
            <h3>{item.title}</h3>
            <span className="detail-indicator" aria-hidden="true">
              +
            </span>
            <span className="service-number">0{i + 1}</span>
          </summary>
          <p>{item.blurb}</p>
        </details>
      ))}
    </div>
  );
}

/** Full-screen photo hero for the inner pages. */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  cta,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  image: string;
  cta?: { label: string; track: Track };
}) {
  return (
    <section className="page-hero">
      <img src={image} className="hero-photo" alt={eyebrow} fetchPriority="high" />
      <img src={image} className="hero-photo hero-frost" alt="" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="travel-shell page-hero-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
        {description && <p className="hero-description">{description}</p>}
        {cta && (
          <div className="hero-actions">
            <Button variant="travel" onClick={() => openAdvisor({ track: cta.track })}>
              {cta.label}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/** "How it works" — enquiry to departure in four steps. */
export function Process() {
  return (
    <section className="section process-section">
      <div className="travel-shell">
        <Eyebrow>How it works</Eyebrow>
        <h2>
          From first word <em>to wheels up.</em>
        </h2>
        <div className="process-grid">
          {process.map((step) => (
            <details key={step.n} className="process-step responsive-detail">
              <summary>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <span className="detail-indicator" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{step.blurb}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The page's own share of the memories: corporate trips or holidays. */
export function PageMemories({ corporate }: { corporate: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const items = memories.filter((_, i) => (corporate ? [0, 1, 4, 6] : [2, 3, 5, 7]).includes(i));

  return (
    <section className="section memories-section">
      <div className="travel-shell">
        <div className="section-heading">
          <div>
            <Eyebrow>From the field</Eyebrow>
            <h2>
              {corporate ? "Memories" : "Journeys"} <em>{corporate ? "we created." : "we’ve arranged."}</em>
            </h2>
          </div>
          <div className="gallery-controls">
            <Button variant="travelGhost" aria-label="Previous journeys" onClick={() => scrollTrack(track.current, -1)}>
              <ArrowLeft />
            </Button>
            <Button variant="travelGhost" aria-label="Next journeys" onClick={() => scrollTrack(track.current, 1)}>
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="memories-track" ref={track}>
          {items.map((memory) => (
            <article key={memory.image} className="memory">
              <img className="page-memory-photo" src={memory.image} alt={memory.alt} loading="lazy" />
              <div className="memory-caption">
                <h3>{memory.place}</h3>
                <p>{memory.type}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The advisor conversation, set into the page in place of a form — the same
 *  conversation as the floating panel, picked up wherever it was. */
export function EnquiryChat({ mode, destination = "" }: { mode: Track | "contact"; destination?: string }) {
  useEffect(() => {
    if (destination) addInterest("place", destination);
  }, [destination]);

  useEffect(() => {
    startChat(mode);
  }, [mode]);

  return (
    <div className="enquiry-wrap enquiry-chat chat-window">
      <div className="chat-window-head">
        <span className="advisor-avatar">
          <ServiceIcon name="support" size={22} />
        </span>
        <div>
          <h3>Get in touch with us</h3>
          <p>
            <span className="chat-window-dot" aria-hidden="true" />
            Travel advisor · we reply by email
          </p>
        </div>
        <button type="button" aria-label="Start over" title="Start over — clears everything" onClick={resetChat}>
          <RotateCcw size={16} />
        </button>
      </div>
      <AdvisorChat />
    </div>
  );
}
