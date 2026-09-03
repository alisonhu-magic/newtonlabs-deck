"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { DeckModule } from "./types";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function hashIndex(total: number) {
  const n = Number(window.location.hash.replace("#", ""));
  if (Number.isInteger(n) && n >= 1 && n <= total) return n - 1;
  return 0;
}

function setHashIndex(next: number, total: number) {
  const clamped = Math.max(0, Math.min(total - 1, next));
  const url = `#${clamped + 1}`;
  if (window.location.hash !== url) {
    history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export default function Deck({ slides, renderSlide }: DeckModule) {
  const total = slides.length;
  const index = useSyncExternalStore(
    subscribeHash,
    () => hashIndex(total),
    () => 0,
  );
  const [hint, setHint] = useState(true);

  const go = useCallback(
    (next: number) => {
      setHashIndex(next, total);
    },
    [total],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total]);

  useEffect(() => {
    let acc = 0;
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 400) return;
      acc += e.deltaY;
      if (Math.abs(acc) < 40) return;
      last = now;
      go(index + (acc > 0 ? 1 : -1));
      acc = 0;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go, index]);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="deck-app fixed inset-0 z-[80] bg-on-surface overflow-hidden">
      <div className="deck-scaler">
        {slides.map((_, i) => (
          <div
            key={i}
            className={
              i === index ? "flex" : "hidden print:flex print:break-before-page"
            }
          >
            {renderSlide(i, total)}
          </div>
        ))}
      </div>

      {hint && (
        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-body-sm text-on-accent/80 print:hidden">
          Arrow keys or scroll to advance · ⌘P to export PDF
        </p>
      )}
    </div>
  );
}
