import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCocodramaContent } from "@/src/content/cocodrama";
import { isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "/cocodrama",
    locale === "en" ? "CocoDrama | Short-Form Streaming by TRIEU HY MEDIA" : locale === "zh" ? "CocoDrama | TRIEU HY MEDIA 短剧应用" : "CocoDrama | Ứng dụng phim ngắn của TRIEU HY MEDIA",
    locale === "en"
      ? "CocoDrama is a localized short-form streaming application for Vietnam, Thailand, Indonesia and Malaysia."
      : locale === "zh" ? "CocoDrama 是一款面向越南、泰国、印度尼西亚和马来西亚进行本地化的短剧应用。" : "CocoDrama là ứng dụng phim ngắn được bản địa hóa cho Việt Nam, Thái Lan, Indonesia và Malaysia.",
  );
}

export default async function CocodramaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getCocodramaContent(locale);

  return (
    <>
      <section className="coco-hero">
        <div className="coco-orb" aria-hidden="true" />
        <div className="site-container coco-hero-grid">
          <div className={`coco-hero-copy coco-hero-copy--${locale}`}>
            <div className="coco-logo-lockup">
              <Image src="/cocodrama/app-icon.png" alt="CocoDrama" width={630} height={630} priority unoptimized />
              <span>COCODRAMA</span>
            </div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <ul className="coco-hero-facts">{t.heroFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </div>
          <div className="coco-device-scene" aria-label={t.imageLabels[1]} role="img" tabIndex={0}>
            <div className="coco-device coco-device--left"><Image src="/cocodrama/popular-ranking.png" alt={t.imageLabels[2]} width={750} height={1624} priority unoptimized /></div>
            <div className="coco-device coco-device--center"><Image src="/cocodrama/recommend-grid.png" alt={t.imageLabels[1]} width={750} height={1624} priority unoptimized /></div>
            <div className="coco-device coco-device--right"><Image src="/cocodrama/player-settings.png" alt={t.imageLabels[3]} width={375} height={812} priority unoptimized /></div>
          </div>
        </div>
      </section>

      <section className="section-space coco-overview">
        <div className="site-container split-section">
          <h2 className="section-title">{t.overviewTitle}</h2>
          <p className="body-large">{t.overview}</p>
        </div>
      </section>

      <section className="section-space rule">
        <div className="site-container">
          <h2 className="section-title">{t.accessTitle}</h2>
          <div className="coco-access-grid">
            {t.accessItems.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space coco-localization">
        <div className="site-container coco-localization-grid">
          <div><h2 className="section-title">{t.localizationTitle}</h2><p>{t.localizationIntro}</p></div>
          <div className="coco-language-list">
            <div><span>{locale === "en" ? "Languages" : locale === "zh" ? "语言" : "Ngôn ngữ"}</span>{t.languages.map((language) => <strong key={language}>{language}</strong>)}</div>
            <div><span>{locale === "en" ? "Markets" : locale === "zh" ? "市场" : "Thị trường"}</span>{t.markets.map((market) => <strong key={market}>{market}</strong>)}</div>
          </div>
        </div>
      </section>

      <section className="section-space rule">
        <div className="site-container">
          <div className="section-heading-row"><div><h2 className="section-title">{t.productTitle}</h2></div><p>{t.productIntro}</p></div>
          <div className="coco-product-gallery">
            <figure className="coco-web-shot" data-tilt><Image src="/cocodrama/web-experience.jpg" alt={t.imageLabels[0]} width={844} height={1500} unoptimized /></figure>
            <figure className="coco-mobile-shot" data-tilt><Image src="/cocodrama/recommend-grid.png" alt={t.imageLabels[1]} width={750} height={1624} unoptimized /></figure>
            <figure className="coco-mobile-shot" data-tilt><Image src="/cocodrama/player-settings.png" alt={t.imageLabels[3]} width={375} height={812} unoptimized /></figure>
          </div>
        </div>
      </section>

      <section className="section-space coco-payments">
        <div className="site-container split-section">
          <h2 className="section-title">{t.paymentsTitle}</h2>
          <div><p className="body-large">{t.payments}</p><p className="coco-payment-note">{t.paymentNote}</p></div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="site-container"><h2>{t.ctaTitle}</h2><Link href={`/${locale}/contact`} className="button-primary">{t.cta}</Link></div>
      </section>
    </>
  );
}
