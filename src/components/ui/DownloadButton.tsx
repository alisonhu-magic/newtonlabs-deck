import type { DownloadLink } from "@/lib/downloads";

const btn =
  "inline-flex items-center gap-1.5 rounded-md border border-surface-alt px-2.5 pt-[7px] pb-[5px] text-label text-on-surface hover:border-accent";

export default function DownloadButton({
  file,
  compact = false,
  className = "",
}: {
  file: DownloadLink;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={file.href}
      download={file.filename}
      title={file.label}
      className={`${btn} ${className}`}
    >
      <DownloadIcon />
      {compact ? (
        file.shortLabel
      ) : (
        <>
          <span className="sm:hidden">{file.shortLabel}</span>
          <span className="hidden sm:inline">{file.label}</span>
        </>
      )}
    </a>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M8 2.5v7.25M5.25 7.5 8 10.25 10.75 7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.25 12.5h9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
