/**
 * Each point is a bordered card matching the integration-path treatment.
 * Spacing between cards is configurable via `gapClassName`.
 *
 * - `numbered` prefixes each title with "N." using the point's `number` when present, else its index.
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
}: {
  points: readonly Point[];
  gapClassName?: string;
  className?: string;
  numbered?: boolean;
}) {
  const gap = gapClassName ?? "gap-4";
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {points.map((point, i) => (
        <div
          key={point.title}
          className="relative rounded-md border border-surface-alt p-8 flex flex-col gap-3"
        >
          <h3 className="text-ui text-on-surface">
            {numbered && (
              <>
                <span className="text-on-surface">{point.number ?? i + 1}.</span>{" "}
              </>
            )}
            {point.title}
          </h3>
          <p className="text-body-sm text-on-surface-muted">
            {point.description}
          </p>
        </div>
      ))}
    </div>
  );
}
