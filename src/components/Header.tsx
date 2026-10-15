import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
    // The bar: smoky glass flush with the top edge that dissolves into the
    // page. The frost lives on its own layer, 24px deeper than the 72px header
    // so the bar reads taller without moving the nav row, masked to
    // transparent over its last 32px — below the nav row — so the links and
    // logo themselves are never masked. Type gets a faint shadow so it holds
    // where a bright patch of photo passes under.
    //
    // The drawer (small screens) is a full-screen dark overlay underneath the
    // bar's row, so the logo and the menu/close button stay put above it. It
    // stays mounted so it can animate out as well as in; closed, it is
    // invisible and inert — out of the tab order and the accessibility tree.
    <header className="fixed inset-x-0 top-0 z-50 text-foreground [text-shadow:0_1px_2px_rgb(4_16_32/0.35)]">
      <div
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 h-[100dvh] transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div aria-hidden className="glass-drawer pointer-events-none absolute inset-0" />
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="overlay-scroll relative h-full overflow-y-auto overscroll-contain pt-[72px]"
        >
          <div className="container-editorial flex flex-col gap-6 py-8">
            {[...links, { to: "/contact", label: "Request a Proposal →", cta: true }].map((link, i) => (
              // Each item rises into place a beat after the one above it on
              // the way in; on the way out they all leave together.
              <div
                key={link.label}
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${90 + i * 45}ms` : "0ms" }}
              >
                {"cta" in link ? (
                  <Link
                    to={link.to}
                    className="mt-2 block w-full bg-primary px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground [text-shadow:none]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `block py-1 text-sm font-semibold uppercase tracking-[0.24em] ${
                        isActive ? "text-white underline decoration-primary decoration-2 underline-offset-8" : "text-foreground/85"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* The bar's frost fades out as the drawer's darker glass fades in, so
          the two never stack into a visible band at the top. */}
      <div
        aria-hidden
        className={`glass-bar pointer-events-none absolute inset-x-0 top-0 -bottom-6 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-0" : "opacity-100"
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
          {/* Three bars that fold into an X: the outer two slide to the
              middle and turn ±45°, the middle one fades. Reverses on close. */}
          <span aria-hidden className="relative block h-4 w-[22px]">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[14px] h-0.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
