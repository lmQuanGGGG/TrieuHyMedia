"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Locale } from "@/src/content/site";
import { workshopRecap } from "@/src/content/workshopRecap";

const assets = "/news/workshop-2709/";
const photos = ["session", "speaker", "portrait", "conversation", "listener", "ideas", "community"];
const times = ["14:00", "14:15", "14:20", "14:50", "15:00", "15:30", "15:45"];
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function WorkshopRecap({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = workshopRecap[locale];

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const media = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    const hero = article.querySelector<HTMLElement>(".recap27-hero");
    const story = article.querySelector<HTMLElement>(".recap27-story");
    const words = Array.from(article.querySelectorAll<HTMLElement>(".recap27-word"));
    const gallery = article.querySelector<HTMLElement>(".recap27-gallery");
    const track = article.querySelector<HTMLElement>(".recap27-track");
    const windowEl = article.querySelector<HTMLElement>(".recap27-window");
    let frame = 0;
    let distance = 0;
    const update = () => {
      frame = 0;
      if (!media.matches || !hero || !story || !gallery || !track) return;
      const heroProgress = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
      article.style.setProperty("--hero-drift", `${heroProgress * 64}px`);
      article.style.setProperty("--hero-scale", `${1 + heroProgress * .09}`);
      const progress = clamp((window.innerHeight * .8 - story.getBoundingClientRect().top) / (story.offsetHeight + window.innerHeight * .15));
      words.forEach((word, index) => {
        const visible = clamp((progress * (words.length + 8) - index) / 5);
        word.style.opacity = `${.22 + visible * .78}`;
        word.style.transform = `translateY(${(1 - visible) * 9}px)`;
      });
      const galleryProgress = clamp((100 - gallery.getBoundingClientRect().top) / Math.max(distance, 1));
      track.style.transform = `translate3d(${-galleryProgress * distance}px, 0, 0)`;
      article.style.setProperty("--gallery-progress", `${galleryProgress}`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      article.classList.toggle("recap27-motion", media.matches);
      if (media.matches && gallery && track && windowEl) {
        const style = getComputedStyle(windowEl);
        const contentWidth = windowEl.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        distance = Math.max(0, track.scrollWidth - contentWidth);
        gallery.style.height = `${distance + window.innerHeight - 100}px`;
      } else {
        gallery?.style.removeProperty("height");
        track?.style.removeProperty("transform");
        words.forEach((word) => { word.style.removeProperty("opacity"); word.style.removeProperty("transform"); });
        article.style.removeProperty("--hero-drift");
        article.style.removeProperty("--hero-scale");
      }
      schedule();
    };
    const resize = new ResizeObserver(measure);
    if (windowEl) resize.observe(windowEl);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, [locale]);

  const moveGallery = (direction: number) => {
    const article = root.current;
    const gallery = article?.querySelector<HTMLElement>(".recap27-gallery");
    const track = article?.querySelector<HTMLElement>(".recap27-track");
    if (!gallery || !track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const max = gallery.offsetHeight - window.innerHeight + 100;
    const stops = [...new Set(cards.map((card) => Math.min(max, card.offsetLeft - cards[0].offsetLeft)))];
    const position = 100 - gallery.getBoundingClientRect().top;
    const target = direction > 0
      ? stops.find((stop) => stop > position + 5) ?? max
      : stops.slice().reverse().find((stop) => stop < position - 5) ?? 0;
    window.scrollTo({ top: window.scrollY + gallery.getBoundingClientRect().top - 100 + target, behavior: "smooth" });
  };

  return (
    <article ref={root} className="recap27" aria-labelledby="recap27-title">
      <section className="recap27-hero">
        <div className="site-container">
          <div className="recap27-topline"><span>{t.label}</span><time dateTime="2026-09-27">27.09.2026</time></div>
          <h1 id="recap27-title"><span>{t.title[0]}</span><span>{t.title[1]}</span></h1>
          <div className="recap27-hero-bottom"><p>{t.lead}</p><a href="#workshop-2709-story">{t.scroll} <span aria-hidden="true">↓</span></a></div>
          <figure className="recap27-cover"><Image src={`${assets}community.webp`} alt={t.captions[6]} width={1920} height={1312} priority unoptimized /><figcaption>TRIỆU HỶ MEDIA × HỶ GARDEN – VULEE <span>ĐÀ NẴNG / 14:00–16:00</span></figcaption></figure>
        </div>
      </section>
      <section id="workshop-2709-story" className="recap27-story section-space">
        <div className="site-container recap27-story-grid">
          <div><span className="eyebrow">01 / AI · STORYTELLING · COMMUNITY</span><h2>{t.intro}</h2></div>
          <div><p className="recap27-reading" aria-label={t.story}>{t.story.split(" ").map((word, i) => <span key={i} className="recap27-word" aria-hidden="true">{word}{" "}</span>)}</p><blockquote>“{t.quote}”</blockquote></div>
        </div>
      </section>
      <section className="recap27-gallery" aria-labelledby="recap27-gallery-title">
        <div className="recap27-sticky">
          <div className="site-container recap27-gallery-head"><div><span className="eyebrow">02 / {t.galleryHint}</span><h2 id="recap27-gallery-title">{t.gallery}</h2></div><div className="recap27-controls"><button type="button" aria-label={t.previous} onClick={() => moveGallery(-1)}>←</button><button type="button" aria-label={t.next} onClick={() => moveGallery(1)}>→</button></div></div>
          <div className="recap27-window"><div className="recap27-track">{photos.map((photo, i) => <figure key={photo}><div className="recap27-image"><Image src={`${assets}${photo}.webp`} alt={t.captions[i]} width={1920} height={photo === "session" ? 1280 : 1920} unoptimized /></div><figcaption><span>0{i + 1} / 07</span>{t.captions[i]}</figcaption></figure>)}</div></div>
          <div className="site-container recap27-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <section className="recap27-agenda section-space">
        <div className="site-container recap27-agenda-grid"><div data-reveal><span className="eyebrow">03 / 27.09.2026 · 14:00–16:00</span><h2>{t.agenda}</h2><p>HỶ GARDEN — Coffee & Workspace<br />15 Trung Lương 16, Đà Nẵng</p><Image src={`${assets}agenda.webp`} alt={t.agenda} width={2000} height={1125} unoptimized /></div><ol>{times.map((time, i) => <li key={time} data-reveal><time>{time}</time><span>{t.schedule[i]}</span></li>)}</ol></div>
      </section>
      <section className="recap27-video section-space"><div className="site-container"><div className="recap27-video-head" data-reveal><span className="eyebrow">04 / REPLAY</span><h2>{t.video}</h2><p>{t.videoCopy}</p></div><video controls playsInline preload="none" poster={`${assets}session.webp`} aria-label={t.video}><source src={`${assets}recap.mp4`} type="video/mp4" /></video><details><summary>{t.poster} ↗</summary><Image src={`${assets}recap.webp`} alt={t.poster} width={2000} height={1125} unoptimized /></details></div></section>
    </article>
  );
}
