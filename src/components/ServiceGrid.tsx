import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import type { Solution } from "../tpl";

export default function ServiceGrid({ items }: { items: Solution[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
          <div className="group flex h-full flex-col bg-abyss p-8 transition-colors hover:bg-secondary/30">
            <ServiceIcon
              name={item.icon}
              size={56}
              className="transition-transform duration-500 group-hover:-translate-y-0.5"
            />
            <h3 className="text-display mt-6 text-2xl leading-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
