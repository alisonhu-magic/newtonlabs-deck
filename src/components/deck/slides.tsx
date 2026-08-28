import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import AssetFrame from "@/components/ui/AssetFrame";
import { siteConfig } from "@/app/site.config";
import DeckCard from "./DeckCard";
import PointList from "./PointList";
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
  field?: boolean;
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
  { label: whoBuildsSlide.label, field: true, render: WhoBuilds },
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
      <div className="col-span-6 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-headline text-on-surface">{goalSlide.headline}</h2>
          <p className="text-body text-on-surface-muted">{goalSlide.body}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-6 items-start">
            {goalSlide.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-2 min-w-0 ${i === 1 ? "-translate-x-[50px]" : ""}`}
              >
                <p className="text-headline text-accent tabular-nums whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-body text-on-surface">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {problemSlide.headline}
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {problemSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <p className="text-label text-on-surface-muted">{problemSlide.closer}</p>
        <p className="text-quote text-on-surface">{problemSlide.callout}</p>
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
      <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
        {whatNewtonSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            title={card.title}
            description={card.description}
            dense
            media={
              <DeckFrame
                src={card.image.src}
                alt={card.image.alt}
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
      <div className="rounded-md border border-surface-alt bg-surface-alt-subtle overflow-hidden">
        <div className="grid grid-cols-2 gap-8 px-6 py-4 border-b border-surface-alt bg-surface-alt-hover">
          <p className="text-body-sm text-on-surface-muted">
            {underwritingSlide.columns.today}
          </p>
          <p className="text-body-sm text-on-surface">
            {underwritingSlide.columns.newton}
          </p>
        </div>
        {underwritingSlide.rows.map((row) => (
          <div
            key={row.today}
            className="grid grid-cols-2 gap-8 px-6 py-4 border-b border-surface-alt last:border-b-0"
          >
            <p className="text-body text-on-surface-muted">{row.today}</p>
            <p className="text-body text-on-surface">{row.newton}</p>
          </div>
        ))}
      </div>
      <p className="text-quote text-on-surface mt-auto">
        {underwritingSlide.footnote}
      </p>
    </div>
  );
}

function Consortium() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {consortiumSlide.headline}
      </h2>
      <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
        {consortiumSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            dense
            stretch
          />
        ))}
      </div>
      <p className="text-quote text-on-surface mt-auto">{consortiumSlide.closer}</p>
    </div>
  );
}

function Controls() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {controlsSlide.headline}
      </h2>
      <div className="grid grid-cols-3 gap-6">
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
        <p className="text-caption text-on-surface-subtle whitespace-pre-line">{controlsSlide.footnote}</p>
        <p className="text-caption text-on-surface-subtle">{controlsSlide.closer}</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="flex flex-col gap-10 flex-1 min-h-0">
      <h2 className="text-headline text-on-surface max-w-[1200px]">
        {carrierSlide.headline}
      </h2>
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        <PointList
          points={carrierSlide.points}
          gapClassName="gap-14"
          className="col-span-5"
        />
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
      <div className="grid grid-cols-2 gap-6">
        {workingModelSlide.cards.map((card) => (
          <DeckCard
            key={card.title}
            icon={card.iconUrl}
            title={card.title}
            description={card.description}
            dense
            stretch
          />
        ))}
      </div>
      <p className="text-quote text-on-surface mt-auto">{workingModelSlide.closer}</p>
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
      <p className="text-quote text-on-surface">{acrossBookSlide.closer}</p>
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
          <div className="flex flex-col gap-8 max-w-[940px]">
            <p className="text-body text-on-surface-muted">{whoBuildsSlide.body}</p>
            <p className="text-body text-on-surface-muted">
              {whoBuildsSlide.bodyClose}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-12">
          <p className="text-label text-on-surface">
            {whoBuildsSlide.stat.value} {whoBuildsSlide.stat.label}
          </p>
          <div
            className="flex flex-col items-center gap-12 px-24 py-12"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-surface) 0%, var(--color-surface) 42%, var(--bone-50-alpha-0) 80%)",
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

function Commercial() {
  return (
    <div className="flex flex-col gap-8 flex-1 min-h-0">
      <div className="flex flex-col gap-3">
        <h2 className="text-headline text-on-surface">{commercialSlide.headline}</h2>
        <p className="text-ui text-on-surface">{commercialSlide.principle}</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {commercialSlide.pillars.map((pillar) => (
          <DeckCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            dense
            stretch
          />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-8 items-start mt-auto">
        <div className="col-span-7">
          <p className="text-label text-on-surface mb-6">
            {commercialSlide.table.caption}
          </p>
          <div className="rounded-md border border-surface-alt bg-surface-alt-subtle overflow-hidden">
            <div className="grid grid-cols-3 gap-4 px-6 py-6 border-b border-surface-alt bg-surface-alt-hover">
              {commercialSlide.table.headers.map((header, i) => (
                <p
                  key={header || "blank"}
                  className={`text-body-sm ${i === 2 ? "text-on-surface" : "text-on-surface-muted"}`}
                >
                  {header}
                </p>
              ))}
            </div>
            {commercialSlide.table.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-4 px-6 py-6 border-b border-surface-alt last:border-b-0"
              >
                <p className="text-body-sm text-on-surface">{row.label}</p>
                <p className="text-body-sm text-on-surface-muted">{row.self}</p>
                <p className="text-body-sm text-on-surface">{row.verified}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5">
          <p className="text-label mb-6 invisible" aria-hidden="true">
            {commercialSlide.table.caption}
          </p>
          <div className="flex flex-col gap-4">
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
    </div>
  );
}

function Path() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-headline text-on-surface shrink-0">{pathSlide.headline}</h2>
      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-4 gap-8 w-full">
          {pathSlide.steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-8">
              {i < pathSlide.steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-10 left-20 right-[-2rem] h-0.5 -translate-y-1/2 bg-surface-alt-strong"
                />
              )}
              <div className="relative z-10 size-20 rounded-full border border-on-surface bg-surface flex items-center justify-center p-5 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.iconUrl} alt="" className="w-8 h-8 theme-icon" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-subheadline text-on-surface">
                  <span className="text-accent">{step.number}.</span> {step.title}
                </h3>
                <p className="text-body-sm text-on-surface-muted">{step.description}</p>
              </div>
            </div>
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
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        <div className="col-span-6 flex flex-col">
          {architectureSlide.steps.map((step) => (
            <div key={step.number} className="flex gap-5 items-start py-3">
              <p className="text-ui text-accent shrink-0 w-8">{step.number}.</p>
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
      <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
        {/* Left — three integration paths as cards */}
        <div className="col-span-7 flex flex-col gap-4 min-w-0">
          {integrationPaths.map((path) => (
            <div
              key={path.title}
              className={`relative rounded-md border p-8 flex flex-col gap-3 ${
                path.preferred ? "border-accent" : "border-surface-alt"
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
        {/* Right — image with caption + footnote */}
        <div className="col-span-5 min-w-0 flex flex-col gap-3">
          <DeckFrame
            src={integrationSlide.featured.image.src}
            alt={integrationSlide.featured.image.alt}
          />
          <p className="text-caption text-on-surface-subtle">
            {integrationSlide.closer}
          </p>
          <p className="text-caption text-on-surface-subtle">
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
    >
      {slide.render()}
    </Slide>
  );
}
