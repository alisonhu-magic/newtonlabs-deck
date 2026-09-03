import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { asset } from "./asset";

export type DownloadLink = {
  href: string;
  label: string;
  filename: string;
};

function humanSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 10) return `${mb.toFixed(0)} MB`;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function publicFile(filePath: string) {
  const rel = filePath.replace(/^\//, "");
  const abs = path.join(process.cwd(), "public", rel);
  if (!existsSync(abs)) return null;
  return { href: asset(filePath), bytes: statSync(abs).size };
}

export function pdfDownload(
  filePath: string | undefined,
  kind: "full" | "compressed" | "pdf",
): DownloadLink | null {
  if (!filePath) return null;
  const file = publicFile(filePath);
  if (!file) return null;
  const kindLabel =
    kind === "full" ? "Full size" : kind === "compressed" ? "Compressed" : "PDF";
  return {
    href: file.href,
    label: `${kindLabel} · ${humanSize(file.bytes)}`,
    filename: path.basename(filePath),
  };
}
