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
                alt={`${memory.note} — ${memory.caption}`}
                loading="lazy"
                className="w-full transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent opacity-80" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-display text-2xl">{memory.caption}</p>
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
