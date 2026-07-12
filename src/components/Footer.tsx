import { useState } from "react";
import { Link } from "react-router-dom";

/* lucide-react no longer ships brand marks, so the three socials are inline. */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Instagram = () => (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const Twitter = () => (
  <svg {...iconProps}>
    <path d="M22 4.5a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8A11.8 11.8 0 0 1 3 3.4a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.05a4.2 4.2 0 0 0 3.4 4.1 4.3 4.3 0 0 1-1.9.07 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 17.4a11.9 11.9 0 0 0 6.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0 0 22 4.5z" />
  </svg>
);

const Youtube = () => (
  <svg {...iconProps}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="relative mt-32 border-t border-border/40 bg-abyss/60">
      <div className="container-editorial grid grid-cols-1 gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Meridian · Est. 2019</p>
          <h3 className="text-display mt-4 text-4xl leading-tight">
            You direct it. <br /> We arrange everything else.
          </h3>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A travel atelier for people who would rather direct a journey than
            book one. You call the shots; we are the crew behind you — the rooms,
            the guides, the tide tables, the whole apparatus.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Plan</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/destinations" className="gold-underline">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/stays" className="gold-underline">
                Stays
              </Link>
            </li>
            <li>
              <Link to="/experiences" className="gold-underline">
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/packages" className="gold-underline">
                Journeys
              </Link>
            </li>
            <li>
              <Link to="/stories" className="gold-underline">
                Traveller Stories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="gold-underline">
                Plan a Journey
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Dispatches</p>
          <p className="mt-4 text-sm text-muted-foreground">
            A quiet letter every full moon. No noise, only wonder.
          </p>
          <form
            className="mt-4 flex border border-border/60 focus-within:border-primary/60"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setJoined(true);
              setEmail("");
            }}
          >
            {/* min-w-0: a flex child won't shrink below an input's intrinsic
                width, which pushed the Join button off-screen on tablets. */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email"
              className="w-full min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button className="border-l border-border/60 px-5 text-xs uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              Join
            </button>
          </form>
          {joined && (
            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-primary">
              Welcome aboard — watch for the next full moon.
            </p>
          )}

          <div className="mt-6 flex gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary">
              <Twitter />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-primary">
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Meridian Atlas. All rights reserved.</p>
          <p className="uppercase tracking-[0.24em]">
            Latitude · Longitude · Longing
          </p>
        </div>
      </div>
    </footer>
  );
}
