/**
 * The travel advisor's memory, kept for the tab's session: places, services
 * and journeys the visitor has tapped while browsing, and one conversation
 * shared by the floating panel and the chats set into the pages.
 *
 * The conversation is a queue of questions. Each is asked once; anything the
 * visitor's taps already answer is filled in without asking. A question comes
 * back only if the visitor removes its answer.
 */
import { useSyncExternalStore } from "react";
import { continents, corporateServices, essentials, personalServices } from "./tpl";

export type Track = "personal" | "corporate";
export type InterestKind = "place" | "service" | "style" | "inspiration";
export type Interest = { id: string; kind: InterestKind; label: string; at: number };

export type StepKey = "track" | "service" | "continent" | "country" | "dates" | "travellers" | "extras";
export type Stage = StepKey | "details" | "done";
export type Answers = Partial<Record<StepKey, string[]>>;
export type Details = Partial<Record<"Name" | "Email" | "Phone" | "Notes", string>>;
export type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  /** The question asked, or the question this message answers. */
  key?: Stage;
  /** Filled in from what the visitor tapped, not typed or picked here. */
  auto?: boolean;
};

type TripState = {
  interests: Interest[];
  track: Track | null;
  lastAdded: Interest | null;
  started: boolean;
  answers: Answers;
  details: Details | null;
  log: Message[];
  /** Questions whose answer the visitor removed: never filled in for them again. */
  dismissed: StepKey[];
};

export const CORPORATE = "Corporate & business";
export const PERSONAL = "Personal holiday";
export const SOMETHING_ELSE = "Something else";

export type Step = {
  key: StepKey;
  multi: boolean;
  label: string;
  ask: (a: Answers) => string;
  options: (a: Answers) => string[];
};

export const isCorporate = (a: Answers) => a.track?.[0] === CORPORATE;
const coveredContinents = continents.filter((c) => c.groups.length);
const countriesIn = (names: string[]) =>
  coveredContinents
    .filter((c) => names.includes(c.name))
    .flatMap((c) => c.groups.flatMap((g) => g.countries.map((country) => country.name)));

export const steps: Step[] = [
  {
    key: "track",
    multi: false,
    label: "Trip type",
    ask: () => "First things first — is this a personal getaway, or travel for your company?",
    options: () => [PERSONAL, CORPORATE, SOMETHING_ELSE],
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

/** Answers that only make sense alongside another; removing that one clears these. */
const dependents: Partial<Record<StepKey, StepKey[]>> = {
  track: ["service", "travellers"],
  continent: ["country"],
};

const GREETING = "Hello! I’m your Travel Port advisor. Just tap the options that suit you.";
const ASK_DETAILS = "Almost there! A few details so our advisor can send your tailored proposal.";
const DONE = "Perfect. Here’s your brief — send it and our travel desk will be in touch.";

const STORAGE_KEY = "tpl-trip";
const empty: TripState = {
  interests: [],
  track: null,
  lastAdded: null,
  started: false,
  answers: {},
  details: null,
  log: [],
  dismissed: [],
};

let state: TripState = empty;
const listeners = new Set<() => void>();
let loaded = false;
let nextId = 1;

function commit(next: TripState) {
  state = next;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastAdded: null }));
  } catch {
    // Private mode or storage blocked: the advisor still works for this page.
  }
  listeners.forEach((l) => l());
}

export function loadTrip() {
  if (loaded) return;
  loaded = true;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      state = { ...empty, ...JSON.parse(saved), lastAdded: null };
      nextId = Math.max(0, ...state.log.map((m) => m.id)) + 1;
      listeners.forEach((l) => l());
    }
  } catch {
    // Unreadable or blocked storage: start fresh.
  }
}

/** Notes something the visitor tapped. Returns whether it was new. */
export function addInterest(kind: InterestKind, text: string) {
  const label = text.replace(/\s+/g, " ").trim().slice(0, 48);
  if (!label) return false;
  const id = `${kind}:${label.toLowerCase()}`;
  if (state.interests.some((i) => i.id === id)) return false;
  const interest = { id, kind, label, at: Date.now() };
  commit({ ...state, interests: [...state.interests, interest].slice(-14), lastAdded: interest });
  return true;
}

export function removeInterest(id: string) {
  commit({ ...state, interests: state.interests.filter((i) => i.id !== id) });
}

export function setTrack(track: Track) {
  if (state.track !== track) commit({ ...state, track });
}

/** The question the conversation is on: the first one still unanswered. */
export function currentStage(s: Pick<TripState, "answers" | "details">): Stage {
  if (s.answers.track?.[0] !== SOMETHING_ELSE)
    for (const step of steps) {
      if (s.answers[step.key]) continue;
      if (step.key === "country" && !countriesIn(s.answers.continent ?? []).length) continue;
      if (step.key !== "track" && !s.answers.track) return "track";
      return step.key;
    }
  return s.details ? "done" : "details";
}

/** Options the visitor's taps point to, for a question already showing. */
export function notedOptions(interests: Interest[], options: string[]) {
  const noted = interests.map((i) => i.label.toLowerCase());
  return options.filter((o) => noted.some((n) => n === o.toLowerCase() || n.includes(o.toLowerCase())));
}

