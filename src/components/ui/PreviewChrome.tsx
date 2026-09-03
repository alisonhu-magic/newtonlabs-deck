import Link from "next/link";
import DownloadButton from "@/components/ui/DownloadButton";
import type { DownloadLink } from "@/lib/downloads";

const btn =
  "inline-flex items-center rounded-md border border-surface-alt px-2.5 pt-[7px] pb-[5px] text-label text-on-surface hover:border-accent";

export default function PreviewChrome({
  downloads,
}: {
  downloads: DownloadLink[];
}) {
  return (
    <header className="preview-chrome sticky top-0 z-20 flex w-full justify-center px-6 py-4 print:hidden">
      <div className="flex w-[var(--preview-w)] max-w-full items-center justify-between gap-4">
        <Link href="/" className={btn}>
          Home
        </Link>
        {downloads.length > 0 && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {downloads.map((file) => (
              <DownloadButton key={file.href} file={file} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
