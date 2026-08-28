import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import AssetFrame from "@/components/ui/AssetFrame";
import { siteConfig } from "@/app/site.config";
import DeckCard from "./DeckCard";
import Slide from "./Slide";
import {
  titleSlide,
  goalSlide,
  problemSlide,
  whatNewtonSlide,
  underwritingSlide,
  consortiumSlide,
  controlsSlide,
  carrierSlide,
  workingModelSlide,
  acrossBookSlide,
  whoBuildsSlide,
  commercialSlide,
  pathSlide,
  architectureSlide,
  integrationSlide,
} from "@/app/content";

const { backedBy, nav } = siteConfig;

export type DeckSlide = {
  label?: string;
  variant?: "hero" | "content";
  render: () => ReactNode;
};

export const slides: DeckSlide[] = [
  { variant: "hero", render: Title },
  { label: goalSlide.label, render: Goal },
  { label: problemSlide.label, render: Problem },
  { label: whatNewtonSlide.label, render: WhatNewton },
  { label: underwritingSlide.label, render: Underwriting },
  { label: consortiumSlide.label, render: Consortium },
  { label: controlsSlide.label, render: Controls },
  { label: carrierSlide.label, render: Carrier },
  { label: workingModelSlide.label, render: WorkingModel },
  { label: acrossBookSlide.label, render: AcrossBook },
  { label: whoBuildsSlide.label, render: WhoBuilds },
  { label: commercialSlide.label, render: Commercial },
  { label: pathSlide.label, render: Path },
  { label: architectureSlide.label, render: Architecture },
  { label: integrationSlide.label, render: Integration },
];

function DeckFrame({
  src,
  alt,
  aspectClass = "aspect-[3/2]",
  className = "",
}: {
  src?: string;
  alt?: string;
  aspectClass?: string;
  className?: string;
}) {
  return (
    <AssetFrame className={`w-full ${className}`} innerClassName={aspectClass}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-alt" aria-hidden />
      )}
    </AssetFrame>
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
          <h1 className="text-display text-on-surface">{titleSlide.headline}</h1>
          <p className="text-body text-on-surface-muted">{titleSlide.lede}</p>
        </div>
      </div>
    </div>
  );
}

function Goal() {
  return (
    <div className="grid grid-cols-12 gap-10 items-center flex-1 min-h-0">
      <div className="col-span-6 min-w-0">
        <DeckFrame src={goalSlide.image.src} alt={goalSlide.image.alt} />
      </div>
      <div className="col-span-6 flex flex-col justify-between self-stretch min-h-0 gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-headline text-on-surface">{goalSlide.headline}</h2>
          <p className="text-body text-on-surface-muted">{goalSlide.body}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-6">
            {goalSlide.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <p className="text-headline text-on-surface tabular-nums">
                  {stat.value}
                </p>
                <p className="text-body text-on-surface">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-caption text-on-surface-subtle">{goalSlide.footnote}</p>
        </div>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {problemSlide.headline}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {problemSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-4">
        <div className="rounded-md border border-surface-alt p-8">
          <p className="text-body text-on-surface-muted">{problemSlide.callout}</p>
        </div>
        <p className="text-ui text-on-surface">{problemSlide.closer}</p>
      </div>
    </div>
  );
}

function WhatNewton() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px] shrink-0">
        {whatNewtonSlide.headline}
      </h2>
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {whatNewtonSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            title={card.title}
            description={card.description}
            media={
              <DeckFrame
                src={card.image.src}
                alt={card.image.alt}
                className="h-full"
                aspectClass="h-full"
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

function Underwriting() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {underwritingSlide.headline}
      </h2>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-8 pb-4 border-b border-surface-alt">
          <p className="text-label text-on-surface-muted">
            {underwritingSlide.columns.today}
          </p>
          <p className="text-label text-on-surface">
            {underwritingSlide.columns.newton}
          </p>
        </div>
        {underwritingSlide.rows.map((row) => (
          <div
            key={row.today}
            className="grid grid-cols-2 gap-8 py-4 border-b border-surface-alt"
          >
            <p className="text-body text-on-surface-muted">{row.today}</p>
            <p className="text-body text-on-surface">{row.newton}</p>
          </div>
        ))}
      </div>
      <p className="text-caption text-on-surface-subtle mt-auto">
        {underwritingSlide.footnote}
      </p>
    </div>
  );
}

function Consortium() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {consortiumSlide.headline}
      </h2>
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {consortiumSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            title={card.title}
            description={card.description}
            media={
              <DeckFrame
                src={card.image.src}
                alt={card.image.alt}
                className="h-full"
                aspectClass="h-full"
              />
            }
          />
        ))}
      </div>
      <p className="text-ui text-on-surface mt-auto">{consortiumSlide.closer}</p>
    </div>
  );
}

