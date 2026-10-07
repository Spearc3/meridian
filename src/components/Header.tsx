import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/tpl-logo.png";

const links = [
  { to: "/#services", label: "Services" },
  { to: "/#network", label: "Network" },
  { to: "/#memories", label: "Memories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
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
        <Link to="/" className="flex items-center" aria-label="Travel Port Leisure">
          <img
            src={logo}
            alt="Travel Port Leisure (Private) Limited"
            className="h-11 w-auto rounded-sm bg-white px-2.5 py-1.5"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `gold-underline whitespace-nowrap text-[12px] uppercase tracking-[0.18em] transition-colors hover:text-primary xl:text-[13px] ${
                  isActive && !link.to.includes("#") ? "text-primary" : "text-foreground/80"
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
            className="group inline-flex items-center gap-2 whitespace-nowrap border border-primary/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Request a Proposal
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
                    isActive && !link.to.includes("#") ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 w-full border border-primary/60 px-5 py-3 text-center text-xs uppercase tracking-[0.24em] text-primary"
            >
              Request a Proposal →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
