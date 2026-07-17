import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/src/config/company";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

const servicesZh = {
  "advertising-strategy": ["广告策略", "基于每家企业的传播目标、受众与可用资源，规划务实的广告方向。", "传播目标、受众界定、渠道方向与务实优先事项。", "梳理需求、统一目标、制定方向并交付建议。"],
  "brand-communication": ["品牌传播", "帮助企业在各传播渠道中呈现一致、清晰且专业的品牌信息。", "核心信息、传播语调、内容协同与渠道一致性。", "梳理信息、建立传播框架、提供内容指引并完成统一。"],
  "creative-content": ["创意内容", "开发适合企业活动与品牌形象的内容概念和传播素材。", "内容概念、活动文案、展示素材与符合品牌的内容。", "内容需求、概念开发、撰写、优化与交付。"],
  "digital-advertising-support": ["数字广告支持", "协助准备、协调并改善数字平台上的广告活动。", "活动准备、内容协调、素材就绪与活动复盘。", "梳理需求、制定准备计划、协调执行并提出优化建议。"],
  "communication-design": ["传播设计", "为广告、营销活动与企业展示制作视觉传播素材。", "活动视觉、传播版式、数字素材与企业展示材料。", "设计需求、视觉方向、制作、反馈与最终文件。"],
  "campaign-coordination": ["营销活动协调", "支持广告活动从前期规划、执行到活动后复盘。", "规划协调、时间线统一、传播材料与复盘支持。", "规划、协调、执行支持、进度复盘与总结。"],
  "digital-product-operations": ["数字产品运营 — CocoDrama", "运营 CocoDrama，为东南亚观众带来正版内容与本地化观看体验的短剧产品。", "产品体验、内容发行协调、本地化支持、订阅访问与广告解锁剧集。", "内容与产品规划、本地化协调、发行准备、平台运营与持续复盘。"],
  "hy-garden-workspace": ["Hỷ Garden 咖啡工作空间", "将 Hỷ Garden 运营为咖啡店和友好的工作空间，并根据适用情况提供工作或聚会的场地租用安排。", "咖啡服务、适合工作的环境，以及视空位和预约性质而定的场地租用安排。", "告知期望日期、人数和使用目的；团队将确认空位并安排合适的场地。"],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "/services",
    locale === "en" ? "Services & Operating Areas | TRIEU HY MEDIA" : locale === "zh" ? "服务与运营领域 | TRIEU HY MEDIA" : "Dịch vụ & Mảng hoạt động | TRIEU HY MEDIA",
    locale === "en"
      ? "Explore advertising strategy, brand communication, creative content, CocoDrama digital product operations and Hy Garden workspace operations by TRIEU HY MEDIA."
      : locale === "zh" ? "了解 TRIEU HY MEDIA 的广告策略、品牌传播、创意内容、CocoDrama 数字产品运营与 Hỷ Garden 工作空间运营。" : "Khám phá các mảng hoạt động của TRIEU HY MEDIA: chiến lược quảng cáo, truyền thông thương hiệu, nội dung sáng tạo, CocoDrama và Hỷ Garden.",
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale);
  const featuredOperatingAreas = ["digital-product-operations", "hy-garden-workspace"];
  const services = [...company.services].sort((a, b) => featuredOperatingAreas.indexOf(b.id) - featuredOperatingAreas.indexOf(a.id));
  return (
    <>
      <section className="page-hero page-hero--visual">
        <div className="site-container page-hero-grid">
          <div><span className="eyebrow">{t.servicesPage.eyebrow}</span><h1 className="page-title">{t.servicesPage.title}</h1><p className="body-large page-intro">{t.servicesPage.intro}</p></div>
          <figure className="page-hero-media page-hero-media--abstract" data-tilt><Image src="/process-editorial.jpg" alt={t.servicesPage.visualLabels[0]} width={1586} height={992} priority unoptimized /></figure>
        </div>
      </section>
      <section className="services-visual-intro rule">
        <div className="site-container">
          <h2>{t.servicesPage.visualTitle}</h2>
          <div className="services-visual-grid">
            <figure data-tilt><Image src="/hero-editorial.jpg" alt={t.servicesPage.visualLabels[0]} width={1536} height={1024} unoptimized /><figcaption>{t.servicesPage.visualLabels[0]}</figcaption></figure>
            <figure data-tilt><Image src="/cocodrama/web-experience.jpg" alt={t.servicesPage.visualLabels[1]} width={844} height={1500} unoptimized /><figcaption>{t.servicesPage.visualLabels[1]}</figcaption></figure>
          </div>
        </div>
      </section>
      <section className="services-detail rule">
        <div className="site-container">
          {services.map((service) => (
            <article className="service-detail" id={service.id} key={service.id}>
              {(() => {
                const zh = servicesZh[service.id as keyof typeof servicesZh];
                const detail = locale === "zh" ? zh : null;
                return <>
              <div className="service-detail-title"><h2>{detail ? detail[0] : locale === "en" ? service.nameEn : service.nameVi}</h2></div>
              <div className="service-detail-copy">
                <p className="body-large">{detail ? detail[1] : locale === "en" ? service.descriptionEn : service.descriptionVi}</p>
                <details><summary>{t.servicesPage.scope}</summary><p>{detail ? detail[2] : locale === "en" ? service.scopeEn : service.scopeVi}</p></details>
                <details><summary>{t.servicesPage.process}</summary><p>{detail ? detail[3] : locale === "en" ? service.processEn : service.processVi}</p></details>
                <Link className="text-link" href={`/${locale}/contact?service=${service.id}`}>{t.servicesPage.discuss} <span aria-hidden="true">↗</span></Link>
              </div>
                </>;
              })()}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
