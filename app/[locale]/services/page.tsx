import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/src/config/company";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "/services",
    locale === "en" ? "Services & Operating Areas | TRIEU HY MEDIA" : "Dịch vụ & Mảng hoạt động | TRIEU HY MEDIA",
    locale === "en"
      ? "Explore advertising strategy, brand communication, creative content, CocoDrama digital product operations and Hy Garden workspace operations by TRIEU HY MEDIA."
      : "Khám phá các mảng hoạt động của TRIEU HY MEDIA: chiến lược quảng cáo, truyền thông thương hiệu, nội dung sáng tạo, CocoDrama và Hỷ Garden.",
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale);
  const featuredOperatingAreas = ["digital-product-operations", "hy-garden-workspace"];
  const services = [...company.services].sort((a, b) => featuredOperatingAreas.indexOf(b.id) - featuredOperatingAreas.indexOf(a.id));
  return (
    <>
      <section className="page-hero page-hero--visual">
        <div className="site-container page-hero-grid">
          <div><span className="eyebrow">{t.servicesPage.eyebrow}</span><h1 className="page-title">{t.servicesPage.title}</h1><p className="body-large page-intro">{t.servicesPage.intro}</p></div>
          <figure className="page-hero-media page-hero-media--abstract" data-tilt><Image src="/process-editorial.jpg" alt={t.servicesPage.visualLabels[0]} width={1586} height={992} priority unoptimized /></figure>
        </div>
      </section>
      <section className="services-visual-intro rule">
        <div className="site-container">
          <h2>{t.servicesPage.visualTitle}</h2>
          <div className="services-visual-grid">
            <figure data-tilt><Image src="/hero-editorial.jpg" alt={t.servicesPage.visualLabels[0]} width={1536} height={1024} unoptimized /><figcaption>{t.servicesPage.visualLabels[0]}</figcaption></figure>
            <figure data-tilt><Image src="/cocodrama/web-experience.jpg" alt={t.servicesPage.visualLabels[1]} width={844} height={1500} unoptimized /><figcaption>{t.servicesPage.visualLabels[1]}</figcaption></figure>
          </div>
        </div>
      </section>
      <section className="services-detail rule">
        <div className="site-container">
          {services.map((service) => (
            <article className="service-detail" id={service.id} key={service.id}>
              <div className="service-detail-title"><h2>{locale === "en" ? service.nameEn : service.nameVi}</h2></div>
              <div className="service-detail-copy">
                <p className="body-large">{locale === "en" ? service.descriptionEn : service.descriptionVi}</p>
                <details><summary>{t.servicesPage.scope}</summary><p>{locale === "en" ? service.scopeEn : service.scopeVi}</p></details>
                <details><summary>{t.servicesPage.process}</summary><p>{locale === "en" ? service.processEn : service.processVi}</p></details>
                <Link className="text-link" href={`/${locale}/contact?service=${service.id}`}>{t.servicesPage.discuss} <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
