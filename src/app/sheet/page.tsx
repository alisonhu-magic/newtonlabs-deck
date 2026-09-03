import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/app/site.config";
import Badge from "@/components/ui/Badge";
import IconMark from "@/components/ui/IconMark";
import PreviewChrome from "@/components/ui/PreviewChrome";
import { pdfDownload, type DownloadLink } from "@/lib/downloads";
import { paths, prove, sheetMeta } from "./content";
import "./sheet.css";

export const metadata: Metadata = {
  title: sheetMeta.title,
  robots: { index: false, follow: false },
};

const { nav } = siteConfig;

export default function CuratorSheetPage() {
  const downloads = [pdfDownload(sheetMeta.downloads.full, "pdf")].filter(
    (d): d is DownloadLink => d !== null,
  );

  return (
    <main className="preview-desk sheet-desk min-h-screen flex flex-col items-center">
      <PreviewChrome downloads={downloads} />
      <div className="flex w-full flex-col items-center gap-12 px-6 py-12">
      <SheetPage index={1} total={2} label={prove.label}>
        <div className="flex flex-col gap-4">
          <h1 className="text-headline text-on-surface">{prove.headline}</h1>
          <p className="text-body-sm text-on-surface-muted">{prove.body}</p>
          <p className="text-body-sm text-on-surface-muted">{prove.closer}</p>
        </div>
        <div className="flex flex-col gap-5">
          {prove.cards.map((card) => (
            <SheetCard
              key={card.title}
              icon={card.iconUrl}
              title={card.title}
              description={card.description}
              horizontal
            />
          ))}
        </div>
      </SheetPage>
      <SheetPage index={2} total={2} label={paths.label}>
        <div className="flex flex-col gap-4">
          <h1 className="text-headline text-on-surface">{paths.headline}</h1>
          <p className="text-body-sm text-on-surface-muted">{paths.body}</p>
        </div>
        <div className="flex flex-col gap-6">
          {paths.cards.map((card) => (
            <SheetCard
              key={card.title}
              icon={card.iconUrl}
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
              horizontal
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-md border border-accent/30 bg-accent/5 px-6 py-5">
          <p className="text-label text-on-surface-muted">{paths.why.title}</p>
          <p className="text-quote text-on-surface">{paths.why.description}</p>
        </div>
      </SheetPage>
      </div>
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
  const isLast = index === total;
  return (
    <article className="sheet-page relative flex flex-col overflow-hidden text-on-surface">
      <div className="flex flex-col flex-1 min-h-0 px-[18mm] pt-[18mm] pb-[16mm]">
        <div className="flex items-center justify-between gap-6 shrink-0 mb-9">
          <p className="text-label text-on-surface">{label}</p>
          <p className="text-label tabular-nums text-on-surface-subtle">
            <span className="text-accent">{number}</span> / {of}
          </p>
        </div>
        <div className="flex flex-col gap-8 flex-1 min-h-0">{children}</div>
        <div className="flex items-start justify-between gap-8 shrink-0 mt-auto pt-8">
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <LogoLockup />
            {isLast && (
              <p className="text-body-sm text-on-surface-subtle text-left">
                {paths.about}
              </p>
            )}
          </div>
          {isLast ? (
            <div className="flex items-center gap-4 shrink-0">
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
  title?: string;
  description: string | readonly string[];
  horizontal?: boolean;
}) {
  const iconMark = <IconMark src={icon} tone="accent" />;
  const paragraphs = typeof description === "string" ? [description] : description;
  const copy = (
    <div className={`flex flex-col min-w-0 ${horizontal ? "gap-1.5 flex-1" : "gap-1.5 w-full"}`}>
      {title && <h2 className="text-ui text-on-surface">{title}</h2>}
      {paragraphs.map((text) => (
        <p key={text.slice(0, 32)} className="text-body-sm text-on-surface-muted">
          {text}
        </p>
      ))}
    </div>
  );

  return (
    <div
      className={`relative rounded-md border border-surface-alt ${
        horizontal
          ? `flex items-start gap-5 shrink-0 px-6 ${eyebrow ? "pt-6 pb-5" : "py-5"}`
          : `h-full w-full min-w-0 flex flex-col gap-4 items-start ${
              eyebrow ? "px-5 pb-5 pt-7" : "p-5"
            }`
      }`}
    >
      {eyebrow && (
        <Badge
          variant="outline"
          tone="accent"
          size="sm"
          className="absolute -top-2.5 right-4 rounded-full"
        >
          {eyebrow}
        </Badge>
      )}
      {iconMark}
      {copy}
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
