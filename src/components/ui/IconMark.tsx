import { asset } from "@/lib/asset";

type IconMarkTone = "default" | "accent";
type IconMarkSize = "sm" | "md";

const toneStyles: Record<IconMarkTone, string> = {
  default: "border border-on-surface",
  accent: "border border-accent bg-accent-subtle",
};

const sizeStyles: Record<IconMarkSize, { wrap: string; glyph: string }> = {
  sm: { wrap: "size-10 p-2.5", glyph: "size-4" },
  md: { wrap: "size-14 p-3.5", glyph: "size-6" },
};

export default function IconMark({
  src,
  tone = "default",
  size = "sm",
}: {
  src: string;
  tone?: IconMarkTone;
  size?: IconMarkSize;
}) {
  const sizes = sizeStyles[size];
  const href = asset(src);

  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${toneStyles[tone]} ${sizes.wrap}`}
    >
      {tone === "accent" ? (
        <span
          aria-hidden
          className={`icon-mask bg-accent ${sizes.glyph}`}
          style={{
            WebkitMaskImage: `url("${href}")`,
            maskImage: `url("${href}")`,
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={href} alt="" className={`${sizes.glyph} object-contain theme-icon`} />
      )}
    </div>
  );
}
