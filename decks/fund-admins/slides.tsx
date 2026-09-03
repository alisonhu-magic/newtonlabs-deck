import Badge from "@/components/ui/Badge";
import AssetFrame from "@/components/ui/AssetFrame";
import { siteConfig } from "@/app/site.config";
import Callout from "@/components/deck/Callout";
import DeckCard from "@/components/deck/DeckCard";
import PointList from "@/components/deck/PointList";
import Slide from "@/components/deck/Slide";
import type { DeckSlide } from "@/components/deck/types";
import {
  deckMeta,
  titleSlide,
  shiftSlide,
  vaultSlide,
  gapSlide,
  whatNewtonSlide,
  acrossBookSlide,
  whyNowSlide,
  whereNextSlide,
  vaultAdminSlide,
  clientBuysSlide,
  tokenLimitsSlide,
  tokenAddsSlide,
  togetherSlide,
  whoBuildsSlide,
  thanksSlide,
  architectureSlide,
  integrationSlide,
} from "./content";

const { backedBy, nav } = siteConfig;

export const slides: DeckSlide[] = [
  { variant: "hero", render: Title },
  { label: shiftSlide.label, render: Shift },
  { label: vaultSlide.label, render: Vault },
  { label: gapSlide.label, render: Gap },
  { label: whatNewtonSlide.label, render: WhatNewton },
  { label: acrossBookSlide.label, render: AcrossBook },
  { label: whyNowSlide.label, render: WhyNow },
  { label: whereNextSlide.label, render: WhereNext },
  { label: vaultAdminSlide.label, render: VaultAdmin },
  { label: clientBuysSlide.label, render: ClientBuys },
  { label: tokenLimitsSlide.label, render: TokenLimits },
  { label: tokenAddsSlide.label, render: TokenAdds },
  { label: togetherSlide.label, render: Together },
  { label: whoBuildsSlide.label, field: true, render: WhoBuilds },
  { variant: "hero", render: Thanks },
  { label: architectureSlide.label, render: Architecture },
  { label: integrationSlide.label, render: Integration },
];

/**
 * Image column system for split (copy + media) slides on the 12-col stage.
 * Media never exceeds 6 columns:
 *   - Standard media  → media col-span-5, copy col-span-7
 *   - Diagram/detailed (dashboards, flow diagrams) → media col-span-6, copy col-span-6
 */
function DeckFrame({
  src,
  alt,
  className = "",
  fill = false,
  crop,
}: {
  src?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  crop?: {
    readonly w: string;
    readonly h: string;
    readonly left: string;
    readonly top: string;
  };
}) {
  return (
    <AssetFrame
      className={`w-full ${fill ? "h-full" : ""} ${className}`}
      innerClassName={fill ? "h-full" : ""}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className={
            crop
              ? "absolute max-w-none rounded-[8px]"
              : "absolute inset-0 w-full h-full object-cover rounded-[8px]"
          }
          style={
            crop
              ? { width: crop.w, height: crop.h, left: crop.left, top: crop.top }
              : undefined
          }
        />
      ) : (
        <div className="absolute inset-0 bg-surface-alt rounded-[8px]" aria-hidden />
      )}
    </AssetFrame>
  );
}

