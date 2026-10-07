import { Link } from "react-router-dom";
import { company, globalPartners } from "../tpl";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/40 bg-abyss/60">
      <div className="container-editorial grid grid-cols-1 gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">The leisure arm of {company.parent}</p>
          <h3 className="text-display mt-4 text-4xl leading-tight">
            {company.tagline}.
          </h3>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Corporate travel, MICE and incentive tours out of Colombo — delivered
            with precision, efficiency and attention to detail, so every journey
            reflects the standards of your organization.
          </p>

          <address className="mt-8 space-y-1 text-sm not-italic text-muted-foreground">
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

        <div className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="gold-underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/#services" className="gold-underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/#network" className="gold-underline">
                Global Network
              </Link>
            </li>
            <li>
              <Link to="/#memories" className="gold-underline">
                Memories
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
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Our global partners</p>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            {globalPartners.map((partner) => (
              <p key={partner.country}>
                <span className="text-foreground">{partner.country}</span> ·{" "}
                {partner.name}
                <br />
                <a
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  className="gold-underline"
                >
                  {partner.phone}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p className="uppercase tracking-[0.24em]">
            Powered by Experience · Driven by Excellence · Focused on Service
          </p>
        </div>
      </div>
    </footer>
  );
}
