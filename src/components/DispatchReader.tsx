import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, X } from "lucide-react";
import { formatLabel, waveform, type Dispatch } from "../fieldbook";

/** Field audio: a real <audio> element, with the waveform as its scrub bar. */
function AudioPlayer({ page }: { page: Dispatch }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const bars = waveform(page.slug, 48);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () =>
      setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
      el.pause();
    };
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const seek = (fraction: number) => {
    const el = ref.current;
    if (!el || !el.duration) return;
    el.currentTime = fraction * el.duration;
    setProgress(fraction);
  };

  return (
    <div className="border border-border/60 bg-secondary/40 p-6">
      <audio ref={ref} src={page.audioUrl} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          {playing ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} className="ml-0.5" fill="currentColor" />
          )}
        </button>

        <div
          className="flex h-12 flex-1 cursor-pointer items-end gap-0.5"
          onClick={(e) => {
            const box = e.currentTarget.getBoundingClientRect();
            seek((e.clientX - box.left) / box.width);
          }}
        >
          {bars.map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-colors ${
                i / bars.length <= progress ? "bg-primary" : "bg-primary/25"
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {playing ? "Now playing" : page.duration} · Recorded by {page.author}
      </p>
    </div>
  );
}

export default function DispatchReader({
  page,
  onClose,
  onPrev,
  onNext,
}: {
  page: Dispatch;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [frame, setFrame] = useState(0);
  const frames = page.frames ?? [];

  useEffect(() => setFrame(0), [page.slug]);

  // Escape closes; the arrows turn the page — for the gallery they step through
  // frames first, then move on to the next dispatch.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        if (frames.length && frame < frames.length - 1) setFrame((f) => f + 1);
        else onNext();
      }
      if (e.key === "ArrowLeft") {
        if (frames.length && frame > 0) setFrame((f) => f - 1);
        else onPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frame, frames.length, onClose, onNext, onPrev]);

  // Lock the page behind the reader.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-abyss/95 backdrop-blur-xl">
      {/* Chrome */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-abyss/80 px-6 py-4 backdrop-blur md:px-10">
        <p className="text-[10px] uppercase tracking-[0.28em] text-primary">
          {formatLabel(page.format)} · {page.chapter}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous dispatch"
            className="grid h-9 w-9 place-items-center border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={onNext}
            aria-label="Next dispatch"
            className="grid h-9 w-9 place-items-center border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <ArrowRight size={15} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-2 grid h-9 w-9 place-items-center border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <article className="container-editorial max-w-4xl py-10 md:py-16">
        <p className="eyebrow">
          {page.place} · {page.date}
        </p>
        <h1 className="text-display mt-5 text-4xl leading-[0.95] sm:text-5xl md:text-7xl">
          {page.title}
        </h1>
        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          {page.submitted ? "Filed by a reader" : "Filed by"} ·{" "}
          <span className="text-primary">{page.author}</span>
          {page.readTime ? ` · ${page.readTime}` : ""}
        </p>

        {/* Gallery: one frame at a time, with its caption. */}
        {page.format === "gallery" && frames.length > 0 && (
          <div className="mt-10">
            <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
              <img
                src={frames[frame].src}
                alt={frames[frame].caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 right-3 border border-border/60 bg-abyss/70 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-mist backdrop-blur">
                Frame {frame + 1} / {frames.length}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {frames[frame].caption}
            </p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {frames.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFrame(i)}
                  aria-label={`Frame ${i + 1}`}
                  className={`h-16 w-24 shrink-0 overflow-hidden border transition-colors ${
                    i === frame ? "border-primary" : "border-border/50"
                  }`}
                >
                  <img src={f.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {page.format === "film" && page.videoUrl && (
          <video
            src={page.videoUrl}
            controls
            poster={page.cover}
            className="mt-10 w-full bg-secondary"
          />
        )}

        {page.format === "audio" && page.audioUrl && (
          <div className="mt-10">
            <AudioPlayer page={page} />
          </div>
        )}

        {page.format !== "gallery" &&
          page.format !== "audio" &&
          page.format !== "quote" &&
          page.cover && (
            <img
              src={page.cover}
              alt={page.title}
              className="mt-10 aspect-[3/2] w-full object-cover"
            />
          )}

        {page.format === "quote" && (
          <blockquote className="text-display mt-12 border-l-2 border-primary/60 pl-5 text-3xl leading-tight italic sm:pl-8 sm:text-4xl md:text-5xl">
            “{page.quote}”
          </blockquote>
        )}

        {page.format === "postcard" && (
          <div className="mt-10 border border-border/60 bg-mist p-6 text-abyss sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.24em] text-abyss/60">
              {page.postmark}
            </p>
            <p className="text-display mt-4 text-2xl leading-relaxed">
              {page.note}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-abyss/60">
              — {page.author}
            </p>
          </div>
        )}

        {page.format === "journal" && (
          <div className="mt-12 space-y-8 border-l border-primary/40 pl-5 sm:pl-8">
            {page.entries?.map((entry) => (
              <div key={entry.day}>
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                  {entry.day}
                </p>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {page.pullQuote && (
          <blockquote className="text-display my-12 border-y border-border/50 py-8 text-center text-3xl leading-snug italic text-primary md:text-4xl">
            “{page.pullQuote}”
          </blockquote>
        )}

        {page.body && page.body.length > 0 && (
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            {page.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0 && page.format === "essay"
                    ? "text-xl text-foreground/90 first-letter:text-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-primary"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Colophon */}
        <div className="mt-20 border-t border-border/50 pt-8 text-center">
          <p className="eyebrow">Colophon</p>
          <p className="text-display mt-4 text-3xl">Thank you for reading.</p>
          <p className="mt-3 text-sm text-muted-foreground">
            This dispatch was filed by {page.author} from {page.place},{" "}
            {page.date}.
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Meridian · Vol. III
          </p>
          <button
            onClick={onNext}
            className="group mt-8 inline-flex items-center gap-3 border border-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Turn the page
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </article>
    </div>
  );
}
