/**
 * Travel Port Leisure (Private) Limited — every word on the landing page comes
 * from the corporate deck, transcribed here so the page itself stays layout.
 */

import harsha from "./assets/tpl-harsha.jpg";
import sameera from "./assets/tpl-sameera.jpg";
import hashani from "./assets/tpl-hashani.jpg";

import shanghaiGarden from "./assets/tpl-shanghai-garden.jpg";
import shanghaiSnow from "./assets/tpl-shanghai-snow.jpg";
import cappadocia from "./assets/tpl-cappadocia.jpg";
import vietnamNight from "./assets/tpl-vietnam-night.jpg";
import halongCruise from "./assets/tpl-halong-cruise.jpg";
import vietnamPartner from "./assets/tpl-vietnam-partner.jpg";
import hcmcPalace from "./assets/tpl-hcmc-palace.jpg";
import phuket from "./assets/tpl-phuket.jpg";
import bangkokSkywalk from "./assets/tpl-bangkok-skywalk.jpg";

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
    title: "Corporate Travel",
    detail: "Smart solutions for modern businesses.",
  },
  { title: "MICE & Incentives", detail: "Engaging events. Lasting impact." },
  { title: "Leisure Travel", detail: "Curated holidays. Cherished memories." },
  {
    title: "Global Connections",
    detail: "Strong partnerships. Wider possibilities.",
  },
];

export type Solution = {
  /** Key into the icon map in Home.tsx — lucide components can't live in a .ts file. */
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
    icon: "armchair",
    title: "Airport Lounge Facilities",
    detail:
      "Premium lounge access for comfort, convenience and productivity while traveling.",
  },
  {
    icon: "users",
    title: "Group Travel & Leisure Tours",
    detail:
      "Customized group journeys designed for memorable leisure and team experiences.",
  },
  {
    icon: "ship",
    title: "Cruise Bookings",
    detail:
      "Exclusive cruise vacations with leading global cruise partners.",
  },
  {
    icon: "building",
    title: "Hotel Reservations & Ground Handling",
    detail:
      "Worldwide accommodation, transfers and destination support services.",
  },
  {
    icon: "id",
    title: "Visa Consultation for All Destinations",
    detail:
      "Professional visa guidance and documentation support for hassle-free travel.",
  },
  {
    icon: "car",
    title: "Chauffeur Services",
    detail:
      "Reliable executive transportation solutions for business and leisure travelers.",
  },
  {
    icon: "shield",
    title: "Travel Insurance",
    detail:
      "Comprehensive protection and peace of mind throughout your journey.",
  },
];

/** "Our Core Services". */
export const coreServices: Solution[] = [
  {
    icon: "globe",
    title: "Global Aviation Solutions",
    detail: "International and domestic ticketing with optimized routing.",
  },
  {
    icon: "headphones",
    title: "Comprehensive Support",
    detail:
      "Visa consultations for all destinations, travel insurance, airport lounge access, and chauffeur services.",
  },
  {
    icon: "users",
    title: "MICE & Incentives",
    detail:
      "Specialist handling of large-scale conferences and reward tours.",
  },
  {
    icon: "briefcase",
    title: "Corporate Travel Management",
    detail: "End-to-end management for executive teams.",
  },
  {
    icon: "gem",
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
  {
    name: "Hashani Herath",
    role: "Head of Operations",
    note: "14 years' experience in the aviation and travel industry",
    image: hashani,
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

/** Figures drawn from the deck: the regional-coverage list and "nearly a century
 *  of combined expertise". */
export const headlineStats = [
  { value: String(regions.length), label: "Regions covered" },
  { value: String(destinationCount), label: "Destinations served" },
  { value: "≈100y", label: "Combined expertise" },
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

/** "Our Elite Corporate Portfolio", set as type rather than a wall of logos. */
export const clients = [
  "Asian Paints Causeway",
  "Nippon Paint",
  "VS One",
  "Metropolitan",
  "Epson",
  "Softlogic",
  "Debug Digital Centre",
  "LOLC",
  "NDB Bank",
  "Acer",
  "CIC",
  "Trident Corporation",
  "JAT Holdings PLC",
  "Canon",
  "HNB Assurance",
  "Lenovo",
  "HP",
  "Ino Lanka",
  "Browns Agriculture",
  "Atlas Axillia",
  "Plantchem & Plantseeds",
  "Farmchemie",
  "Accel",
  "Texlan",
];

/** "Memories we created …" — photographs from the deck's closing pages. */
export const memories = [
  { image: shanghaiSnow, caption: "Shanghai, China", note: "Dealer tour" },
  { image: cappadocia, caption: "Cappadocia, Türkiye", note: "Incentive tour" },
  { image: halongCruise, caption: "Ha Long Bay, Vietnam", note: "Group cruise" },
  { image: phuket, caption: "Phuket, Thailand", note: "Arrival day" },
  {
    image: vietnamPartner,
    caption: "Vietnam",
    note: "Canon partner tour 2025",
  },
  { image: shanghaiGarden, caption: "Shanghai, China", note: "Yu Garden" },
  { image: bangkokSkywalk, caption: "Bangkok, Thailand", note: "SkyWalk" },
  { image: vietnamNight, caption: "Vietnam, after dark", note: "Incentive tour" },
  {
    image: hcmcPalace,
    caption: "Ho Chi Minh City, Vietnam",
    note: "Leisure group",
  },
];

export const globalPartners = [
  { country: "France", name: "Shan Fernando", phone: "+33 7 43 30 33 11" },
  { country: "Netherlands", name: "Randev Edirisinghe", phone: "+31 6 19086553" },
];
