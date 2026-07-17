import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";

export function LegalPage({ locale, title, intro, sections }: { locale: Locale; title: string; intro: string; sections: readonly (readonly [string, string])[] }) {
  const legalCopy = locale === "en"
    ? ["Legal", "Effective date", "Contact information", "Questions about this document may be sent to"]
    : locale === "zh"
      ? ["法律信息", "生效日期", "联系信息", "有关本文件的问题可发送至"]
      : ["Pháp lý", "Ngày hiệu lực", "Thông tin liên hệ", "Mọi câu hỏi về nội dung này có thể gửi đến"];
  return (
    <>
      <section className="page-hero legal-hero"><div className="site-container"><span className="eyebrow">{legalCopy[0]}</span><h1 className="page-title">{title}</h1><p className="body-large page-intro">{intro}</p></div></section>
      <section className="section-space rule">
        <div className="site-container legal-layout">
          <aside><p>{legalCopy[1]}</p><strong>{locale === "en" ? company.privacyEffectiveDate : company.privacyEffectiveDateVi}</strong></aside>
          <div className="prose-copy">
            {sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}
            <section><h2>{legalCopy[2]}</h2><p>{legalCopy[3]} <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section>
          </div>
        </div>
      </section>
    </>
  );
}
