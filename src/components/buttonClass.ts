const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2";

const variants = {
  travel: "travel-button travel-button-primary",
  travelOutline: "travel-button travel-button-outline",
  travelGhost: "travel-icon-button",
};

export type ButtonVariant = keyof typeof variants;

/** Class list for a button-styled element (a link, say) in one of the variants. */
export const buttonClass = (variant: ButtonVariant, className = "") =>
  `${base} ${variants[variant]} ${className}`.trim();
