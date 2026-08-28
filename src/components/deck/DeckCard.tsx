import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";

/** Static FeatureCard chrome for the deck — no hover inversion. */
export default function DeckCard({
  icon,
  title,
  description,
  badge,
  dense = false,
  media,
}: {
  icon?: string;
  title: string;
  description: string;
  badge?: string;
  dense?: boolean;
  media?: ReactNode;
}) {
  return (
    <div
      className={`${media ? "h-full" : "self-start"} w-full min-w-0 border border-surface-alt rounded-md p-8 flex flex-col gap-8 items-start`}
    >
      {media ? (
        <div className="flex-1 min-h-0 w-full">{media}</div>
      ) : (
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
            <Badge
              variant="outline"
              size="sm"
              tone={
                badge === "Verified"
                  ? "success"
                  : badge === "Enforced"
                    ? "danger"
                    : "default"
              }
              className="rounded-full"
            >
              {badge}
            </Badge>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 w-full shrink-0">
        <p className="text-subheadline text-on-surface">
          {title}
        </p>
        <p className={`${dense ? "text-body-sm" : "text-body"} text-on-surface-muted`}>
          {description}
        </p>
      </div>
    </div>
  );
}
