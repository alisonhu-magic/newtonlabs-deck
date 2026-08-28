/**
 * Reusable vertical stack of "points" — a subheadline title with a body
 * description, using the DeckCard header/body type styles. Spacing between
 * points is configurable via `gapClassName` so it can be tuned per slide.
 *
 * - `numbered` prefixes each title with an accent "N." (matching the Path
 *   step treatment) using the point's `number` when present, else its index.
 * - `dense` uses the smaller supporting body size and a tighter default gap so
 *   longer lists (e.g. 4 steps) fit a half-height column.
 */
export type Point = {
  title: string;
  description: string;
  number?: string;
};

export default function PointList({
  points,
  gapClassName,
  className = "",
  numbered = false,
  dense = false,
}: {
  points: readonly Point[];
  gapClassName?: string;
  className?: string;
  numbered?: boolean;
  dense?: boolean;
}) {
  const gap = gapClassName ?? (dense ? "gap-8" : "gap-10");
  const bodyType = dense ? "text-body-sm" : "text-body";
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {points.map((point, i) => (
        <div key={point.title} className="flex flex-col gap-2">
          <h3 className="text-subheadline text-on-surface">
            {numbered && (
              <>
                <span className="text-on-surface">{point.number ?? i + 1}.</span>{" "}
              </>
            )}
            {point.title}
          </h3>
          <p className={`${bodyType} text-on-surface-muted`}>
            {point.description}
          </p>
        </div>
      ))}
    </div>
  );
}