function Controls() {
  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {controlsSlide.headline}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {controlsSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            badge={card.badge}
            dense
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <p className="text-annotation text-on-surface-subtle">{controlsSlide.footnote}</p>
        <p className="text-caption text-on-surface-subtle">{controlsSlide.closer}</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {carrierSlide.headline}
      </h2>
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        <div className="col-span-5 flex flex-col gap-6">
          {carrierSlide.points.map((point) => (
            <div key={point.title} className="flex flex-col gap-2">
              <p className="text-ui text-on-surface">{point.title}</p>
              <p className="text-body text-on-surface-muted">{point.description}</p>
            </div>
          ))}
        </div>
        <div className="col-span-7 min-w-0">
          <DeckFrame src={carrierSlide.image.src} alt={carrierSlide.image.alt} />
          <p className="text-caption text-on-surface-subtle mt-3">
            {carrierSlide.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function WorkingModel() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface">{workingModelSlide.headline}</h2>
      <div className="grid grid-cols-4 gap-4">
        {workingModelSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            dense
          />
        ))}
      </div>
      <p className="text-ui text-on-surface mt-auto">{workingModelSlide.closer}</p>
    </div>
  );
}

function AcrossBook() {
  const lines = [acrossBookSlide.featured, ...acrossBookSlide.items];
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {acrossBookSlide.headline}
      </h2>
      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {lines.map((item) => (
          <div key={item.title} className="grid grid-cols-12 gap-5 items-center">
            <div className="col-span-5 min-w-0">
              {"crop" in item ? (
                <AssetFrame
                  src={item.image}
                  alt={item.title}
                  crop={item.crop}
                  aspect="3 / 2"
                />
              ) : (
                <DeckFrame src={item.image} alt={item.title} />
              )}
            </div>
            <div className="col-span-7 flex flex-col gap-3">
              <h3 className="text-subheadline text-on-surface">{item.title}</h3>
              <p className="text-body-sm text-on-surface-muted">{item.description}</p>
              <PolicyPills policies={item.policies} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-caption text-on-surface-subtle">{acrossBookSlide.closer}</p>
    </div>
  );
}

function PolicyPills({ policies }: { policies: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {policies.map((policy) => (
        <Badge key={policy} className="rounded-full">
          {policy}
        </Badge>
      ))}
    </div>
  );
}

function WhoBuilds() {
  return (
    <div className="flex flex-col justify-between flex-1 min-h-0">
      <div className="flex flex-col gap-6 max-w-[960px]">
        <h2 className="text-headline text-on-surface">{whoBuildsSlide.headline}</h2>
        <p className="text-body text-on-surface-muted">{whoBuildsSlide.body}</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-end justify-between gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-headline text-on-surface tabular-nums">
              {whoBuildsSlide.stat.value}
            </p>
            <p className="text-body text-on-surface">{whoBuildsSlide.stat.label}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {whoBuildsSlide.badges.map((badge) => (
              <Badge key={badge} variant="outline" className="rounded-full">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-subheadline text-on-surface mb-6">{backedBy.heading}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {backedBy.logos.map((logo) => (
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
        </div>
      </div>
    </div>
  );
}

function Commercial() {
  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0">
      <div className="flex flex-col gap-3">
        <h2 className="text-headline text-on-surface">{commercialSlide.headline}</h2>
        <p className="text-ui text-on-surface">{commercialSlide.principle}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {commercialSlide.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-md border border-surface-alt p-8 flex flex-col gap-2"
          >
            <p className="text-ui text-on-surface">{pillar.title}</p>
            <p className="text-body-sm text-on-surface-muted">{pillar.description}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-8 items-start mt-auto">
        <div className="col-span-7">
          <p className="text-label text-on-surface mb-4">
            {commercialSlide.table.caption}
          </p>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-surface-alt">
              {commercialSlide.table.headers.map((header, i) => (
                <p
                  key={header || "blank"}
                  className={`text-label ${i === 2 ? "text-on-surface" : "text-on-surface-muted"}`}
                >
                  {header}
                </p>
              ))}
            </div>
            {commercialSlide.table.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-4 py-3 border-b border-surface-alt"
              >
                <p className="text-body-sm text-on-surface">{row.label}</p>
                <p className="text-body-sm text-on-surface-muted">{row.self}</p>
                <p className="text-body-sm text-on-surface">{row.verified}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-3">
          {commercialSlide.curatorNotes.map((note) => (
            <p key={note} className="text-body-sm text-on-surface-muted">
              {note}
            </p>
          ))}
          <p className="text-caption text-on-surface-subtle">
            {commercialSlide.footnote}
          </p>
        </div>
      </div>
    </div>
  );
}

function Path() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface">{pathSlide.headline}</h2>
      <div className="grid grid-cols-4 gap-6 flex-1">
        {pathSlide.steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col gap-4 border-t border-on-surface pt-6"
          >
            <p className="text-headline text-on-surface">{step.number}</p>
            <p className="text-subheadline text-on-surface">{step.title}</p>
            <p className="text-body text-on-surface-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-4 max-w-[1200px]">
        <h2 className="text-headline text-on-surface">{architectureSlide.headline}</h2>
        <p className="text-body-sm text-on-surface-muted">{architectureSlide.lede}</p>
      </div>
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        <div className="col-span-6 flex flex-col">
          {architectureSlide.steps.map((step) => (
            <div key={step.number} className="flex gap-5 items-start py-3">
              <p className="text-ui text-on-surface shrink-0 w-8">{step.number}.</p>
              <div className="flex flex-col gap-2">
                <p className="text-ui text-on-surface">{step.title}</p>
                <p className="text-body-sm text-on-surface-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
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
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {integrationSlide.headline}
      </h2>
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        <div className="col-span-5 min-w-0">
          <DeckFrame
            src={integrationSlide.featured.image.src}
            alt={integrationSlide.featured.image.alt}
          />
        </div>
        <div className="col-span-7 flex flex-col gap-3">
          <h3 className="text-subheadline text-on-surface">
            {integrationSlide.featured.title}
          </h3>
          <p className="text-body-sm text-on-surface-muted">
            {integrationSlide.featured.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {integrationSlide.items.map((item) => (
          <div
            key={item.title}
            className="rounded-md border border-surface-alt p-8 flex flex-col gap-2"
          >
            <p className="text-ui text-on-surface">{item.title}</p>
            <p className="text-body-sm text-on-surface-muted">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between gap-6">
        <p className="text-caption text-on-surface-subtle">{integrationSlide.footnote}</p>
        <p className="text-code text-on-surface-subtle">{integrationSlide.closer}</p>
      </div>
    </div>
  );
}

export function renderSlide(index: number, total: number) {
  const slide = slides[index];
  return (
    <Slide label={slide.label} index={index} total={total} variant={slide.variant}>
      {slide.render()}
    </Slide>
  );
}
