import maldives from "./assets/story-maldives.jpg";
import sahara from "./assets/story-sahara.jpg";
import patagonia from "./assets/story-patagonia.jpg";
import iceland from "./assets/dest-iceland.jpg";
import japan from "./assets/dest-japan.jpg";
import norway from "./assets/dest-norway.jpg";
import santorini from "./assets/dest-santorini.jpg";
import surfAudio from "./assets/field-audio-surf.wav";

/** The Field Book is bound from seven kinds of page. */
export type Format =
  | "essay"
  | "gallery"
  | "quote"
  | "postcard"
  | "film"
  | "audio"
  | "journal";

export const formats: { id: Format; label: string }[] = [
  { id: "essay", label: "Essay" },
  { id: "gallery", label: "Gallery" },
  { id: "quote", label: "Pull Quote" },
  { id: "postcard", label: "Postcard" },
  { id: "film", label: "Film" },
  { id: "audio", label: "Field Audio" },
  { id: "journal", label: "Journal" },
];

export const formatLabel = (id: Format) =>
  formats.find((f) => f.id === id)?.label ?? id;

export type Frame = { src: string; caption: string };
export type Entry = { day: string; text: string };

export type Dispatch = {
  slug: string;
  format: Format;
  /** The chapter this page is bound into; also the section heading. */
  chapter: string;
  title: string;
  author: string;
  place: string;
  date: string;
  readTime?: string;
  cover?: string;
  /** essay */
  body?: string[];
  pullQuote?: string;
  /** gallery */
  frames?: Frame[];
  /** quote */
  quote?: string;
  /** postcard */
  note?: string;
  postmark?: string;
  /** journal */
  entries?: Entry[];
  /** audio / film */
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  /** shown under the audio transport */
  transcript?: string;
  /** true for pages bound by readers, kept in localStorage */
  submitted?: boolean;
};

export const dispatches: Dispatch[] = [
  {
    slug: "the-silence-of-overwater",
    format: "essay",
    chapter: "Chapter I · Ocean",
    title: "The Silence of Overwater",
    author: "Luca Marchetti",
    place: "Baa Atoll, Maldives",
    date: "March 14, 2026",
    readTime: "8 min",
    cover: maldives,
    pullQuote:
      "Stillness is not the absence of motion, but the presence of attention.",
    body: [
      "There is a kind of quiet you only find suspended above a reef — a hush the sea itself seems to keep. The bungalow creaks softly, a wooden lung; below the glass floor, parrotfish drift like slow thoughts.",
      "I had come to write about the mantas, and I will. But the first thing to record is the silence. Not an absence of sound — the sea is full of sound, ticking and clicking and the far-off grind of parrotfish taking the coral apart. What is missing is human noise. It takes about three days for the ear to stop reaching for it.",
      "On the fourth morning the current turned and the plankton came into the bay, and with it the mantas — first two, then eleven, then more than I could count without losing my place. They feed by cartwheeling slowly through the soup, mouths open, and they do it with a courtesy bordering on the absurd: they will alter course rather than touch you.",
      "I stayed in the water until my fingers went white. Afterwards, on the boat, nobody spoke for a while. There was nothing to add, and the reef had already said it.",
    ],
  },
  {
    slug: "a-cartography-of-dunes",
    format: "gallery",
    chapter: "Chapter II · Sand",
    title: "A Cartography of Dunes",
    author: "Idris Fahmy",
    place: "Erg Chebbi, Morocco",
    date: "February 2, 2026",
    readTime: "5 min",
    frames: [
      { src: sahara, caption: "First light on the east face — the dunes exhale." },
      { src: patagonia, caption: "Camel prints, already softening." },
      { src: maldives, caption: "Blue hour, kilometre 41." },
    ],
  },
  {
    slug: "on-slow-travel",
    format: "quote",
    chapter: "Interlude",
    title: "On Slow Travel",
    author: "Sofía Aguirre",
    place: "Torres del Paine, Chile",
    date: "January 20, 2026",
    quote:
      "A glacier does not hurry, and yet it moves mountains. There is a lesson in this we keep refusing to learn.",
  },
  {
    slug: "kyoto-in-november",
    format: "postcard",
    chapter: "Postcards",
    title: "Kyoto, in November",
    author: "Mika Tanaka",
    place: "Kyoto, Japan",
    date: "November 11, 2025",
    cover: japan,
    postmark: "PAR AVION · 京都",
    note: "Rain on the temple roof sounds exactly like it does in the films. I bought a persimmon from a woman who insisted I take two. Wish you were here — but only a little; the quiet is part of it.",
  },
  {
    slug: "field-notes-patagonia",
    format: "journal",
    chapter: "Chapter III · Ice",
    title: "Field Notes — Patagonia",
    author: "Sofía Aguirre",
    place: "Torres del Paine, Chile",
    date: "January 2026",
    cover: patagonia,
    entries: [
      {
        day: "Day 01",
        text: "Puerto Natales. Wind against the hostel window all night, like something trying to get in. Coffee at five, boots by six.",
      },
      {
        day: "Day 03",
        text: "The Torres finally uncovered themselves at 07:12 for exactly four minutes. The photographers cheered. I forgot to lift my camera.",
      },
      {
        day: "Day 07",
        text: "Glaciers, up close, are not silent. They groan, they crack, they sigh — as if remembering something.",
      },
    ],
  },
  {
    slug: "surf-before-dawn",
    format: "audio",
    chapter: "Field Audio",
    title: "Surf Before Dawn, Baa Atoll",
    author: "Rasmus Holt",
    place: "Baa Atoll, Maldives",
    date: "October 3, 2025",
    duration: "12 sec listen",
    cover: maldives,
    audioUrl: surfAudio,
    transcript:
      "Recorded from the end of the jetty at 04:40, before the wind got up. Two microphones, no processing. The long swell arrives about every six seconds; the hiss underneath it is the foam draining back through the coral.",
  },
];

/** Chapter order is the order pages were bound, reader submissions first. */
export const NEW_CHAPTER = "New Dispatches";

export function chaptersOf(list: Dispatch[]) {
  const order: string[] = [];
  for (const d of list) if (!order.includes(d.chapter)) order.push(d.chapter);
  return order.map((chapter) => ({
    chapter,
    pages: list.filter((d) => d.chapter === chapter),
  }));
}

/* ── Reader-bound pages, kept in this browser ─────────────────────────────── */

const STORAGE_KEY = "meridian.fieldbook";

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "page"
  );
}

export function loadSubmitted(): Dispatch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Dispatch[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmitted(list: Dispatch[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Quota exceeded — a large cover image, most likely. Nothing useful to do.
  }
}

export function uniqueSlug(title: string, taken: Set<string>) {
  const base = slugify(title);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

/** Deterministic bar heights, so a waveform doesn't reshuffle on every render. */
export function waveform(seed: string, bars = 32) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return Array.from({ length: bars }, (_, i) => {
    h = (h * 1103515245 + 12345) >>> 0;
    const base = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.9 + (h % 100) / 100));
    return Math.round(base * 100);
  });
}

export const seedImages = { iceland, norway, santorini, sahara, patagonia, maldives, japan };
