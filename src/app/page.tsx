import Link from "next/link";
import { deckListings, type DeckListing } from "@decks/catalog";
import { sheetMeta } from "@/app/sheet/content";
import { pdfDownload, type DownloadLink } from "@/lib/downloads";

export default function Home() {
  const active = deckListings.filter((d) => d.status === "active");
  const archived = deckListings.filter((d) => d.status === "archived");

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-10 py-20">
        <header className="flex flex-col gap-3">
          <h1 className="text-headline text-on-surface">Decks</h1>
          <p className="text-body text-on-surface-muted">
            Each ticket ships as its own deck. Shared shell stays on main; copy
            and slides live under <span className="font-code text-ui">decks/</span>.
          </p>
        </header>

        <SheetGroup />
        <DeckGroup title="Active" decks={active} />
        {archived.length > 0 && <DeckGroup title="Archived" decks={archived} />}
      </div>
    </main>
  );
}

function SheetGroup() {
  const downloads = [
    pdfDownload(sheetMeta.downloads.full, "pdf"),
  ].filter((d): d is DownloadLink => d !== null);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-label text-on-surface-subtle">Sheets</h2>
      <ul className="flex flex-col gap-4">
        <li>
          <CatalogCard
            href={sheetMeta.href}
            title={sheetMeta.title}
            subtitle={sheetMeta.subtitle}
            ticket={sheetMeta.ticket}
            meta="A4"
            downloads={downloads}
          />
        </li>
      </ul>
    </section>
  );
}

function DeckGroup({
  title,
  decks,
}: {
  title: string;
  decks: readonly DeckListing[];
}) {
  if (decks.length === 0) return null;
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-label text-on-surface-subtle">{title}</h2>
      <ul className="flex flex-col gap-4">
        {decks.map((deck) => {
          const downloads = [
            pdfDownload(deck.downloads.full, "full"),
            pdfDownload(deck.downloads.compressed, "compressed"),
          ].filter((d): d is DownloadLink => d !== null);
          return (
            <li key={deck.slug}>
              <CatalogCard
                href={`/d/${deck.slug}`}
                title={deck.title}
                subtitle={deck.subtitle}
                ticket={deck.ticket}
                meta={`${deck.slideCount} slides`}
                downloads={downloads}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CatalogCard({
  href,
  title,
  subtitle,
  ticket,
  meta,
  downloads,
}: {
  href: string;
  title: string;
  subtitle: string;
  ticket: string;
  meta: string;
  downloads: DownloadLink[];
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-surface-alt px-6 py-5">
      <Link
        href={href}
        className="text-ui text-on-surface rounded-md underline-offset-4 hover:underline"
      >
        {title}
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-label text-on-surface-subtle">{meta}</p>
        {downloads.map((file) => (
          <a
            key={file.href}
            href={file.href}
            download={file.filename}
            className="inline-flex items-center rounded-md border border-surface-alt px-2.5 pt-[7px] pb-[5px] text-label text-on-surface hover:border-accent"
          >
            {file.label}
          </a>
        ))}
      </div>
      <p className="text-body-sm text-on-surface-muted">{subtitle}</p>
      <p className="text-label text-on-surface-subtle">{ticket}</p>
    </div>
  );
}
