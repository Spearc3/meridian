/**
 * Travel Port Leisure (Private) Limited — every word on the landing page comes
 * from the corporate deck, transcribed here so the page itself stays layout.
 */

import type { EnquiryField } from "./components/EnquiryForm";

import harsha from "./assets/tpl-harsha.jpg";
import sameera from "./assets/tpl-sameera.jpg";

// "Memories we created" photographs, taken from the deck's closing pages.
// Neutral file names: the deck's text doesn't name where each was taken.
import memory01 from "./assets/tpl-memory-01.jpg";
import memory02 from "./assets/tpl-memory-02.jpg";
import memory03 from "./assets/tpl-memory-03.jpg";
import memory04 from "./assets/tpl-memory-04.jpg";
import memory05 from "./assets/tpl-memory-05.jpg";
import memory06 from "./assets/tpl-memory-06.jpg";
import memory07 from "./assets/tpl-memory-07.jpg";
import memory08 from "./assets/tpl-memory-08.jpg";

export const company = {
  name: "Travel Port Leisure",
  legalName: "Travel Port Leisure (Private) Ltd",
  parent: "Base HP",
  tagline: "Explore the Unexplored",
  address: ["No. 181, Nawala Road", "Narahenpita, Colombo 05", "Sri Lanka"],
  email: "info@tpleisure.lk",
  website: "www.tpleisure.lk",
  hotline: "+94 11 255 2452",
  /** Dialable form of the hotline, for the tel: href. */
  hotlineHref: "+94112552452",
};

export const whoWeAre = [
  "We are a team of veteran travel professionals who believe that corporate travel should be seamless, prestigious, and impeccably executed — in a market often saturated with limited-exposure providers.",
  "We stand apart. We specialize in the complex logistics of MICE (Meetings, Incentives, Conferences & Exhibitions) and Corporate Incentive Tours, ensuring that every journey reflects the standards of your organization.",
];

export const visionMission = [
  {
    label: "Our Vision",
    body: "To be Sri Lanka's most trusted corporate and leisure travel partner, delivering innovative travel solutions, unforgettable experiences, and world-class service excellence while setting new benchmarks in the travel industry.",
  },
  {
    label: "Our Mission",
    body: "To create seamless, personalized, and value-driven travel experiences through industry expertise, strategic partnerships, operational excellence, and a customer-first approach, ensuring every journey exceeds expectations.",
  },
];

/** The four promises running along the foot of the vision & mission page. */
export const pillars = [
  {
    icon: "corporate",
    title: "Corporate Travel",
    detail: "Smart solutions for modern businesses.",
  },
  { icon: "mice", title: "MICE & Incentives", detail: "Engaging events. Lasting impact." },
  { icon: "location", title: "Leisure Travel", detail: "Curated holidays. Cherished memories." },
  {
    icon: "globe",
    title: "Global Connections",
    detail: "Strong partnerships. Wider possibilities.",
  },
];

export type Solution = {
  /** Basename of an icon in src/assets/icons — the client's two-tone set. */
  icon: string;
  title: string;
  detail: string;
};

/** "Comprehensive Travel Solutions", in deck order. */
export const solutions: Solution[] = [
  {
    icon: "gift",
    title: "Corporate Incentive Tours",
    detail:
      "Reward and motivate teams with expertly curated incentive travel experiences.",
  },
  {
    icon: "lounge",
    title: "Airport Lounge Facilities",
    detail:
      "Premium lounge access for comfort, convenience and productivity while traveling.",
  },
  {
    icon: "group",
    title: "Group Travel & Leisure Tours",
    detail:
      "Customized group journeys designed for memorable leisure and team experiences.",
  },
  {
    icon: "cruise",
    title: "Cruise Bookings",
    detail:
      "Exclusive cruise vacations with leading global cruise partners.",
  },
  {
    icon: "hotel",
    title: "Hotel Reservations & Ground Handling",
    detail:
      "Worldwide accommodation, transfers and destination support services.",
  },
  {
    icon: "visa",
    title: "Visa Consultation for All Destinations",
    detail:
      "Professional visa guidance and documentation support for hassle-free travel.",
  },
  {
    icon: "chauffeur",
    title: "Chauffeur Services",
    detail:
      "Reliable executive transportation solutions for business and leisure travelers.",
  },
  {
    icon: "insurance",
    title: "Travel Insurance",
    detail:
      "Comprehensive protection and peace of mind throughout your journey.",
  },
];

