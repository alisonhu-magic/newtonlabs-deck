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
  stretch = false,
}: {
  icon?: string;
  title: string;
  description: string;
  badge?: string;
  dense?: boolean;
  media?: ReactNode;
  stretch?: boolean;
}) {
  return (
    <div
      className={`${media ? "h-full" : `${stretch ? "h-full" : "self-start"} border border-surface-alt p-8`} w-full min-w-0 rounded-md flex flex-col gap-8 items-start`}
    >
      {media ? (
        <div className="w-full shrink-0">{media}</div>
      ) : icon || badge ? (
        <div className="flex items-start justify-between gap-3 w-full">
          {icon ? (
            <div className="size-14 rounded-full border border-on-surface flex items-center justify-center p-3.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" className="w-6 h-6 object-contain theme-icon" />
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
                    ? "accent"
                    : "default"
              }
              className="rounded-full"
            >
              {badge}
            </Badge>
          )}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 w-full shrink-0">
        <h3 className="text-subheadline text-on-surface">
          {title}
        </h3>
        <p className={`${dense ? "text-body-sm" : "text-body"} text-on-surface-muted`}>
          {description}
        </p>
      </div>
    </div>
  );
}
