"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/src/content/site";
import { workshopRecap } from "@/src/content/workshopRecap";

const assets = "/news/workshop-2709/";
const photos = ["session", "speaker", "portrait", "conversation", "listener", "ideas", "community"];
const clamp = (n: number) => Math.max(0, Math.min(1, n));

function useTypewriter(title: [string, string], speed = 36) {
  const [displayed1, setDisplayed1] = useState("");
  const [displayed2, setDisplayed2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2>(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed1(title[0]);
      setDisplayed2(title[1]);
      setIsDone(true);
      return;
    }

    setDisplayed1("");
    setDisplayed2("");
    setActiveLine(1);
    setIsDone(false);

    let idx1 = 0;
    let idx2 = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeLine1 = () => {
      if (idx1 < title[0].length) {
        idx1++;
        setDisplayed1(title[0].slice(0, idx1));
        timer = setTimeout(typeLine1, speed + (Math.random() * 10 - 5));
      } else {
        setActiveLine(2);
        timer = setTimeout(typeLine2, 160);
      }
    };

    const typeLine2 = () => {
      if (idx2 < title[1].length) {
        idx2++;
        setDisplayed2(title[1].slice(0, idx2));
        timer = setTimeout(typeLine2, speed + (Math.random() * 10 - 5));
      } else {
        setIsDone(true);
      }
    };

    timer = setTimeout(typeLine1, 160);

    return () => clearTimeout(timer);
  }, [title[0], title[1], speed]);

  return { displayed1, displayed2, activeLine, isDone };
}