function ComparisonTable({
  columns,
  rows,
  className = "",
}: {
  columns: { left: string; right: string };
  rows: readonly { left: string; right: string }[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-md border border-surface-alt bg-surface-alt-subtle overflow-hidden ${className}`}
    >
      <div className="relative shrink-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-surface-alt"
        />
        <div className="grid grid-cols-2 border-b border-surface-alt bg-surface-alt-hover">
          <p className="px-6 py-4 text-body-sm text-on-surface-muted">
            {columns.left}
          </p>
          <p className="px-6 py-4 text-body-sm text-on-surface">{columns.right}</p>
        </div>
        {rows.map((row) => (
          <div
            key={row.left}
            className="grid grid-cols-2 border-b border-surface-alt last:border-b-0"
          >
            <p className="px-6 py-4 text-body-sm text-on-surface-muted">{row.left}</p>
            <p className="px-6 py-4 text-body-sm text-on-surface">{row.right}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center">
      <div className="flex flex-col items-center gap-10 max-w-[1200px]">
        <div className="flex items-center gap-3" aria-label={nav.logoLabel}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nav.logo}
            alt=""
            width={44}
            height={48}
            className="theme-icon"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nav.wordmark}
            alt={nav.logoLabel}
            width={236}
            height={32}
            className="theme-icon"
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-display text-on-surface">{titleSlide.headline}</h1>
            <p className="text-ui text-on-surface-muted">
              {titleSlide.subheadline}
            </p>
          </div>
          <p className="text-body-sm text-on-surface-muted">{titleSlide.lede}</p>
        </div>
      </div>
    </div>
  );
}

function Shift() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <div className="flex flex-col gap-6 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{shiftSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{shiftSlide.body}</p>
      </div>
      <div className="flex-1 min-h-0 flex items-center">
        <div className="grid grid-cols-3 gap-8 w-full">
          {shiftSlide.stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-md border border-surface-alt p-8 flex flex-col gap-4 h-full min-w-0"
            >
              <p className="text-display text-accent tabular-nums whitespace-nowrap">
                {stat.value}
              </p>
              <p className="text-body-sm text-on-surface">{stat.label}</p>
              {"source" in stat && stat.source && (
                <p className="text-body-sm text-on-surface-subtle mt-auto">
                  {stat.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Callout className="shrink-0">{shiftSlide.closer}</Callout>
    </div>
  );
}

function Vault() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface">{vaultSlide.headline}</h2>
      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-center">
        <div className="col-span-7 min-w-0">
          <ComparisonTable
            columns={vaultSlide.columns}
            rows={vaultSlide.rows}
          />
        </div>
        <div className="col-span-5 min-w-0 rounded-md border border-surface-alt p-8 flex flex-col gap-6">
          <h3 className="text-ui text-on-surface">{vaultSlide.automated.title}</h3>
          <ul className="flex flex-col gap-4 list-disc pl-5 marker:text-on-surface-muted">
            {vaultSlide.automated.items.map((item) => (
              <li key={item} className="text-body-sm text-on-surface-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-on-surface-subtle mt-auto">
            {vaultSlide.automated.footer}
          </p>
        </div>
      </div>
      <Callout className="mt-auto">{vaultSlide.closer}</Callout>
    </div>
  );
}

function Gap() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{gapSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{gapSlide.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {gapSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
      </div>
      <Callout className="mt-auto">{gapSlide.closer}</Callout>
    </div>
  );
}

function WhatNewton() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px] shrink-0">
        <h2 className="text-headline text-on-surface">
          {whatNewtonSlide.headline}
        </h2>
        <p className="text-body-sm text-on-surface-muted">{whatNewtonSlide.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
        {whatNewtonSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            title={card.title}
            description={card.description}
            media={
              <DeckFrame src={card.image.src} alt={card.image.alt} />
            }
          />
        ))}
      </div>
    </div>
  );
}

function AcrossBook() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {acrossBookSlide.headline}
      </h2>
      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {acrossBookSlide.items.map((item) => (
          <div key={item.title} className="grid grid-cols-12 gap-5 items-center">
            <div className="col-span-5 min-w-0">
              <DeckFrame
                src={item.image}
                alt={item.title}
                crop={"crop" in item ? item.crop : undefined}
              />
            </div>
            <div className="col-span-7 flex flex-col gap-3">
              <h3 className="text-ui text-on-surface">{item.title}</h3>
              <p className="text-body-sm text-on-surface-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout className="mt-auto">{acrossBookSlide.closer}</Callout>
    </div>
  );
}

function WhyNow() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {whyNowSlide.headline}
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {whyNowSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
      </div>
      <Callout className="mt-auto">{whyNowSlide.closer}</Callout>
    </div>
  );
}

function WhereNext() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{whereNextSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{whereNextSlide.body}</p>
      </div>
      <div className="flex-1 min-h-0 flex items-center">
        <div className="grid grid-cols-2 gap-8 w-full">
        {whereNextSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            eyebrow={card.eyebrow}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
        </div>
      </div>
      <Callout className="mt-auto">{whereNextSlide.closer}</Callout>
    </div>
  );
}

function VaultAdmin() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{vaultAdminSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{vaultAdminSlide.body}</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {vaultAdminSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
      </div>
      <DeckCard
        title={vaultAdminSlide.partnership.title}
        description={vaultAdminSlide.partnership.description}
      />
      <Callout className="mt-auto">{vaultAdminSlide.closer}</Callout>
    </div>
  );
}

function ClientBuys() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px] shrink-0">
        <h2 className="text-headline text-on-surface">{clientBuysSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{clientBuysSlide.body}</p>
      </div>
      <div className="grid grid-cols-12 gap-8 items-stretch flex-1 min-h-0">
        <div className="col-span-6 min-w-0 min-h-0 flex items-center">
          <div className="grid grid-cols-2 gap-6 w-full">
          {clientBuysSlide.columns.map((column) => (
            <div
              key={column.title}
              className="relative rounded-md border border-surface-alt px-8 pb-8 pt-12 flex flex-col gap-6"
            >
              <Badge
                variant="outline"
                size="sm"
                className="absolute -top-3 right-6 rounded-full bg-surface"
              >
                {column.title}
              </Badge>
              <ul className="flex flex-col gap-4 list-disc pl-5 marker:text-on-surface-muted">
                {column.items.map((item) => (
                  <li key={item} className="text-body-sm text-on-surface-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
        <div className="col-span-6 min-w-0 min-h-0 flex flex-col gap-3">
          <div className="flex-1 min-h-0">
            <DeckFrame
              fill
              src={clientBuysSlide.image.src}
              alt={clientBuysSlide.image.alt}
            />
          </div>
          <p className="text-body-sm text-on-surface-subtle shrink-0">
            {clientBuysSlide.image.caption}
          </p>
        </div>
      </div>
      <Callout className="shrink-0">{clientBuysSlide.closer}</Callout>
    </div>
  );
}

function TokenLimits() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{tokenLimitsSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{tokenLimitsSlide.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
        {tokenLimitsSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
      </div>
      <Callout className="mt-auto">{tokenLimitsSlide.closer}</Callout>
    </div>
  );
}

function TokenAdds() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{tokenAddsSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{tokenAddsSlide.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
        {tokenAddsSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            stretch
          />
        ))}
      </div>
      <Callout className="mt-auto">{tokenAddsSlide.closer}</Callout>
    </div>
  );
}

function Together() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{togetherSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{togetherSlide.body}</p>
      </div>
      <div className="flex-1 min-h-0 flex items-center">
        <ComparisonTable
          className="w-full"
          columns={togetherSlide.columns}
          rows={togetherSlide.rows}
        />
      </div>
      <Callout className="shrink-0">{togetherSlide.closer}</Callout>
    </div>
  );
}

function WhoBuilds() {
  const logoRows = [backedBy.logos.slice(0, 6), backedBy.logos.slice(6)];
  return (
    <div className="flex flex-col items-center text-center flex-1 min-h-0">
      <div className="flex items-center gap-4 shrink-0">
        {whoBuildsSlide.badges.map((badge) => (
          <Badge
            key={badge}
            variant="outline"
            size="md"
            className="rounded-full"
          >
            {badge}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-16">
        <div className="flex flex-col items-center gap-10 max-w-[1200px]">
          <h2 className="text-headline text-on-surface">{whoBuildsSlide.headline}</h2>
          <p className="text-body-sm text-on-surface-muted max-w-[940px]">
            {whoBuildsSlide.body}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-label text-on-surface">
            {whoBuildsSlide.stat.value} {whoBuildsSlide.stat.label}
          </p>
          <div
            className="flex flex-col items-center gap-12 px-40 py-10"
            style={{
              background:
                "radial-gradient(ellipse 85% 130% at center, var(--color-surface) 0%, var(--color-surface) 62%, var(--bone-50-alpha-0) 100%)",
            }}
          >
            {logoRows.map((row, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10"
              >
                {row.map((logo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="theme-icon"
                    style={{ height: Math.round(logo.h * 1.35) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Thanks() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center">
      <div className="flex flex-col items-center gap-10 max-w-[1200px]">
        <h1 className="text-display text-on-surface">{thanksSlide.headline}</h1>
        <p className="text-body-sm text-on-surface-muted">{thanksSlide.lede}</p>
        <div className="flex items-center gap-8">
          {thanksSlide.links.map((link) => (
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
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{architectureSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{architectureSlide.lede}</p>
      </div>
      <div className="grid grid-cols-12 gap-10 items-center flex-1 min-h-0">
        <PointList
          points={architectureSlide.steps}
          numbered
          className="col-span-6"
        />
        <div className="col-span-6 min-w-0">
          <DeckFrame
            src={architectureSlide.image.src}
            alt={architectureSlide.image.alt}
          />
        </div>
      </div>
    </div>
  );
}

function Integration() {
  const integrationPaths = [
    {
      title: integrationSlide.featured.title,
      description: integrationSlide.featured.description,
      preferred: true,
    },
    ...integrationSlide.items.map((item) => ({ ...item, preferred: false })),
  ];
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {integrationSlide.headline}
      </h2>
      <div className="grid grid-cols-12 gap-10 items-center flex-1 min-h-0">
        <div className="col-span-7 flex flex-col gap-4 min-w-0">
          {integrationPaths.map((path) => (
            <div
              key={path.title}
              className={`relative rounded-md border flex flex-col gap-3 ${
                path.preferred
                  ? "border-accent px-8 pb-8 pt-12"
                  : "border-surface-alt p-8"
              }`}
            >
              {path.preferred && (
                <Badge
                  variant="outline"
                  size="sm"
                  tone="accent"
                  className="absolute -top-3 right-6 rounded-full"
                >
                  Preferred
                </Badge>
              )}
              <p className="text-ui text-on-surface">{path.title}</p>
              <p className="text-body-sm text-on-surface-muted">
                {path.description}
              </p>
            </div>
          ))}
        </div>
        <div className="col-span-5 min-w-0 flex flex-col gap-3">
          <DeckFrame
            src={integrationSlide.featured.image.src}
            alt={integrationSlide.featured.image.alt}
          />
          <p className="text-body-sm text-on-surface-subtle">
            {integrationSlide.closer}
          </p>
          <p className="text-body-sm text-on-surface-subtle">
            {integrationSlide.footnote}
          </p>
        </div>
      </div>
    </div>
  );
}

export function renderSlide(index: number, total: number) {
  const slide = slides[index];
  return (
    <Slide
      label={slide.label}
      index={index}
      total={total}
      variant={slide.variant}
      field={slide.field}
      meta={deckMeta}
    >
      {slide.render()}
    </Slide>
  );
}
