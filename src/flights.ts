/**
 * The drone route behind each page: one country per page, coastal to inland.
 *
 * The photographs are used as delivered, so each route is ordered to tell a
 * time-of-day story with the light they already have: evening on the coast,
 * the night spent inside the cloud bank, morning inland. Home starts later in
 * that story — the hero's blue ocean, blue hour over the bay, then dawn into
 * daylight — since its first stop is already the sea.
 *
 * Every move is the drone flying straight ahead: a uniform zoom toward the
 * `focus` point, which holds still on screen. No sideways motion, no pan, no
 * warp, and a small zoom (about 1.1×) while the copy is on screen, so every
 * photograph keeps its delivered shape and sharpness. The focus is what the
 * drone is heading for in that shot: across the water to the landmark, over
 * the roofs to the tower, down the street to the mosque.
 */
import ocean from "./assets/hero-ocean.jpg";

import marinaBay from "./assets/flight/singapore-01-marina-bay.webp";
import gardens from "./assets/flight/singapore-02-gardens-by-the-bay.webp";
import chinatown from "./assets/flight/singapore-03-chinatown.webp";
import kampongGlam from "./assets/flight/singapore-04-kampong-glam.webp";
import singaporeRiver from "./assets/flight/singapore-05-singapore-river.webp";
import jooChiat from "./assets/flight/singapore-06-joo-chiat.webp";

import rome from "./assets/flight/italy-01-rome.webp";
import venice from "./assets/flight/italy-02-venice.webp";
import florence from "./assets/flight/italy-03-florence.webp";
import milan from "./assets/flight/italy-04-milan.webp";
import manarola from "./assets/flight/italy-06-manarola.webp";

import goldenGate from "./assets/flight/san-francisco-01-golden-gate.webp";
import paintedLadies from "./assets/flight/san-francisco-02-painted-ladies.webp";
import embarcadero from "./assets/flight/san-francisco-03-embarcadero.webp";
import twinPeaks from "./assets/flight/san-francisco-04-twin-peaks.webp";
import lombard from "./assets/flight/san-francisco-05-lombard-street.webp";
import northBeach from "./assets/flight/san-francisco-06-north-beach.webp";

import shanghai from "./assets/flight/china-01-shanghai.webp";
import beijing from "./assets/flight/china-02-beijing.webp";
import hongKong from "./assets/flight/china-03-hong-kong.webp";
import chongqing from "./assets/flight/china-04-chongqing.webp";
import suzhou from "./assets/flight/china-05-suzhou.webp";
import xian from "./assets/flight/china-06-xian.webp";

import marrakech from "./assets/flight/morocco-01-marrakech.webp";
import casablanca from "./assets/flight/morocco-04-casablanca.webp";

/** A hero's tint as a fraction of the full one: 0.33 of the 90% overlay is
 *  about 30% navy, enough to lift the heading off a bright sky while the
 *  photograph stays bright. */
const HERO_TINT = 0.33;

export type FlightStop = {
  src: string;
  /** The point the drone flies at, in image coordinates (0–1 from the top
   *  left). It stays still on screen while the photo grows around it. */
  focus: [number, number];
  /** Zoom at the start and end of the stop's own stretch of scroll. */
  zoom: [number, number];
  /** Sampled sky colour: tints the clouds entering and leaving this stop. */
  sky: string;
  /** Animate the surf (the top-down hero ocean only). */
  ocean?: boolean;
  /** Strength of the dark readability tint over this stop, 0–1 (default 1).
   *  It crossfades between stops under the clouds. Every page's first stop
   *  is its hero, which gets only a light tint (HERO_TINT); the Home ocean
   *  gets none, its own original scrims do that job. */
  tint?: number;
};

/** Home — Singapore. Ocean → blue hour on the bay → dawn → daylight inland. */
export const homeFlight: FlightStop[] = [
  // Looking straight down at the surf; the drone drops toward it.
  // The hero: no dark tint, it keeps its original look and its own scrims.
  { src: ocean, ocean: true, tint: 0, focus: [0.42, 0.6], zoom: [1.00, 1.19], sky: "#9cc4c8" },
  // Blue hour, low over the bay, gliding toward Marina Bay Sands.
  { src: marinaBay, focus: [0.68, 0.5], zoom: [1.03, 1.14], sky: "#3b6fbb" },
  // First light, low over the river, following the bumboat upstream.
  { src: singaporeRiver, focus: [0.5, 0.52], zoom: [1.03, 1.12], sky: "#9297af" },
  // Golden sunrise, high, sinking forward over the Supertrees.
  { src: gardens, focus: [0.6, 0.55], zoom: [1.03, 1.12], sky: "#85a0c7" },
  // Morning, over the street, pushing in on the temple.
  { src: chinatown, focus: [0.68, 0.45], zoom: [1.03, 1.12], sky: "#92a2b5" },
  // Street level, dollying toward the mosque.
  { src: kampongGlam, focus: [0.72, 0.5], zoom: [1.03, 1.13], sky: "#8aa8b5" },
  // Street level, easing in along the shophouses.
  { src: jooChiat, focus: [0.5, 0.5], zoom: [1.02, 1.1], sky: "#819fbe" },
];

