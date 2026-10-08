"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/src/content/site";
import { mualanPhotos, workshopRecap19, wsh1909Photos } from "@/src/content/workshopRecap19";

const clamp = (n: number) => Math.max(0, Math.min(1, n));

const lionFocusRotations = [-2.2, 1.8, -1.5, 2.4, -2.0, 1.9, -1.8, 2.1, -1.6, 2.0];
const lionFocusScalesDesktop = [1.38, 1.42, 1.4, 1.38, 1.42, 1.4, 1.38, 1.42, 1.4, 1.38];
const lionFocusScalesCompact = [1.02, 1.06, 1.08, 1.04, 1.06, 1.08, 1.04, 1.06, 1.08, 1.04];
const lionCardBaseRotations = [-3, 2, -2, 3, 2.5, -3, 1.5, -2.5, 3.5, -3];
const lionCardBaseZ = [100, -70, 80, -90, -50, 90, -60, 80, 40, -40];

export function WorkshopRecap19({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const lionCurrentRef = useRef(0);
  const t = workshopRecap19[locale];

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");

    // 1. Hero & Story Elements
    const hero = article.querySelector<HTMLElement>(".recap19-hero");
    const story = article.querySelector<HTMLElement>(".recap19-story");
    const storySticky = article.querySelector<HTMLElement>(".recap19-story-sticky");
    const words = Array.from(article.querySelectorAll<HTMLElement>(".recap19-word"));
    const headingWords = Array.from(article.querySelectorAll<HTMLElement>(".recap19-heading-word"));
    const storyKicker = article.querySelector<HTMLElement>(".recap19-story-kicker");
    const storyQuote = article.querySelector<HTMLElement>("[data-story-quote]");
    const quoteBar = article.querySelector<HTMLElement>("[data-quote-bar]");

    // 2. Workshop 19.9 Gallery (public/wsh1909)
    const wshGallery = article.querySelector<HTMLElement>(".recap19-gallery");
    const wshCards = Array.from(article.querySelectorAll<HTMLElement>(".recap19-track figure"));
    const wshCaptions = Array.from(article.querySelectorAll<HTMLElement>(".recap19-caption"));
    const wshCounter = article.querySelector<HTMLElement>(".recap19-counter-current");
    const wshIntro = article.querySelector<HTMLElement>(".recap19-gallery-intro");
    const wshDeck = article.querySelector<HTMLElement>(".recap19-window");

    // 3. Lion Dance Credentials World Stage (public/mualan)
    const lionStage = article.querySelector<HTMLElement>("[data-lion-stage]");
    const lionWorld = article.querySelector<HTMLElement>("[data-lion-world]");
    const lionViewport = article.querySelector<HTMLElement>(".lion-viewport");
    const lionDocuments = Array.from(article.querySelectorAll<HTMLElement>("[data-lion-doc]"));
    const lionRecords = Array.from(article.querySelectorAll<HTMLElement>("[data-lion-record]"));
    const lionMarkers = lionDocuments
      .map((doc) => doc.querySelector<HTMLElement>(".lion-inspection"))
      .filter((m): m is HTMLElement => m !== null);
    const lionCatalog = article.querySelector<HTMLElement>(".lion-catalog");
    const lionOverviewLabel = article.querySelector<HTMLElement>(".lion-overview-label");
    const lionHeadingSpan = article.querySelector<HTMLElement>(".lion-intro h2 span");
    const lionProgressThumb = article.querySelector<HTMLElement>(".lion-progress-thumb");

    let frame = 0;
    let wshDistance = 1;
    let lionDistance = 1;
    let storyDistance = 1;
    let stageTop = 88;

    let wshTarget = 0;
    let wshCurrent = 0;
    let lionTarget = 0;
    let lionCurrent = 0;
    let storyTarget = 0;
    let storyCurrent = 0;
    let lastTime = 0;
    let compact = false;

    const smooth = (n: number) => {
      const p = clamp(n);
      return p * p * (3 - 2 * p);
    };

    // Render 3D card deck for Workshop 19.09
    const renderWshDeck = (progress: number) => {
      const opening = smooth(progress / 0.12);
      const active = clamp((progress - 0.12) / 0.85) * (wshCards.length - 1);
      if (wshCounter) wshCounter.textContent = String(Math.round(active) + 1).padStart(2, "0");
      if (wshIntro) {
        wshIntro.style.opacity = `${1 - smooth(progress / 0.13)}`;
        wshIntro.style.transform = `translate3d(0, ${-opening * 55}px, ${opening * 180}px) scale(${1 + opening * 0.12})`;
      }
      if (wshDeck) {
        wshDeck.style.opacity = `${smooth((progress - 0.02) / 0.09)}`;
        wshDeck.style.transform = `translateY(${(1 - opening) * 100}px) scale(${0.8 + opening * 0.2})`;
      }
      wshCards.forEach((card, index) => {
        const delta = index - active;
        const next = Math.max(0, delta);
        const exit = smooth(-delta);
        const x = delta < 0 ? -exit * (compact ? 115 : 110) : Math.min(next, 3) * (compact ? 8 : 10);
        const y = delta < 0 ? -exit * 12 : Math.min(next, 3) * 5;
        const rotation = delta < 0 ? -exit * 12 : Math.min(next, 3) * 4;
        const scale = delta < 0 ? 1 - exit * 0.12 : 1 - Math.min(next, 4) * 0.075;
        const opacity = delta < 0 ? 1 - smooth((-delta - 0.5) / 0.5) : 1 - smooth((next - 2) / 2);
        card.style.transform = `translate3d(${x}%, ${y}%, ${-next * 100}px) rotateY(${delta < 0 ? exit * -14 : -Math.min(next, 3) * 5}deg) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${wshCards.length - index}`;
        const image = card.querySelector<HTMLElement>("img");
        if (image) image.style.transform = `scale(${1.02 + exit * 0.055}) translateX(${exit * 3}%)`;
      });
      wshCaptions.forEach((caption, index) => {
        const proximity = Math.abs(index - active);
        caption.style.opacity = `${1 - smooth(proximity / 0.6)}`;
        caption.style.transform = `translateY(${(index - active) * 22}px)`;
        caption.style.visibility = proximity < 1 ? "visible" : "hidden";
      });
      article.style.setProperty("--gallery19-progress", `${progress}`);
    };

    // Render Credentials-Style 3D World for Múa Lân (Festival)
    const focusPose = (index: number) => {
      const doc = lionDocuments[index];
      if (!doc || !lionWorld) return { x: 0, y: 0, scale: 1, rotation: 0, rotationX: 0 };
      const scale = compact ? lionFocusScalesCompact[index] : lionFocusScalesDesktop[index];
      const x = -(doc.offsetLeft + doc.offsetWidth / 2 - lionWorld.offsetWidth / 2) * scale;
      const y = -(doc.offsetTop + doc.offsetHeight / 2 - lionWorld.offsetHeight / 2) * scale;
      return {
        x,
        y,
        scale,
        rotation: lionFocusRotations[index],
        rotationX: index % 2 === 0 ? 0.7 : -0.7,
      };
    };

    const overviewScale = () => {
      if (!lionViewport || !lionWorld) return 0.55;
      return Math.min(
        (lionViewport.clientWidth / lionWorld.offsetWidth) * (compact ? 0.95 : 0.88),
        (lionViewport.clientHeight / lionWorld.offsetHeight) * (compact ? 0.92 : 0.82)
      );
    };

    const renderLionWorld = (progress: number) => {
      lionCurrentRef.current = progress;
      if (!lionWorld || !lionViewport || lionDocuments.length !== 10) return;
      const focusEnd = 0.84;
      const numDocs = 10;

      if (lionProgressThumb) {
        lionProgressThumb.style.transform = `scaleX(${progress})`;
      }

      if (lionHeadingSpan) {
        lionHeadingSpan.style.transform = `translateX(${progress * (compact ? 3 : 6)}px)`;
      }

      if (progress <= focusEnd) {
        const stepProgress = clamp(progress / focusEnd) * (numDocs - 1);
        const baseIdx = Math.floor(stepProgress);
        const nextIdx = Math.min(numDocs - 1, baseIdx + 1);
        const frac = stepProgress - baseIdx;
        const dwellRatio = 0.55; // 55% of each scroll step is a pure resting plateau

        let transitionFrac = 0;
        if (baseIdx < numDocs - 1 && frac > dwellRatio) {
          transitionFrac = smooth((frac - dwellRatio) / (1 - dwellRatio));
        }

        const pose0 = focusPose(baseIdx);
        const pose1 = focusPose(nextIdx);

        const x = pose0.x + (pose1.x - pose0.x) * transitionFrac;
        const y = pose0.y + (pose1.y - pose0.y) * transitionFrac;
        const scale = pose0.scale + (pose1.scale - pose0.scale) * transitionFrac;
        const rotation = pose0.rotation + (pose1.rotation - pose0.rotation) * transitionFrac;
        const rotationX = pose0.rotationX + (pose1.rotationX - pose0.rotationX) * transitionFrac;

        lionWorld.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg) rotateX(${rotationX}deg)`;

        const visualIndex = baseIdx + transitionFrac;
        const activeIdx = Math.round(visualIndex);

        lionDocuments.forEach((doc, i) => {
          const dist = Math.abs(i - visualIndex);
          const activeScore = Math.max(0, 1 - dist);
          const op = 0.24 + activeScore * 0.76;
          doc.style.opacity = `${op}`;

          // Dynamically elevate the focused card so it is GUARANTEED to be in front of everything
          const restingZ = lionCardBaseZ[i] * 0.4 - 70;
          const targetZ = compact ? 120 : 180;
          const currentZ = restingZ + activeScore * (targetZ - restingZ);
          const currentRot = lionCardBaseRotations[i] * (1 - activeScore * 0.45);

          doc.style.transform = `translate3d(0, 0, ${currentZ}px) rotate(${currentRot}deg)`;
          doc.style.zIndex = i === activeIdx ? "50" : (activeScore > 0.05 ? "20" : "1");
          if (activeScore > 0.4) {
            doc.style.boxShadow = `0 ${20 + activeScore * 20}px ${40 + activeScore * 30}px rgba(15, 23, 42, ${0.16 + activeScore * 0.14}), 0 4px 14px rgba(15, 23, 42, 0.08)`;
          } else {
            doc.style.boxShadow = "";
          }
        });

        lionMarkers.forEach((m, i) => {
          const dist = Math.abs(i - visualIndex);
          const active = Math.max(0, 1 - dist * 1.8);
          m.style.opacity = `${active}`;
        });

        lionRecords.forEach((rec, i) => {
          if (i === baseIdx) {
            const op = 1 - transitionFrac;
            rec.style.visibility = op > 0.01 ? "visible" : "hidden";
            rec.style.opacity = `${op}`;
            rec.style.transform = `translateY(${-transitionFrac * 12}px)`;
            rec.style.clipPath = `inset(0% 0% ${transitionFrac * 100}% 0%)`;
          } else if (i === nextIdx && transitionFrac > 0) {
            const op = transitionFrac;
            rec.style.visibility = op > 0.01 ? "visible" : "hidden";
            rec.style.opacity = `${op}`;
            rec.style.transform = `translateY(${(1 - transitionFrac) * 12}px)`;
            rec.style.clipPath = `inset(${(1 - transitionFrac) * 100}% 0% 0% 0%)`;
          } else {
            rec.style.visibility = "hidden";
            rec.style.opacity = "0";
            rec.style.transform = "translateY(12px)";
            rec.style.clipPath = "inset(100% 0% 0% 0%)";
          }
        });

        if (lionCatalog) {
          lionCatalog.style.opacity = "1";
          lionCatalog.style.visibility = "visible";
        }
        if (lionOverviewLabel) {
          lionOverviewLabel.style.opacity = "0";
        }
      } else {
        const t = smooth((progress - focusEnd) / (1 - focusEnd));
        const poseLast = focusPose(numDocs - 1);
        const ovScale = overviewScale();

        const x = (1 - t) * poseLast.x;
        const y = (1 - t) * poseLast.y;
        const scale = (1 - t) * poseLast.scale + t * ovScale;
        const rotation = (1 - t) * poseLast.rotation;
        const rotationX = (1 - t) * poseLast.rotationX;

        lionWorld.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg) rotateX(${rotationX}deg)`;

        lionDocuments.forEach((doc, i) => {
          doc.style.opacity = `${0.35 + t * 0.65}`;
          doc.style.zIndex = "5";
          const baseZ = lionCardBaseZ[i];
          const rot = lionCardBaseRotations[i];
          doc.style.transform = `translate3d(0, 0, ${baseZ}px) rotate(${rot}deg)`;
          doc.style.boxShadow = "";
        });

        lionMarkers.forEach((m) => {
          m.style.opacity = `${(1 - t) * (m === lionMarkers[numDocs - 1] ? 1 : 0)}`;
        });

        if (lionCatalog) {
          lionCatalog.style.opacity = `${1 - smooth(t / 0.55)}`;
          lionCatalog.style.visibility = t > 0.75 ? "hidden" : "visible";
        }
        if (lionOverviewLabel) {
          lionOverviewLabel.style.opacity = `${smooth((t - 0.35) / 0.65)}`;
        }
      }
    };

    // Render Pinned Story Reading Section with Kinetic Illumination & Dwell
    const renderStory = (progress: number) => {
      // 1. Clean Kicker Subtle Fade-in (0.00 to 0.12)
      const metaOp = smooth(progress / 0.12);
      if (storyKicker) {
        storyKicker.style.opacity = `${metaOp}`;
        storyKicker.style.transform = `translateY(${(1 - metaOp) * 10}px)`;
      }

      // 3. Heading Kinetic 3D Assembly (0.02 to 0.22)
      headingWords.forEach((word, index) => {
        const start = 0.02 + index * 0.016;
        const dur = 0.09;
        const hProgress = smooth((progress - start) / dur);
        word.style.opacity = `${0.18 + hProgress * 0.82}`;
        word.style.transform = `perspective(800px) translateY(${(1 - hProgress) * 22}px) rotateX(${(1 - hProgress) * -26}deg)`;
        word.style.color = hProgress > 0.6 ? "#0f172a" : "#64748b";
      });

      // 4. Paragraph Word-by-Word Kinetic Illumination (0.16 to 0.74)
      const totalWords = words.length;
      words.forEach((word, index) => {
        const center = 0.16 + (index / Math.max(totalWords - 1, 1)) * (0.74 - 0.16);
        const diff = progress - center;

        if (diff < -0.032) {
          // Future word: dim steel, slight blur
          word.style.opacity = "0.2";
          word.style.transform = "translateY(5px) scale(0.98)";
          word.style.color = "#94a3b8";
          word.style.filter = "blur(1.2px)";
          word.style.textShadow = "none";
        } else if (diff >= -0.032 && diff <= 0.026) {
          // Active reading wave: vivid illuminated cyan/blue
          word.style.opacity = "1";
          word.style.transform = "translateY(-2px) scale(1.05)";
          word.style.color = "#0284c7";
          word.style.filter = "blur(0px)";
          word.style.textShadow = "0 0 14px rgba(2, 132, 199, 0.4)";
        } else {
          // Completed word: solid deep obsidian, sharp and crisp
          word.style.opacity = "1";
          word.style.transform = "translateY(0) scale(1)";
          word.style.color = "#0f172a";
          word.style.filter = "blur(0px)";
          word.style.textShadow = "none";
        }
      });

      // 5. Quote Reveal (0.72 to 0.85)
      const qProgress = smooth((progress - 0.72) / 0.13);
      if (storyQuote) {
        storyQuote.style.opacity = `${0.15 + qProgress * 0.85}`;
        storyQuote.style.transform = `translateY(${(1 - qProgress) * 16}px)`;
        storyQuote.style.color = qProgress > 0.5 ? "#0284c7" : "#64748b";
      }
      if (quoteBar) {
        quoteBar.style.transform = `scaleY(${qProgress})`;
      }

      // 6. Complete Reading Plateau (0.85 to 1.00):
      // All words and quote are 100% visible, fully illuminated, holding firmly in viewport
      // for comfortable reading before unpinning.
    };

    const update = (time: number) => {
      frame = 0;
      if (!media.matches || !hero || !story) return;
      const elapsed = Math.min(time - (lastTime || time - 16), 64);
      lastTime = time;

      // Inertial smoothing for Workshop Deck
      wshCurrent += (wshTarget - wshCurrent) * (1 - Math.exp(-elapsed / 100));
      if (Math.abs(wshCurrent - wshTarget) < 0.0001) wshCurrent = wshTarget;
      if (wshGallery) {
        renderWshDeck(wshCurrent);
      }

      // Inertial smoothing for Lion Dance World
      lionCurrent += (lionTarget - lionCurrent) * (1 - Math.exp(-elapsed / 80));
      if (Math.abs(lionCurrent - lionTarget) < 0.0001) lionCurrent = lionTarget;
      if (lionStage) {
        renderLionWorld(lionCurrent);
      }

      // Inertial smoothing for Pinned Story Section
      storyCurrent += (storyTarget - storyCurrent) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(storyCurrent - storyTarget) < 0.0001) storyCurrent = storyTarget;
      if (story) {
        renderStory(storyCurrent);
      }

      // Hero Parallax
      const heroProgress = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
      article.style.setProperty("--hero19-drift", `${heroProgress * (compact ? 22 : 90)}px`);
      article.style.setProperty("--hero19-scale", `${1 + heroProgress * 0.15}`);

      if (wshCurrent !== wshTarget || lionCurrent !== lionTarget || storyCurrent !== storyTarget) {
        frame = requestAnimationFrame(update);
      }
    };

    const schedule = () => {
      if (wshGallery) wshTarget = clamp((stageTop - wshGallery.getBoundingClientRect().top) / wshDistance);
      if (lionStage) lionTarget = clamp((stageTop - lionStage.getBoundingClientRect().top) / lionDistance);
      if (story) storyTarget = clamp((stageTop - story.getBoundingClientRect().top) / storyDistance);
      if (!frame) {
        lastTime = 0;
        frame = requestAnimationFrame(update);
      }
    };

    const measure = () => {
      compact = window.innerWidth <= 800;
      stageTop = compact ? 66 : 88;
      article.classList.toggle("recap19-motion", media.matches);

      if (media.matches) {
        if (story) {
          storyDistance = window.innerHeight * (compact ? 2.2 : 2.8);
          story.style.height = `${storyDistance + window.innerHeight - stageTop}px`;
          renderStory(storyCurrent);
        }
        if (wshGallery) {
          wshDistance = (wshCards.length - 1) * window.innerHeight * (compact ? 0.52 : 0.55) + window.innerHeight * 0.7;
          wshGallery.style.height = `${wshDistance + window.innerHeight - stageTop}px`;
          renderWshDeck(wshCurrent);
        }
        if (lionStage) {
          lionDistance = (mualanPhotos.length + 2.5) * window.innerHeight * (compact ? 0.65 : 0.78);
          lionStage.style.height = `${lionDistance + window.innerHeight - stageTop}px`;
          renderLionWorld(lionCurrent);
        }
        article.style.setProperty("--stage19-top", `${stageTop}px`);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        story?.style.removeProperty("height");
        wshGallery?.style.removeProperty("height");
        lionStage?.style.removeProperty("height");
        [
          storySticky,
          storyKicker,
          ...words,
          ...headingWords,
          storyQuote,
          quoteBar,
          wshIntro,
          wshDeck,
          ...wshCards,
          ...wshCaptions,
          lionWorld,
          ...lionDocuments,
          ...lionRecords,
          lionCatalog,
          lionOverviewLabel,
          lionHeadingSpan,
          lionProgressThumb,
          ...Array.from(article.querySelectorAll<HTMLElement>(".recap19-track img")),
        ].forEach((el) => el?.removeAttribute("style"));
        article.style.removeProperty("--hero19-drift");
        article.style.removeProperty("--hero19-scale");
      }
      schedule();
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, [locale]);

  const scrollToStory = (e: React.MouseEvent) => {
    e.preventDefault();
    const article = root.current;
    const story = article?.querySelector<HTMLElement>("#workshop-1909-story");
    if (!article || !story) return;
    const top = parseFloat(getComputedStyle(article).getPropertyValue("--stage19-top")) || 88;
    const targetY = window.scrollY + story.getBoundingClientRect().top - top;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const moveWshGallery = (direction: number) => {
    const article = root.current;
    const gallery = article?.querySelector<HTMLElement>(".recap19-gallery");
    if (!gallery || !article?.classList.contains("recap19-motion")) return;
    const top = parseFloat(getComputedStyle(article).getPropertyValue("--stage19-top")) || 88;
    const distance = gallery.offsetHeight - window.innerHeight + top;
    const progress = clamp((top - gallery.getBoundingClientRect().top) / distance);
    const active = Math.round(clamp((progress - 0.12) / 0.85) * (wsh1909Photos.length - 1));
    const target = 0.12 + (Math.max(0, Math.min(wsh1909Photos.length - 1, active + direction)) / (wsh1909Photos.length - 1)) * 0.85;
    window.scrollTo({
      top: window.scrollY + gallery.getBoundingClientRect().top - top + target * distance,
      behavior: "smooth",
    });
  };

  const moveLionStage = (direction: number) => {
    const article = root.current;
    const stage = article?.querySelector<HTMLElement>("[data-lion-stage]");
    if (!stage || !article?.classList.contains("recap19-motion")) return;
    const top = parseFloat(getComputedStyle(article).getPropertyValue("--stage19-top")) || 88;
    const distance = stage.offsetHeight - window.innerHeight + top;
    const focusEnd = 0.85;
    const total = mualanPhotos.length;
    const currentStep = clamp(lionCurrentRef.current / focusEnd) * (total - 1);
    const currentIdx = Math.round(currentStep);
    const targetIdx = Math.max(0, Math.min(total - 1, currentIdx + direction));
    const targetStep = targetIdx + (targetIdx < total - 1 ? 0.25 : 0);
    const targetProgress = (targetStep / (total - 1)) * focusEnd;
    window.scrollTo({
      top: window.scrollY + stage.getBoundingClientRect().top - top + targetProgress * distance,
      behavior: "smooth",
    });
  };

  return (
    <article ref={root} className="recap19 recap19-motion" aria-labelledby="recap19-title">
      {/* 1. LION DANCE CREDENTIALS-STYLE 3D WORLD STAGE (20.09.2026 - public/mualan - 10 PHOTOS) */}
      <section className="lion-stage" id="mualan-festive" data-lion-stage aria-label="Múa Lân Hỷ Garden">
        <div className="lion-sticky">
          <div className="lion-intro">
            <span className="eyebrow">{t.lionEyebrow}</span>
            <h2>
              {t.lionHeadTitle[0]}
              <br />
              <span>{t.lionHeadTitle[1]}</span>
            </h2>
          </div>

          <div className="lion-catalog" aria-live="off">
            {mualanPhotos.map((photo, index) => (
              <div
                className={`lion-record lion-record--${index}`}
                data-lion-record
                key={`record-${photo.id}`}
              >
                <span className="lion-record-index">
                  {String(index + 1).padStart(2, "0")} / 10 <i>{t.lionArchiveLabel}</i>
                </span>
                <h3>{t.lionTitles[index]}</h3>
                <p>
                  HỶ GARDEN — ĐÀ NẴNG <span>20.09.2026</span>
                </p>
                <small>{t.lionCaptions[index]}</small>
              </div>
            ))}
          </div>

          <div className="lion-viewport">
            <div className="lion-world" data-lion-world>
              <div className="lion-world-guide" aria-hidden="true" />
              {mualanPhotos.map((photo, index) => (
                <figure
                  className={`lion-document lion-document--${index}`}
                  data-lion-doc
                  key={`document-${photo.id}`}
                >
                  <Image
                    src={photo.src}
                    alt={t.lionCaptions[index]}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 800px) 240px, 320px"
                    unoptimized
                  />
                  <span className="lion-inspection" aria-hidden="true">
                    <i />
                    <i />
                    <small>DOC {String(index + 1).padStart(2, "0")} / 10</small>
                  </span>
                </figure>
              ))}
            </div>
            <span className="lion-overview-label" aria-hidden="true">
              {t.lionOverviewLabel}
            </span>
          </div>

          <div className="lion-controls-bar">
            <div className="lion-controls">
              <button type="button" aria-label={t.previous} onClick={() => moveLionStage(-1)}>
                ←
              </button>
              <button type="button" aria-label={t.next} onClick={() => moveLionStage(1)}>
                →
              </button>
            </div>
          </div>

          <div className="lion-progress-track">
            <span className="lion-progress-thumb" />
          </div>
        </div>
      </section>

      {/* 2. WORKSHOP 19.9 HERO SECTION (19.09.2026) */}
      <section className="recap19-hero" id="workshop-1909">
        <div className="site-container">
          <div className="recap19-topline">
            <span>{t.label}</span>
            <time dateTime="2026-09-19">{t.date}</time>
          </div>
          <h1 id="recap19-title">
            <span>{t.title[0]}</span>
            <span>{t.title[1]}</span>
          </h1>
          <div className="recap19-hero-bottom">
            <p>{t.lead}</p>
            <a href="#workshop-1909-story" onClick={scrollToStory}>
              {t.scroll} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. WORKSHOP 19.9 PINNED STORY READING SECTION */}
      <section id="workshop-1909-story" className="recap19-story" data-story-stage>
        <div className="recap19-story-sticky">
          <div className="site-container recap19-story-grid">
            <div className="recap19-story-left">
              <div className="recap19-story-kicker">
                <span className="recap19-story-kicker-line" aria-hidden="true" />
                <span className="recap19-story-kicker-text">01 / AI / STORYTELLING / COMMUNITY</span>
              </div>

              <h2 aria-label={t.intro} className="recap19-story-heading">
                {t.intro.split(" ").map((word, i) => (
                  <span key={i} className="recap19-heading-word" aria-hidden="true">
                    {word}{" "}
                  </span>
                ))}
              </h2>
            </div>

            <div className="recap19-story-right">
              <p className="recap19-reading" aria-label={t.story}>
                {t.story.split(" ").map((word, i) => (
                  <span key={i} className="recap19-word" aria-hidden="true">
                    {word}{" "}
                  </span>
                ))}
              </p>

              <blockquote className="recap19-quote" data-story-quote>
                <div className="recap19-quote-bar" data-quote-bar />
                <p>“{t.quote}”</p>
              </blockquote>
            </div>
          </div>

          <div className="recap19-story-ambient" aria-hidden="true">
            <div className="recap19-story-radial" />
            <div className="recap19-story-gridlines" />
            <span className="recap19-story-watermark">STORYTELLING</span>
          </div>
        </div>
      </section>

      {/* 4. WORKSHOP 19.9 PINNED 3D GALLERY (public/wsh1909 - 7 PHOTOS) */}
      <section className="recap19-gallery" aria-labelledby="recap19-gallery-title">
        <div className="recap19-sticky">
          <div className="site-container recap19-gallery-head">
            <div>
              <span className="eyebrow">{`02 / ${t.galleryHint}`}</span>
              <h2 id="recap19-gallery-title">{t.gallery}</h2>
            </div>
            <div className="recap19-controls">
              <button type="button" aria-label={t.previous} onClick={() => moveWshGallery(-1)}>
                ←
              </button>
              <button type="button" aria-label={t.next} onClick={() => moveWshGallery(1)}>
                →
              </button>
            </div>
          </div>

          <div className="recap19-gallery-intro" aria-hidden="true">
            <span>{t.deckBadge}</span>
            <strong>
              {t.deckTitle[0]}
              <br />
              <em>{t.deckTitle[1]}</em>
            </strong>
          </div>

          <div className="recap19-window">
            <div className="recap19-track">
              {wsh1909Photos.map((photo, i) => (
                <figure key={photo.id} data-shape="portrait">
                  <div className="recap19-image">
                    <Image
                      src={photo.src}
                      alt={t.captions[i]}
                      width={photo.width}
                      height={photo.height}
                      unoptimized
                    />
                  </div>
                  <figcaption>
                    <span>{`0${i + 1} / 07`}</span>
                    {t.captions[i]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="site-container recap19-gallery-footer">
            <div className="recap19-counter" aria-hidden="true">
              <span className="recap19-counter-current">01</span>
              <span> / 07</span>
            </div>
            <div className="recap19-caption-stage">
              {t.captions.map((caption) => (
                <p key={caption} className="recap19-caption">
                  {caption}
                </p>
              ))}
            </div>
            <div className="recap19-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEXT WORKSHOP CTA */}
      <section className="section-space rule news-next">
        <div className="site-container news-next-inner" data-reveal>
          <div>
            <span className="eyebrow">{t.nextLabel}</span>
            <h2 className="section-title">{t.nextTitle}</h2>
            <p className="body-large">{t.nextCopy}</p>
          </div>
          <Link href={`/${locale}/workshop`} className="button-primary">
            {t.cta}
          </Link>
        </div>
      </section>
    </article>
  );
}
