import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Check, Mail, Minus, RotateCcw, Sparkles, X } from "lucide-react";
import {
  addInterest,
  clearTrip,
  loadTrip,
  removeInterest,
  setTrack,
  useTrip,
  type InterestKind,
  type Track,
} from "../advisor";
import { company, continents, corporateServices, essentials, personalServices } from "../tpl";

/** What a tap on each kind of element tells the advisor. */
const watched: [string, InterestKind][] = [
  [".city-links a", "place"],
  [".country-entry>summary", "place"],
  [".continent-tabs [role=tab]", "place"],
  [".destination-tile", "place"],
  [".destination-spotlight", "place"],
  [".service-entry>summary", "service"],
  [".service-entry", "service"],
  [".travel-type", "style"],
  [".memory", "inspiration"],
];

/** An element's name, without numbering, "+" indicators or trailing arrows. */
function labelOf(el: Element) {
  return (el.querySelector("h3,h4,strong,b")?.textContent || el.textContent || "")
    .replace(/^[\s\d.·+×]+/, "")
    .replace(/[^\p{L}\p{N})]+$/u, "")
    .split("\n")[0]
    .trim();
}

/** Notes what the visitor taps anywhere on the site, and which side of travel
 *  they're on. */
function useInterestTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    loadTrip();
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/corporate")) setTrack("corporate");
    else if (pathname.startsWith("/personal")) setTrack("personal");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || target.closest(".advisor-panel,.advisor-orb")) return;
      for (const [selector, kind] of watched) {
        const el = target.closest(selector);
        if (el) {
          addInterest(kind, labelOf(el));
          return;
        }
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

const CORPORATE = "Corporate & business";
const PERSONAL = "Personal holiday";

type Answers = Partial<Record<StepKey, string[]>>;
type StepKey = "track" | "service" | "continent" | "country" | "dates" | "travellers" | "extras";
type Stage = StepKey | "details" | "done";
type Step = {
  key: StepKey;
  multi: boolean;
  label: string;
  ask: (a: Answers) => string;
  options: (a: Answers) => string[];
};

const isCorporate = (a: Answers) => a.track?.[0] === CORPORATE;
const coveredContinents = continents.filter((c) => c.groups.length);
const countriesIn = (names: string[]) =>
  coveredContinents
    .filter((c) => names.includes(c.name))
    .flatMap((c) => c.groups.flatMap((g) => g.countries.map((country) => country.name)));

const steps: Step[] = [
  {
    key: "track",
    multi: false,
    label: "Trip type",
    ask: () => "First things first — is this a personal getaway, or travel for your company?",
    options: () => [PERSONAL, CORPORATE, "Something else"],
  },
  {
    key: "service",
    multi: true,
    label: "Services",
    ask: (a) =>
      isCorporate(a)
        ? "Which of our corporate services can I arrange? Pick as many as you need."
        : "What kind of journey are you dreaming of? Choose any that fit.",
    options: (a) => (isCorporate(a) ? corporateServices : personalServices).map((s) => s.title),
  },
  {
    key: "continent",
    multi: true,
    label: "Regions",
    ask: () => "Wonderful. Which parts of the world are calling you?",
    options: () => coveredContinents.map((c) => c.name),
  },
  {
    key: "country",
    multi: true,
    label: "Countries",
    ask: () => "Lovely — any particular countries? Leave blank and we’ll suggest the best fit.",
    options: (a) => countriesIn(a.continent ?? []),
  },
  {
    key: "dates",
    multi: false,
    label: "When",
    ask: () => "When are you thinking of travelling?",
    options: () => ["Within a month", "In 1–3 months", "In 3–6 months", "December holidays", "Flexible"],
  },
  {
    key: "travellers",
    multi: false,
    label: "Travellers",
    ask: (a) => (isCorporate(a) ? "How many people will be travelling?" : "And who’s coming along?"),
    options: (a) =>
      isCorporate(a)
        ? ["1–5", "6–20", "21–50", "50+"]
        : ["Just me", "Two of us", "Family with kids", "Group of friends"],
  },
  {
    key: "extras",
    multi: true,
    label: "Essentials",
    ask: () => "Shall I also take care of any essentials?",
    options: () => essentials.map((s) => s.title),
  },
];

type Message = { from: "bot" | "user"; text: string };
type Details = Partial<Record<"Name" | "Email" | "Phone" | "Notes", string>>;

/** The step after `key`, skipping countries when no listed region was picked. */
function nextStage(key: StepKey, answers: Answers): Stage {
  const i = steps.findIndex((s) => s.key === key);
  let next = steps[i + 1];
  if (next?.key === "country" && !countriesIn(answers.continent ?? []).length) next = steps[i + 2];
  return next?.key ?? "details";
}

/** A guided conversation that turns taps into a travel brief, sent by email. */
export function AdvisorChat({
  initialTrack,
  autoStart = false,
}: {
  initialTrack?: Track | "contact";
  autoStart?: boolean;
}) {
  const trip = useTrip();
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [picked, setPicked] = useState<string[]>([]);
  const [details, setDetails] = useState<Details>({});
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoStart) start();
    // Runs once per mount; a restart remounts the chat with a new key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > 1 || stage === "details")
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, stage]);

  const noted = trip.interests.map((i) => i.label.toLowerCase());
  const alreadyNoted = (options: string[]) =>
    options.filter((o) => noted.some((n) => n === o.toLowerCase() || n.includes(o.toLowerCase())));

  /** Moves to `key`, answering it from what's already noted where possible. */
  function ask(key: Stage, current: Answers) {
    const step = steps.find((s) => s.key === key);
    if (step) {
      const options = step.options(current);
      const pageTrack = initialTrack === "corporate" ? CORPORATE : initialTrack === "personal" ? PERSONAL : null;
      const known =
        key === "track" && pageTrack
          ? [pageTrack]
          : key === "track" && trip.track
            ? [trip.track === "corporate" ? CORPORATE : PERSONAL]
            : alreadyNoted(options);
      if (key === "continent")
        for (const continent of coveredContinents)
          if (
            continent.groups.some((g) =>
              g.countries.some(
                (c) => noted.includes(c.name.toLowerCase()) || c.cities.some((city) => noted.includes(city.toLowerCase())),
              ),
            )
          )
            known.push(continent.name);
      const unique = [...new Set(known)];
      if (unique.length) {
        const next = { ...current, [key]: step.multi ? unique : unique.slice(0, 1) };
        setAnswers(next);
        ask(nextStage(step.key, next), next);
        return;
      }
    }

    setTyping(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(
      () => {
        setTyping(false);
        setStage(key);
        const text = step
          ? step.ask(current)
          : key === "details"
            ? "Almost there! A few details so our advisor can send your tailored proposal."
            : "Perfect. Here’s your brief — send it and our travel desk will be in touch.";
        setMessages((m) => [...m, { from: "bot", text }]);
        setPicked([]);
      },
      reduced ? 0 : 650,
    );
  }

  function start() {
    setAnswers({});
    setDetails({});
    setMessages([
      {
        from: "bot",
        text: trip.interests.length
          ? "Hello! I’m your Travel Port advisor. I’ve noted what you explored — I’ll only ask what’s missing."
          : "Hello! I’m your Travel Port advisor. Just tap the options that suit you.",
      },
    ]);
    if (initialTrack === "personal" || initialTrack === "corporate") {
      const next = { track: [initialTrack === "corporate" ? CORPORATE : PERSONAL] };
      setAnswers(next);
      ask("service", next);
    } else ask("track", {});
  }

  function answer(choice = picked) {
    if (!stage || stage === "details" || stage === "done") return;
    const next = { ...answers, [stage]: choice };
    setAnswers(next);
    if (stage === "track") {
      if (choice[0] === "Something else") {
        setMessages((m) => [...m, { from: "user", text: choice[0] }]);
        setPicked([]);
        ask("details", next);
        return;
      }
      setTrack(choice[0] === CORPORATE ? "corporate" : "personal");
    }
    setMessages((m) => [...m, { from: "user", text: choice.length ? choice.join(", ") : "No preference" }]);
    setPicked([]);
    ask(nextStage(stage, next), next);
  }

  function toggle(option: string, multi: boolean) {
    if (!multi) {
      answer([option]);
      return;
    }
    setPicked((p) => (p.includes(option) ? p.filter((o) => o !== option) : [...p, option]));
  }

  function submitDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Details;
    setDetails(form);
    setMessages((m) => [...m, { from: "user", text: `I’m ${form.Name}${form.Notes ? ` — ${form.Notes}` : ""}` }]);
    ask("done", answers);
  }

  const brief: [string, string][] = [
    ...steps.filter((s) => answers[s.key]?.length).map((s): [string, string] => [s.label, answers[s.key]!.join(", ")]),
    ...(["Name", "Email", "Phone", "Notes"] as const).filter((k) => details[k]).map((k): [string, string] => [k, details[k]!]),
  ];
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
    `${answers.track?.[0] ?? "Travel"} enquiry — ${details.Name ?? ""}`,
  )}&body=${encodeURIComponent(brief.map(([k, v]) => `${k}: ${v}`).join("\n"))}`;
  const step = steps.find((s) => s.key === stage);

  return (
    <div className="advisor-body" ref={bodyRef}>
      {!stage && (
        <>
          <div className="advisor-msg bot">
            <span className="advisor-who">Travel advisor</span>
            {trip.interests.length
              ? "Here’s what has caught your eye so far — tap one to remove it."
              : "Explore the site — every destination, service or journey you tap lands here, and I’ll use it to shape your trip."}
          </div>
          {trip.interests.length > 0 && (
            <div className="advisor-chips">
              {trip.interests.map((i) => (
                <button key={i.id} type="button" className="advisor-chip" onClick={() => removeInterest(i.id)}>
                  <small>{i.kind}</small>
                  {i.label}
                  <X size={12} />
                </button>
              ))}
            </div>
          )}
          <div className="advisor-chips">
            <button type="button" className="advisor-chip advisor-primary" onClick={start}>
              <Sparkles size={13} />
              Plan my trip with me
            </button>
            {trip.interests.length > 0 && (
              <button type="button" className="advisor-chip" onClick={clearTrip}>
                Start fresh
              </button>
            )}
          </div>
        </>
      )}

      {messages.map((m, i) => (
        <div key={i} className={`advisor-msg ${m.from}`}>
          <span className="advisor-who">{m.from === "bot" ? "Travel advisor" : "You"}</span>
          {m.text}
        </div>
      ))}

      {typing && (
        <div className="advisor-typing" aria-label="Advisor is typing">
          <i />
          <i />
          <i />
        </div>
      )}

      {step && !typing && (
        <div className="advisor-options" role="group" aria-label={step.label}>
          <div className="advisor-chips">
            {step.options(answers).map((option) => (
              <button
                key={option}
                type="button"
                className="advisor-chip"
                aria-pressed={picked.includes(option)}
                onClick={() => toggle(option, step.multi)}
              >
                {picked.includes(option) && <Check size={12} />}
                {option}
              </button>
            ))}
          </div>
          {stage === "travellers" && <GroupPicker corporate={isCorporate(answers)} onDone={(g) => answer([g])} />}
          {step.multi && (
            <button type="button" className="advisor-chip advisor-primary" onClick={() => answer()}>
              {picked.length ? `Continue with ${picked.length}` : "Skip"}
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      )}

      {stage === "details" && !typing && (
        <form className="advisor-details" onSubmit={submitDetails}>
          <input name="Name" required placeholder="Your name*" autoComplete="name" aria-label="Your name" />
          <input name="Email" type="email" required placeholder="Email*" autoComplete="email" aria-label="Email" />
          <input name="Phone" type="tel" placeholder="Phone / WhatsApp" autoComplete="tel" aria-label="Phone" />
          <textarea name="Notes" rows={2} placeholder="Anything else? Occasion, hotel style, budget…" aria-label="Anything else" />
          <button type="submit" className="advisor-chip advisor-primary">
            Review my brief
            <ArrowRight size={13} />
          </button>
        </form>
      )}

      {stage === "done" && !typing && (
        <>
          <div className="advisor-msg user advisor-summary">
            <span className="advisor-who">Your brief</span>
            {brief.map(([k, v]) => (
              <div key={k}>
                <b>{k}:</b> {v}
              </div>
            ))}
          </div>
          <div className="advisor-chips">
            <a className="advisor-chip advisor-primary" href={mailto}>
              <Mail size={13} />
              Send to {company.email}
            </a>
            <button type="button" className="advisor-chip" onClick={start}>
              Start over
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/** Exact party size, for when the preset answers don't fit. */
function GroupPicker({ corporate, onDone }: { corporate: boolean; onDone: (group: string) => void }) {
  const fields = corporate ? ["Travellers"] : ["Adults", "Children", "Infants"];
  const [counts, setCounts] = useState<Record<string, string>>(
    corporate ? { Travellers: "" } : { Adults: "2", Children: "0", Infants: "0" },
  );
  const presets = corporate ? ["10", "25", "40", "75", "100", "150"] : ["0", "1", "2", "3", "4", "6", "8", "10"];
  const [open, setOpen] = useState<string | null>(null);
  const summary = fields
    .filter((f) => Number(counts[f]) > 0)
    .map((f) => `${counts[f]} ${f.toLowerCase()}`)
    .join(", ");

  return (
    <div className="advisor-group" aria-label="Custom group size">
      <span className="advisor-group-label">Or set your own group</span>
      <div className="advisor-group-fields">
        {fields.map((field) => (
          <div key={field} className="advisor-combo">
            <label>{field}</label>
            <input
              role="combobox"
              aria-expanded={open === field}
              aria-label={field}
              inputMode="numeric"
              value={counts[field]}
              placeholder="0"
              onFocus={() => setOpen(field)}
              onBlur={() => setTimeout(() => setOpen((o) => (o === field ? null : o)), 150)}
              onChange={(e) =>
                setCounts((c) => ({ ...c, [field]: e.target.value.replace(/\D/g, "").slice(0, 4) }))
              }
            />
            {open === field && (
              <ul role="listbox">
                {presets.map((p) => (
                  <li
                    key={p}
                    role="option"
                    aria-selected={counts[field] === p}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setCounts((c) => ({ ...c, [field]: p }));
                      setOpen(null);
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="advisor-chip advisor-primary" disabled={!summary} onClick={() => onDone(summary)}>
        Use this group
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

/** The floating orb and its panel, on every page. */
export default function Advisor() {
  useInterestTracking();
  const trip = useTrip();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [track, setPanelTrack] = useState<Track | null>(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ track?: Track; place?: string }>).detail;
      if (detail?.place) addInterest("place", detail.place);
      if (detail?.track) {
        setPanelTrack(detail.track);
        setSession((s) => s + 1);
      }
      setOpen(true);
    };
    window.addEventListener("tpl:open-advisor", onOpen);
    return () => window.removeEventListener("tpl:open-advisor", onOpen);
  }, []);

  // A little bounce on the orb each time something new is noted.
  useEffect(() => {
    if (!trip.lastAdded) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 700);
    return () => clearTimeout(t);
  }, [trip.lastAdded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="advisor-panel" role="dialog" aria-label="Travel advisor" hidden={!open}>
        <div className="advisor-head">
          <span className="advisor-avatar" />
          <div>
            <h3>Your travel advisor</h3>
            <p>Travel Port Leisure · plan a personalised trip</p>
          </div>
          <button
            type="button"
            aria-label="Restart conversation"
            title="Restart conversation"
            onClick={() => setSession((s) => s + 1)}
          >
            <RotateCcw size={16} />
          </button>
          <button type="button" aria-label="Minimise advisor" title="Minimise — continue later" onClick={() => setOpen(false)}>
            <Minus size={18} />
          </button>
        </div>
        <AdvisorChat key={session} {...(track ? { initialTrack: track, autoStart: true } : {})} />
      </div>
      <button
        type="button"
        className="advisor-orb"
        data-bump={bump || undefined}
        aria-label={open ? "Minimise travel advisor" : "Open travel advisor"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Minus size={22} /> : <Sparkles size={22} />}
        {trip.interests.length > 0 && !open && <span className="advisor-orb-count">{trip.interests.length}</span>}
      </button>
    </>
  );
}
