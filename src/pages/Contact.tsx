import { Link } from "react-router-dom";
import { Eyebrow } from "../components/ui";
import { EnquiryChat, PageHero } from "../components/sections";
import colombo from "../assets/destinations/colombo.jpg";
import { company, tel } from "../tpl";
import { usePageMeta } from "../usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contact Us — Travel Port Leisure, Colombo",
    "Call +94 11 255 2452, write to info@tpleisure.lk or visit us at No. 181, Nawala Road, Narahenpita, Colombo 05 — every journey begins with a conversation.",
  );

  return (
    <main className="inner-page">
      <PageHero
        eyebrow="Connect with us"
        title="Tell us where"
        accent="you need to be."
        image={colombo}
        description="Every journey begins with a conversation. Call the hotline, write to us, or send a message below."
      />

      <section className="section contact-section">
        <div className="travel-shell">
          <div className="section-heading">
            <div>
              <Eyebrow>Travel Port Leisure · Colombo</Eyebrow>
              <h2>
                Let's start
                <br />
                <em>a conversation.</em>
              </h2>
            </div>
          </div>
          <div className="contact-details">
            <div>
              <h3>Visit us</h3>
              <p>{company.address}</p>
            </div>
            <div>
              <h3>Call us</h3>
              <a href={tel(company.phone)}>{company.phone}</a>
              <br />
              <a href={tel(company.mobile)}>{company.mobile}</a>
            </div>
            <div>
              <h3>Write to us</h3>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
            <div>
              <h3>Opening hours</h3>
              <p>{company.hours}</p>
            </div>
          </div>
          <div className="contact-enquiry-heading">
            <p className="section-description">
              For a detailed quote, use the{" "}
              <Link to="/personal-travel#plan" className="text-primary">
                holiday
              </Link>{" "}
              or{" "}
              <Link to="/corporate#proposal" className="text-primary">
                corporate
              </Link>{" "}
              enquiry forms.
            </p>
          </div>
          <div className="contact-enquiry">
            <EnquiryChat mode="contact" />
          </div>
        </div>
      </section>
    </main>
  );
}
