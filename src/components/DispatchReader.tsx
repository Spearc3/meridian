import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote, X } from "lucide-react";
import { formatLabel, type Dispatch } from "../fieldbook";

/** The audio page: a large transport, an animated waveform, a producer's note. */
function AudioPage({ page }: { page: Dispatch }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-8 py-14 md:px-14">
      <audio
        ref={ref}
        src={page.audioUrl}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <div className="flex items-center gap-5">
        <button
          onClick={() =>
            playing ? ref.current?.pause() : void ref.current?.play()
          }
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          {playing ? (
            <Pause size={26} fill="currentColor" />
          ) : (
            <Play size={26} className="ml-1" fill="currentColor" />
          )}
        </button>

        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/50">
            {playing ? "Now playing" : page.duration}
          </p>
          <p className="text-display mt-1 text-2xl">{page.title}</p>
          {/* The bars breathe only while the clip is running. */}
          <div className="mt-3 flex h-10 items-end gap-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="w-1 origin-bottom rounded-full bg-primary/60"
                style={{
                  height: "100%",
                  animation: playing
                    ? `waveform 0.9s ${i * 0.03}s ease-in-out infinite`
                    : "none",
                  transform: playing ? undefined : "scaleY(0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {page.transcript && (
        <div className="mt-10 border-t border-abyss/15 pt-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/50">
            Producer's note
          </p>
          <p className="mt-3 text-lg leading-relaxed text-abyss/80">
            {page.transcript}
          </p>
        </div>
      )}
    </div>
  );
}

