/** Scrolls a memories track by one screenful. */
export function scrollTrack(track: HTMLElement | null, direction: number) {
  track?.scrollBy({
    left: direction * (track.clientWidth + 24),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}
