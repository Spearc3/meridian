import Reveal from "./Reveal";
import type { Memory } from "../tpl";

export default function MemoryWall({ items }: { items: Memory[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((memory, i) => (
        <Reveal
          key={memory.image}
          delay={(i % 3) * 0.08}
          className="mb-6 break-inside-avoid"
        >
          <figure className="group">
            <div className="relative overflow-hidden bg-secondary">
              <img
                src={memory.image}
                width={memory.width}
                height={memory.height}
                decoding="async"
                alt={`Client group on a ${memory.note.toLowerCase()}${memory.country ? ` in ${memory.country}` : ""}`}
                loading="lazy"
                className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="scrim-up absolute inset-x-0 bottom-0 h-3/5" />
              <figcaption className="text-legible absolute inset-x-0 bottom-0 p-5">
                <p className="text-display text-2xl">{memory.country ?? "With our clients"}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-primary">
                  {memory.note}
                </p>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
