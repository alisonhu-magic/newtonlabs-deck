import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/app/site.config";
import { asset } from "@/lib/asset";
import Badge from "@/components/ui/Badge";
import { paths, prove, sheetMeta } from "./content";
import "./sheet.css";

export const metadata: Metadata = {
  title: sheetMeta.title,
  robots: { index: false, follow: false },
};

const { nav } = siteConfig;

export default function CuratorSheetPage() {
  return (
    <main className="sheet-desk min-h-screen flex flex-col items-center gap-12 px-6 py-16">
      <p className="sheet-hint text-label text-on-surface-subtle print:hidden">
        A4 · ⌘P to save as PDF
      </p>
      <SheetPage index={1} total={2} label={prove.label}>
        <div className="flex flex-col gap-5">
          <h1 className="text-headline text-on-surface">{prove.headline}</h1>
          <p className="text-body-sm text-on-surface-muted">{prove.body}</p>
          <p className="text-body-sm text-on-surface-muted">{prove.closer}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {prove.cards.map((card) => (
            <SheetCard
              key={card.title}
              icon={card.iconUrl}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <SheetCard
          icon={prove.dashboard.iconUrl}
          title={prove.dashboard.title}
          description={prove.dashboard.description}
          horizontal
        />
      </SheetPage>
      <SheetPage index={2} total={2} label={paths.label}>
        <div className="flex flex-col gap-3">
          <h1 className="text-headline text-on-surface">{paths.headline}</h1>
          <p className="text-body-sm text-on-surface-muted">{paths.body}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {paths.cards.map((card) => (
            <SheetCard
              key={card.title}
              icon={card.iconUrl}
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-md border border-accent/30 bg-accent/5 px-5 py-4">
          <p className="text-label text-on-surface-muted">{paths.why.title}</p>
          <p className="text-quote text-on-surface">{paths.why.description}</p>
        </div>
        <p className="text-body-sm text-on-surface-subtle">{paths.about}</p>
      </SheetPage>
    </main>
  );
}

function SheetPage({
  index,
  total,
  label,
  children,
}: {
  index: number;
  total: number;
  label: string;
  children: ReactNode;
}) {
  const number = String(index).padStart(2, "0");
  const of = String(total).padStart(2, "0");
  return (
    <article className="sheet-page relative flex flex-col overflow-hidden text-on-surface">
      <div className="flex flex-col flex-1 min-h-0 px-[16mm] pt-[14mm] pb-[12mm]">
        <div className="flex items-center justify-between gap-6 shrink-0 mb-7">
          <p className="text-label text-on-surface">{label}</p>
          <p className="text-label tabular-nums text-on-surface-subtle">
            <span className="text-accent">{number}</span> / {of}
          </p>
        </div>
        <div className="flex flex-col gap-5 flex-1 min-h-0">{children}</div>
        <div className="flex items-center justify-between gap-6 shrink-0 mt-6">
          <LogoLockup />
          {index === 2 ? (
            <div className="flex items-center gap-4">
              {paths.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-on-surface-muted rounded-md underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-label text-on-surface-subtle">newton.xyz</p>
          )}
        </div>
      </div>
    </article>
  );
}

function SheetCard({
  icon,
  eyebrow,
  title,
  description,
  horizontal = false,
}: {
  icon: string;
  eyebrow?: string;
  title: string;
  description: string;
  horizontal?: boolean;
}) {
  const iconMark = (
    <div className="size-10 rounded-full border border-on-surface flex items-center justify-center p-2.5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(icon)} alt="" className="w-4 h-4 object-contain theme-icon" />
    </div>
  );

  if (horizontal) {
    return (
      <div className="rounded-md border border-surface-alt px-5 py-4 flex items-start gap-4 shrink-0">
        {iconMark}
        <div className="flex flex-col gap-1 min-w-0 pt-0.5">
          <h2 className="text-ui text-on-surface">{title}</h2>
          <p className="text-body-sm text-on-surface-muted">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full min-w-0 rounded-md border border-surface-alt flex flex-col gap-4 items-start ${
        eyebrow ? "px-5 pb-5 pt-7" : "p-5"
      }`}
    >
      {eyebrow && (
        <Badge
          variant="outline"
          size="sm"
          className="absolute -top-2.5 right-4 rounded-full bg-surface"
        >
          {eyebrow}
        </Badge>
      )}
      {iconMark}
      <div className="flex flex-col gap-1.5 w-full min-w-0">
        <h2 className="text-ui text-on-surface">{title}</h2>
        <p className="text-body-sm text-on-surface-muted">{description}</p>
      </div>
    </div>
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-2" aria-label={nav.logoLabel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={nav.logo} alt="" width={16} height={18} className="theme-icon" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={nav.wordmark}
        alt={nav.logoLabel}
        width={92}
        height={12}
        className="theme-icon"
      />
    </div>
  );
}
