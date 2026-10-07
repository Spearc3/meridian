import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import Reveal from "../components/Reveal";
import { company, generalEnquiry, globalPartners } from "../tpl";

const details = [
  { icon: Mail, label: "The travel desk", value: company.email },
  { icon: Phone, label: "Hotline", value: company.hotline },
  { icon: MapPin, label: "Office", value: company.address.slice(0, 2).join(", ") },
  { icon: Globe, label: "Online", value: company.website },
];

export default function Contact() {
  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <p className="eyebrow animate-reveal">Connect with us</p>
        <h1
          className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          Tell us where
          <br />
          <em className="text-primary">you need to be.</em>
        </h1>
        <p
          className="mt-8 max-w-2xl text-lg text-muted-foreground animate-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          Every journey begins with a conversation. Call the hotline, write to
          us, or send a message below. For a detailed quote, use the{" "}
          <Link to="/personal-travel#plan" className="gold-underline text-primary">holiday</Link>{" "}
          or{" "}
          <Link to="/corporate#proposal" className="gold-underline text-primary">corporate</Link>{" "}
          enquiry forms.
        </p>
      </section>

      <section className="container-editorial grid grid-cols-1 gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <EnquiryForm fields={generalEnquiry} subject="Website enquiry" />
          </Reveal>
        </div>

        <aside className="space-y-10 border-t border-border/50 pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <Reveal>
            <p className="eyebrow">{company.legalName}</p>
            <p className="mt-4 text-muted-foreground">
              {company.address.join(", ")}. The leisure arm of {company.parent},
              with partners on the ground in France and the Netherlands.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-1 grid h-9 w-9 place-items-center border border-primary/50 text-primary">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-display mt-1 text-xl">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-border/60 p-8">
              <p className="eyebrow">Our global partners</p>
              <div className="mt-5 space-y-5">
                {globalPartners.map((partner) => (
                  <div key={partner.country}>
                    <p className="text-xs uppercase tracking-[0.24em] text-primary">
                      {partner.country}
                    </p>
                    <p className="text-display mt-1 text-xl">{partner.name}</p>
                    <a
                      href={`tel:${partner.phone.replace(/\s/g, "")}`}
                      className="gold-underline text-sm text-muted-foreground"
                    >
                      {partner.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </aside>
      </section>
    </>
  );
}