/** "Our Core Services". */
export const coreServices: Solution[] = [
  {
    icon: "air",
    title: "Global Aviation Solutions",
    detail: "International and domestic ticketing with optimized routing.",
  },
  {
    icon: "support",
    title: "Comprehensive Support",
    detail:
      "Visa consultations for all destinations, travel insurance, airport lounge access, and chauffeur services.",
  },
  {
    icon: "mice",
    title: "MICE & Incentives",
    detail:
      "Specialist handling of large-scale conferences and reward tours.",
  },
  {
    icon: "corporate",
    title: "Corporate Travel Management",
    detail: "End-to-end management for executive teams.",
  },
  {
    icon: "diamond",
    title: "Luxury & FIT Travel",
    detail:
      "Tailor-made itineraries for discerning individuals, and customized travel experiences.",
  },
];

export const leadership = [
  {
    name: "Harsha Gunasekara",
    role: "Chairman",
    note: "Founder and Managing Director of Base HP",
    image: harsha,
  },
  {
    name: "Sameera Fernando",
    role: "Director / CEO",
    note: "25 years' experience in the travel industry",
    image: sameera,
  },
];

export const regions = [
  { name: "USA", places: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"] },
  { name: "Canada", places: ["Toronto", "Vancouver", "Montreal", "Calgary"] },
  {
    name: "Asia",
    places: ["Singapore", "Thailand", "Malaysia", "China", "Japan", "India"],
  },
  {
    name: "Middle East",
    places: ["UAE", "Qatar", "Saudi Arabia", "Oman", "Bahrain", "Kuwait"],
  },
  {
    name: "Europe",
    places: [
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Netherlands",
      "Switzerland",
    ],
  },
  {
    name: "Australia & New Zealand",
    places: ["Sydney", "Melbourne", "Brisbane", "Auckland"],
  },
  { name: "Africa", places: ["South Africa", "Kenya", "Morocco", "Egypt"] },
];

const destinationCount = regions.reduce((n, r) => n + r.places.length, 0);

/** Figures drawn from the deck: the regional-coverage list, and the CEO's
 *  25 years in the travel industry. */
export const headlineStats = [
  { value: String(regions.length), label: "Regions covered" },
  { value: `${destinationCount}+`, label: "Destinations" },
  { value: "25+", label: "Years industry expertise" },
];

/** "Our global reach includes" — the eight capability chips on the network page. */
export const globalReach = [
  "International Air Travel Solutions",
  "Worldwide Hotel & Resort Partnerships",
  "Corporate Incentive Tours",
  "Conferences & Events (MICE)",
  "Visa Consultation Services",
  "Ground Transportation & Chauffeur Services",
  "Airport Lounge Access",
  "Travel Insurance Solutions",
];

/** "Memories we created …" — photographs from the deck's closing pages. */
export type Memory = {
  image: string;
  /** Intrinsic size, so the wall reserves each photo's space before it loads. */
  width: number;
  height: number;
  /** Only set where the deck's coverage list names the country and the
   *  photograph is unmistakably there; otherwise the wall shows a neutral title. */
  country?: string;
  /** The kind of tour, in the deck's own service vocabulary. */
  note: string;
  /** Which page the photograph belongs on besides Home. */
  audience: "corporate" | "personal";
};

export const memories: Memory[] = [
  { image: memory01, width: 1307, height: 813, country: "China", note: "Corporate incentive tour", audience: "corporate" },
  { image: memory02, width: 794, height: 1059, note: "Corporate incentive tour", audience: "corporate" },
  { image: memory03, width: 1048, height: 810, note: "Cruise", audience: "personal" },
  { image: memory04, width: 842, height: 627, country: "Thailand", note: "Group tour", audience: "personal" },
  { image: memory05, width: 1280, height: 720, country: "China", note: "Group tour", audience: "corporate" },
  { image: memory06, width: 666, height: 549, country: "Thailand", note: "Group tour", audience: "personal" },
  { image: memory07, width: 752, height: 995, note: "Corporate incentive tour", audience: "corporate" },
  { image: memory08, width: 807, height: 606, note: "Leisure tour", audience: "personal" },
];

/* ── Personal Travels / Corporate & Business ────────────────────────────────
   The deck's two service lists, regrouped by who is travelling. Wording is the
   deck's; only the grouping and the short section intros are ours. */

export const personalServices: Solution[] = [
  {
    icon: "location",
    title: "Leisure Travel",
    detail: "Curated holidays. Cherished memories.",
  },
  {
    icon: "diamond",
    title: "Luxury & FIT Travel",
    detail:
      "Tailor-made itineraries for discerning individuals, and customized travel experiences.",
  },
  {
    icon: "group",
    title: "Group Travel & Leisure Tours",
    detail:
      "Customized group journeys designed for memorable leisure and team experiences.",
  },
  {
    icon: "cruise",
    title: "Cruise Bookings",
    detail: "Exclusive cruise vacations with leading global cruise partners.",
  },
  {
    icon: "air",
    title: "International Air Travel Solutions",
    detail: "International and domestic ticketing with optimized routing.",
  },
  {
    icon: "hotel",
    title: "Hotel Reservations & Ground Handling",
    detail:
      "Worldwide accommodation, transfers and destination support services.",
  },
];

/** Travel essentials that apply to both audiences. */
export const essentials: Solution[] = [
  {
    icon: "visa",
    title: "Visa Consultation",
    detail:
      "Professional visa guidance and documentation support for all destinations.",
  },
  {
    icon: "insurance",
    title: "Travel Insurance",
    detail:
      "Comprehensive protection and peace of mind throughout your journey.",
  },
  {
    icon: "lounge",
    title: "Airport Lounge Access",
    detail:
      "Premium lounge access for comfort, convenience and productivity while traveling.",
  },
  {
    icon: "chauffeur",
    title: "Chauffeur Services",
    detail:
      "Reliable executive transportation solutions for business and leisure travelers.",
  },
];

export const corporateServices: Solution[] = [
  {
    icon: "corporate",
    title: "Corporate Travel Management",
    detail: "End-to-end management for executive teams.",
  },
  {
    icon: "air",
    title: "Global Aviation Solutions",
    detail: "International and domestic ticketing with optimized routing.",
  },
  {
    icon: "mice",
    title: "MICE",
    detail:
      "Meetings, Incentives, Conferences & Exhibitions — specialist handling of large-scale conferences and reward tours.",
  },
  {
    icon: "gift",
    title: "Corporate Incentive Tours",
    detail:
      "Reward and motivate teams with expertly curated incentive travel experiences.",
  },
  {
    icon: "group",
    title: "Group Travel & Leisure Tours",
    detail:
      "Customized group journeys designed for memorable leisure and team experiences.",
  },
  {
    icon: "hotel",
    title: "Hotel Reservations & Ground Handling",
    detail:
      "Worldwide accommodation, transfers and destination support services.",
  },
];

/** How an enquiry becomes a journey. Describes the deck's services in order of
 *  use; no service-level promises (response times, 24/7) the client hasn't made. */
export const process = [
  {
    title: "Tell us",
    detail: "Share the destination, dates, group size and occasion.",
  },
  {
    title: "We propose",
    detail: "A tailored itinerary and quotation, refined with you.",
  },
  {
    title: "We arrange",
    detail: "Flights, hotels, visas, insurance, transfers and lounges.",
  },
  {
    title: "You travel",
    detail: "With our team and agents around the globe behind every journey.",
  },
];

export const personalEnquiry: EnquiryField[] = [
  { key: "name", label: "Your name", required: true },
  { key: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { key: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+94 …" },
  {
    key: "interest",
    label: "I'm interested in",
    type: "select",
    options: [
      "Holiday / leisure trip",
      "Group tour",
      "Cruise",
      "Luxury / tailor-made (FIT)",
      "Flights only",
      "Visa / insurance only",
    ],
  },
  { key: "where", label: "Destination", placeholder: "Thailand, Japan, Europe…" },
  { key: "when", label: "Travel dates", placeholder: "December, 7 nights" },
  { key: "travellers", label: "Travellers", placeholder: "2 adults, 1 child" },
  { key: "notes", label: "Anything else", type: "textarea", placeholder: "Budget, hotel style, special occasions…" },
];

export const corporateEnquiry: EnquiryField[] = [
  { key: "name", label: "Your name", required: true },
  { key: "company", label: "Company", required: true },
  { key: "email", label: "Work email", type: "email", required: true, placeholder: "you@company.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+94 …" },
  {
    key: "requirement",
    label: "Requirement",
    type: "select",
    options: [
      "Corporate travel management",
      "MICE / conference / event",
      "Corporate incentive tour",
      "Air ticketing",
      "Visa, insurance, lounge or chauffeur",
    ],
  },
  { key: "size", label: "Number of travellers", placeholder: "40 pax" },
  { key: "where", label: "Destination", placeholder: "Singapore, UAE, Europe…" },
  { key: "when", label: "Dates", placeholder: "Q1 2027, 5 days" },
  { key: "notes", label: "The brief", type: "textarea", placeholder: "Occasion, budget, programme, anything the itinerary has to work around…" },
];

export const generalEnquiry: EnquiryField[] = [
  { key: "name", label: "Your name", required: true },
  { key: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+94 …" },
  { key: "topic", label: "About", type: "select", options: ["Personal travel", "Corporate & business travel", "Something else"] },
  { key: "notes", label: "Message", type: "textarea", required: true },
];
