/** The client's two-tone icon set, in its light colourway (mist + aqua) for
    this site's dark surfaces. Each is trimmed and optically sized on a square
    canvas, so they line up at any size. Keyed by basename — the `icon` field
    on the lists in `tpl.ts`, plus a few used directly (vision, email, …). */
const icons = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>("../assets/icons/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ).map(([path, url]) => [path.slice(path.lastIndexOf("/") + 1, -4), url]),
);

export default function ServiceIcon({
  name,
  size = 44,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={icons[name] ?? icons.air}
      width={size}
      height={size}
      alt=""
      aria-hidden
      decoding="async"
      className={`block shrink-0 ${className}`}
    />
  );
}
