import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, PenLine, Upload, X } from "lucide-react";
import Reveal from "../components/Reveal";
import { featuredStory, stories, type Story } from "../data";
import { loadDispatches, saveDispatches, slugify } from "../dispatches";

export default function Stories() {
  const [open, setOpen] = useState(false);
  const [dispatches, setDispatches] = useState<Story[]>(loadDispatches);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [place, setPlace] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveDispatches(dispatches);
  }, [dispatches]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const readFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const canPublish = title.trim() && author.trim() && excerpt.trim() && image;

  const publish = () => {
    if (!canPublish) return;
    setDispatches((prev) => {
      const taken = new Set([
        featuredStory.slug,
        ...stories.map((s) => s.slug),
        ...prev.map((s) => s.slug),
      ]);
      // Two dispatches may share a title; keep every URL unique.
      const base = slugify(title);
      let slug = base;
      for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

      return [
        {
          slug,
          title: title.trim(),
          author: author.trim(),
          place: place.trim() || "Somewhere",
          excerpt: excerpt.trim(),
          readTime: `${Math.max(1, Math.round(excerpt.split(/\s+/).length / 40))} min`,
          image: image!,
          body: excerpt.trim().split(/\n{2,}/).filter(Boolean),
          submitted: true,
        },
        ...prev,
      ];
    });
    setTitle("");
    setAuthor("");
    setPlace("");
    setExcerpt("");
    setImage(null);
    setOpen(false);
  };

  const all = [...dispatches, ...stories];

  return (
    <>
      <section className="container-editorial pt-40 pb-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow animate-reveal">Traveller Dispatches</p>
            <h1
              className="text-display mt-6 text-7xl leading-[0.9] animate-reveal md:text-9xl"
              style={{ animationDelay: "0.1s" }}
            >
              Stories
              <br />
              <em className="text-primary">by the people in them.</em>
            </h1>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 border border-primary bg-primary/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <PenLine size={14} />
            Submit your dispatch
          </button>
        </div>
      </section>

      <section className="container-editorial pb-24">
        <Reveal>
          <Link
            to={`/stories/${featuredStory.slug}`}
            className="group grid grid-cols-1 gap-10 border-t border-border/50 pt-16 lg:grid-cols-12"
          >
            <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7">
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">
                Featured Story · {featuredStory.readTime}
              </p>
              <h2 className="text-display mt-6 text-5xl leading-tight md:text-6xl">
                {featuredStory.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {featuredStory.excerpt}
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {featuredStory.author} ·{" "}
                <span className="text-primary">{featuredStory.place}</span>
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="container-editorial pb-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {all.map((story, i) => (
            <Reveal key={story.slug} delay={(i % 3) * 0.1}>
              <Link to={`/stories/${story.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
                  />
                </div>
                <p className="eyebrow mt-5">
                  {story.place} · {story.readTime}
                </p>
                <h3 className="text-display mt-3 text-3xl leading-tight transition-colors group-hover:text-primary">
                  {story.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                  {story.excerpt}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  — {story.author}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Submission drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-abyss/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-border/60 bg-abyss/95 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/50 px-8 py-6">
            <div>
              <p className="eyebrow">Reader Submission</p>
              <h3 className="text-display mt-2 text-3xl">Publish a dispatch</h3>
            </div>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-primary"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                readFile(e.dataTransfer.files[0]);
              }}
              className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden border border-dashed border-border/70 bg-secondary/30 transition-colors hover:border-primary/70"
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-primary/50 text-primary">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm">
                    Drop a photograph, or{" "}
                    <span className="text-primary underline underline-offset-4">
                      browse
                    </span>
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.24em]">
                    JPG · PNG · WEBP
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => readFile(e.target.files?.[0])}
              />
            </div>

            <div>
              <label className="eyebrow">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Silence of Overwater"
                className="text-display mt-2 w-full border-b border-border/60 bg-transparent py-3 text-2xl outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="eyebrow">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full border-b border-border/60 bg-transparent py-2 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="eyebrow">Place</label>
                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Kyoto, Japan"
                  className="mt-2 w-full border-b border-border/60 bg-transparent py-2 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="eyebrow">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A single evocative paragraph…"
                rows={5}
                className="mt-2 w-full border border-border/60 bg-transparent p-4 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="border-t border-border/50 px-8 py-6">
            <button
              disabled={!canPublish}
              onClick={publish}
              className="w-full border border-primary bg-primary py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Publish dispatch
            </button>
            <p className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <Lock size={11} /> Stored locally in your browser
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
