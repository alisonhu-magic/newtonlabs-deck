import type { Metadata } from "next";
import Link from "next/link";
import PreviewChrome from "@/components/ui/PreviewChrome";
import { BannerCanvas, CategoryCanvas } from "./canvases";
import { canvases, categories, socialMeta } from "./content";
import { fileDownload, type DownloadLink } from "@/lib/downloads";

export const metadata: Metadata = {
  title: socialMeta.title,
  robots: { index: false, follow: false },
};

export default function SocialPage() {
  const downloads = [fileDownload(socialMeta.downloads.png, "PNG zip")].filter(
    (d): d is DownloadLink => d !== null,
  );

  return (
    <main className="preview-desk social-desk min-h-screen flex flex-col items-center">
      <PreviewChrome downloads={downloads} />
      <div className="fs-pages">
        <p className="text-label text-on-surface-muted w-full max-w-[var(--ls-preview-w)]">
          <Link href="/social/lab" className="underline md:no-underline md:hover:underline">
            Type, space, logos
          </Link>
        </p>
        <section id="square" className="fs-section" style={{ width: "var(--sq-preview-w)" }}>
          <p className="text-label text-on-surface-muted">
            Square · 1200 × 1200 · {canvases.length} canvases
          </p>
          <div className="fs-stack">
            {canvases.map((c) => (
              <div key={`sq-${c.label}`}>
                <p className="text-label text-on-surface-muted mb-3">{c.label}</p>
                <div className="fs-sq-frame">
                  <CategoryCanvas canvas={c} format="sq" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="landscape" className="fs-section">
          <p className="text-label text-on-surface-muted">
            Landscape · 1600 × 900 · {canvases.length} canvases
          </p>
          <div className="fs-stack">
            {canvases.map((c) => (
              <div key={`ls-${c.label}`}>
                <p className="text-label text-on-surface-muted mb-3">{c.label}</p>
                <div className="fs-ls-frame">
                  <CategoryCanvas canvas={c} format="ls" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="banner" className="fs-section">
          <p className="text-label text-on-surface-muted">
            LinkedIn banner · 1584 × 396 · {categories.length} canvases
          </p>
          <div className="fs-stack">
            {categories.map((c) => (
              <div key={`bn-${c.label}`}>
                <p className="text-label text-on-surface-muted mb-3">{c.label}</p>
                <div className="fs-bn-frame">
                  <BannerCanvas canvas={c} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