/** Personal Travel — Italy. Coastal evening → Milan by night → inland morning. */
export const personalFlight: FlightStop[] = [
  // Golden evening over the sea, pushing toward the cliff village.
  { src: manarola, tint: HERO_TINT, focus: [0.7, 0.45], zoom: [1.03, 1.12], sky: "#b39271" },
  // Sunset, low over the water, gliding up the Grand Canal.
  { src: venice, focus: [0.62, 0.45], zoom: [1.03, 1.13], sky: "#cea69e" },
  // Blue hour, low across the piazza toward the Duomo.
  { src: milan, focus: [0.7, 0.5], zoom: [1.03, 1.12], sky: "#3b6cb1" },
  // Sunrise, high over the Arno, flying toward the city.
  { src: florence, focus: [0.58, 0.48], zoom: [1.06, 1.10], sky: "#d5bc9b" },
  // Golden morning, over the pines toward the Colosseum.
  { src: rome, focus: [0.72, 0.48], zoom: [1.03, 1.12], sky: "#8fa4b3" },
];

/** Corporate — San Francisco. Coastal evening → the city by night → morning. */
export const corporateFlight: FlightStop[] = [
  // Golden hour from the headlands, pushing toward the bridge.
  { src: goldenGate, tint: HERO_TINT, focus: [0.66, 0.42], zoom: [1.03, 1.12], sky: "#9aaec3" },
  // Sunset, low over the bay toward the Ferry Building.
  { src: embarcadero, focus: [0.68, 0.5], zoom: [1.03, 1.12], sky: "#bca3a8" },
  // Night from Twin Peaks, flying out over the grid.
  { src: twinPeaks, focus: [0.6, 0.45], zoom: [1.03, 1.10], sky: "#42679c" },
  // Sunrise over Washington Square, pushing toward the church.
  { src: northBeach, focus: [0.75, 0.5], zoom: [1.03, 1.12], sky: "#9fb6d2" },
  // Morning, descending down the switchbacks.
  { src: lombard, focus: [0.45, 0.62], zoom: [1.06, 1.13], sky: "#85a1b8" },
  // Daylight, low over the lawn toward the houses.
  { src: paintedLadies, focus: [0.62, 0.58], zoom: [1.03, 1.12], sky: "#6ca9e3" },
];

/** About — China. Golden harbour → blue hour → night → inland morning. */
export const aboutFlight: FlightStop[] = [
  // Golden hour from the Peak, sinking over the towers toward the harbour.
  { src: hongKong, tint: HERO_TINT, focus: [0.45, 0.55], zoom: [1.03, 1.12], sky: "#989da2" },
  // Blue hour, low over the Huangpu toward Pudong.
  { src: shanghai, focus: [0.6, 0.5], zoom: [1.03, 1.12], sky: "#2760a7" },
  // Night, low over the river toward Hongyadong.
  { src: chongqing, focus: [0.68, 0.5], zoom: [1.03, 1.12], sky: "#40639e" },
  // Sunrise over the Forbidden City's roofs.
  { src: beijing, focus: [0.72, 0.58], zoom: [1.03, 1.12], sky: "#ebc593" },
  // Golden morning, along the wall toward the gate tower.
  { src: xian, focus: [0.72, 0.45], zoom: [1.03, 1.12], sky: "#b4a18d" },
  // Daylight, low over the canal toward the stone bridge.
  { src: suzhou, focus: [0.25, 0.5], zoom: [1.03, 1.12], sky: "#8ba8b0" },
];

/** Contact — Morocco. Two sections: the Atlantic at dusk, then Marrakech. */
export const contactFlight: FlightStop[] = [
  // Dusk over the waves, gliding toward Hassan II Mosque.
  { src: casablanca, tint: HERO_TINT, focus: [0.7, 0.45], zoom: [1.03, 1.12], sky: "#6e8bbb" },
  // Golden light, pushing toward the Koutoubia.
  { src: marrakech, focus: [0.75, 0.42], zoom: [1.03, 1.11], sky: "#a9a5a2" },
];
