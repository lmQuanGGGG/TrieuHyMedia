import type { Metadata } from "next";
import { WorkshopRecap } from "@/src/components/news/WorkshopRecap";
import { WorkshopRecap19 } from "@/src/components/news/WorkshopRecap19";
import { workshopRecap } from "@/src/content/workshopRecap";
import { notFound } from "next/navigation";
import { isLocale } from "@/src/content/site";
import { company } from "@/src/config/company";
import { pageMetadata } from "@/src/lib/metadata";

const copy = {
  vi: { pageTitle: "Tin tức & câu chuyện" },
  en: { pageTitle: "News & stories" },
  zh: { pageTitle: "新闻与故事" },
  ko: { pageTitle: "뉴스와 이야기" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = copy[locale];
  return pageMetadata(locale, "/news", `${t.pageTitle} | ${company.brandName}`, workshopRecap[locale].lead);
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="news-page">
      <WorkshopRecap locale={locale} />
      <div className="site-container news-archive-label">
        <span className="eyebrow">{workshopRecap[locale].archive}</span>
      </div>
      <WorkshopRecap19 locale={locale} />
    </div>
  );
}
