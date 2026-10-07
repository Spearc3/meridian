import { useState, type FormEvent } from "react";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "../components/Reveal";
import { company, globalPartners } from "../tpl";

const details = [
  { icon: Mail, label: "The travel desk", value: company.email },
  { icon: Phone, label: "Hotline", value: company.hotline },
  { icon: MapPin, label: "Office", value: company.address.slice(0, 2).join(", ") },
  { icon: Globe, label: "Online", value: company.website },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    where: "",
    when: "",
    story: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // No backend yet: the enquiry is handed to the visitor's own mail app,
  // addressed to the travel desk, so nothing is silently dropped.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Destination: ${form.where || "-"}`,
      `Dates / group size: ${form.when || "-"}`,
      "",
      form.story,
    ].join("\n");
    const subject = `Travel enquiry from ${form.name}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "mt-3 w-full border-b border-border/60 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary";

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
          Every journey begins with a conversation. Corporate travel, MICE,
          incentive tours, leisure or group travel — tell us the shape of it and
          our team in Colombo will come back with a proposal.
        </p>
      </section>

      <section className="container-editorial grid grid-cols-1 gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            {sent ? (
              <div className="border border-primary/50 bg-secondary/40 p-12">
                <p className="eyebrow">Almost there</p>
                <h2 className="text-display mt-4 text-4xl">
                  Thank you, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Your email app should have opened with the enquiry ready to
                  send. If it didn't, write to us at{" "}
                  <span className="text-foreground">{company.email}</span> or
                  call {company.hotline}.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      where: "",
                      when: "",
                      story: "",
                    });
                  }}
                  className="mt-8 gold-underline text-sm uppercase tracking-[0.24em] text-primary"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="eyebrow">Your name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      placeholder="Your name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="eyebrow">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="you@somewhere.com"
                      className={field}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="eyebrow">Where in the world</label>
                    <input
                      type="text"
                      value={form.where}
                      onChange={(e) => set("where")(e.target.value)}
                      placeholder="Bangkok, Dubai, Ho Chi Minh City…"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="eyebrow">When</label>
                    <input
                      type="text"
                      value={form.when}
                      onChange={(e) => set("when")(e.target.value)}
                      placeholder="Late October, five days, 40 pax"
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow">The brief</label>
                  <textarea
                    rows={6}
                    value={form.story}
                    onChange={(e) => set("story")(e.target.value)}
                    placeholder="Tell us about the group, the occasion, and anything the itinerary has to work around…"
                    className="mt-3 w-full border-b border-border/60 bg-transparent py-3 outline-none transition-colors focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
                >
                  Email the enquiry
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
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
