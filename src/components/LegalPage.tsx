import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";

export function LegalPage({ locale, title, intro, sections }: { locale: Locale; title: string; intro: string; sections: readonly (readonly [string, string])[] }) {
  return (
    <>
      <section className="page-hero legal-hero"><div className="site-container"><span className="eyebrow">{locale === "en" ? "Legal" : "Pháp lý"}</span><h1 className="page-title">{title}</h1><p className="body-large page-intro">{intro}</p></div></section>
      <section className="section-space rule">
        <div className="site-container legal-layout">
          <aside><p>{locale === "en" ? "Effective date" : "Ngày hiệu lực"}</p><strong>{locale === "en" ? company.privacyEffectiveDate : company.privacyEffectiveDateVi}</strong></aside>
          <div className="prose-copy">
            {sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}
            <section><h2>{locale === "en" ? "Contact information" : "Thông tin liên hệ"}</h2><p>{locale === "en" ? "Questions about this document may be sent to" : "Mọi câu hỏi về nội dung này có thể gửi đến"} <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section>
          </div>
        </div>
      </section>
    </>
  );
}
