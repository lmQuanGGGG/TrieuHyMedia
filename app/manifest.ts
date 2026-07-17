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
    icons: [{ src: "/logos/trieu-hy-media-tab-logo.png", sizes: "1399x1124", type: "image/png", purpose: "any" }],
  };
}
