import type { Metadata } from "next";
import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";

const descriptions = {
  en: `Official website of ${company.legalNameEn}, a legally registered advertising company based in Da Nang, Vietnam.`,
  vi: `Website chính thức của ${company.legalNameVi}, doanh nghiệp hoạt động trong lĩnh vực quảng cáo tại Đà Nẵng, Việt Nam.`,
};

const keywords = {
  en: ["TRIEU HY MEDIA", "advertising company Da Nang", "brand communication", "CocoDrama", "Hy Garden"],
  vi: ["TRIEU HY MEDIA", "công ty quảng cáo Đà Nẵng", "truyền thông thương hiệu", "CocoDrama", "Hỷ Garden"],
};

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description = descriptions[locale],
): Metadata {
  const canonical = `https://trieuhymedia.net/${locale}${path}`;
  return {
    title,
    description,
    keywords: keywords[locale],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: `https://trieuhymedia.net/en${path}`,
        vi: `https://trieuhymedia.net/vi${path}`,
        "x-default": `https://trieuhymedia.net/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: company.brandName,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "TRIEU HY MEDIA — Creative advertising built with clarity." }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
