import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/src/components/ContactForm";
import { company } from "@/src/config/company";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "/contact",
    locale === "en" ? `Contact | ${company.legalNameEn}` : locale === "zh" ? `联系我们 | ${company.legalNameEn}` : `Liên hệ | ${company.legalNameVi}`,
    locale === "en"
      ? "Contact TRIEU HY MEDIA in Da Nang for advertising, brand communication, CocoDrama and Hy Garden workspace inquiries."
      : locale === "zh" ? "联系位于岘港的 TRIEU HY MEDIA，咨询广告、品牌传播、CocoDrama 和 Hỷ Garden 工作空间。" : "Liên hệ TRIEU HY MEDIA tại Đà Nẵng về quảng cáo, truyền thông thương hiệu, CocoDrama và Hỷ Garden.",
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.addressEn)}`;
  return (
    <>
      <section className="page-hero page-hero--visual">
        <div className="site-container page-hero-grid">
          <div><span className="eyebrow">{t.contactPage.eyebrow}</span><h1 className="page-title">{t.contactPage.title}</h1><p className="body-large page-intro">{t.contactPage.intro}</p></div>
          <figure className="page-hero-media" data-tilt><Image src="/hy-garden/front-yard.jpg" alt={locale === "en" ? "Hy Garden front yard and working environment" : locale === "zh" ? "Hỷ Garden 前院与工作环境" : "Khu sân trước và không gian làm việc Hỷ Garden"} width={1448} height={1086} priority unoptimized /></figure>
        </div>
      </section>
      <section className="section-space rule">
        <div className="site-container contact-layout">
          <div>
            <figure className="contact-place-photo" data-tilt><Image src="/hy-garden/coffee-workspace.jpg" alt={locale === "en" ? "Hy Garden coffee workspace" : locale === "zh" ? "Hỷ Garden 咖啡工作空间" : "Không gian coffee workspace Hỷ Garden"} width={1448} height={1086} unoptimized /></figure>
            <h2>{t.contactPage.details}</h2>
            <address className="contact-details">
              <strong>{company.legalNameEn}</strong>
              <span>{company.legalNameVi}</span>
              <span>{t.labels.businessId}: {company.businessId}</span>
              <span>{t.labels.representative}: {locale === "vi" ? company.representativeVi : company.representativeEn} — {company.representativeTitle}</span>
              <span>{locale === "vi" ? company.addressVi : company.addressEn}</span>
              <a href={company.phoneHref}>{locale === "vi" ? company.phoneDisplay : company.phoneInternational}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={company.website}>{company.website}</a>
              <a className="text-link maps-link" href={mapsUrl} target="_blank" rel="noreferrer">{t.contactPage.map} <span aria-hidden="true">↗</span></a>
            </address>
          </div>
          <div>
            <h2>{t.contactPage.formTitle}</h2>
            <p className="form-intro">{t.contactPage.formIntro}</p>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
