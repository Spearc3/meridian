/**
 * A tiny star that arcs from where the visitor tapped to the advisor orb, to
 * show the tap was noted. Fires "tpl:star-landed" as it reaches the orb.
 */
const DURATION = 760;
const TRAIL = 3;

/** Point on the quadratic curve from p0 through control c to p1. */
function along(t: number, p0: number, c: number, p1: number) {
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t ** 2 * p1;
}

export function launchStar(fromX: number, fromY: number) {
  const orb = document.querySelector(".advisor-orb");
  if (!orb || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.dispatchEvent(new Event("tpl:star-landed"));
    return;
  }
  const target = orb.getBoundingClientRect();
  const toX = target.left + target.width / 2;
  const toY = target.top + target.height / 2;
  // Arc up and over: the control point sits above the higher of the two ends.
  const cx = (fromX + toX) / 2;
  const cy = Math.min(fromY, toY) - Math.min(220, Math.abs(toX - fromX) * 0.35 + 80);

  const frames = (scaleFrom: number, scaleTo: number, alpha = 1) =>
    Array.from({ length: 17 }, (_, i) => {
      const t = i / 16;
      const x = along(t, fromX, cx, toX);
      const y = along(t, fromY, cy, toY);
      const scale = scaleFrom + (scaleTo - scaleFrom) * t;
      return {
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${t * 300}deg) scale(${scale})`,
        opacity: alpha * (t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1),
      };
    });

  const make = (className: string) => {
    const el = document.createElement("span");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    document.body.append(el);
    return el;
  };

  const star = make("shooting-star");
  const flight = star.animate(frames(1, 0.55), {
    duration: DURATION,
    easing: "cubic-bezier(0.45, 0, 0.25, 1)",
    fill: "both",
  });
  // A short fading tail of sparks following the same path.
  for (let i = 1; i <= TRAIL; i++) {
    const spark = make("shooting-star-spark");
    spark
      .animate(frames(0.7 - i * 0.12, 0.3, 0.65 - i * 0.15), {
        duration: DURATION,
        delay: i * 45,
        easing: "cubic-bezier(0.45, 0, 0.25, 1)",
        fill: "both",
      })
      .finished.finally(() => spark.remove());
  }
  flight.finished.finally(() => {
    star.remove();
    window.dispatchEvent(new Event("tpl:star-landed"));
  });
}
