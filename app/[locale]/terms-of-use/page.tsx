import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/src/components/LegalPage";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/terms-of-use", locale === "en" ? "Terms of Use | TRIEU HY MEDIA" : "Điều khoản sử dụng | TRIEU HY MEDIA");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale).terms;
  return <LegalPage locale={locale} title={t.title} intro={t.intro} sections={t.sections} />;
}
