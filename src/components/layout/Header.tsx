"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/src/content/site";

type Props = {
  locale: Locale;
  nav: {
    home: string;
    about: string;
    services: string;
    cocodrama: string;
    contact: string;
    contactUs: string;
    menu: string;
    close: string;
  };
};

export function Header({ locale, nav }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "vi" : "en";
  const switchHref = pathname.replace(/^\/(en|vi)/, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const links = [
    [nav.home, `/${locale}`],
    [nav.about, `/${locale}#about`],
    [nav.services, `/${locale}/services`],
    [nav.cocodrama, `/${locale}/cocodrama`],
  ] as const;

  return (
    <header className={`site-header site-header--solid ${scrolled || open ? "site-header--solid" : ""}`}>
      <div className="site-container header-inner">
        <Link href={`/${locale}`} className="brand-lockup" aria-label={`TRIEU HY MEDIA — ${nav.home}`}>
          <Image className="brand-logo-symbol" src="/logos/trieu-hy-media-symbol.png" alt="" width={483} height={473} priority unoptimized />
          <Image className="brand-logo-wordmark" src="/logos/trieu-hy-media-wordmark.png" alt="TRIỆU HỶ MEDIA" width={847} height={179} priority unoptimized />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <div className="language-switch" aria-label={locale === "en" ? "Language selection" : "Chọn ngôn ngữ"}>
            {locale === "en" ? (
              <>
                <span aria-current="page">EN</span>
                <Link href={switchHref} hrefLang="vi" aria-label="Chuyển sang Tiếng Việt">VI</Link>
              </>
            ) : (
              <>
                <Link href={switchHref} hrefLang="en" aria-label="Switch to English">EN</Link>
                <span aria-current="page">VI</span>
              </>
            )}
          </div>
          <Link href={`/${locale}/contact`} className="header-cta">{nav.contactUs}</Link>
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? nav.close : nav.menu}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav site-container" aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <div className="mobile-language-switch" aria-label={locale === "en" ? "Language selection" : "Chọn ngôn ngữ"}>
            {locale === "en" ? (
              <>
                <span aria-current="page">EN · English</span>
                <Link href={switchHref} hrefLang="vi" onClick={() => setOpen(false)}>VI · Tiếng Việt</Link>
              </>
            ) : (
              <>
                <Link href={switchHref} hrefLang="en" onClick={() => setOpen(false)}>EN · English</Link>
                <span aria-current="page">VI · Tiếng Việt</span>
              </>
            )}
          </div>
          <Link href={`/${locale}/contact`} className="button-primary" onClick={() => setOpen(false)}>{nav.contactUs}</Link>
        </nav>
      )}
    </header>
  );
}
