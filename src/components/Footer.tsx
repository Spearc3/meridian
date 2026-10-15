import { Link } from "react-router-dom";
import logo from "../assets/tpl-logo-white.png";
import { Eyebrow } from "./ui";
import { openAdvisor } from "../advisor";
import { company, navLinks, tel } from "../tpl";

export default function Footer() {
  return (
    <footer className="travel-footer">
      <div className="travel-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" aria-label="Travel Port Leisure home">
              <img src={logo} className="brand-logo" alt="Travel Port Leisure" loading="lazy" />
            </Link>
            <Eyebrow>The leisure arm of Base HP</Eyebrow>
            <h3>
              Explore the <em>Unexplored.</em>
            </h3>
            <p>
              Corporate travel, MICE and incentive tours out of Colombo — delivered with precision, efficiency and
              attention to detail, so every journey reflects the standards of your organization.
            </p>
          </div>
          <div>
            <p className="footer-title">Explore</p>
            <nav className="footer-links" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label === "About" ? "About Us" : link.label}
                </Link>
              ))}
              <button type="button" onClick={() => openAdvisor({ track: "corporate" })}>
                Request a Proposal
              </button>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </nav>
          </div>
          <div>
            <p className="footer-title">Visit us</p>
            <address className="footer-address">
              Travel Port Leisure (Private) Ltd
              <br />
              No. 181, Nawala Road
              <br />
              Narahenpita, Colombo 05
              <br />
              Sri Lanka
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={`https://${company.website}`}>{company.website}</a>
              <a href={tel(company.phone)}>Hotline {company.phone}</a>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Travel Port Leisure (Private) Ltd. All rights reserved. ·{" "}
            <Link to="/terms">Terms &amp; Conditions</Link>
          </p>
          <p className="footer-motto">Powered by experience · Driven by excellence · Focused on service</p>
        </div>
      </div>
    </footer>
  );
}
