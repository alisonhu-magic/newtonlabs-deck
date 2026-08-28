import Badge from "@/components/ui/Badge";

/** Static FeatureCard chrome for the deck — no hover inversion. */
export default function DeckCard({
  icon,
  title,
  description,
  badge,
  dense = false,
}: {
  icon?: string;
  title: string;
  description: string;
  badge?: string;
  dense?: boolean;
}) {
  return (
    <div className="h-full min-w-0 border border-surface-alt rounded-md p-6 flex flex-col gap-5 items-start">
      <div className="flex items-start justify-between gap-3 w-full">
        {icon ? (
          <div className="size-14 rounded-full border border-on-surface flex items-center justify-center p-3.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt="" className="w-6 h-6 theme-icon" />
          </div>
        ) : (
          <span />
        )}
        {badge && (
          <Badge variant="outline" size="sm" className="rounded-full">
            {badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className={`${dense ? "text-ui" : "text-subheadline"} text-on-surface`}>
          {title}
        </p>
        <p className={`${dense ? "text-body-sm" : "text-body"} text-on-surface-muted`}>
          {description}
        </p>
      </div>
    </div>
  );
}
