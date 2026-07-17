import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";
import { getContent } from "@/src/content/site";

export function CompanyDetails({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = getContent(locale);
  const rows = [
    [t.labels.legalName, locale === "vi" ? company.legalNameVi : company.legalNameEn],
    ...(company.showVietnameseLegalName && locale === "en" ? [[t.labels.legalNameVi, company.legalNameVi]] : []),
    [t.labels.shortName, company.shortName],
    [t.labels.businessId, company.businessId],
    [t.labels.registrationDate, locale === "vi" ? company.registrationDateVi : company.registrationDateEn],
    [t.labels.status, locale === "vi" ? company.operationStatusVi : company.operationStatusEn],
    [t.labels.companyType, locale === "vi" ? company.companyTypeVi : company.companyTypeEn],
    [t.labels.activity, locale === "vi" ? company.primaryBusinessActivityVi : company.primaryBusinessActivityEn],
    ...(company.showRepresentative ? [[t.labels.representative, `${locale === "vi" ? company.representativeVi : company.representativeEn} — ${company.representativeTitle}`]] : []),
    [t.labels.address, locale === "vi" ? company.addressVi : company.addressEn],
  ];

  return (
    <dl className={`company-details ${compact ? "company-details--compact" : ""}`}>
      {rows.map(([label, value]) => (
        <div className="company-row" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      {company.showPhone && (
        <div className="company-row"><dt>{t.labels.phone}</dt><dd><a href={company.phoneHref}>{locale === "vi" ? company.phoneDisplay : company.phoneInternational}</a></dd></div>
      )}
      <div className="company-row"><dt>{t.labels.email}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
      <div className="company-row"><dt>{t.labels.website}</dt><dd><a href={company.website}>trieuhymedia.net</a></dd></div>
    </dl>
  );
}
