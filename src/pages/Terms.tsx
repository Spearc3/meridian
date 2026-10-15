import { Eyebrow } from "../components/ui";
import { company, tel, terms } from "../tpl";
import { usePageMeta } from "../usePageMeta";

export default function Terms() {
  usePageMeta(
    "Terms & Conditions — Travel Port Leisure (Private) Limited",
    "The terms that apply to Travel Port Leisure's website and travel services — bookings, payments, cancellations, visas, liability and Sri Lankan governing law.",
  );

  return (
    <main className="inner-page">
      <section className="section legal-intro">
        <div className="travel-shell">
          <Eyebrow>
            {company.short} · {company.legalName}
          </Eyebrow>
          <h1>
            Terms &amp;
            <br />
            <em>Conditions.</em>
          </h1>
        </div>
      </section>

      <section className="section legal-section">
        <div className="travel-shell legal-layout">
          <nav aria-label="Terms sections">
            <Eyebrow>Terms &amp; Conditions</Eyebrow>
            {terms.map((term, i) => (
              <a
                key={term.heading}
                href={`#term-${i + 1}`}
                onClick={() => {
                  // Jumping to a closed section opens it.
                  const section = document.getElementById(`term-${i + 1}`);
                  if (section instanceof HTMLDetailsElement) section.open = true;
                }}
              >
                {i + 1}. {term.heading}
              </a>
            ))}
          </nav>
          <div>
            {terms.map((term, i) => (
              <details key={term.heading} className="responsive-detail legal-detail" id={`term-${i + 1}`}>
                <summary className="legal-heading">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h2>{term.heading}</h2>
                  <span className="detail-indicator" aria-hidden="true">
                    +
                  </span>
                </summary>
                {term.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </details>
            ))}
            <section>
              <h2>Contact details</h2>
              <p>
                {company.legalName}
                <br />
                {company.address}
                <br />
                Company registration: {company.registration}
                <br />
                CAASL Air Transport Licence: {company.caasl}
              </p>
              <p>
                <a href={`mailto:${company.email}`}>{company.email}</a> ·{" "}
                <a href={tel(company.mobile)}>{company.mobile}</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
