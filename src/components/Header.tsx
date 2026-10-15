import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { openAdvisor } from "../advisor";
import { navLinks as links } from "../tpl";

const EASE = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

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
    // page. Type gets a faint shadow so it holds where a bright patch of photo
    // passes under.
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
        <nav id="mobile-menu" aria-label="Mobile" className="overlay-scroll relative h-full overflow-y-auto pt-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8">
            {[...links, { to: "/contact", label: "Request a Proposal →", cta: true }].map((link, i) => (
              // Each item rises into place a beat after the one above it on
              // the way in; on the way out they all leave together.
              <div
                key={link.label}
                className={`transition-[opacity,transform] duration-500 ${EASE} motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
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
                    className="block py-1 text-sm font-semibold uppercase tracking-[0.24em] text-foreground/85 [&.active]:text-foreground [&.active]:underline [&.active]:decoration-primary [&.active]:decoration-2 [&.active]:underline-offset-8"
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
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="Travel Port Leisure — home">
          <Logo className="h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className="gold-underline whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground [&.active]:text-foreground"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openAdvisor({ track: "corporate" })}
            className="btn btn-primary group [text-shadow:none]"
          >
            Request a proposal <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <button
          className="-mr-2.5 grid h-11 w-11 place-items-center text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Three bars that fold into an X: the outer two slide to the
              middle and turn ±45°, the middle one fades. Reverses on close. */}
          <span aria-hidden className="relative block h-4 w-[22px]">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-300 ${EASE} motion-reduce:transition-none ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[14px] h-0.5 rounded-full bg-current transition-transform duration-300 ${EASE} motion-reduce:transition-none ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
