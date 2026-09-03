import Link from "next/link";
import { deckListings } from "@decks/catalog";
import { sheetMeta } from "@/app/sheet/content";
import DownloadButton from "@/components/ui/DownloadButton";
import { pdfDownload, type DownloadLink } from "@/lib/downloads";

export default function Home() {
  const items = [
    {
      key: "sheet",
      href: sheetMeta.href,
      title: sheetMeta.title,
      subtitle: sheetMeta.subtitle,
      ticket: sheetMeta.ticket,
      meta: "A4",
      downloads: [pdfDownload(sheetMeta.downloads.full, "pdf")],
    },
    ...deckListings.map((deck) => ({
      key: deck.slug,
      href: `/d/${deck.slug}`,
      title: deck.title,
      subtitle: deck.subtitle,
      ticket: deck.ticket,
      meta: `${deck.slideCount} slides`,
      downloads: [
        pdfDownload(deck.downloads.full, "full"),
        pdfDownload(deck.downloads.compressed, "compressed"),
      ],
    })),
  ];

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-16 sm:px-10 sm:py-20">
        <header className="flex flex-col gap-3">
          <h1 className="text-headline text-on-surface">Decks</h1>
          <p className="text-body text-on-surface-muted">
            Each ticket ships as its own deck. Shared shell stays on main; copy
            and slides live under <span className="font-code text-ui">decks/</span>.
          </p>
        </header>

        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.key}>
              <CatalogCard
                href={item.href}
                title={item.title}
                subtitle={item.subtitle}
                ticket={item.ticket}
                meta={item.meta}
                downloads={item.downloads.filter(
                  (d): d is DownloadLink => d !== null,
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
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
    <div className="flex flex-col gap-4 rounded-md border border-surface-alt px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6">
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <Link
          href={href}
          className="text-ui text-on-surface rounded-md underline-offset-4 hover:underline"
        >
          {title}
        </Link>
        <p className="text-label text-on-surface-subtle">{meta}</p>
        <p className="text-body-sm text-on-surface-muted">{subtitle}</p>
        <p className="text-label text-on-surface-subtle">{ticket}</p>
      </div>
      {downloads.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch sm:shrink-0">
          {downloads.map((file) => (
            <DownloadButton
              key={file.href}
              file={file}
              compact
              className="sm:w-full sm:justify-center"
            />
          ))}
        </div>
      )}
    </div>
  );
}
