import type { ReactNode } from "react";

type Crop = {
  readonly w: string;
  readonly h: string;
  readonly left: string;
  readonly top: string;
};

type AssetFrameProps = {
  /** Simple mode: renders a single contained <img>. */
  src?: string;
  alt?: string;
  /**
   * Optional pan/zoom to crop edge artifacts baked into the source image
   * (e.g. black borders). Fills the frame at `aspect` and clips overflow.
   */
  crop?: Crop;
  /** Frame aspect ratio when using `crop` (or an aspect-driven gallery). */
  aspect?: string;
  /** Adds the hover darken feedback for cards that link somewhere. */
  interactive?: boolean;
  /** Extra classes on the outer frame (e.g. grid spans). */
  className?: string;
  /** Extra classes on the inner clip box (e.g. `h-full` for fill). */
  innerClassName?: string;
  /** Composed mode: custom inner content (cross-fade stacks, diagrams, etc.). */
  children?: ReactNode;
};

/**
 * The site's standard screenshot/image frame, matched to the Dia release-note
 * treatment: a 6px white matte border with a 14px outer radius (`rounded-lg`)
 * + soft shadow, wrapping content with an 8px inner radius (outer − 6px
 * border, kept concentric so the corners stay parallel).
 *
 * Non-fill frames use a padding-bottom 3:2 box so Chrome print (which drops
 * `aspect-ratio`) still keeps every frame the same size.
 */
const FRAME =
  "asset-frame w-full overflow-hidden rounded-lg border-[6px] border-surface bg-surface shadow-[0_4.6px_27.6px_0_rgba(0,0,0,0.08),0_0_2.3px_0_rgba(0,0,0,0.25)]";

function paddingBottomFor(aspect: string) {
  const [a, b] = aspect.split("/").map((n) => Number(n.trim()));
  if (!a || !b) return "66.6667%";
  return `${(b / a) * 100}%`;
}

export default function AssetFrame({
  src,
  alt = "",
  crop,
  aspect = "3 / 2",
  interactive = false,
  className = "",
  innerClassName = "",
  children,
}: AssetFrameProps) {
  const fill = /\bh-full\b/.test(`${className} ${innerClassName}`);

  return (
    <div className={`${FRAME} ${className}`}>
      <div
        className={`asset-frame-clip relative overflow-hidden rounded-[8px] w-full ${fill ? "h-full" : ""}`}
        style={fill ? undefined : { paddingBottom: paddingBottomFor(aspect) }}
      >
        {children ??
          (crop ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="absolute max-w-none rounded-[8px]"
              style={{ width: crop.w, height: crop.h, left: crop.left, top: crop.top }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover rounded-[8px]"
            />
          ))}
        {interactive && (
          <div className="absolute inset-0 rounded-[8px] bg-black/0 group-hover:bg-black/30 group-active:bg-black/50 transition-colors duration-[var(--duration-interaction)] ease-[var(--ease-newton)]" />
        )}
      </div>
    </div>
  );
}
