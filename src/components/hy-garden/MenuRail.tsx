"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";

export function MenuRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const items = Children.toArray(children);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let previous = performance.now();
    const move = (now: number) => {
      const elapsed = Math.min(now - previous, 48);
      previous = now;
      if (!paused && rail.scrollWidth > rail.clientWidth) {
        const loopAt = rail.scrollWidth / 2;
        rail.scrollLeft += elapsed * 0.018;
        if (rail.scrollLeft >= loopAt) rail.scrollLeft -= loopAt;
      }
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <ul
      ref={railRef}
      className="hy-menu-rail"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {items}
      {items.map((item, index) => isValidElement(item) ? cloneElement(item, { key: `repeat-${index}` }) : item)}
    </ul>
  );
}
