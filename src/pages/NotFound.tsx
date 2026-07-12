import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[80svh] flex-col justify-center py-40">
      <p className="eyebrow animate-reveal">Error 404 · Off the chart</p>
      <h1
        className="text-display mt-6 text-5xl leading-[0.9] animate-reveal sm:text-7xl md:text-9xl"
        style={{ animationDelay: "0.1s" }}
      >
        This page is
        <br />
        <em className="text-primary">uncharted water.</em>
      </h1>
      <p
        className="mt-8 max-w-xl text-lg text-muted-foreground animate-reveal"
        style={{ animationDelay: "0.2s" }}
      >
        Every atlas has its blank spaces — the cartographers of old drew sea
        monsters in them. There is nothing at these coordinates, but there is a
        great deal elsewhere.
      </p>
      <div
        className="mt-12 flex flex-wrap gap-8 animate-reveal"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          to="/"
          className="border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          Back to harbour
        </Link>
        <Link
          to="/destinations"
          className="gold-underline self-center text-sm uppercase tracking-[0.24em] text-primary"
        >
          Or open the atlas →
        </Link>
      </div>
    </section>
  );
}
