import { notFound } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { MotionEffects } from "@/src/components/MotionEffects";
import { company } from "@/src/config/company";
import { getContent, isLocale, locales } from "@/src/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const t = getContent(locale);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalNameEn,
    legalName: company.legalNameEn,
    alternateName: company.brandName,
    url: company.website,
    email: company.email,
    telephone: company.phoneSchema,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: company.email,
      telephone: company.phoneSchema,
      availableLanguage: ["Vietnamese", "English", "Chinese"],
    },
    taxID: company.businessId,
    foundingDate: company.registrationDateIso,
    description: "Legally registered advertising company based in Da Nang, Vietnam.",
    logo: `${company.website}/logos/logo1.png`,
    areaServed: ["Da Nang", "Vietnam"],
    address: {
      "@type": "PostalAddress",
      ...company.structuredAddress,
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{locale === "en" ? "Skip to content" : locale === "zh" ? "跳至内容" : "Chuyển đến nội dung"}</a>
      <Header locale={locale} nav={t.nav} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <MotionEffects />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    </>
  );
}
