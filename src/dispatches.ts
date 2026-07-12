import type { Story } from "./data";

const STORAGE_KEY = "meridian.dispatches";

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "dispatch"
  );
}

export function loadDispatches(): Story[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Story[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDispatches(dispatches: Story[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dispatches));
  } catch {
    // Quota exceeded (a large photo, most likely) — nothing useful to do here.
  }
}
