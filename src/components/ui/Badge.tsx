import { type ReactNode } from "react";

// Newton-style badge / tag. Monochrome and token-driven so it auto-inverts
// between dark and light themes. Sharp 2px corners match the rest of the
// system (buttons, inputs, cards). Decorative by default — render inside a
// non-interactive context or pair with an external link wrapper.

type BadgeVariant = "filled" | "outline" | "ghost";
type BadgeSize = "sm" | "md" | "lg";
type BadgeTone = "default" | "success" | "danger" | "accent";

const variantStyles: Record<BadgeVariant, string> = {
  filled: "bg-surface-alt-subtle text-on-surface-muted",
  outline: "border border-surface-alt text-on-surface",
  ghost: "text-on-surface-muted",
};

const outlineToneStyles: Record<Exclude<BadgeTone, "default">, string> = {
  success: "border border-success text-success bg-success-subtle",
  danger: "border border-danger text-danger bg-danger-subtle",
  accent: "border border-accent text-accent bg-accent-subtle",
};

// Asymmetric vertical padding (pt slightly > pb) optically centers the text:
// uppercase glyphs with `leading-none` leave empty descender space below, so
// pure `items-center` makes the words read a touch high in the outline.
const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 pt-[7px] pb-[5px] text-xs",
  md: "px-2.5 pt-[9px] pb-[7px] text-xs",
  lg: "px-3 pt-[9px] pb-[7px] text-body-sm",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  tone?: BadgeTone;
  withDot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "filled",
  size = "md",
  tone = "default",
  withDot = false,
  className = "",
}: BadgeProps) {
  const colorClass =
    variant === "outline" && tone !== "default"
      ? outlineToneStyles[tone]
      : variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-sans font-medium leading-none whitespace-nowrap ${colorClass} ${sizeStyles[size]} ${className}`}
    >
      {withDot && (
        <span
          aria-hidden="true"
          className="size-1 rounded-full bg-on-surface-subtle"
        />
      )}
      {children}
    </span>
  );
}
