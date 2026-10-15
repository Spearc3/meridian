import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

/** Each page fades in on arrival (CSS, keyed on the path), and each section
 *  tilts up into place the first time it scrolls into view. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let observer: IntersectionObserver | undefined;
    // A frame later, so the new page's sections are in the DOM.
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.animate(
              [
                { opacity: 0.3, transform: "perspective(1200px) translate3d(0,24px,-35px) rotateX(2deg)" },
                { opacity: 1, transform: "perspective(1200px) translate3d(0,0,0) rotateX(0)" },
              ],
              { duration: 850, easing: "cubic-bezier(.2,.8,.2,1)" },
            );
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          "main .section>.travel-shell, .destination-explorer>.travel-shell, .connect-section>.travel-shell",
        )
        .forEach((el) => observer?.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <div key={pathname} className="travel-page-transition">
      {children}
    </div>
  );
}
