/**
 * The travel advisor's memory: places, services and journeys the visitor has
 * tapped while browsing, kept for the tab's session so the advisor only asks
 * what it doesn't already know.
 */
import { useSyncExternalStore } from "react";

export type Track = "personal" | "corporate";
export type InterestKind = "place" | "service" | "style" | "inspiration";
export type Interest = { id: string; kind: InterestKind; label: string; at: number };
type TripState = { interests: Interest[]; track: Track | null; lastAdded: Interest | null };

const STORAGE_KEY = "tpl-trip";
const empty: TripState = { interests: [], track: null, lastAdded: null };

let state: TripState = empty;
const listeners = new Set<() => void>();
let loaded = false;

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
      state = { ...JSON.parse(saved), lastAdded: null };
      listeners.forEach((l) => l());
    }
  } catch {
    // Unreadable or blocked storage: start fresh.
  }
}

export function addInterest(kind: InterestKind, text: string) {
  const label = text.replace(/\s+/g, " ").trim().slice(0, 48);
  if (!label) return;
  const id = `${kind}:${label.toLowerCase()}`;
  if (state.interests.some((i) => i.id === id)) return;
  const interest = { id, kind, label, at: Date.now() };
  commit({ ...state, interests: [...state.interests, interest].slice(-14), lastAdded: interest });
}

export function removeInterest(id: string) {
  commit({ ...state, interests: state.interests.filter((i) => i.id !== id) });
}

export function setTrack(track: Track) {
  if (state.track !== track) commit({ ...state, track });
}

export function clearTrip() {
  commit(empty);
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
