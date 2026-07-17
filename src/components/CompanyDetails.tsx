import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";
import { getContent } from "@/src/content/site";

export function CompanyDetails({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = getContent(locale);
  const rows = [
    [t.labels.legalName, locale === "en" ? company.legalNameEn : company.legalNameVi],
    ...(company.showVietnameseLegalName && locale === "en" ? [[t.labels.legalNameVi, company.legalNameVi]] : []),
    [t.labels.shortName, company.shortName],
    [t.labels.businessId, company.businessId],
    [t.labels.registrationDate, locale === "en" ? company.registrationDateEn : company.registrationDateVi],
    [t.labels.status, locale === "en" ? company.operationStatusEn : company.operationStatusVi],
    [t.labels.companyType, locale === "en" ? company.companyTypeEn : company.companyTypeVi],
    [t.labels.activity, locale === "en" ? company.primaryBusinessActivityEn : company.primaryBusinessActivityVi],
    ...(company.showRepresentative ? [[t.labels.representative, `${locale === "en" ? company.representativeEn : company.representativeVi} — ${company.representativeTitle}`]] : []),
    [t.labels.address, locale === "en" ? company.addressEn : company.addressVi],
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
        <div className="company-row"><dt>{t.labels.phone}</dt><dd><a href={company.phoneHref}>{company.phoneInternational}</a></dd></div>
      )}
      <div className="company-row"><dt>{t.labels.email}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
      <div className="company-row"><dt>{t.labels.website}</dt><dd><a href={company.website}>trieuhymedia.net</a></dd></div>
    </dl>
  );
}
