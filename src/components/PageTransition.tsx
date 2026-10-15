import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

/** What rises into view: each section's blocks, and the items of its grids
 *  one by one rather than the grid as a whole. */
const BLOCKS = "main .section > .travel-shell > *, .destination-explorer > .travel-shell > *, .connect-section > .travel-shell > *";
const ITEMS = [
  ".services > *",
  ".stats > *",
  ".service-strip > *",
  ".process-grid > *",
  ".destination-grid > *",
  ".principles > *",
  ".travel-types > *",
  ".leadership-grid > *",
  ".contact-details > *",
  ".connect-options > *",
  ".purpose-grid > *",
].join(", ");

/** Gap between items arriving together, and the most any one waits. */
const STAGGER_MS = 70;
const MAX_DELAY_MS = 420;

/** Each page fades in on arrival (CSS, keyed on the path), and content below
 *  the fold rises gently into place as it scrolls into view. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  // Before paint, so nothing below the fold is ever seen at rest and then
  // snapped back to hidden.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Items in a row that scrolls sideways (the destination tiles on phones)
    // would only ever enter from the side, never the bottom; the row rises as
    // one instead.
    const scrollsSideways = (el: HTMLElement) => /auto|scroll/.test(getComputedStyle(el).overflowX);
    const candidates = [
      ...new Set(
        [...document.querySelectorAll<HTMLElement>(`${BLOCKS}, ${ITEMS}`)].map((el) =>
          el.parentElement && scrollsSideways(el.parentElement) ? el.parentElement : el,
        ),
      ),
    ];
    // A block that holds a grid gives way to the grid's own items, so nothing
    // moves twice over.
    const targets = candidates.filter((el) => !candidates.some((other) => other !== el && el.contains(other)));

    // Only what starts below the fold waits; anything already on screen (or
    // scrolled past, after back/forward) stays put.
    const fold = window.innerHeight;
    const pending = targets.filter((el) => el.getBoundingClientRect().top > fold * 0.92);
    pending.forEach((el) => el.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
        arriving.forEach((el, i) => {
          observer.unobserve(el);
          el.style.transitionDelay = `${Math.min(i * STAGGER_MS, MAX_DELAY_MS)}ms`;
          el.classList.add("reveal-in");
          el.classList.remove("reveal-pending");
          // Once settled, drop the delay and the compositing hint.
          const settle = (e: TransitionEvent) => {
            if (e.target !== el || e.propertyName !== "transform") return;
            el.removeEventListener("transitionend", settle);
            el.style.transitionDelay = "";
            el.classList.remove("reveal-in");
          };
          el.addEventListener("transitionend", settle);
        });
      },
      // Start just as the top edge clears the bottom of the screen.
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    pending.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      pending.forEach((el) => el.classList.remove("reveal-pending", "reveal-in"));
    };
  }, [pathname]);

  return (
    <div key={pathname} className="travel-page-transition">
      {children}
    </div>
  );
}
