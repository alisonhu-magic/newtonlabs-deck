import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Callout lab — Newtonlabs Deck",
  robots: { index: false, follow: false },
};

const SAMPLE =
  "The first is a new revenue line. The second makes an existing one harder to compete with.";

const SAMPLE_LONG =
  "Administrators are trusted because they are independent. Onchain is where that independence stops working.";

type Variant = {
  id: string;
  name: string;
  note: string;
  node: ReactNode;
};

function Quote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-quote ${className}`}>{children}</p>;
}

const variants: Variant[] = [
  {
    id: "1",
    name: "Current tint",
    note: "Previous deck callout. Accent fill + accent italic.",
    node: (
      <div className="flex flex-col gap-2 rounded-md p-8 border border-accent/30 bg-accent/5">
        <Quote className="text-accent">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "1+7",
    name: "Quote mark + tint",
    note: "Now the deck callout. Tint wash and border; oversized mark carries the accent; type stays coal.",
    node: (
      <div className="flex gap-5 items-start rounded-md p-8 border border-accent/30 bg-accent/5">
        <span
          aria-hidden
          className="text-accent font-sans leading-[0.7] select-none shrink-0 -mt-2"
          style={{ fontSize: 88 }}
        >
          {"\u201C"}
        </span>
        <Quote className="text-on-surface pt-2">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "2",
    name: "Solid accent",
    note: "Filled blue. Highest contrast. Already coded, unused.",
    node: (
      <div className="flex flex-col gap-2 rounded-md p-8 bg-accent">
        <Quote className="text-on-accent">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "3",
    name: "Left rule",
    note: "No box. A 3px accent bar and on-surface quote. Quietest chrome.",
    node: (
      <div className="border-l-[3px] border-accent pl-8 py-2">
        <Quote className="text-on-surface">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "4",
    name: "Left rule + tint",
    note: "Bar plus the current wash. Reads as a callout without a full frame.",
    node: (
      <div className="border-l-[3px] border-accent bg-accent/5 pl-8 pr-8 py-6 rounded-r-md">
        <Quote className="text-accent">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "5",
    name: "Neutral card",
    note: "Same chrome as DeckCard. Quote in on-surface so it isn’t a second accent block.",
    node: (
      <div className="rounded-md border border-surface-alt p-8">
        <Quote className="text-on-surface">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "6",
    name: "Takeaway",
    note: "Eyebrow + left rule. Names the slot so it doesn’t compete with cards.",
    node: (
      <div className="border-l-[3px] border-accent pl-8 py-2 flex flex-col gap-3">
        <p className="text-label text-on-surface-muted">Takeaway</p>
        <Quote className="text-on-surface">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "7",
    name: "Quote mark",
    note: "No box. Oversized mark carries the accent; type stays coal.",
    node: (
      <div className="flex gap-6 items-start">
        <span
          aria-hidden
          className="text-accent font-sans leading-none select-none"
          style={{ fontSize: 72 }}
        >
          “
        </span>
        <Quote className="text-on-surface pt-3">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "8",
    name: "Top rule",
    note: "Hairline separator. Treats the line as a closer, not a card.",
    node: (
      <div className="border-t border-surface-alt pt-6">
        <Quote className="text-on-surface">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "9",
    name: "Footer wash",
    note: "Full band in accent-subtle. Feels like a slide footer, not an inset card.",
    node: (
      <div className="rounded-md bg-accent-subtle px-8 py-6">
        <Quote className="text-accent">{SAMPLE}</Quote>
      </div>
    ),
  },
  {
    id: "10",
    name: "Bare italic",
    note: "No chrome at all. Relies on the quote face. Least layout cost.",
    node: <Quote className="text-on-surface-muted">{SAMPLE}</Quote>,
  },
  {
    id: "11",
    name: "Accent underline",
    note: "Short accent rule under the line. Editorial, not boxed.",
    node: (
      <div className="flex flex-col gap-4">
        <Quote className="text-on-surface">{SAMPLE}</Quote>
        <div aria-hidden className="h-0.5 w-16 bg-accent" />
      </div>
    ),
  },
  {
    id: "12",
    name: "Two-tone takeaway",
    note: "Neutral card, accent eyebrow. Longer closer to check wrapping.",
    node: (
      <div className="rounded-md border border-surface-alt p-8 flex flex-col gap-3">
        <p className="text-label text-accent">Takeaway</p>
        <Quote className="text-on-surface">{SAMPLE_LONG}</Quote>
      </div>
    ),
  },
];

export default function CalloutLabPage() {
  return (
    <main className="callout-lab min-h-screen bg-surface text-on-surface">
      <style>{`
        .callout-lab .text-quote {
          font-size: 31px;
          line-height: 1.35;
          letter-spacing: 0.16px;
        }
        .callout-lab .text-label {
          font-size: 18px;
          letter-spacing: 1.44px;
        }
      `}</style>

      <header className="sticky top-0 z-20 border-b border-surface-alt bg-surface/90 px-10 py-5 backdrop-blur-sm">
        <p className="text-label text-on-surface-muted">Temp lab · not the deck</p>
        <h1 className="text-headline text-on-surface mt-2">Callout</h1>
        <p className="text-body-sm text-on-surface-muted mt-2 max-w-[720px]">
          Same closer line in thirteen treatments. Mix of 1 and 7 is in the
          first row. Nothing here is wired into the slides yet.
        </p>
      </header>

      <div className="px-10 py-12 grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-16 max-w-[1600px]">
        {variants.map((v) => (
          <article key={v.id} className="flex flex-col gap-4 min-w-0">
            <div className="flex items-baseline gap-3">
              <p className="text-label text-accent">{v.id}</p>
              <h2 className="text-ui text-on-surface">{v.name}</h2>
            </div>
            <p className="text-body-sm text-on-surface-subtle">{v.note}</p>
            <div className="rounded-md border border-surface-alt bg-surface p-8">
              {v.node}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
