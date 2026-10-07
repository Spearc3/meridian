import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
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
      <div className="border border-primary/50 bg-secondary/40 p-12">
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
    "mt-3 w-full border-b border-border/60 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary";

  return (
    <form className="grid grid-cols-1 gap-8 md:grid-cols-2" onSubmit={onSubmit}>
      {fields.map((f) => {
        const value = form[f.key];
        const set = (v: string) => setForm((prev) => ({ ...prev, [f.key]: v }));
        const id = `enquiry-${f.key}`;
        return (
          <div
            key={f.key}
            className={f.wide || f.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label htmlFor={id} className="eyebrow">
              {f.label}
              {f.required && " *"}
            </label>
            {f.type === "select" ? (
              <select
                id={id}
                required={f.required}
                value={value}
                onChange={(e) => set(e.target.value)}
                className={`${control} [&>option]:bg-abyss`}
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                id={id}
                rows={5}
                required={f.required}
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={f.placeholder}
                className={`${control} text-base`}
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

      <div className="md:col-span-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          Email the enquiry
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
