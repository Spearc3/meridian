import Reveal from "./Reveal";
import { process } from "../tpl";

export default function Process() {
  return (
    <section className="container-editorial py-24">
      <Reveal>
        <p className="eyebrow">How it works</p>
        <h2 className="text-display mt-4 text-5xl md:text-6xl">
          From first word to <em className="text-primary">wheels up.</em>
        </h2>
      </Reveal>
      <ol className="mt-14 grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08} className="h-full">
            <li className="h-full bg-abyss p-8">
              <span className="text-display text-5xl text-primary/70">
                0{i + 1}
              </span>
              <h3 className="text-display mt-4 text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
