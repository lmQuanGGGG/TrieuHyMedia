import type { Metadata } from "next";
import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";

const descriptions = {
  en: `Official website of ${company.legalNameEn}, a legally registered advertising company based in Da Nang, Vietnam.`,
  vi: `Website chính thức của ${company.legalNameVi}, doanh nghiệp hoạt động trong lĩnh vực quảng cáo tại Đà Nẵng, Việt Nam.`,
  zh: `${company.legalNameEn} 官方网站，一家位于越南岘港、依法注册的广告企业。`,
};

const keywords = {
  en: ["TRIEU HY MEDIA", "advertising company Da Nang", "brand communication", "CocoDrama", "Hy Garden"],
  vi: ["TRIEU HY MEDIA", "công ty quảng cáo Đà Nẵng", "truyền thông thương hiệu", "CocoDrama", "Hỷ Garden"],
  zh: ["TRIEU HY MEDIA", "岘港广告公司", "品牌传播", "CocoDrama", "Hỷ Garden"],
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
        zh: `https://trieuhymedia.net/zh${path}`,
        "x-default": `https://trieuhymedia.net/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: company.brandName,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : locale === "zh" ? "zh_CN" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "TRIEU HY MEDIA — Creative advertising built with clarity." }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
