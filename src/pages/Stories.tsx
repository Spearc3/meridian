import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PenLine } from "lucide-react";
import Reveal from "../components/Reveal";
import DispatchCard from "../components/DispatchCard";
import DispatchReader from "../components/DispatchReader";
import ContributeDrawer from "../components/ContributeDrawer";
import {
  chaptersOf,
  dispatches,
  formats,
  loadSubmitted,
  saveSubmitted,
  uniqueSlug,
  type Dispatch,
  type Format,
} from "../fieldbook";

export default function Stories() {
  const [submitted, setSubmitted] = useState<Dispatch[]>(loadSubmitted);
  const [filter, setFilter] = useState<Format | "all">("all");
  const [contributing, setContributing] = useState(false);

  // The open dispatch lives in the URL, so a page of the book can be shared and
  // reopened — /stories/:slug renders this page with the reader already open.
  const { slug } = useParams();
  const navigate = useNavigate();
  const reading = slug ?? null;
  const openPage = (next: string) => navigate(`/stories/${next}`);

  useEffect(() => saveSubmitted(submitted), [submitted]);

  // Reader-bound pages open the book; the printed ones follow.
  const all = useMemo(() => [...submitted, ...dispatches], [submitted]);
  const visible = useMemo(
    () => (filter === "all" ? all : all.filter((d) => d.format === filter)),
    [all, filter],
  );
  const chapters = useMemo(() => chaptersOf(visible), [visible]);

  // A shared link may point at a page the current filter hides, so fall back to
  // the whole book when resolving what to read.
  const readingIndex = visible.findIndex((d) => d.slug === reading);
  const page =
    readingIndex >= 0
      ? visible[readingIndex]
      : (all.find((d) => d.slug === reading) ?? null);

  const step = (delta: number) => {
    const list = readingIndex >= 0 ? visible : all;
    if (!list.length) return;
    const from = list.findIndex((d) => d.slug === reading);
    const next = (from + delta + list.length) % list.length;
    openPage(list[next].slug);
  };

  const bind = (draft: Omit<Dispatch, "slug">) => {
    const taken = new Set(all.map((d) => d.slug));
    setSubmitted((prev) => [
      { ...draft, slug: uniqueSlug(draft.title, taken) },
      ...prev,
    ]);
  };

  return (
    <>
      {/* Masthead */}
      <section className="container-editorial pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-reveal">Volume III · MMXXVI</p>
            <h1
              className="text-display mt-5 text-6xl leading-[0.9] animate-reveal md:mt-6 md:text-8xl lg:text-9xl"
              style={{ animationDelay: "0.1s" }}
            >
              The Field
              <br />
              <em className="text-primary">Book.</em>
            </h1>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground animate-reveal md:mt-8 md:text-lg"
              style={{ animationDelay: "0.2s" }}
            >
              A living story book. Essays, galleries, postcards, field audio and
              journals — bound together, page by page, by travellers writing in
              from wherever the road leaves them.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <button
              onClick={() => setContributing(true)}
              className="group inline-flex items-center gap-3 border border-primary bg-primary/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <PenLine size={14} />
              Contribute a page
            </button>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {all.length} dispatches · {chaptersOf(all).length} chapters
            </p>
          </div>
        </div>
      </section>

      {/* Format filter */}
      <section className="container-editorial pb-10 md:pb-12">
        <div className="-mx-6 overflow-x-auto border-y border-border/50 px-6 md:mx-0 md:px-0">
          <div className="flex min-w-max flex-nowrap items-center gap-2 py-5 md:min-w-0 md:flex-wrap">
            <span className="mr-3 shrink-0 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Formats
            </span>
            {[{ id: "all" as const, label: "All" }, ...formats].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as Format | "all")}
                className={`min-h-11 shrink-0 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  filter === f.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* The book, chapter by chapter */}
      {chapters.map(({ chapter, pages }, chapterIndex) => (
        <section key={chapter} className="container-editorial pb-16 md:pb-24">
          <Reveal>
            <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-border/40 pb-4 md:mb-10">
              <h2 className="text-display text-2xl md:text-4xl">{chapter}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {String(chapterIndex + 1).padStart(2, "0")} /{" "}
                {String(chapters.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((entry, i) => (
              <Reveal key={entry.slug} delay={(i % 3) * 0.08}>
                <DispatchCard page={entry} onOpen={() => openPage(entry.slug)} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {chapters.length === 0 && (
        <section className="container-editorial pb-32 text-center">
          <p className="eyebrow">Nothing bound under that format</p>
          <h3 className="text-display mt-4 text-3xl md:text-4xl">
            The page is blank — for now.
          </h3>
          <button
            onClick={() => setContributing(true)}
            className="mt-8 gold-underline text-sm uppercase tracking-[0.24em] text-primary"
          >
            Contribute the first one →
          </button>
        </section>
      )}

      {page && (
        <DispatchReader
          page={page}
          onClose={() => navigate("/stories")}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}

      <ContributeDrawer
        open={contributing}
        onClose={() => setContributing(false)}
        onBind={bind}
      />
    </>
  );
}
