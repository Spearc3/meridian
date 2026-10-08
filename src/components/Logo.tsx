import logo from "../assets/tpl-logo-white.png";

type Props = {
  /** Height utility for the lockup itself, e.g. "h-11". Width follows. */
  className?: string;
};

// Every surface on this site is dark, so the lockup is the white version of
// the client's logo, straight on the page with no plate.
// The 800px file is 2x for the ~400 CSS px maximum we ever show it at; the
// intrinsic width/height reserve the box before it loads, so nothing shifts.
const WIDTH = 800;
const HEIGHT = 240;

export default function Logo({ className = "h-11" }: Props) {
  return (
    <img
      src={logo}
      width={WIDTH}
      height={HEIGHT}
      alt="Travel Port Leisure"
      decoding="async"
      className={`block w-auto max-w-none ${className}`}
    />
  );
}
