import type { MetadataRoute } from "next";
import { locales } from "@/src/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://trieuhymedia.net";
  const paths = ["", "/services", "/cocodrama", "/contact", "/privacy-policy", "/terms-of-use"];
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${base}/${locale}${path}`,
    changeFrequency: path === "" || path === "/services" || path === "/cocodrama" ? "monthly" as const : "yearly" as const,
    priority: path === "" ? 1 : path === "/contact" ? 0.8 : 0.7,
    alternates: { languages: { en: `${base}/en${path}`, vi: `${base}/vi${path}` } },
  })));
}
