/**
 * --screen-h: the height of the screen the page is actually visible in, kept
 * current as a phone's browser bar shows and hides. Full-screen heroes are
 * sized from it. CSS's dvh is meant to do this, but some mobile browsers and
 * in-app browsers don't update it with the bar, leaving a strip of the next
 * section showing (or the hero running under the bar).
 */
export function trackScreenHeight() {
  const root = document.documentElement;
  let raf = 0;
  const apply = () => {
    raf = 0;
    root.style.setProperty("--screen-h", `${window.innerHeight}px`);
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };
  apply();
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("orientationchange", schedule, { passive: true });
  // The bar collapsing doesn't always fire a window resize; it does change
  // the visual viewport.
  window.visualViewport?.addEventListener("resize", schedule, { passive: true });
  // Some browsers settle the bar a moment after load.
  window.addEventListener("pageshow", schedule);
}
