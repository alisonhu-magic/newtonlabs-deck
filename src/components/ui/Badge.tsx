import { type ReactNode } from "react";

// Newton-style badge / tag. Monochrome and token-driven so it auto-inverts
// between dark and light themes. Sharp 2px corners match the rest of the
// system (buttons, inputs, cards). Decorative by default — render inside a
// non-interactive context or pair with an external link wrapper.

type BadgeVariant = "filled" | "outline" | "ghost";
type BadgeSize = "sm" | "md";
type BadgeTone = "default" | "success" | "danger";

const variantStyles: Record<BadgeVariant, string> = {
  filled: "bg-surface-alt-subtle text-on-surface-muted",
  outline: "border border-surface-alt text-on-surface-muted",
  ghost: "text-on-surface-muted",
};

const outlineToneStyles: Record<Exclude<BadgeTone, "default">, string> = {
  success: "border border-success text-success",
  danger: "border border-danger text-danger",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1.5 text-xs",
  md: "px-2.5 py-2 text-xs",
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