/** What the visitor's taps already say about `step`, if anything. */
function inferred(s: TripState, step: Step): string[] {
  if (s.dismissed.includes(step.key)) return [];
  if (step.key === "track") return s.track ? [s.track === "corporate" ? CORPORATE : PERSONAL] : [];
  const noted = s.interests.map((i) => i.label.toLowerCase());
  const options = step.options(s.answers);
  const found = options.filter((o) => noted.some((n) => n === o.toLowerCase() || n.includes(o.toLowerCase())));
  if (step.key === "continent")
    for (const continent of coveredContinents)
      if (
        continent.groups.some((g) =>
          g.countries.some(
            (c) => noted.includes(c.name.toLowerCase()) || c.cities.some((city) => noted.includes(city.toLowerCase())),
          ),
        )
      )
        found.push(continent.name);
  const unique = [...new Set(found)];
  return step.multi ? unique : unique.slice(0, 1);
}

const message = (m: Omit<Message, "id">): Message => ({ ...m, id: nextId++ });

/** Fills in whatever the taps answer, then asks the next question — unless
 *  it is the one already waiting for an answer. */
function advance(s: TripState): TripState {
  let next = s;
  for (;;) {
    const stage = currentStage(next);
    const step = steps.find((st) => st.key === stage);
    const known = step ? inferred(next, step) : [];
    if (!step || !known.length) break;
    next = {
      ...next,
      answers: { ...next.answers, [step.key]: known },
      log: [...next.log, message({ from: "user", text: known.join(", "), key: step.key, auto: true })],
    };
  }
  const stage = currentStage(next);
  const lastBot = [...next.log].reverse().find((m) => m.from === "bot");
  if (lastBot?.key === stage) return next;
  const step = steps.find((st) => st.key === stage);
  const text = step ? step.ask(next.answers) : stage === "details" ? ASK_DETAILS : DONE;
  return { ...next, log: [...next.log, message({ from: "bot", text, key: stage })] };
}

/** Starts the conversation, or picks it up where it was. A track from the
 *  button that opened it answers the first question if nothing has yet. */
export function startChat(track?: Track | "contact") {
  let next = state;
  if (!next.started) next = { ...next, started: true, log: [message({ from: "bot", text: GREETING })] };
  if ((track === "personal" || track === "corporate") && !next.answers.track) {
    const text = track === "corporate" ? CORPORATE : PERSONAL;
    next = {
      ...next,
      track,
      answers: { ...next.answers, track: [text] },
      log: [...next.log, message({ from: "user", text, key: "track", auto: true })],
    };
  }
  commit(advance(next));
}

export function answer(key: StepKey, values: string[]) {
  let next: TripState = {
    ...state,
    answers: { ...state.answers, [key]: values },
    log: [...state.log, message({ from: "user", text: values.length ? values.join(", ") : "No preference", key })],
  };
  if (key === "track" && values[0] !== SOMETHING_ELSE) next.track = values[0] === CORPORATE ? "corporate" : "personal";
  commit(advance(next));
}

export function submitDetails(details: Details) {
  const next: TripState = {
    ...state,
    details,
    log: [
      ...state.log,
      message({ from: "user", text: `I’m ${details.Name}${details.Notes ? ` — ${details.Notes}` : ""}`, key: "details" }),
    ],
  };
  commit(advance(next));
}

/** Takes back an answer (and any that depended on it); its question rejoins
 *  the queue and won't be filled in from taps again. */
export function removeAnswer(id: number) {
  const removed = state.log.find((m) => m.id === id);
  if (!removed?.key || removed.from !== "user") return;
  const key = removed.key;
  if (key === "details") {
    commit(advance({ ...state, details: null, log: state.log.filter((m) => m.id !== id) }));
    return;
  }
  if (key === "done") return;
  const cleared = [key, ...(dependents[key] ?? [])];
  const answers = { ...state.answers };
  cleared.forEach((k) => delete answers[k]);
  // Out of the transcript go the removed answers, the questions they answered,
  // and the question that was waiting — the queue asks whatever is next anew.
  const pending = [...state.log].reverse().find((m) => m.from === "bot");
  const log = state.log.filter(
    (m) => !(m.key && cleared.includes(m.key as StepKey)) && !(m === pending && m.key),
  );
  commit(advance({ ...state, answers, dismissed: [...new Set([...state.dismissed, key])], log }));
}

/** Everything back to the start: answers, the conversation and the taps. */
export function resetChat() {
  commit(empty);
}

/** The brief as label/value pairs, in question order. */
export function briefOf(s: Pick<TripState, "answers" | "details">): [string, string][] {
  return [
    ...steps.filter((st) => s.answers[st.key]?.length).map((st): [string, string] => [st.label, s.answers[st.key]!.join(", ")]),
    ...(["Name", "Email", "Phone", "Notes"] as const)
      .filter((k) => s.details?.[k])
      .map((k): [string, string] => [k, s.details![k]!]),
  ];
}

export function useTrip() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => empty,
  );
}

/** Opens the advisor panel, optionally noting a place and starting a track. */
export function openAdvisor(detail: { track?: Track; place?: string } = {}) {
  window.dispatchEvent(new CustomEvent("tpl:open-advisor", { detail }));
}

// Picked up before any component reads or writes it, so nothing on the page
// can save over the session's conversation first.
loadTrip();
