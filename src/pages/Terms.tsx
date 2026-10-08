import Reveal from "../components/Reveal";

/** Publication date of these terms, e.g. "8 October 2026". The "Last updated"
 *  line stays hidden until the client confirms a date. */
const LAST_UPDATED = "";

const sections: { title: string; body: string[] }[] = [
  {
    title: "About these terms",
    body: [
      "These terms apply to our website and travel services, including flights, holidays, hotels, transfers, visa assistance and corporate or group travel. By making a booking, you accept these terms and the booking-specific conditions provided before payment. Anyone booking for others must be authorised to do so and share the applicable conditions with them.",
    ],
  },
  {
    title: "Bookings and payments",
    body: [
      "Quotations are subject to availability and valid for the period stated. A booking is confirmed only when we receive the required payment and issue written confirmation; flights require ticket issuance. Deposits, balance deadlines, currency and any additional charges will be stated before payment. Late payment may result in cancellation and applicable charges.",
    ],
  },
  {
    title: "Prices and inclusions",
    body: [
      "Only services listed in your confirmation are included. Advertised “from” prices and offers are subject to availability and stated restrictions. Prices may change before confirmation due to supplier rates, taxes or exchange rates. After confirmation, changes apply only where permitted by the agreed booking conditions and applicable law.",
    ],
  },
  {
    title: "Travel suppliers",
    body: [
      "Airlines, hotels, transport providers and other suppliers have their own conditions, which will be supplied or identified before booking. Where we arrange their services, we act as a booking agent. Where we organise a package ourselves, we remain responsible for our contractual obligations. Airline baggage, flight changes, hotel check-in, special requests and similar matters are subject to the relevant supplier’s rules.",
    ],
  },
  {
    title: "Changes, cancellations and refunds",
    body: [
      "Please submit requests in writing through our official contact channels. Changes depend on availability and may incur fare differences, supplier penalties and our disclosed service fees. Cancellation charges follow the conditions provided before payment; some bookings are non-refundable. No-shows, unused services and early departures may receive no refund. Service fees are non-refundable only where disclosed, earned and legally permitted.",
      "We will explain any deductions and the expected refund process. Supplier refunds depend on supplier processing, and we will pass on funds promptly once received. This does not limit any refund obligation we have under applicable law.",
    ],
  },
  {
    title: "Passports, visas and traveller details",
    body: [
      "Travellers must provide accurate information, check booking documents promptly, and meet passport, visa, transit, health and entry requirements. Names must match passports. Corrections may incur charges. Our visa assistance does not guarantee approval, processing time or entry; these decisions belong to the relevant authorities. Visa refusal does not automatically make other travel bookings refundable.",
    ],
  },
  {
    title: "Health, insurance and conduct",
    body: [
      "Please disclose assistance, accessibility or dietary needs before booking; fulfilment requires confirmation. Appropriate travel insurance is strongly recommended and may be compulsory for certain trips. Travellers must follow safety instructions, local laws and check-in times. Serious misconduct or unsafe behaviour may result in removal from a service, with refunds governed by applicable conditions and law.",
    ],
  },
  {
    title: "Travel disruptions",
    body: [
      "Weather, government restrictions, strikes, airline changes and other events beyond reasonable control may affect travel. We will communicate significant changes when informed and assist with available alternatives or refunds. Material package changes, substitutions and minimum group requirements are governed by the conditions disclosed before booking. Additional costs and refunds remain subject to those conditions and applicable law.",
    ],
  },
  {
    title: "Responsibility and liability",
    body: [
      "We will exercise reasonable care in providing our services. To the extent permitted by law, we are not responsible for independent suppliers’ failures or events beyond our reasonable control, except where we have a legal or contractual responsibility. Nothing in these terms excludes liability for our fraud, negligence or any responsibility that cannot lawfully be excluded, or removes your statutory rights.",
    ],
  },
  {
    title: "Website and privacy",
    body: [
      "Use our website lawfully and do not make fraudulent bookings or reproduce protected content commercially without permission. Website information and images are illustrative; your written booking confirmation defines the services purchased. External websites have their own terms and privacy practices. Our separate Privacy Policy explains how we handle personal information and share it with suppliers and authorities for travel arrangements.",
    ],
  },
  {
    title: "Complaints, law and updates",
    body: [
      "Please report problems promptly to us and the relevant supplier so we can help, then send any unresolved complaint in writing with your booking details. These terms are governed by Sri Lankan law, and disputes may be brought before the competent courts of Sri Lanka, subject to mandatory legal rights. Updates apply prospectively; confirmed bookings retain the terms accepted when booked unless otherwise lawfully agreed.",
    ],
  },
];

const contact: [string, string, string?][] = [
  ["Company", "Travel Port Leisure (Private) Limited — TP Leisure"],
  ["Company registration", "PV 00365932"],
  ["CAASL Air Transport Licence", "A-2105"],
  ["Address", "No. 181, Nawala Road, Narahenpita, Sri Lanka"],
  ["Telephone", "+94 77 339 3577", "tel:+94773393577"],
  ["Email", "info@tpleisure.lk", "mailto:info@tpleisure.lk"],
];

export default function Terms() {
  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <p className="eyebrow animate-reveal">TP Leisure — Travel Port Leisure (Private) Limited</p>
        <h1
          className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Terms &amp; <em className="text-primary">Conditions</em>
        </h1>
        {LAST_UPDATED && (
          <p
            className="mt-6 text-sm text-muted-foreground animate-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        )}
      </section>

      <section className="container-editorial grid grid-cols-1 gap-16 pb-24 lg:grid-cols-12">
        <nav aria-label="Sections" className="hidden lg:col-span-4 lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-border/50 pl-6 text-sm text-muted-foreground">
            {sections.map((section, i) => (
              <li key={section.title}>
                <a href={`#term-${i + 1}`} className="gold-underline hover:text-foreground">
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#term-contact" className="gold-underline hover:text-foreground">
                Contact details
              </a>
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl space-y-14 lg:col-span-8">
          {sections.map((section, i) => (
            <Reveal key={section.title}>
              <article id={`term-${i + 1}`} className="scroll-mt-28">
                <h2 className="text-display text-3xl">
                  <span className="mr-3 text-primary">{i + 1}.</span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <article id="term-contact" className="scroll-mt-28 border border-border/60 bg-secondary/30 p-8 md:p-10">
              <h2 className="text-display text-3xl">Contact details</h2>
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-[auto_1fr]">
                {contact.map(([label, value, href]) => (
                  <div key={label} className="contents">
                    <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:pt-0.5">
                      {label}
                    </dt>
                    <dd className="text-foreground">
                      {href ? (
                        <a href={href} className="gold-underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
