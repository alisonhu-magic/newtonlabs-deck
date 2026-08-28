"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { renderSlide, slides } from "./slides";

const TOTAL = slides.length;

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function hashIndex() {
  const n = Number(window.location.hash.replace("#", ""));
  if (Number.isInteger(n) && n >= 1 && n <= TOTAL) return n - 1;
  return 0;
}

function setHashIndex(next: number) {
  const clamped = Math.max(0, Math.min(TOTAL - 1, next));
  const url = `#${clamped + 1}`;
  if (window.location.hash !== url) {
    history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export default function Deck() {
  const index = useSyncExternalStore(subscribeHash, hashIndex, () => 0);
  const [hint, setHint] = useState(true);

  const go = useCallback((next: number) => {
    setHashIndex(next);
  }, []);

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
        go(TOTAL - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

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
            {renderSlide(i, TOTAL)}
          </div>
        ))}
      </div>

      {hint && (
        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-caption text-on-accent/80 print:hidden">
          Arrow keys or scroll to advance · ⌘P to export PDF
        </p>
      )}
    </div>
  );
}
