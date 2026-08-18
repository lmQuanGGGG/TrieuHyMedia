"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MenuCardProps = {
  code: string;
  name: string;
  price: string;
  image?: string;
  index: number;
};

const compactImages = new Set(["Cà phê đen nóng/đá", "Espresso nóng/đá", "Sinh tố xoài"]);

export function MenuCard({ code, name, price, image, index }: MenuCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const group = card.closest<HTMLElement>(".hy-menu-group") ?? card;
    const deal = () => {
      group.classList.add("is-dealt");
      group.querySelectorAll<HTMLElement>(".hy-menu-card").forEach((menuCard) => menuCard.classList.add("is-visible"));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      deal();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        deal();
        observer.unobserve(group);
      }
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  const imageClass = [
    "hy-menu-card-image",
    image?.includes("/menu-full/") ? "hy-menu-card-image--provided" : "",
    name === "Matcha latte" ? "hy-menu-card-image--matcha-latte" : "",
    compactImages.has(name) ? "hy-menu-card-image--compact" : "",
    name === "Cacao nóng/đá" ? "hy-menu-card-image--cacao" : "",
  ].filter(Boolean).join(" ");

  return (
    <article
      ref={cardRef}
      className={`hy-menu-card hy-menu-card--reveal${image ? "" : " hy-menu-card--text"}`}
      style={{ "--reveal-delay": `${Math.min(index, 7) * 55}ms` } as React.CSSProperties}
    >
      <span className="hy-menu-card-index" aria-hidden="true">{code}</span>
      {image && <div className={imageClass}><Image src={image} alt={name} width={1024} height={1535} unoptimized /></div>}
      <div className="hy-menu-card-copy"><h4>{name}</h4><strong>{price}</strong></div>
    </article>
  );
}
