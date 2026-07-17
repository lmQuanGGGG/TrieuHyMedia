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
  const localeOptions = [
    ["en", "EN · English"],
    ["vi", "VI · Tiếng Việt"],
    ["zh", "中文 · 简体中文"],
  ] as const;
  const localeHref = (target: string) => pathname.replace(/^\/(en|vi|zh)/, `/${target}`);

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
          <div className="language-switch" aria-label="Language selection">
            {localeOptions.map(([code]) => code === locale
              ? <span key={code} aria-current="page">{code === "zh" ? "中文" : code.toUpperCase()}</span>
              : <Link key={code} href={localeHref(code)} hrefLang={code}>{code === "zh" ? "中文" : code.toUpperCase()}</Link>)}
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
          <div className="mobile-language-switch" aria-label="Language selection">
            {localeOptions.map(([code, label]) => code === locale
              ? <span key={code} aria-current="page">{label}</span>
              : <Link key={code} href={localeHref(code)} hrefLang={code} onClick={() => setOpen(false)}>{label}</Link>)}
          </div>
          <Link href={`/${locale}/contact`} className="button-primary" onClick={() => setOpen(false)}>{nav.contactUs}</Link>
        </nav>
      )}
    </header>
  );
}
