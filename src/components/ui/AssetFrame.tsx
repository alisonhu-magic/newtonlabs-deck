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
  /** Extra classes on the inner clip box (e.g. `aspect-[3/2]` for galleries). */
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
 * Colors reuse existing tokens (`surface` for the matte); the shadow matches
 * Dia's `shadow-release-note-asset` exactly.
 *
 * Modes:
 * - `src` + `crop` → image panned/zoomed to fill `aspect` (crops baked-in edges).
 * - `src` alone → a single `object-contain` image with responsive max-height.
 * - `children` → frame chrome only; caller supplies the inner content.
 */
const FRAME =
  "w-full overflow-hidden rounded-lg border-[6px] border-surface bg-surface shadow-[0_4.6px_27.6px_0_rgba(0,0,0,0.08),0_0_2.3px_0_rgba(0,0,0,0.25)]";

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
  return (
    <div className={`${FRAME} ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[8px] ${innerClassName}`}
        style={crop ? { aspectRatio: aspect } : undefined}
      >
        {children ??
          (crop ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="absolute max-w-none"
              style={{ width: crop.w, height: crop.h, left: crop.left, top: crop.top }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[600px] object-contain rounded-[8px]"
            />
          ))}
        {interactive && (
          <div className="absolute inset-0 rounded-[8px] bg-black/0 group-hover:bg-black/30 group-active:bg-black/50 transition-colors duration-[var(--duration-interaction)] ease-[var(--ease-newton)]" />
        )}
      </div>
    </div>
  );
}
