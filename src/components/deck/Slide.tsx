import type { ReactNode } from "react";
import FieldCanvas, { HERO_FIELD } from "@/components/ui/FieldCanvas";
import { siteConfig } from "@/app/site.config";
import { deckMeta } from "@/app/content";

const { nav } = siteConfig;

const STAGE_W = 1920;
const STAGE_H = 1080;

export { STAGE_W, STAGE_H };

const TITLE_FIELD: typeof HERO_FIELD = {
  ...HERO_FIELD,
  mouse: { mode: 0, radius: 0, strength: 0 },
  timeScale: 0,
};

export default function Slide({
  label,
  index,
  total,
  variant = "content",
  children,
}: {
  label?: string;
  index: number;
  total: number;
  variant?: "hero" | "content";
  children: ReactNode;
}) {
  const isHero = variant === "hero";
  const number = String(index + 1).padStart(2, "0");
  const of = String(total).padStart(2, "0");

  return (
    <article
      className="deck-slide relative flex flex-col overflow-hidden bg-surface shrink-0"
      style={{ width: STAGE_W, height: STAGE_H }}
      aria-label={label ?? deckMeta.title}
    >
      {isHero && (
        <>
          <FieldCanvas config={TITLE_FIELD} className="absolute inset-0 z-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-surface) 0%, var(--color-surface) 42%, var(--bone-50-alpha-0) 78%)",
            }}
          />
        </>
      )}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 px-16 pt-16 pb-16">
        <header className="flex items-center justify-between gap-6 shrink-0 h-8 mb-16">
          {label ? (
            <p className="text-label text-on-surface">{label}</p>
          ) : (
            <span />
          )}
          <p className="text-label tabular-nums text-on-surface-subtle">
            {number} / {of}
          </p>
        </header>

        <div className="flex flex-col flex-1 min-h-0">{children}</div>

        <footer className="flex items-center justify-between gap-6 shrink-0 h-8 mt-10 text-on-surface-subtle">
          {isHero ? <span /> : <LogoLockup />}
          {isHero ? (
            <span />
          ) : (
            <p className="text-label">{deckMeta.preparedFor}</p>
          )}
        </footer>
      </div>
    </article>
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5" aria-label={nav.logoLabel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={nav.logo}
        alt=""
        width={22}
        height={24}
        className="theme-icon"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={nav.wordmark}
        alt={nav.logoLabel}
        width={118}
        height={16}
        className="theme-icon"
      />
    </div>
  );
}
