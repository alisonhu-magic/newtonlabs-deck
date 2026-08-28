import type { ReactNode } from "react";

/**
 * Callout — accent-tinted box for a pull-quote / key statement.
 * Blue border + lightest-blue fill, an optional uppercase eyebrow label,
 * and the body rendered in the editorial `.text-quote` face.
 */
export default function Callout({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-md border border-accent/30 bg-accent/5 p-8 ${className}`}
    >
      {eyebrow && (
        <p className="text-label text-on-surface-muted">{eyebrow}</p>
      )}
      <p className="text-quote text-on-surface">{children}</p>
    </div>
  );
}
