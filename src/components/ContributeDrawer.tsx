import { useRef, useState } from "react";
import { Lock, Upload, X } from "lucide-react";
import {
  formats,
  type Dispatch,
  type Entry,
  type Format,
  type Frame,
} from "../fieldbook";

const field =
  "mt-2 w-full border-b border-border/60 bg-transparent py-2 outline-none transition-colors focus:border-primary";

export default function ContributeDrawer({
  open,
  onClose,
  onBind,
}: {
  open: boolean;
  onClose: () => void;
  onBind: (page: Omit<Dispatch, "slug">) => void;
}) {
  const [format, setFormat] = useState<Format>("essay");
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [place, setPlace] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [pullQuote, setPullQuote] = useState("");
  const [quote, setQuote] = useState("");
  const [note, setNote] = useState("");
  const [postmark, setPostmark] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [frames, setFrames] = useState<Frame[]>([]);
  const [entries, setEntries] = useState<Entry[]>([{ day: "Day 01", text: "" }]);

  const coverRef = useRef<HTMLInputElement>(null);
  const framesRef = useRef<HTMLInputElement>(null);

  const readImage = (file: File | undefined, then: (data: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => then(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Each format demands different things before it can be bound.
  const ready = (() => {
    if (!title.trim() || !author.trim()) return false;
    if (format === "quote") return quote.trim().length > 0;
    if (format === "postcard") return note.trim().length > 0 && !!cover;
    if (format === "gallery") return frames.length > 0;
    if (format === "journal") return entries.some((e) => e.text.trim());
    if (format === "audio" || format === "film") return mediaUrl.trim().length > 0;
    return body.trim().length > 0;
  })();

  const bind = () => {
    if (!ready) return;
    const words = body.trim().split(/\s+/).filter(Boolean).length;

    onBind({
      format,
      chapter: chapter.trim() || "New Dispatches",
      title: title.trim(),
      author: author.trim(),
      place: place.trim() || "Somewhere",
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      readTime: words ? `${Math.max(1, Math.round(words / 200))} min` : undefined,
      cover: cover ?? frames[0]?.src,
      body: body.trim() ? body.trim().split(/\n{2,}/).filter(Boolean) : undefined,
      pullQuote: pullQuote.trim() || undefined,
      quote: quote.trim() || undefined,
      note: note.trim() || undefined,
      postmark: postmark.trim() || "PAR AVION",
      frames: frames.length ? frames : undefined,
      entries: entries.filter((e) => e.text.trim()).length
        ? entries.filter((e) => e.text.trim())
        : undefined,
      audioUrl: format === "audio" ? mediaUrl.trim() : undefined,
      videoUrl: format === "film" ? mediaUrl.trim() : undefined,
      duration: format === "audio" ? "Reader recording" : undefined,
      submitted: true,
    });

    setTitle("");
    setAuthor("");
    setPlace("");
    setChapter("");
    setCover(null);
    setBody("");
    setPullQuote("");
    setQuote("");
    setNote("");
    setPostmark("");
    setMediaUrl("");
    setFrames([]);
    setEntries([{ day: "Day 01", text: "" }]);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-abyss/60 backdrop-blur-sm"
          onClick={onClose}
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
              <h3 className="text-display mt-2 text-3xl">Bind a new page</h3>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="text-muted-foreground hover:text-primary"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
            <div>
              <label className="eyebrow">Choose a format</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {formats.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                      format === f.id
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Silence of Overwater"
                className={`text-display text-2xl ${field}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="eyebrow">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label className="eyebrow">Place</label>
                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Kyoto, Japan"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow">Chapter</label>
              <input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="New Dispatches"
                className={field}
              />
            </div>

            {/* Cover — every format but the pull quote wants one. */}
            {format !== "quote" && format !== "journal" && (
              <div>
                <label className="eyebrow">Cover image</label>
                <div
                  onClick={() => coverRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    readImage(e.dataTransfer.files[0], setCover);
                  }}
                  className="mt-2 flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden border border-dashed border-border/70 bg-secondary/30 transition-colors hover:border-primary/70"
                >
                  {cover ? (
                    <img src={cover} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload size={20} className="text-primary" />
                      <p className="text-sm">Drop / browse image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => readImage(e.target.files?.[0], setCover)}
                />
              </div>
            )}

            {format === "gallery" && (
              <div>
                <label className="eyebrow">Gallery ({frames.length})</label>
                <button
                  onClick={() => framesRef.current?.click()}
                  className="mt-2 w-full border border-dashed border-border/70 py-3 text-xs uppercase tracking-[0.24em] text-primary hover:border-primary/70"
                >
                  Add frames
                </button>
                <input
                  ref={framesRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    Array.from(e.target.files ?? []).forEach((file) =>
                      readImage(file, (src) =>
                        setFrames((prev) => [...prev, { src, caption: "" }]),
                      ),
                    );
                  }}
                />
                <div className="mt-3 space-y-2">
                  {frames.map((frame, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={frame.src}
                        alt=""
                        className="h-12 w-16 shrink-0 object-cover"
                      />
                      <input
                        value={frame.caption}
                        onChange={(e) =>
                          setFrames((prev) =>
                            prev.map((f, j) =>
                              j === i ? { ...f, caption: e.target.value } : f,
                            ),
                          )
                        }
                        placeholder="Caption…"
                        className="flex-1 border-b border-border/60 bg-transparent py-1 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {format === "quote" && (
              <div>
                <label className="eyebrow">The quote</label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={4}
                  placeholder="A glacier does not hurry…"
                  className="mt-2 w-full border border-border/60 bg-transparent p-4 outline-none focus:border-primary"
                />
              </div>
            )}

            {format === "postcard" && (
              <>
                <div>
                  <label className="eyebrow">Postmark</label>
                  <input
                    value={postmark}
                    onChange={(e) => setPostmark(e.target.value)}
                    placeholder="PAR AVION · 京都"
                    className={field}
                  />
                </div>
                <div>
                  <label className="eyebrow">Your note</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="Wish you were here — but only a little…"
                    className="mt-2 w-full border border-border/60 bg-transparent p-4 outline-none focus:border-primary"
                  />
                </div>
              </>
            )}

            {format === "journal" && (
              <div>
                <label className="eyebrow">Entries</label>
                <div className="mt-3 space-y-3">
                  {entries.map((entry, i) => (
                    <div key={i} className="border-l border-primary/40 pl-4">
                      <input
                        value={entry.day}
                        onChange={(e) =>
                          setEntries((prev) =>
                            prev.map((x, j) =>
                              j === i ? { ...x, day: e.target.value } : x,
                            ),
                          )
                        }
                        className="w-full bg-transparent text-[10px] uppercase tracking-[0.24em] text-primary outline-none"
                      />
                      <textarea
                        value={entry.text}
                        onChange={(e) =>
                          setEntries((prev) =>
                            prev.map((x, j) =>
                              j === i ? { ...x, text: e.target.value } : x,
                            ),
                          )
                        }
                        rows={2}
                        placeholder="What happened?"
                        className="mt-1 w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setEntries((prev) => [
                      ...prev,
                      {
                        day: `Day ${String(prev.length + 1).padStart(2, "0")}`,
                        text: "",
                      },
                    ])
                  }
                  className="mt-3 text-[10px] uppercase tracking-[0.24em] text-primary"
                >
                  + Add a day
                </button>
              </div>
            )}

            {(format === "audio" || format === "film") && (
              <div>
                <label className="eyebrow">
                  {format === "audio" ? "Audio URL (mp3)" : "Video URL (mp4)"}
                </label>
                <input
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://…"
                  className={field}
                />
              </div>
            )}

            {(format === "essay" || format === "audio" || format === "film") && (
              <>
                <div>
                  <label className="eyebrow">
                    Body (use blank lines between paragraphs)
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={6}
                    placeholder="There is a kind of quiet you only find…"
                    className="mt-2 w-full border border-border/60 bg-transparent p-4 outline-none focus:border-primary"
                  />
                </div>
                {format === "essay" && (
                  <div>
                    <label className="eyebrow">Pull quote (optional)</label>
                    <input
                      value={pullQuote}
                      onChange={(e) => setPullQuote(e.target.value)}
                      placeholder="Stillness is not the absence of motion…"
                      className={field}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="border-t border-border/50 px-8 py-6">
            <button
              disabled={!ready}
              onClick={bind}
              className="w-full border border-primary bg-primary py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bind into the book
            </button>
            <p className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <Lock size={11} /> Saved locally in this browser
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
