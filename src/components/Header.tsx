import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/stays", label: "Stays" },
  { to: "/experiences", label: "Experiences" },
  { to: "/packages", label: "Journeys" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* The tint and the blur both live on this masked layer. Masking an element
          fades its backdrop-filter as well as its background, so the bar is
          strongest at the very top and dissolves to nothing at its lower edge —
          no band, no hard line against the photo behind it. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -bottom-6 backdrop-saturate-150 transition-all duration-500 [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] ${
          scrolled
            ? "bg-gradient-to-b from-abyss/55 via-abyss/35 to-transparent backdrop-blur-sm"
            : "bg-gradient-to-b from-abyss/30 via-abyss/15 to-transparent backdrop-blur-[2px]"
        }`}
      />
      {/* relative z-10: the blur layer above is positioned, so without this the
          nav would paint *under* it and get blurred along with the backdrop. */}
      <div className="container-editorial relative z-10 flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-primary/50 text-primary transition-all group-hover:rotate-45">
            <span className="text-display text-lg leading-none">M</span>
          </span>
          <span className="text-display text-2xl tracking-wide">Meridian</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `gold-underline text-[13px] uppercase tracking-[0.22em] transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 border border-primary/60 px-5 py-2.5 text-xs uppercase tracking-[0.24em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Plan a Journey
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <button
          className="-mr-2 p-2 text-foreground lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/40 bg-abyss/95 backdrop-blur-xl lg:hidden">
          <div className="container-editorial flex flex-col gap-6 py-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-1 text-sm uppercase tracking-[0.24em] ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 border border-primary/60 px-5 py-3 text-center text-xs uppercase tracking-[0.24em] text-primary"
            >
              Plan a Journey →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
