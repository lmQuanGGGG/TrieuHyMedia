import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanyDetails } from "@/src/components/CompanyDetails";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "",
    locale === "en" ? "TRIEU HY MEDIA | Advertising Company in Da Nang" : "TRIEU HY MEDIA | Công ty quảng cáo tại Đà Nẵng",
    locale === "en"
      ? "TRIEU HY MEDIA is an advertising company in Da Nang, Vietnam, providing brand communication, digital product and workspace operations."
      : "TRIEU HY MEDIA là công ty quảng cáo tại Đà Nẵng, cung cấp giải pháp truyền thông thương hiệu, sản phẩm số và vận hành không gian làm việc.",
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale);

  return (
    <>
      <section className="hero">
        <div className="hero-background" aria-hidden="true">
          <Image src="/hero-editorial.jpg" alt="" fill priority sizes="100vw" unoptimized />
        </div>
        <div className="site-container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">{t.home.eyebrow}</span>
            <h1 className="display-title">
              {locale === "vi" ? <>Giải pháp quảng cáo<br />được xây dựng từ<br />sự rõ ràng</> : t.home.headline}
            </h1>
            <p className="hero-intro body-large">{t.home.intro}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/services`} className="button-primary">{t.home.explore}</Link>
              <Link href={`/${locale}/contact`} className="button-secondary">{t.nav.contactUs}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="garden-section rule">
        <div className="site-container garden-intro">
          <div>
            <span className="eyebrow">{t.home.hyGarden.eyebrow}</span>
            <h2 className="section-title">{t.home.hyGarden.title}</h2>
          </div>
          <div>
            <p className="body-large">{t.home.hyGarden.description}</p>
            <p className="garden-note">{t.home.hyGarden.note}</p>
          </div>
        </div>
        <div className="site-container garden-gallery">
          <figure className="garden-photo garden-photo--main" data-tilt>
            <Image src="/hy-garden/trieu-hy-office.jpg" alt={t.home.hyGarden.labels[0]} width={1448} height={1086} unoptimized />
            <figcaption>{t.home.hyGarden.labels[0]}</figcaption>
          </figure>
          <figure className="garden-photo" data-tilt>
            <Image src="/hy-garden/coffee-workspace.jpg" alt={t.home.hyGarden.labels[1]} width={1448} height={1086} unoptimized />
            <figcaption>{t.home.hyGarden.labels[1]}</figcaption>
          </figure>
          <figure className="garden-photo" data-tilt>
            <Image src="/hy-garden/front-yard.jpg" alt={t.home.hyGarden.labels[2]} width={1448} height={1086} unoptimized />
            <figcaption>{t.home.hyGarden.labels[2]}</figcaption>
          </figure>
          <figure className="garden-photo" data-tilt>
            <Image src="/hy-garden/upstairs-workspace.jpg" alt={t.home.hyGarden.labels[3]} width={1448} height={1086} unoptimized />
            <figcaption>{t.home.hyGarden.labels[3]}</figcaption>
          </figure>
        </div>
      </section>

      <section className="cocodrama-preview">
        <div className="cocodrama-preview-glow" aria-hidden="true" />
        <div className="site-container cocodrama-preview-grid">
          <div className="cocodrama-preview-copy">
            <span className="eyebrow">{t.home.cocodrama.eyebrow}</span>
            <div className="cocodrama-brand-line">
              <Image src="/cocodrama/app-icon.png" alt="" width={630} height={630} unoptimized />
              <span>COCODRAMA</span>
            </div>
            <h2>{t.home.cocodrama.title}</h2>
            <p>{t.home.cocodrama.description}</p>
            <Link className="button-primary cocodrama-button" href={`/${locale}/cocodrama`}>{t.home.cocodrama.cta}</Link>
          </div>
          <div className="cocodrama-phone-stage" aria-hidden="true">
            <div className="cocodrama-phone cocodrama-phone--back"><Image src="/cocodrama/popular-ranking.png" alt="" width={750} height={1624} unoptimized /></div>
            <div className="cocodrama-phone cocodrama-phone--front"><Image src="/cocodrama/recommend-grid.png" alt="" width={750} height={1624} unoptimized /></div>
          </div>
        </div>
      </section>

      <section className="section-space rule home-about-section" id="about">
        <div className="site-container split-section">
          <div><h2 className="section-title">{t.home.overviewTitle}</h2></div>
          <div>
            <p className="body-large">{t.home.overview}</p>
            <p className="home-about-detail">{t.home.overviewDetail}</p>
          </div>
        </div>
        <figure className="site-container home-about-image" data-tilt>
          <Image src="/hy-garden/trieu-hy-office.jpg" alt={t.home.overviewImage} width={1448} height={1086} unoptimized />
          <figcaption>{t.home.overviewImage}</figcaption>
        </figure>
      </section>

      <section className="section-space approach-section">
        <div className="approach-background" aria-hidden="true">
          <Image src="/process-editorial.jpg" alt="" fill sizes="100vw" unoptimized />
        </div>
        <div className="site-container approach-content">
          <h2 className="section-title">{t.home.approachTitle}</h2>
          <ol className="approach-list">
            {t.home.approach.map(([title, text]) => (
              <li key={title}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="principles rule">
        <div className="site-container principles-grid">
          <h2>{t.home.principlesTitle}</h2>
          <ul>{t.home.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="section-heading-row"><div><h2 className="section-title">{t.home.companyTitle}</h2></div></div>
          <CompanyDetails locale={locale} />
        </div>
      </section>

      <section className="closing-cta">
        <div className="site-container">
          <h2>{t.home.ctaTitle}</h2>
          <p>{t.home.ctaText}</p>
          <Link href={`/${locale}/contact`} className="button-primary">{t.home.cta}</Link>
        </div>
      </section>
    </>
  );
}
