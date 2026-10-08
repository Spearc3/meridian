import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/personal-travel", label: "Personal Travels" },
  { to: "/corporate", label: "Corporate & Business" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  // While the drawer is open the page underneath must not scroll; and the
  // drawer only exists below lg, so widening the window closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = previous;
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    // Closed: smoky glass flush with the top edge that dissolves into the page.
    // The frost lives on its own layer, 24px deeper than the 72px header so
    // the bar reads taller without moving the nav row, masked to transparent
    // over its last 32px — below the nav row — so the links and logo
    // themselves are never masked. Open (small screens): the header
    // becomes a full-height drawer and the layer swaps to a denser, unmasked
    // glass so nothing underneath stays legible. Type gets a faint shadow so
    // it holds where a bright patch of photo passes under.
    <header
      className={`fixed inset-x-0 top-0 z-50 text-foreground [text-shadow:0_1px_2px_rgb(4_16_32/0.35)] ${
        open ? "flex h-[100dvh] flex-col" : ""
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 ${
          open ? "bottom-0 glass-drawer" : "-bottom-6 glass-bar"
        }`}
      />
      <div className="container-editorial relative flex h-[72px] shrink-0 items-center justify-between">
        <Link
          to="/"
          className="-m-1 flex items-center rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Travel Port Leisure — home"
        >
          <Logo className="h-9 sm:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `gold-underline whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:text-[13px] ${
                  isActive ? "text-white [background-size:100%_1px]" : "text-foreground/85"
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
            className="group inline-flex items-center gap-2 whitespace-nowrap bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground [text-shadow:none] transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
          >
            Request a Proposal
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <button
          className="-mr-2.5 grid h-11 w-11 place-items-center text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="overlay-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain lg:hidden">
          <div className="container-editorial flex flex-col gap-6 py-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `py-1 text-sm font-semibold uppercase tracking-[0.24em] ${
                    isActive ? "text-white underline decoration-primary decoration-2 underline-offset-8" : "text-foreground/85"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 w-full bg-primary px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground [text-shadow:none]"
            >
              Request a Proposal →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