/** A dispatch is bound into pages: a title page, its contents, then a colophon. */
function buildPages(page: Dispatch): ReactNode[] {
  const pages: ReactNode[] = [];
  // A gallery carries no separate cover — its first frame is the frontispiece.
  const frontispiece = page.cover ?? page.frames?.[0]?.src;

  // Title page — cover on the left leaf, the imprint on the right.
  pages.push(
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      {frontispiece ? (
        <div className="relative min-h-[240px] bg-abyss md:min-h-full">
          <img
            src={frontispiece}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative grid min-h-[240px] place-items-center bg-gradient-to-br from-deep to-abyss p-10 text-mist md:min-h-full">
          <Quote size={64} className="text-primary/60" />
        </div>
      )}

      <div className="flex flex-col justify-center p-8 md:p-14">
        <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/50">
          {page.chapter}
        </p>
        <h1 className="text-display mt-4 text-4xl leading-[1.05] md:text-6xl">
          {page.title}
        </h1>
        <div className="mt-8 h-px w-16 bg-primary" />
        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-abyss/60">
          By {page.author}
        </p>
        <p className="text-xs uppercase tracking-[0.24em] text-abyss/60">
          {page.place} · {page.date}
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-abyss/40">
          {formatLabel(page.format)}
          {page.readTime ? ` · ${page.readTime}` : ""}
        </p>
      </div>
    </div>,
  );

  if (page.format === "essay" && page.body?.length) {
    const paragraphs = page.body;
    pages.push(
      <div className="mx-auto max-w-3xl px-8 py-14 md:px-14">
        <p className="text-display text-xl leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-primary">
          {paragraphs[0]}
        </p>
        {paragraphs.slice(1, 2).map((text, i) => (
          <p key={i} className="mt-6 text-lg leading-relaxed text-abyss/80">
            {text}
          </p>
        ))}
        {page.pullQuote && (
          <blockquote className="text-display my-10 border-l-2 border-primary pl-6 text-3xl leading-tight italic text-abyss">
            “{page.pullQuote}”
          </blockquote>
        )}
        {paragraphs.slice(2).map((text, i) => (
          <p key={i} className="mt-6 text-lg leading-relaxed text-abyss/80">
            {text}
          </p>
        ))}
      </div>,
    );
  }

  // Gallery: every frame is its own page, captioned in the margin.
  if (page.format === "gallery" && page.frames) {
    page.frames.forEach((frame, i) => {
      pages.push(
        <div className="grid h-full grid-cols-1 md:grid-cols-5">
          <div className="relative min-h-[260px] md:col-span-4 md:min-h-full">
            <img
              src={frame.src}
              alt={frame.caption}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 p-8 md:col-span-1 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/50">
              Frame {i + 1} / {page.frames!.length}
            </p>
            <p className="text-display text-lg leading-snug italic">
              {frame.caption}
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-abyss/40">
              {page.place}
            </p>
          </div>
        </div>,
      );
    });
  }

  if (page.format === "quote") {
    pages.push(
      <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-14 text-center md:px-14">
        <Quote size={48} className="mx-auto text-primary" />
        <p className="text-display mt-8 text-4xl leading-tight italic md:text-6xl">
          “{page.quote}”
        </p>
        <p className="mt-10 text-xs uppercase tracking-[0.28em] text-abyss/60">
          — {page.author}
        </p>
      </div>,
    );
  }

  // Postcard: the real thing — picture side, then the written side on card stock.
  if (page.format === "postcard") {
    pages.push(
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[260px] bg-abyss">
          {page.cover && (
            <img
              src={page.cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="relative flex flex-col justify-between gap-8 bg-[#f5efe4] p-8 md:p-12">
          <div className="flex items-start justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/50">
              {page.postmark}
            </p>
            <div className="h-14 w-12 border-2 border-abyss/70 bg-white/60 p-1 text-center">
              <div className="grid h-full w-full place-items-center bg-primary/20 text-[8px] uppercase tracking-widest text-abyss/60">
                Stamp
              </div>
            </div>
          </div>
          <p className="text-display text-2xl leading-relaxed italic md:text-3xl">
            {page.note}
          </p>
          <div className="flex items-end justify-between">
            <div className="h-px flex-1 bg-abyss/30" />
            <p className="ml-6 text-xs uppercase tracking-[0.24em] text-abyss/60">
              {page.author}
            </p>
          </div>
        </div>
      </div>,
    );
  }

  if (page.format === "film" && page.videoUrl) {
    pages.push(
      <div className="grid h-full place-items-center bg-abyss p-4">
        <video
          src={page.videoUrl}
          controls
          poster={page.cover}
          className="max-h-full max-w-full"
        />
      </div>,
    );
  }

  if (page.format === "audio" && page.audioUrl) {
    pages.push(<AudioPage page={page} />);
  }

  if (page.format === "journal" && page.entries) {
    pages.push(
      <div className="mx-auto max-w-3xl px-8 py-14 md:px-14">
        <h2 className="text-display text-4xl">Field Notes</h2>
        <div className="mt-10 space-y-10">
          {page.entries.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 border-b border-abyss/10 pb-8 last:border-0 sm:grid-cols-[100px_1fr] sm:gap-6"
            >
              <p className="text-display text-2xl text-primary sm:text-3xl">
                {entry.day}
              </p>
              <p className="text-lg leading-relaxed text-abyss/80">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>,
    );
  }

  pages.push(
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-8 py-14 text-center">
      <p className="text-[10px] uppercase tracking-[0.28em] text-abyss/40">
        Colophon
      </p>
      <h3 className="text-display mt-4 text-3xl">Thank you for reading.</h3>
      <p className="mt-4 text-sm text-abyss/70">
        This dispatch was filed by {page.author} from {page.place}. Bound into
        The Field Book on {page.date}.
      </p>
      <div className="mt-8 h-px w-24 bg-primary" />
      <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-abyss/40">
        Meridian · Vol. III
      </p>
    </div>,
  );

  return pages;
}

export default function DispatchReader({
  page,
  onClose,
}: {
  page: Dispatch;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const pages = buildPages(page);
  const count = pages.length;

  const turn = (delta: number) => {
    const next = Math.max(0, Math.min(count - 1, index + delta));
    if (next === index) return;
    setDirection(delta);
    setIndex(next);
  };

  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [page.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-abyss/90 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
    >
      {/* The book itself: paper stock, not the site's ink. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-border/60 bg-mist text-abyss shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between border-b border-abyss/15 px-6 py-4 md:px-10">
          <div className="min-w-0">
            <p className="truncate text-[10px] uppercase tracking-[0.28em] text-abyss/50">
              {page.chapter} · {formatLabel(page.format)}
            </p>
            <p className="text-display mt-1 truncate text-xl leading-none">
              {page.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 shrink-0 p-2 text-abyss/60 hover:text-abyss"
          >
            <X size={22} />
          </button>
        </div>

        {/* The leaf turns on its spine — origin flips with the direction. */}
        <div className="relative flex-1 overflow-hidden [perspective:2000px]">
          <div
            key={index}
            className="absolute inset-0 overflow-y-auto"
            style={{
              transformOrigin: direction > 0 ? "left center" : "right center",
              animation: `page-turn-${direction > 0 ? "next" : "prev"} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
            }}
          >
            {pages[index]}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-abyss/15 px-6 py-3 md:px-10">
          <button
            onClick={() => turn(-1)}
            disabled={index === 0}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-abyss/70 hover:text-primary disabled:opacity-30"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i >= index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Page ${i + 1}`}
                className={`h-1 w-6 transition-colors ${
                  i === index ? "bg-primary" : "bg-abyss/20"
                }`}
              />
            ))}
            <span className="ml-3 hidden text-[10px] uppercase tracking-[0.28em] text-abyss/50 sm:inline">
              Page {index + 1} of {count}
            </span>
          </div>

          <button
            onClick={() => turn(1)}
            disabled={index === count - 1}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-abyss/70 hover:text-primary disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
