import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { buttonClass, type ButtonVariant } from "./buttonClass";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant: ButtonVariant }
>(({ variant, className, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={buttonClass(variant, className)} {...props} />
));
Button.displayName = "Button";

/** Section label with its short rule. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </p>
  );
}
