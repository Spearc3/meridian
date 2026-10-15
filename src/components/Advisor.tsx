import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Check, Mail, Minus, RotateCcw, Sparkles, X } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import {
  addInterest,
  answer,
  briefOf,
  currentStage,
  isCorporate,
  loadTrip,
  notedOptions,
  removeAnswer,
  removeInterest,
  resetChat,
  setTrack,
  startChat,
  steps,
  submitDetails,
  useTrip,
  type Details,
  type InterestKind,
  type Track,
} from "../advisor";
import { launchStar } from "../shootingStar";
import { company } from "../tpl";

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
 *  they're on. Each new note sends a star from the tap to the orb. */
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
      if (!target || target.closest(".advisor-panel,.advisor-orb,.enquiry-chat")) return;
      for (const [selector, kind] of watched) {
        const el = target.closest(selector);
        if (!el) continue;
        if (addInterest(kind, labelOf(el))) {
          // Keyboard activation reports 0,0: start from the element instead.
          const box = el.getBoundingClientRect();
          const fromPointer = e.clientX || e.clientY;
          launchStar(fromPointer ? e.clientX : box.left + box.width / 2, fromPointer ? e.clientY : box.top + box.height / 2);
        }
        return;
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

const TYPING_MS = 650;

/** The conversation: one queue of questions, shared by every chat on the site. */
export function AdvisorChat() {
  const trip = useTrip();
  const { log, answers } = trip;
  const [shown, setShown] = useState(log.length);
  const [typing, setTyping] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // New messages appear one at a time: the visitor's at once, the advisor's
  // after a moment of "typing".
  useEffect(() => {
    if (shown > log.length) {
      setShown(log.length);
      return;
    }
    if (shown === log.length) return;
    if (log[shown].from === "user" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown((n) => n + 1);
      return;
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, TYPING_MS);
    return () => clearTimeout(t);
  }, [log, shown]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const stage = currentStage(trip);
  const step = steps.find((s) => s.key === stage);

  // A multi-choice question starts with whatever the visitor has tapped on
  // the site already ticked — including taps made while it was showing.
  const options = step?.options(answers) ?? [];
  const suggested = step?.multi ? notedOptions(trip.interests, options) : [];
  const suggestedKey = `${stage}|${suggested.join("|")}`;
  useEffect(() => {
    setPicked((p) => [...new Set([...p.filter((o) => options.includes(o)), ...suggested])]);
    // Re-run only when the question or the suggestions change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestedKey]);
  const settled = shown === log.length && !typing;
  const brief = briefOf(trip);
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
    `${answers.track?.[0] ?? "Travel"} enquiry — ${trip.details?.Name ?? ""}`,
  )}&body=${encodeURIComponent(brief.map(([k, v]) => `${k}: ${v}`).join("\n"))}`;

  function choose(option: string) {
    if (!step) return;
    if (!step.multi) {
      answer(step.key, [option]);
      return;
    }
    setPicked((p) => (p.includes(option) ? p.filter((o) => o !== option) : [...p, option]));
  }

  function confirm(values = picked) {
    if (!step) return;
    answer(step.key, values);
    setPicked([]);
  }

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitDetails(Object.fromEntries(new FormData(e.currentTarget).entries()) as Details);
  }

  if (!trip.started)
    return (
      <div className="advisor-body">
        <div className="advisor-log">
          <div className="advisor-msg bot">
            <span className="advisor-who">Travel advisor</span>
            {trip.interests.length
              ? "Here’s what has caught your eye so far — tap one to remove it."
              : "Explore the site — every destination, service or journey you tap lands here, and I’ll use it to shape your trip."}
          </div>
        </div>
        <div className="advisor-input">
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
            <button type="button" className="advisor-chip advisor-primary" onClick={() => startChat()}>
              <Sparkles size={13} />
              Plan my trip with me
            </button>
            {trip.interests.length > 0 && (
              <button type="button" className="advisor-chip" onClick={resetChat}>
                Start fresh
              </button>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="advisor-body">
      <div className="advisor-log" ref={logRef}>
        {log.slice(0, shown).map((m) => (
          <div key={m.id} className={`advisor-msg ${m.from}`}>
            <span className="advisor-who">
              {m.from === "bot" ? "Travel advisor" : m.auto ? "Noted from your browsing" : "You"}
            </span>
            {m.text}
            {m.from === "user" && m.key && m.key !== "done" && (
              <button
                type="button"
                className="advisor-undo"
                aria-label={`Remove answer: ${m.text}`}
                title="Remove — I’ll ask again"
                onClick={() => removeAnswer(m.id)}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        {typing && (
          <div className="advisor-typing" aria-label="Advisor is typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>

      {settled && (
        <div className="advisor-input">
          {step && (
            <div className="advisor-options" role="group" aria-label={step.label}>
              <div className="advisor-chips">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="advisor-chip"
                    aria-pressed={picked.includes(option)}
                    onClick={() => choose(option)}
                  >
                    {picked.includes(option) && <Check size={12} />}
                    {option}
                  </button>
                ))}
              </div>
              {stage === "travellers" && <GroupPicker corporate={isCorporate(answers)} onDone={(g) => confirm([g])} />}
              {step.multi && (
                <button type="button" className="advisor-chip advisor-primary" onClick={() => confirm()}>
                  {picked.length ? `Continue with ${picked.length}` : "Skip"}
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          )}

          {stage === "details" && (
            <form className="advisor-details" onSubmit={send}>
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

          {stage === "done" && (
            <>
              <div className="advisor-summary">
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
              </div>
            </>
          )}
        </div>
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
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ track?: Track; place?: string }>).detail;
      if (detail?.place) addInterest("place", detail.place);
      startChat(detail?.track);
      setOpen(true);
    };
    window.addEventListener("tpl:open-advisor", onOpen);
    return () => window.removeEventListener("tpl:open-advisor", onOpen);
  }, []);

  // A little bounce as each star lands.
  useEffect(() => {
    let t = 0;
    const onLanded = () => {
      setBump(false);
      requestAnimationFrame(() => setBump(true));
      clearTimeout(t);
      t = window.setTimeout(() => setBump(false), 700);
    };
    window.addEventListener("tpl:star-landed", onLanded);
    return () => {
      window.removeEventListener("tpl:star-landed", onLanded);
      clearTimeout(t);
    };
  }, []);

  // Escape, or any tap or focus outside the panel and orb, minimises it.
  useEffect(() => {
    if (!open) return;
    const inside = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest(".advisor-panel,.advisor-orb");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onOutside = (e: Event) => !inside(e.target) && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside, true);
    document.addEventListener("focusin", onOutside, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("focusin", onOutside, true);
    };
  }, [open]);

  return (
    <>
      <div className="advisor-panel" role="dialog" aria-label="Travel advisor" hidden={!open}>
        <div className="advisor-head">
          <span className="advisor-avatar">
            <ServiceIcon name="support" size={22} />
          </span>
          <div>
            <h3>Your travel advisor</h3>
          </div>
          <button type="button" aria-label="Start over" title="Start over — clears everything" onClick={resetChat}>
            <RotateCcw size={16} />
          </button>
          <button type="button" aria-label="Minimise advisor" title="Minimise — continue later" onClick={() => setOpen(false)}>
            <Minus size={18} />
          </button>
        </div>
        <AdvisorChat />
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
