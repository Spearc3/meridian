import { Link } from "react-router-dom";
import Logo from "./Logo";
import { company } from "../tpl";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/40 bg-abyss/60">
      {/* The logo gets its own row, so the three column headings below it
          share one baseline. */}
      <div className="container-editorial pt-14">
        <Logo className="h-11" />
      </div>
      <div className="container-editorial grid grid-cols-1 gap-10 pt-10 pb-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">The leisure arm of {company.parent}</p>
          <h3 className="text-display mt-3 text-3xl leading-tight">
            {company.tagline}.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Corporate travel, MICE and incentive tours out of Colombo — delivered
            with precision, efficiency and attention to detail, so every journey
            reflects the standards of your organization.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li>
              <Link to="/" className="gold-underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/personal-travel" className="gold-underline">
                Personal Travels
              </Link>
            </li>
            <li>
              <Link to="/corporate" className="gold-underline">
                Corporate & Business
              </Link>
            </li>
            <li>
              <Link to="/about" className="gold-underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="gold-underline">
                Request a Proposal
              </Link>
            </li>
            <li>
              <Link to="/terms" className="gold-underline">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Visit us</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-muted-foreground">
            <p className="text-foreground">{company.legalName}</p>
            {company.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-2">
              <a href={`mailto:${company.email}`} className="gold-underline">
                {company.email}
              </a>
            </p>
            <p>
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noreferrer"
                className="gold-underline"
              >
                {company.website}
              </a>
            </p>
            <p>
              Hotline{" "}
              <a
                href={`tel:${company.hotlineHref}`}
                className="gold-underline text-foreground"
              >
                {company.hotline}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved. ·{" "}
            <Link to="/terms" className="gold-underline">
              Terms &amp; Conditions
            </Link>
          </p>
          <p className="uppercase tracking-[0.24em]">
            Powered by Experience · Driven by Excellence · Focused on Service
          </p>
        </div>
      </div>
    </footer>
  );
}
