import type { Metadata } from "next";
import Link from "next/link";
import PreviewChrome from "@/components/ui/PreviewChrome";
import { logoSpecimens } from "../content";

export const metadata: Metadata = {
  title: "Foundation social — type, space, logos",
  robots: { index: false, follow: false },
};

const CUTOUT = new Set([
  "amlbot",
  "anchain",
  "chainlink",
  "civic",
  "network-firm",
  "shyft-veriscope",
  "tokeny",
]);

const MIXED = new Set(["blockaid", "chainalysis", "privado", "taxbit", "bitbond"]);

function fileOf(src: string) {
  const match = src.match(/\/([^/]+)\.webp/);
  return match?.[1] ?? src;
}

function kindOf(src: string) {
  const file = fileOf(src);
  if (CUTOUT.has(file)) return "Cutout";
  if (MIXED.has(file)) return "Rounded / mixed";
  return "Full-bleed tile";
}

export default function SocialLabPage() {
  return (
    <main className="preview-desk social-desk min-h-screen flex flex-col items-center">
      <PreviewChrome downloads={[]} />
      <div className="fs-pages fs-lab">
        <p className="text-label text-on-surface-muted w-full max-w-[var(--ls-preview-w)]">
          <Link href="/social" className="underline md:no-underline md:hover:underline">
            Back to canvases
          </Link>
        </p>

        <section className="fs-section">
          <p className="text-label text-on-surface-muted">Typography · square sizes</p>
          <div className="fs-lab-specimen">
            <div className="fs-chip">
              <span>02</span>
              <span>Pre-settlement</span>
              <span className="fs-chip-rule" aria-hidden />
              <span>Binds</span>
            </div>
            <h2 className="fs-title">Firewalls &amp; Custody Controls</h2>
            <p className="fs-sub">Transaction Firewalls</p>
            <p className="fs-name">BlockSec (Phalcon)</p>
            <div className="fs-footer">
              <span className="fs-count">5 Providers</span>
              <span className="fs-rule" />
              <span>Digital Asset Compliance Landscape 2026</span>
            </div>
          </div>
        </section>

        <section className="fs-section">
          <p className="text-label text-on-surface-muted">Space · 8 / 12 / 16 / 24 / 32 / 48 / 80</p>
          <div className="fs-lab-space">
            {[8, 12, 16, 24, 32, 48, 80].map((n) => (
              <div key={n} className="fs-lab-space-row">
                <span>{n}</span>
                <i style={{ width: n }} />
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section fs-lab-compare">
          <p className="text-label text-on-surface-muted">
            Logos · {logoSpecimens.length} unique files · white well
          </p>
          <p className="text-body-sm text-on-surface-muted max-w-[40rem]">
            Same well as the canvases: white plate, 2px radius, 1px rule, contain.
            Cutouts and mixed marks are labelled.
          </p>
          <div className="fs-lab-logo-grid">
            {logoSpecimens.map((logo) => {
              const kind = kindOf(logo.src);
              return (
                <div key={logo.src} className="fs-lab-logo-item">
                  <span
                    className="fs-logo fs-lab-logo-well"
                    role="img"
                    aria-label={logo.name}
                    style={{ backgroundImage: `url('${logo.src}')` }}
                  />
                  <span className="fs-lab-logo-name">{logo.name}</span>
                  {kind !== "Full-bleed tile" && (
                    <span className="fs-lab-logo-kind">{kind}</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
