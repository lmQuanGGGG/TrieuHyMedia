"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = [
      "[data-reveal]",
      ".hero-copy",
      ".split-section > *",
      ".garden-intro > *",
      ".garden-gallery",
      ".section-heading-row > *",
      ".service-row",
      ".approach-list > li",
      ".principles-grid > *",
      ".company-row",
      ".cocodrama-preview-copy",
      ".cocodrama-phone-stage",
      ".page-hero-grid > div",
      ".editorial-section",
      ".about-gallery-grid",
      ".services-visual-grid",
      ".service-detail",
      ".contact-layout > div",
      ".legal-layout > *",
      ".coco-hero-copy",
      ".coco-device-scene",
      ".coco-access-grid article",
      ".coco-localization-grid > *",
      ".coco-language-list > div",
      ".coco-product-gallery figure",
      ".closing-cta > .site-container",
      ".footer-grid > *",
    ].join(", ");
    const revealElements = Array.from(new Set(document.querySelectorAll<HTMLElement>(selector)));

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add("reveal-visible"));
      return;
    }

    revealElements.forEach((element) => {
      element.classList.add("reveal-item");
      const siblings = Array.from(element.parentElement?.children ?? []);
      const index = siblings.indexOf(element);
      element.style.setProperty("--reveal-delay", `${Math.min(Math.max(index, 0) * 65, 260)}ms`);
      if (element.parentElement?.matches(".split-section, .garden-intro, .section-heading-row, .contact-layout, .coco-localization-grid, .page-hero-grid")) {
        element.classList.add(index % 2 === 0 ? "reveal-left" : "reveal-right");
      }
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -9% 0px" },
    );
    revealElements.forEach((element) => observer.observe(element));

    const tiltElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = tiltElements.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        element.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        element.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        element.style.setProperty("--pointer-x", `${x * 100}%`);
        element.style.setProperty("--pointer-y", `${y * 100}%`);
      };
      const leave = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        element.style.setProperty("--pointer-x", "50%");
        element.style.setProperty("--pointer-y", "50%");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