export function WorkshopRecap({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = workshopRecap[locale];
  const { displayed1, displayed2, activeLine, isDone } = useTypewriter(t.title, 36);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const hero = article.querySelector<HTMLElement>(".recap27-hero");
    const story = article.querySelector<HTMLElement>(".recap27-story");
    const storySticky = article.querySelector<HTMLElement>(".recap27-story-sticky");
    const storyKicker = article.querySelector<HTMLElement>(".recap27-story-kicker");
    const words = Array.from(article.querySelectorAll<HTMLElement>(".recap27-word"));
    const headingWords = Array.from(article.querySelectorAll<HTMLElement>(".recap27-heading-word"));
    const storyQuote = article.querySelector<HTMLElement>("[data-story-quote]");
    const quoteBar = article.querySelector<HTMLElement>("[data-quote-bar]");
    const gallery = article.querySelector<HTMLElement>(".recap27-gallery");
    const cards = Array.from(article.querySelectorAll<HTMLElement>(".recap27-track figure"));
    const captions = Array.from(article.querySelectorAll<HTMLElement>(".recap27-caption"));
    const counter = article.querySelector<HTMLElement>(".recap27-counter-current");
    const intro = article.querySelector<HTMLElement>(".recap27-gallery-intro");
    const deck = article.querySelector<HTMLElement>(".recap27-window");
    let frame = 0;
    let distance = 1;
    let storyDistance = 1;
    let stageTop = 88;
    let target = 0;
    let current = 0;
    let storyTarget = 0;
    let storyCurrent = 0;
    let videoTarget = 0;
    let videoCurrent = 0;
    let lastTime = 0;
    let compact = false;
    const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };

    const renderDeck = (progress: number) => {
      const opening = smooth(progress / .13);
      const active = clamp((progress - .13) / .84) * (cards.length - 1);
      if (counter) counter.textContent = String(Math.round(active) + 1).padStart(2, "0");
      if (intro) {
        intro.style.opacity = `${1 - smooth(progress / .14)}`;
        intro.style.transform = `translate3d(0, ${-opening * 55}px, ${opening * 180}px) scale(${1 + opening * .12})`;
      }
      if (deck) {
        deck.style.opacity = `${smooth((progress - .025) / .09)}`;
        deck.style.transform = `translateY(${(1 - opening) * 100}px) scale(${.8 + opening * .2})`;
      }
      cards.forEach((card, index) => {
        const delta = index - active;
        const next = Math.max(0, delta);
        const exit = smooth(-delta);
        const x = delta < 0 ? -exit * (compact ? 115 : 110) : Math.min(next, 3) * (compact ? 8 : 10);
        const y = delta < 0 ? -exit * 12 : Math.min(next, 3) * 5;
        const rotation = delta < 0 ? -exit * 12 : Math.min(next, 3) * 4;
        const scale = delta < 0 ? 1 - exit * .12 : 1 - Math.min(next, 4) * .075;
        const opacity = delta < 0 ? 1 - smooth((-delta - .5) / .5) : 1 - smooth((next - 2) / 2);
        card.style.transform = `translate3d(${x}%, ${y}%, ${-next * 100}px) rotateY(${delta < 0 ? exit * -14 : -Math.min(next, 3) * 5}deg) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${cards.length - index}`;
        const image = card.querySelector<HTMLElement>("img");
        if (image) image.style.transform = `scale(${1.02 + exit * .055}) translateX(${exit * 3}%)`;
      });
      captions.forEach((caption, index) => {
        const proximity = Math.abs(index - active);
        caption.style.opacity = `${1 - smooth(proximity / .6)}`;
        caption.style.transform = `translateY(${(index - active) * 22}px)`;
        caption.style.visibility = proximity < 1 ? "visible" : "hidden";
      });
      article.style.setProperty("--gallery-progress", `${progress}`);
    };

    const renderStory = (progress: number) => {
      // 1. Eyebrow Kicker Glide from Left (0.00 -> 0.12)
      const kickerOp = smooth(progress / 0.12);
      if (storyKicker) {
        storyKicker.style.opacity = `${kickerOp}`;
        storyKicker.style.transform = `translate3d(${(1 - kickerOp) * -24}px, 0, 0)`;
      }

      // 2. Heading Words Wave Assembly (0.05 -> 0.28)
      headingWords.forEach((word, index) => {
        const center = 0.05 + (index / Math.max(headingWords.length - 1, 1)) * 0.20;
        const diff = progress - center;
        const half = 0.045;
        if (diff < -half) {
          word.style.opacity = "0.18";
          word.style.color = "#8fa89b";
          word.style.transform = "translate3d(-24px, 8px, 0) scale(0.96)";
        } else if (diff >= -half && diff <= half) {
          const w = (diff + half) / (half * 2);
          const x = (1 - w) * -24;
          const waveY = Math.sin(w * Math.PI) * -16;
          const rot = Math.sin(w * Math.PI * 2) * -3;
          const scale = 0.96 + Math.sin(w * Math.PI) * 0.09;
          const op = 0.18 + smooth(w) * 0.82;
          word.style.opacity = `${op}`;
          word.style.color = "#073e32";
          word.style.transform = `translate3d(${x.toFixed(1)}px, ${waveY.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) rotate(${rot.toFixed(1)}deg)`;
        } else {
          word.style.opacity = "1";
          word.style.color = "#073e32";
          word.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        }
      });

      // 3. Story Paragraph Words Undulating Wave from Left to Right (0.22 -> 0.78)
      const totalWords = words.length;
      words.forEach((word, index) => {
        const center = 0.22 + (index / Math.max(totalWords - 1, 1)) * 0.54;
        const diff = progress - center;
        const half = 0.042;

        if (diff < -half) {
          // Waiting state: offset to left, softly dipped, muted sage
          word.style.opacity = "0.14";
          word.style.color = "#8fa89b";
          word.style.filter = "blur(1.5px)";
          word.style.textShadow = "none";
          word.style.transform = "translate3d(-20px, 8px, 0) scale(0.95)";
        } else if (diff >= -half && diff <= half) {
          // Active Undulating Wave ("uốn lượn từng chữ một đi từ trái qua phải")
          const w = (diff + half) / (half * 2); // 0 to 1
          const x = (1 - w) * -20; // moving smoothly from left to right
          const waveY = Math.sin(w * Math.PI) * -15; // harmonic vertical sine wave crest
          const rot = Math.sin(w * Math.PI * 2) * 2.5; // fluid rocking tilt
          const scale = 0.95 + Math.sin(w * Math.PI) * 0.12; // crest pulse
          const op = 0.14 + smooth(w) * 0.86;

          word.style.opacity = `${op.toFixed(2)}`;
          word.style.color = "#047857"; // luminous emerald green highlight
          word.style.filter = "blur(0px)";
          word.style.textShadow = "0 0 14px rgba(16, 185, 129, 0.4)";
          word.style.transform = `translate3d(${x.toFixed(1)}px, ${waveY.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) rotate(${rot.toFixed(1)}deg)`;
        } else {
          // Landed & rested cleanly
          word.style.opacity = "1";
          word.style.color = "#073e32";
          word.style.filter = "blur(0px)";
          word.style.textShadow = "none";
          word.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        }
      });

      // 4. Quote reveal (0.74 -> 0.86)
      const qProg = smooth((progress - 0.74) / 0.12);
      if (quoteBar) {
        quoteBar.style.transform = `scaleY(${qProg})`;
      }
      if (storyQuote) {
        storyQuote.style.opacity = `${qProg}`;
        storyQuote.style.transform = `translate3d(${(1 - qProg) * -24}px, ${(1 - qProg) * 8}px, 0)`;
      }
    };

    const update = (time: number) => {
      frame = 0;
      if (!media.matches || !hero || !story || !gallery) return;
      const elapsed = Math.min(time - (lastTime || time - 16), 64);
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 100));
      if (Math.abs(current - target) < .0001) current = target;
      renderDeck(current);
      const heroProgress = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
      article.style.setProperty("--hero-drift", `${heroProgress * (compact ? 22 : 90)}px`);
      article.style.setProperty("--hero-scale", `${1 + heroProgress * .15}`);

      // Smooth scroll zoom for Video Frame
      videoCurrent += (videoTarget - videoCurrent) * (1 - Math.exp(-elapsed / 80));
      if (Math.abs(videoCurrent - videoTarget) < 0.0001) videoCurrent = videoTarget;

      const videoFrame = article.querySelector<HTMLElement>(".recap27-video-frame");
      if (videoFrame) {
        const zoom = smooth(videoCurrent);
        const frameScale = 0.82 + zoom * 0.18; // Scales up from 0.82 to 1.0!
        const frameY = (1 - zoom) * 45;
        const frameRadius = 38 - zoom * 10;
        videoFrame.style.transform = `translate3d(0, ${frameY}px, 0) scale(${frameScale})`;
        videoFrame.style.borderRadius = `${frameRadius}px`;
        const vVideo = videoFrame.querySelector<HTMLElement>("video");
        if (vVideo) {
          vVideo.style.transform = `scale(${1.12 - zoom * 0.12})`;
          vVideo.style.borderRadius = `${frameRadius}px`;
        }
      }

      // Smooth scroll for Pinned Story Reading Section
      storyCurrent += (storyTarget - storyCurrent) * (1 - Math.exp(-elapsed / 80));
      if (Math.abs(storyCurrent - storyTarget) < 0.0001) storyCurrent = storyTarget;
      renderStory(storyCurrent);

      if (
        Math.abs(current - target) > 0.001 ||
        Math.abs(videoCurrent - videoTarget) > 0.001 ||
        Math.abs(storyCurrent - storyTarget) > 0.001
      ) {
        frame = requestAnimationFrame(update);
      }
    };
    const schedule = () => {
      if (gallery) target = clamp((stageTop - gallery.getBoundingClientRect().top) / distance);
      if (story) storyTarget = clamp((stageTop - story.getBoundingClientRect().top) / storyDistance);
      const videoFrame = article.querySelector<HTMLElement>(".recap27-video-frame");
      if (videoFrame) {
        const rect = videoFrame.getBoundingClientRect();
        videoTarget = clamp((window.innerHeight * 0.95 - rect.top) / (window.innerHeight * 0.72));
      }
      if (!frame) { lastTime = 0; frame = requestAnimationFrame(update); }
    };
    const measure = () => {
      compact = window.innerWidth <= 700;
      stageTop = compact ? 66 : 88;
      article.classList.toggle("recap27-motion", media.matches);
      if (media.matches && gallery && story) {
        distance = (cards.length - 1) * window.innerHeight * (compact ? .52 : .55) + window.innerHeight * .7;
        gallery.style.height = `${distance + window.innerHeight - stageTop}px`;
        storyDistance = window.innerHeight * (compact ? 2.4 : 2.8);
        story.style.height = `${storyDistance + window.innerHeight - stageTop}px`;
        article.style.setProperty("--stage-top", `${stageTop}px`);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        gallery?.style.removeProperty("height");
        story?.style.removeProperty("height");
        [intro, deck, ...cards, ...captions, storySticky, storyKicker, ...words, ...headingWords, storyQuote, quoteBar, ...Array.from(article.querySelectorAll<HTMLElement>(".recap27-track img, .recap27-video-frame, .recap27-video-frame video"))].forEach((el) => el?.removeAttribute("style"));
        article.style.removeProperty("--hero-drift");
        article.style.removeProperty("--hero-scale");
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

  const moveGallery = (direction: number) => {
    const article = root.current;
    const gallery = article?.querySelector<HTMLElement>(".recap27-gallery");
    if (!gallery || !article?.classList.contains("recap27-motion")) return;
    const top = parseFloat(getComputedStyle(article).getPropertyValue("--stage-top"));
    const distance = gallery.offsetHeight - window.innerHeight + top;
    const progress = clamp((top - gallery.getBoundingClientRect().top) / distance);
    const active = Math.round(clamp((progress - .13) / .84) * (photos.length - 1));
    const target = .13 + Math.max(0, Math.min(photos.length - 1, active + direction)) / (photos.length - 1) * .84;
    window.scrollTo({ top: window.scrollY + gallery.getBoundingClientRect().top - top + target * distance, behavior: "smooth" });
  };

  const scrollToVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    const article = root.current;
    const video = article?.querySelector<HTMLElement>("#workshop-2709-video");
    if (!video) return;
    const top = 88;
    window.scrollTo({
      top: window.scrollY + video.getBoundingClientRect().top - top,
      behavior: "smooth",
    });
  };

  return (
    <article ref={root} className="recap27" aria-labelledby="recap27-title">
      {/* 1. HERO SECTION WITH CLEAN ANTIGRAVITY-STYLE CENTERED TYPEWRITER EFFECT */}
      <section className="recap27-hero">
        <div className="site-container recap27-hero-inner">
          <div className="recap27-kicker">
            <span className="recap27-kicker-title">WORKSHOP RECAP</span>
            <span className="recap27-kicker-sep" aria-hidden="true">/</span>
            <time dateTime="2026-09-27" className="recap27-kicker-date">27.09.2026</time>
          </div>

          <div className="recap27-hero-center">
            <h1 id="recap27-title" aria-label={`${t.title[0]} ${t.title[1]}`}>
              <span className="recap27-title-line">
                {displayed1}
                {activeLine === 1 && !isDone && (
                  <span className="recap27-cursor" aria-hidden="true">|</span>
                )}
              </span>
              <span className="recap27-title-line">
                {displayed2 || (activeLine === 1 ? "\u00A0" : "")}
                {activeLine === 2 && !isDone && (
                  <span className="recap27-cursor" aria-hidden="true">|</span>
                )}
                {isDone && (
                  <span className="recap27-cursor recap27-cursor--idle" aria-hidden="true">|</span>
                )}
              </span>
            </h1>

            <p className="recap27-lead">{t.lead}</p>
          </div>

          <div className="recap27-hero-bottom">
            <a href="#workshop-2709-video" onClick={scrollToVideo}>
              <span>{t.scroll}</span>
              <span className="recap27-scroll-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED RECAP VIDEO SECTION (VUỐT XUỐNG DƯỚI MỚI TỚI - BO GÓC TRÒN XỊN XÒ) */}
      <section id="workshop-2709-video" className="recap27-video-section">
        <div className="site-container">
          <figure className="recap27-video-frame">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${assets}session.webp`}
              aria-label="Workshop recap video"
            >
              <source src={`${assets}recap.mp4`} type="video/mp4" />
            </video>
            <figcaption>
              TRIỆU HỶ MEDIA × HỶ GARDEN – VULEE <span>ĐÀ NẴNG / 14:00–16:00</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 3. WORKSHOP STORY READING SECTION - PINNED STICKY READING STAGE */}
      <section id="workshop-2709-story" className="recap27-story">
        <div className="recap27-story-sticky">
          <div className="site-container recap27-story-grid">
            <div className="recap27-story-left">
              <div className="recap27-story-kicker">
                <span className="recap27-story-kicker-line" aria-hidden="true" />
                <span className="recap27-story-kicker-text">01 / AI / STORYTELLING / COMMUNITY</span>
              </div>
              <h2 aria-label={t.intro} className="recap27-story-heading">
                {t.intro.split(" ").map((word, i) => (
                  <span key={i} className="recap27-heading-word" aria-hidden="true">
                    {word}{" "}
                  </span>
                ))}
              </h2>
            </div>
            <div className="recap27-story-right">
              <p className="recap27-reading" aria-label={t.story}>
                {t.story.split(" ").map((word, i) => (
                  <span key={i} className="recap27-word" aria-hidden="true">
                    {word}{" "}
                  </span>
                ))}
              </p>
              <blockquote className="recap27-quote" data-story-quote>
                <div className="recap27-quote-bar" data-quote-bar />
                <p>“{t.quote}”</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKSHOP PINNED 3D GALLERY */}
      <section className="recap27-gallery" aria-labelledby="recap27-gallery-title">
        <div className="recap27-sticky">
          <div className="site-container recap27-gallery-head">
            <div>
              <span className="eyebrow">02 / {t.galleryHint}</span>
              <h2 id="recap27-gallery-title">{t.gallery}</h2>
            </div>
            <div className="recap27-controls">
              <button type="button" aria-label={t.previous} onClick={() => moveGallery(-1)}>
                ←
              </button>
              <button type="button" aria-label={t.next} onClick={() => moveGallery(1)}>
                →
              </button>
            </div>
          </div>
          <div className="recap27-gallery-intro" aria-hidden="true">
            <span>27 / 09</span>
            <strong>
              Good people<br />
              <em>Great stories</em>
            </strong>
          </div>
          <div className="recap27-window">
            <div className="recap27-track">
              {photos.map((photo, i) => (
                <figure
                  key={photo}
                  data-shape={
                    ["portrait", "conversation", "listener", "ideas"].includes(photo)
                      ? "portrait"
                      : "landscape"
                  }
                >
                  <div className="recap27-image">
                    <Image
                      src={`${assets}${photo}.webp`}
                      alt={t.captions[i]}
                      width={1920}
                      height={photo === "session" ? 1280 : 1920}
                      unoptimized
                    />
                  </div>
                  <figcaption>
                    <span>0{i + 1} / 07</span>
                    {t.captions[i]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="site-container recap27-gallery-footer">
            <div className="recap27-counter" aria-hidden="true">
              <span className="recap27-counter-current">01</span>
              <span> / 07</span>
            </div>
            <div className="recap27-caption-stage">
              {t.captions.map((caption) => (
                <p key={caption} className="recap27-caption">
                  {caption}
                </p>
              ))}
            </div>
            <div className="recap27-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
