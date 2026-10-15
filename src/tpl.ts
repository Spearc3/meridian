/**
 * Travel Port Leisure (Private) Limited — every word on the site lives here, so
 * the pages themselves stay layout. Wording follows the corporate deck.
 */

import harsha from "./assets/tpl-harsha.jpg";
import sameera from "./assets/tpl-sameera.jpg";

import memory01 from "./assets/tpl-memory-01.jpg";
import memory02 from "./assets/tpl-memory-02.jpg";
import memory03 from "./assets/tpl-memory-03.jpg";
import memory04 from "./assets/tpl-memory-04.jpg";
import memory05 from "./assets/tpl-memory-05.jpg";
import memory06 from "./assets/tpl-memory-06.jpg";
import memory07 from "./assets/tpl-memory-07.jpg";
import memory08 from "./assets/tpl-memory-08.jpg";

import singapore from "./assets/destinations/singapore.jpg";
import italy from "./assets/destinations/italy.jpg";
import china from "./assets/destinations/china.jpg";
import morocco from "./assets/destinations/morocco.jpg";
import sanFrancisco from "./assets/destinations/san-francisco.jpg";

export const company = {
  name: "Travel Port Leisure",
  legalName: "Travel Port Leisure (Private) Limited",
  short: "TP Leisure",
  address: "No. 181, Nawala Road, Narahenpita, Colombo 05, Sri Lanka",
  phone: "+94 11 255 2452",
  mobile: "+94 77 339 3577",
  email: "info@tpleisure.lk",
  website: "www.tpleisure.lk",
  registration: "PV 00365932",
  caasl: "A-2105",
  hours: "Monday – Friday, 9:00 AM – 5:30 PM (IST)",
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/personal-travel", label: "Personal Travels" },
  { to: "/corporate", label: "Corporate & Business" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/** Dialable form of a displayed number, for tel: links. */
export const tel = (number: string) => `tel:${number.replaceAll(" ", "")}`;

export type Service = {
  title: string;
  blurb: string;
  /** Basename of an icon in src/assets/icons — the client's two-tone set. */
  icon: string;
};

/** Personal Travels — "Ways to travel". */
export const personalServices: Service[] = [
  {
    title: "Honeymoon Packages",
    blurb: "A journey for two, shaped around your pace, preferred destinations and special moments together.",
    icon: "honeymoon",
  },
  {
    title: "Family Trips",
    blurb: "Holidays planned around the whole family, with time for shared adventures and relaxation.",
    icon: "globe",
  },
  {
    title: "Extended Group Trips",
    blurb: "Longer journeys for friends and extended families, with itineraries and arrangements coordinated for the group.",
    icon: "group",
  },
  {
    title: "Luxury & FIT Travel",
    blurb: "Tailor-made itineraries for discerning individuals, and customized travel experiences.",
    icon: "diamond",
  },
  {
    title: "Group Travel & Leisure Tours",
    blurb: "Customized group journeys designed for memorable leisure and team experiences.",
    icon: "group",
  },
  {
    title: "Cruise Bookings",
    blurb: "Exclusive cruise vacations with leading global cruise partners.",
    icon: "cruise",
  },
  {
    title: "International Air Travel Solutions",
    blurb: "International and domestic ticketing with optimized routing.",
    icon: "air",
  },
  {
    title: "Hotel Reservations & Ground Handling",
    blurb: "Worldwide accommodation, transfers and destination support services.",
    icon: "hotel",
  },
];

/** Travel essentials offered to both audiences. */
export const essentials: Service[] = [
  {
    title: "Visa Consultation",
    blurb: "Professional visa guidance and documentation support for all destinations.",
    icon: "visa",
  },
  {
    title: "Travel Insurance",
    blurb: "Comprehensive protection and peace of mind throughout your journey.",
    icon: "insurance",
  },
  {
    title: "Airport Lounge Access",
    blurb: "Premium lounge access for comfort, convenience and productivity while traveling.",
    icon: "lounge",
  },
  {
    title: "Chauffeur Services",
    blurb: "Reliable executive transportation solutions for business and leisure travelers.",
    icon: "chauffeur",
  },
];

/** Corporate & Business — "What we manage". */
export const corporateServices: Service[] = [
  {
    title: "Corporate Travel Management",
    blurb: "End-to-end management for executive teams.",
    icon: "corporate",
  },
  {
    title: "Global Aviation Solutions",
    blurb: "International and domestic ticketing with optimized routing.",
    icon: "air",
  },
  {
    title: "MICE",
    blurb: "Meetings, Incentives, Conferences & Exhibitions — specialist handling of large-scale conferences and reward tours.",
    icon: "mice",
  },
  {
    title: "Corporate Incentive Tours",
    blurb: "Reward and motivate teams with expertly curated incentive travel experiences.",
    icon: "gift",
  },
  {
    title: "Group Travel & Leisure Tours",
    blurb: "Customized group journeys designed for memorable leisure and team experiences.",
    icon: "group",
  },
  {
    title: "Hotel Reservations & Ground Handling",
    blurb: "Worldwide accommodation, transfers and destination support services.",
    icon: "hotel",
  },
];

/** The four promises along the foot of the deck's vision & mission page. */
export const pillars: Service[] = [
  { icon: "corporate", title: "Corporate Travel", blurb: "Smart solutions for modern businesses." },
  { icon: "mice", title: "MICE & Incentives", blurb: "Engaging events. Lasting impact." },
  { icon: "globe", title: "Leisure Travel", blurb: "Curated holidays. Cherished memories." },
  { icon: "globe", title: "Global Connections", blurb: "Strong partnerships. Wider possibilities." },
];

/** Home — what the desk can put to work on any plan, personal or corporate. */
export const readyToOffer = [
  { icon: "air", label: "Air travel & ticketing" },
  { icon: "hotel", label: "Hotels & ground handling" },
  { icon: "visa", label: "Visa consultation" },
  { icon: "insurance", label: "Travel insurance" },
  { icon: "lounge", label: "Airport lounges" },
  { icon: "chauffeur", label: "Chauffeur services" },
];

/** The deck's three promises. */
export const principles = [
  {
    icon: "experience",
    title: "Powered by experience",
    description: "A team of veteran travel professionals, led by more than 25 years in the travel industry.",
  },
  {
    icon: "excellence",
    title: "Driven by excellence",
    description: "Precision, efficiency and attention to detail — from a single ticket to a conference abroad.",
  },
  {
    icon: "service",
    title: "Focused on service",
    description: "One travel desk for every part of the trip, with agents around the globe.",
  },
];

/** The same promises as the corporate page words them. */
export const corporatePrinciples = [
  "A leadership team with 25+ years in the travel industry.",
  "Seamless, prestigious and impeccably executed — every time.",
  "Every journey reflects the standards of your organization.",
];

export type Continent = {
  name: string;
  lat: number;
  lng: number;
  groups: { name: string; countries: { name: string; cities: string[] }[] }[];
};

const countries = (names: string[]) => names.map((name) => ({ name, cities: [] }));

/** Every place the desk covers, by continent — the destination explorer. */
export const continents: Continent[] = [
  {
    name: "Africa",
    lat: 0,
    lng: 20,
    groups: [
      {
        name: "North Africa",
        countries: [{ name: "Morocco", cities: ["Marrakech", "Casablanca"] }, ...countries(["Egypt"])],
      },
      { name: "Eastern & Southern Africa", countries: countries(["Kenya", "South Africa"]) },
    ],
  },
  { name: "Antarctica", lat: -80, lng: 0, groups: [] },
  {
    name: "Asia",
    lat: 30,
    lng: 100,
    groups: [
      {
        name: "South & Southeast Asia",
        countries: [
          { name: "Sri Lanka", cities: ["Colombo"] },
          { name: "Singapore", cities: ["Singapore"] },
          ...countries(["Thailand", "Malaysia", "India"]),
        ],
      },
      {
        name: "East Asia",
        countries: [
          { name: "China", cities: ["Shanghai", "Beijing", "Hong Kong", "Chongqing", "Suzhou", "Xi’an"] },
          ...countries(["Japan"]),
        ],
      },
      {
        name: "Western Asia · Middle East",
        countries: countries(["UAE", "Qatar", "Saudi Arabia", "Oman", "Bahrain", "Kuwait"]),
      },
    ],
  },
  {
    name: "Europe",
    lat: 48,
    lng: 15,
    groups: [
      {
        name: "Europe",
        countries: [
          { name: "Italy", cities: ["Rome", "Venice", "Florence", "Milan", "Manarola"] },
          ...countries(["United Kingdom", "France", "Germany", "Netherlands", "Switzerland"]),
        ],
      },
    ],
  },
  {
    name: "North America",
    lat: 40,
    lng: -100,
    groups: [
      {
        name: "North America",
        countries: [
          { name: "USA", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco"] },
          { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal", "Calgary"] },
        ],
      },
    ],
  },
  { name: "South America", lat: -15, lng: -60, groups: [] },
  {
    name: "Australia & Oceania",
    lat: -25,
    lng: 135,
    groups: [
      {
        name: "Australia & New Zealand",
        countries: [
          { name: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"] },
          { name: "New Zealand", cities: ["Auckland"] },
        ],
      },
    ],
  },
];

/** Photographed destinations: the explorer's spotlight and the page tiles. */
export const destinations = [
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia",
    image: singapore,
    lat: 1.35,
    lng: 103.82,
    places: ["Marina Bay", "Gardens by the Bay", "Chinatown", "Kampong Glam", "Singapore River", "Joo Chiat"],
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    image: italy,
    lat: 40.63,
    lng: 14.48,
    places: ["Rome", "Venice", "Florence", "Milan", "Manarola"],
  },
  {
    slug: "china",
    name: "China",
    region: "Asia",
    image: china,
    lat: 39.9,
    lng: 116.41,
    places: ["Shanghai", "Beijing", "Hong Kong", "Chongqing", "Suzhou", "Xi’an"],
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "Africa",
    image: morocco,
    lat: 31.63,
    lng: -7.98,
    places: ["Marrakech", "Casablanca"],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    region: "USA",
    image: sanFrancisco,
    lat: 37.77,
    lng: -122.42,
    places: ["Golden Gate", "Painted Ladies", "Embarcadero", "Twin Peaks", "Lombard Street", "North Beach"],
  },
];

export type Destination = (typeof destinations)[number];

/** Where every route on the globe starts. */
export const home = { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612 };

/** How an enquiry becomes a journey. */
export const process = [
  { n: "01", title: "Tell us", blurb: "Share the destination, dates, group size and occasion." },
  { n: "02", title: "We propose", blurb: "A tailored itinerary and quotation, refined with you." },
  { n: "03", title: "We arrange", blurb: "Flights, hotels, visas, insurance, transfers and lounges." },
  { n: "04", title: "You travel", blurb: "With our team and agents around the globe behind every journey." },
];

export const leadership = [
  { name: "Harsha Gunasekara", role: "Chairman", note: "Founder and Managing Director of Base HP", image: harsha },
  { name: "Sameera Fernando", role: "Director / CEO", note: "25 years' experience in the travel industry", image: sameera },
];

/** "Memories we created …" — photographs from the deck's closing pages. */
export const memories = [
  { image: memory01, place: "China", type: "Corporate incentive tour", alt: "Client group on a corporate incentive tour in China" },
  { image: memory02, place: "With our clients", type: "Corporate incentive tour", alt: "Client group on a corporate incentive tour" },
  { image: memory03, place: "With our clients", type: "Cruise", alt: "Client group on a cruise" },
  { image: memory04, place: "Thailand", type: "Group tour", alt: "Client group on a group tour in Thailand" },
  { image: memory05, place: "China", type: "Group tour", alt: "Client group on a group tour in China" },
  { image: memory06, place: "Thailand", type: "Group tour", alt: "Client group on a group tour in Thailand" },
  { image: memory07, place: "With our clients", type: "Corporate incentive tour", alt: "Client group on a corporate incentive tour" },
  { image: memory08, place: "With our clients", type: "Leisure tour", alt: "Client group on a leisure tour" },
];

export const terms = [
  {
    heading: "About these terms",
    body: [
      "These terms apply to our website and travel services, including flights, holidays, hotels, transfers, visa assistance and corporate or group travel. By making a booking, you accept these terms and the booking-specific conditions provided before payment. Anyone booking for others must be authorised to do so and share the applicable conditions with them.",
    ],
  },
  {
    heading: "Bookings and payments",
    body: [
      "Quotations are subject to availability and valid for the period stated. A booking is confirmed only when we receive the required payment and issue written confirmation; flights require ticket issuance. Deposits, balance deadlines, currency and any additional charges will be stated before payment. Late payment may result in cancellation and applicable charges.",
    ],
  },
  {
    heading: "Prices and inclusions",
    body: [
      "Only services listed in your confirmation are included. Advertised “from” prices and offers are subject to availability and stated restrictions. Prices may change before confirmation due to supplier rates, taxes or exchange rates. After confirmation, changes apply only where permitted by the agreed booking conditions and applicable law.",
    ],
  },
  {
    heading: "Travel suppliers",
    body: [
      "Airlines, hotels, transport providers and other suppliers have their own conditions, which will be supplied or identified before booking. Where we arrange their services, we act as a booking agent. Where we organise a package ourselves, we remain responsible for our contractual obligations. Airline baggage, flight changes, hotel check-in, special requests and similar matters are subject to the relevant supplier's rules.",
    ],
  },
  {
    heading: "Changes, cancellations and refunds",
    body: [
      "Please submit requests in writing through our official contact channels. Changes depend on availability and may incur fare differences, supplier penalties and our disclosed service fees. Cancellation charges follow the conditions provided before payment; some bookings are non-refundable. No-shows, unused services and early departures may receive no refund. Service fees are non-refundable only where disclosed, earned and legally permitted.",
      "We will explain any deductions and the expected refund process. Supplier refunds depend on supplier processing, and we will pass on funds promptly once received. This does not limit any refund obligation we have under applicable law.",
    ],
  },
  {
    heading: "Passports, visas and traveller details",
    body: [
      "Travellers must provide accurate information, check booking documents promptly, and meet passport, visa, transit, health and entry requirements. Names must match passports. Corrections may incur charges. Our visa assistance does not guarantee approval, processing time or entry; these decisions belong to the relevant authorities. Visa refusal does not automatically make other travel bookings refundable.",
    ],
  },
  {
    heading: "Health, insurance and conduct",
    body: [
      "Please disclose assistance, accessibility or dietary needs before booking; fulfilment requires confirmation. Appropriate travel insurance is strongly recommended and may be compulsory for certain trips. Travellers must follow safety instructions, local laws and check-in times. Serious misconduct or unsafe behaviour may result in removal from a service, with refunds governed by applicable conditions and law.",
    ],
  },
  {
    heading: "Travel disruptions",
    body: [
      "Weather, government restrictions, strikes, airline changes and other events beyond reasonable control may affect travel. We will communicate significant changes when informed and assist with available alternatives or refunds. Material package changes, substitutions and minimum group requirements are governed by the conditions disclosed before booking. Additional costs and refunds remain subject to those conditions and applicable law.",
    ],
  },
  {
    heading: "Responsibility and liability",
    body: [
      "We will exercise reasonable care in providing our services. To the extent permitted by law, we are not responsible for independent suppliers' failures or events beyond our reasonable control, except where we have a legal or contractual responsibility. Nothing in these terms excludes liability for our fraud, negligence or any responsibility that cannot lawfully be excluded, or removes your statutory rights.",
    ],
  },
  {
    heading: "Website and privacy",
    body: [
      "Use our website lawfully and do not make fraudulent bookings or reproduce protected content commercially without permission. Website information and images are illustrative; your written booking confirmation defines the services purchased. External websites have their own terms and privacy practices. Our separate Privacy Policy explains how we handle personal information and share it with suppliers and authorities for travel arrangements.",
    ],
  },
  {
    heading: "Complaints, law and updates",
    body: [
      "Please report problems promptly to us and the relevant supplier so we can help, then send any unresolved complaint in writing with your booking details. These terms are governed by Sri Lankan law, and disputes may be brought before the competent courts of Sri Lanka, subject to mandatory legal rights. Updates apply prospectively; confirmed bookings retain the terms accepted when booked unless otherwise lawfully agreed.",
    ],
  },
];
