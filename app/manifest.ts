import type { MetadataRoute } from "next";
import { company } from "@/src/config/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.brandName,
    short_name: company.brandName,
    description: `Official website of ${company.legalNameEn}.`,
    start_url: "/en",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#FAFAF8",
    icons: [{ src: "/logos/logo4.png", sizes: "1677x938", type: "image/png", purpose: "any" }],
  };
}
