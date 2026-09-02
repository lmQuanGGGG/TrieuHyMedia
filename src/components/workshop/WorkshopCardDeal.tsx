"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  cardSelector?: string;
  rootMargin?: string;
};

/**
 * Hiệu ứng xòe thẻ bài (Card Dealing / Fanning effect) chuẩn phong cách Hỷ Garden.
 * Khi nhóm thẻ cuộn vào viewport, các thẻ sẽ bắt đầu từ vị trí tâm và xòe dần sang các vị trí trên lưới
 * với đường cong lò xo mượt mà (cubic-bezier) và độ trễ phân tầng (staggered delay).
 */
export function WorkshopCardDeal({
  children,
  className = "",
  style,
  cardSelector = ".editorial-session-item, .career-editorial-card, .workshop-speaker-card",
  rootMargin = "-8% 0px -8% 0px",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(cardSelector);
    if (cards.length === 0) return;

    const deal = () => {
      container.classList.add("is-dealt");
      cards.forEach((card, idx) => {
        card.style.setProperty("--reveal-delay", `${idx * 85}ms`);
        card.classList.add("is-visible");
      });
    };

    // Tôn trọng cài đặt giảm chuyển động của người dùng
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      deal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          deal();
          observer.unobserve(container);
        }
      },
      { rootMargin, threshold: 0.08 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [cardSelector, rootMargin]);

  return (
    <div ref={containerRef} className={`workshop-deal-grid ${className}`} style={style}>
      {children}
    </div>
  );
}
