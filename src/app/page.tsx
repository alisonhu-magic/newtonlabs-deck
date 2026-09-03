import Link from "next/link";
import { deckListings, type DeckListing } from "@decks/catalog";

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

        <DeckGroup title="Active" decks={active} />
        {archived.length > 0 && <DeckGroup title="Archived" decks={archived} />}
      </div>
    </main>
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
        {decks.map((deck) => (
          <li key={deck.slug}>
            <Link
              href={`/d/${deck.slug}`}
              className="group flex flex-col gap-2 rounded-md border border-surface-alt px-6 py-5 transition-colors duration-[var(--duration-interaction)] ease-[var(--ease-newton)] hover:border-accent"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-ui text-on-surface underline-offset-4 group-hover:underline">
                  {deck.title}
                </p>
                <p className="shrink-0 text-label text-on-surface-subtle">
                  {deck.slideCount} slides
                </p>
              </div>
              <p className="text-body-sm text-on-surface-muted">{deck.subtitle}</p>
              <p className="text-label text-on-surface-subtle">{deck.ticket}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
