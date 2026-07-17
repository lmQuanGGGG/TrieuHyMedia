import type { Metadata } from "next";
import { Geist, Noto_Sans_SC } from "next/font/google";
import { company } from "@/src/config/company";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Keep the site typography consistent whenever Chinese copy is introduced.
// Geist covers the Latin/Vietnamese interface; Noto Sans SC supplies CJK glyphs.
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: "variable",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trieuhymedia.net"),
  title: {
    default: "TRIEU HY MEDIA | Advertising Company in Da Nang",
    template: "%s",
  },
  description:
    `Official website of ${company.legalNameEn}, a legally registered advertising company based in Da Nang, Vietnam.`,
  applicationName: "TRIEU HY MEDIA",
  authors: [{ name: company.legalNameEn }],
  creator: company.legalNameEn,
  publisher: company.legalNameEn,
  category: "business",
  keywords: ["TRIEU HY MEDIA", "advertising company Da Nang", "advertising services Vietnam", "CocoDrama", "Hy Garden"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [{ url: "/logos/trieu-hy-media-tab-logo.png", sizes: "1399x1124", type: "image/png" }],
    shortcut: "/logos/trieu-hy-media-tab-logo.png",
    apple: [{ url: "/logos/trieu-hy-media-tab-logo.png", sizes: "1399x1124", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "TRIEU HY MEDIA",
    title: "TRIEU HY MEDIA | Advertising Company in Da Nang",
    description:
      `Official website of ${company.legalNameEn}, a legally registered advertising company based in Da Nang, Vietnam.`,
    url: "https://trieuhymedia.net/en",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TRIEU HY MEDIA — Creative advertising built with clarity." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRIEU HY MEDIA | Advertising Company in Da Nang",
    description:
      `Official website of ${company.legalNameEn}, a legally registered advertising company based in Da Nang, Vietnam.`,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${notoSansSC.variable} antialiased`}>{children}</body>
    </html>
  );
}
