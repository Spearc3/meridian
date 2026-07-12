import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "../components/Reveal";

const details = [
  { icon: Mail, label: "Editors' desk", value: "atelier@meridian.co" },
  { icon: Phone, label: "Ring us", value: "+39 010 555 0134" },
  { icon: MapPin, label: "Studio", value: "Via del Campo 14, Genoa" },
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  const field =
    "mt-3 w-full border-b border-border/60 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary";

  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <p className="eyebrow animate-reveal">Commission</p>
        <h1
          className="text-display mt-6 text-7xl leading-[0.9] animate-reveal md:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          Tell us where
          <br />
          <em className="text-primary">the story begins.</em>
        </h1>
        <p
          className="mt-8 max-w-2xl text-lg text-muted-foreground animate-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          A voyage begins with a conversation. Share as little or as much as you
          like — an editor will write back within two working days, from wherever
          they happen to be.
        </p>
      </section>

      <section className="container-editorial grid grid-cols-1 gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            {sent ? (
              <div className="border border-primary/50 bg-secondary/40 p-12">
                <p className="eyebrow">Letter received</p>
                <h2 className="text-display mt-4 text-4xl">
                  Thank you, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  An editor will write back to {form.email} within two working
                  days.
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
                  Write another →
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
                      placeholder="Luca Marchetti"
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
                      placeholder="The Aeolian Islands…"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="eyebrow">When</label>
                    <input
                      type="text"
                      value={form.when}
                      onChange={(e) => set("when")(e.target.value)}
                      placeholder="Late October, ten days"
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow">The story so far</label>
                  <textarea
                    rows={6}
                    value={form.story}
                    onChange={(e) => set("story")(e.target.value)}
                    placeholder="Tell us about the traveler, the occasion, and any thread we should pull on…"
                    className="mt-3 w-full border-b border-border/60 bg-transparent py-3 outline-none transition-colors focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
                >
                  Send the letter
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <aside className="space-y-10 border-l border-border/50 lg:col-span-5 lg:pl-12">
          <Reveal>
            <p className="eyebrow">The Atelier</p>
            <p className="mt-4 text-muted-foreground">
              Meridian keeps a small studio in Genoa and pop-up desks in Kyoto
              and Cape Town. Correspondence is welcome from anywhere with a
              postmark.
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
              <p className="eyebrow">Response time</p>
              <p className="text-display mt-3 text-4xl text-primary">≤ 48h</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Every letter is read by a human editor, never a bot.
              </p>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
