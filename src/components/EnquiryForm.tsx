import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { company } from "../tpl";

export type EnquiryField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  /** Spans both columns on wide screens. */
  wide?: boolean;
};

type Props = {
  fields: EnquiryField[];
  /** Mail subject prefix, e.g. "Corporate enquiry". */
  subject: string;
};

// No backend yet: the enquiry is handed to the visitor's own mail app,
// addressed to the travel desk, so nothing is silently dropped.
export default function EnquiryForm({ fields, subject }: Props) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [form, setForm] = useState<Record<string, string>>(blank);
  const [sent, setSent] = useState(false);

  const name = form.name ?? "";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = fields
      .filter((f) => f.type !== "textarea")
      .map((f) => `${f.label}: ${form[f.key] || "-"}`)
      .concat(
        fields
          .filter((f) => f.type === "textarea" && form[f.key])
          .flatMap((f) => ["", `${f.label}:`, form[f.key]]),
      )
      .join("\n");
    const title = `${subject} from ${name}${form.company ? `, ${form.company}` : ""}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border border-primary/40 bg-card p-8 shadow-2xl shadow-black/30 md:p-12">
        <p className="eyebrow">Almost there</p>
        <h3 className="text-display mt-4 text-4xl">
          Thank you, {name.split(" ")[0]}.
        </h3>
        <p className="mt-4 text-muted-foreground">
          Your email app should have opened with the enquiry ready to send. If
          it didn't, write to us at{" "}
          <span className="text-foreground">{company.email}</span> or call{" "}
          {company.hotline}.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm(blank());
          }}
          className="mt-8 gold-underline text-sm uppercase tracking-[0.24em] text-primary"
        >
          Send another →
        </button>
      </div>
    );
  }

  const control =
    "mt-2 block w-full rounded-md border border-white/20 bg-abyss/70 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors hover:border-white/35 focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-md border border-primary/30 bg-card shadow-2xl shadow-black/30"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-secondary/60 px-6 py-4 md:px-10">
        <p className="flex items-center gap-3 text-sm font-semibold text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
            <Mail size={15} />
          </span>
          Enquiry form
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">*</span> Required
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 p-6 md:grid-cols-2 md:p-10">
        {fields.map((f) => {
          const value = form[f.key];
          const set = (v: string) => setForm((prev) => ({ ...prev, [f.key]: v }));
          const id = `enquiry-${f.key}`;
          return (
            <div
              key={f.key}
              className={f.wide || f.type === "textarea" ? "md:col-span-2" : ""}
            >
              <label
                htmlFor={id}
                className="text-sm font-medium text-foreground/90"
              >
                {f.label}
                {f.required && <span className="ml-1 text-primary">*</span>}
              </label>
              {f.type === "select" ? (
                <div className="relative">
                  <select
                    id={id}
                    required={f.required}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className={`${control} cursor-pointer appearance-none pr-10 ${value ? "" : "text-muted-foreground/70"} [&>option]:bg-abyss [&>option]:text-foreground`}
                  >
                    <option value="">Select…</option>
                    {f.options?.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              ) : f.type === "textarea" ? (
                <textarea
                  id={id}
                  rows={5}
                  required={f.required}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={f.placeholder}
                  className={`${control} resize-y`}
                />
              ) : (
                <input
                  id={id}
                  type={f.type ?? "text"}
                  required={f.required}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={f.placeholder}
                  className={control}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 bg-secondary/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p className="text-xs text-muted-foreground">
          Opens your email app, addressed to {company.email}.
        </p>
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:w-auto"
        >
          Send enquiry
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
