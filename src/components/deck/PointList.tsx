/**
 * Reusable vertical stack of "points" — a subheadline title with a body
 * description, using the DeckCard header/body type styles. Spacing between
 * points is configurable via `gapClassName` so it can be tuned per slide.
 */
export type Point = {
  title: string;
  description: string;
};

export default function PointList({
  points,
  gapClassName = "gap-10",
  className = "",
}: {
  points: readonly Point[];
  gapClassName?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${gapClassName} ${className}`}>
      {points.map((point) => (
        <div key={point.title} className="flex flex-col gap-2">
          <h3 className="text-subheadline text-on-surface">{point.title}</h3>
          <p className="text-body text-on-surface-muted">{point.description}</p>
        </div>
      ))}
    </div>
  );
}
