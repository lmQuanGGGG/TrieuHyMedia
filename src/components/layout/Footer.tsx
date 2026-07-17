import Image from "next/image";
import Link from "next/link";
import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";
import { getContent } from "@/src/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <footer className="footer rule">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image className="footer-logo-symbol" src="/logos/trieu-hy-media-symbol.png" alt="" width={483} height={473} unoptimized />
              <Image className="footer-logo-wordmark" src="/logos/trieu-hy-media-wordmark.png" alt="TRIỆU HỶ MEDIA" width={847} height={179} unoptimized />
            </div>
            <p>{company.legalNameEn}</p>
            {company.showVietnameseLegalName && <p>{company.legalNameVi}</p>}
            <p>{t.labels.businessId}: {company.businessId}</p>
          </div>
          <div>
            <p className="footer-heading">{t.footer.company}</p>
            <Link href={`/${locale}#about`}>{t.nav.about}</Link>
            <Link href={`/${locale}/services`}>{t.nav.services}</Link>
            <Link href={`/${locale}/cocodrama`}>CocoDrama</Link>
            <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
          </div>
          <div>
            <p className="footer-heading">{t.footer.legal}</p>
            <Link href={`/${locale}/privacy-policy`}>{locale === "en" ? "Privacy Policy" : "Chính sách bảo mật"}</Link>
            <Link href={`/${locale}/terms-of-use`}>{locale === "en" ? "Terms of Use" : "Điều khoản sử dụng"}</Link>
          </div>
          <address>
            <p>{locale === "en" ? company.addressEn : company.addressVi}</p>
            {company.showPhone && <a href={company.phoneHref}>{locale === "vi" ? company.phoneDisplay : company.phoneInternational}</a>}
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.legalNameEn}. {t.footer.rights}</span>
          <span>{company.website.replace("https://", "")}</span>
        </div>
      </div>
    </footer>
  );
}
