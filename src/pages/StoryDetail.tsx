import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "../components/Reveal";
import { featuredStory, stories, type Story } from "../data";
import { loadDispatches } from "../dispatches";

export default function StoryDetail() {
  const { slug } = useParams();

  // Reader dispatches live in localStorage, so they resolve here too — a
  // submitted story is readable at its own URL, not just as a card.
  const story = useMemo<Story | undefined>(() => {
    const published = [featuredStory, ...stories];
    return (
      published.find((s) => s.slug === slug) ??
      loadDispatches().find((s) => s.slug === slug)
    );
  }, [slug]);

  if (!story) return <Navigate to="/404" replace />;

  const paragraphs = story.body?.length ? story.body : [story.excerpt];
  const more = [featuredStory, ...stories].filter((s) => s.slug !== story.slug);

  return (
    <>
      <section className="container-editorial pt-40 pb-12">
        <Reveal>
          <p className="eyebrow">
            {story.submitted ? "Reader Dispatch" : "Field Dispatch"} ·{" "}
            {story.readTime}
          </p>
          <h1 className="text-display mt-6 max-w-4xl text-6xl leading-[0.95] md:text-8xl">
            {story.title}
          </h1>
          <p className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {story.author} · <span className="text-primary">{story.place}</span>
          </p>
        </Reveal>
      </section>

      <section className="container-editorial pb-16">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={story.image}
              alt={story.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-editorial pb-24">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-muted-foreground">
          {paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              {/* The opening line gets the editorial drop-cap treatment. */}
              <p
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-foreground/90 first-letter:text-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-primary"
                    : undefined
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32">
        <Reveal>
          <div className="border-t border-border/50 pt-12">
            <div className="flex items-end justify-between gap-8">
              <p className="eyebrow">Keep reading</p>
              <Link
                to="/stories"
                className="group inline-flex items-center gap-3 gold-underline text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-primary"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                All dispatches
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {more.map((other) => (
                <Link
                  key={other.slug}
                  to={`/stories/${other.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={other.image}
                      alt={other.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-4">
                    {other.place} · {other.readTime}
                  </p>
                  <h3 className="text-display mt-2 text-3xl transition-colors group-hover:text-primary">
                    {other.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
