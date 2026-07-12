import {
  BookOpen,
  Images,
  Mic,
  NotebookPen,
  Play,
  Quote,
  Send,
} from "lucide-react";
import { formatLabel, waveform, type Dispatch, type Format } from "../fieldbook";

const icons: Record<Format, typeof BookOpen> = {
  essay: BookOpen,
  gallery: Images,
  quote: Quote,
  postcard: Send,
  film: Play,
  audio: Mic,
  journal: NotebookPen,
};

function Badge({ format }: { format: Format }) {
  const Icon = icons[format];
  return (
    <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-abyss/40 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-primary backdrop-blur">
      <Icon size={11} />
      {formatLabel(format)}
    </span>
  );
}

export default function DispatchCard({
  page,
  onOpen,
}: {
  page: Dispatch;
  onOpen: () => void;
}) {
  const byline = (
    <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      — {page.author}
    </p>
  );

  // A pull quote is a page in its own right: no image, just the words.
  if (page.format === "quote") {
    return (
      <button
        onClick={onOpen}
        className="group flex h-full w-full flex-col justify-between border border-border/50 bg-gradient-to-br from-deep/50 to-abyss p-8 text-left transition-colors hover:border-primary/60"
      >
        <Badge format="quote" />
        <Quote size={22} className="mt-4 text-primary/40" />
        <p className="text-display mt-4 text-2xl leading-snug italic">
          “{page.quote}”
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {page.author} · {page.place}
        </p>
      </button>
    );
  }

  // Postcard: printed stock, so it inverts to light and tilts in the hand.
  if (page.format === "postcard") {
    return (
      <button
        onClick={onOpen}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border/50 bg-mist text-abyss shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-transform hover:-rotate-1"
      >
        {page.cover && (
          <img
            src={page.cover}
            alt=""
            loading="lazy"
            className="absolute inset-x-0 top-0 h-1/2 w-full object-cover"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 p-4 text-left">
          <div className="flex items-start justify-between">
            <p className="text-[9px] uppercase tracking-[0.24em] text-abyss/60">
              {page.postmark}
            </p>
            <span className="border border-abyss/40 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-abyss/70">
              Postcard
            </span>
          </div>
          <p className="text-display mt-2 text-xl leading-tight">{page.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-abyss/70">{page.note}</p>
        </div>
      </button>
    );
  }

  // Journal: the dated entries are the preview.
  if (page.format === "journal") {
    return (
      <button
        onClick={onOpen}
        className="group flex h-full w-full flex-col border border-border/50 bg-secondary/30 p-6 text-left transition-colors hover:border-primary/60"
      >
        <Badge format="journal" />
        <h3 className="text-display mt-5 text-2xl leading-tight transition-colors group-hover:text-primary">
          {page.title}
        </h3>
        <div className="mt-4 space-y-3 border-l border-primary/40 pl-4">
          {page.entries?.slice(0, 3).map((entry) => (
            <div key={entry.day}>
              <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                {entry.day}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
        {byline}
      </button>
    );
  }

  // Field audio: waveform standing in for the recording.
  if (page.format === "audio") {
    const bars = waveform(page.slug);
    return (
      <button
        onClick={onOpen}
        className="group flex h-full w-full flex-col justify-between border border-border/50 bg-secondary/40 p-6 text-left transition-colors hover:border-primary/60"
      >
        <div className="flex items-center justify-between">
          <Badge format="audio" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {page.duration}
          </span>
        </div>
        <div className="my-8 flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
          <span className="flex h-8 flex-1 items-end gap-0.5">
            {bars.map((height, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-primary/60"
                style={{ height: `${height}%` }}
              />
            ))}
          </span>
        </div>
        <div>
          <h3 className="text-display text-2xl leading-tight transition-colors group-hover:text-primary">
            {page.title}
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {page.author} · {page.place}
          </p>
        </div>
      </button>
    );
  }

  // Gallery: a strip of frames, with the count.
  if (page.format === "gallery") {
    const frames = page.frames ?? [];
    return (
      <button onClick={onOpen} className="group w-full text-left">
        <div className="relative grid aspect-[4/3] grid-cols-3 gap-1 overflow-hidden">
          {frames.slice(0, 3).map((frame, i) => (
            <img
              key={i}
              src={frame.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
          ))}
          <div className="absolute left-3 top-3">
            <Badge format="gallery" />
          </div>
          <div className="absolute bottom-3 right-3 border border-border/60 bg-abyss/70 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-mist backdrop-blur">
            {frames.length} frames
          </div>
        </div>
        <p className="eyebrow mt-4">
          {page.place} · {page.readTime}
        </p>
        <h3 className="text-display mt-2 text-2xl leading-tight transition-colors group-hover:text-primary">
          {page.title}
        </h3>
        {byline}
      </button>
    );
  }

  // Essay and film share the cover-led layout; film gets a play affordance.
  return (
    <button onClick={onOpen} className="group w-full text-left">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {page.cover && (
          <img
            src={page.cover}
            alt={page.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
          />
        )}
        <div className="absolute left-3 top-3">
          <Badge format={page.format} />
        </div>
        {page.format === "film" && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-primary/60 bg-abyss/50 text-primary backdrop-blur transition-transform group-hover:scale-110">
              <Play size={20} className="ml-1" fill="currentColor" />
            </span>
          </span>
        )}
      </div>
      <p className="eyebrow mt-5">
        {page.place}
        {page.readTime ? ` · ${page.readTime}` : ""}
      </p>
      <h3 className="text-display mt-3 text-3xl leading-tight transition-colors group-hover:text-primary">
        {page.title}
      </h3>
      {page.body?.[0] && (
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
          {page.body[0]}
        </p>
      )}
      {byline}
    </button>
  );
}
