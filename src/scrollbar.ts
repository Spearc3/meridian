/**
 * Floating scrollbar: html.is-scrolling is present only while something is
 * scrolling — the page or any inner scroller (capture catches both) — and is
 * cleared after a short idle, letting the thumb fade back out (see index.css).
 */
const IDLE_MS = 900;

export function installFloatingScrollbar() {
  // Touch screens draw their own overlay scrollbars, so there is nothing to
  // fade — skip the per-scroll class toggling (and the style recalculation it
  // triggers) on phones and tablets.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const root = document.documentElement;
  let timer = 0;
  document.addEventListener(
    "scroll",
    () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => root.classList.remove("is-scrolling"), IDLE_MS);
    },
    { capture: true, passive: true },
  );
}
