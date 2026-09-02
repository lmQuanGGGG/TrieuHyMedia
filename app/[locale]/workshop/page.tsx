import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkshopRegisterForm } from "@/src/components/workshop/WorkshopRegisterForm";
import { company } from "@/src/config/company";
import { getContent, isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale).workshopPage;
  const title = `${t.title} | ${company.brandName}`;
  const description = `${t.headline}. ${t.description}`;
  const metadata = pageMetadata(locale, "/workshop", title, description);

  return {
    ...metadata,
    openGraph: {
      type: "website",
      siteName: company.brandName,
      title,
      description,
      url: `https://trieuhymedia.net/${locale}/workshop`,
      locale: locale === "vi" ? "vi_VN" : locale === "zh" ? "zh_CN" : locale === "ko" ? "ko_KR" : "en_US",
      images: [{ url: "/workshop/vulee-speaker.jpg", width: 1200, height: 800, alt: t.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/workshop/vulee-speaker.jpg"] },
  };
}

export default async function WorkshopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getContent(locale).workshopPage;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(t.formUrl)}&bgcolor=ffffff&color=111111&margin=10`;

  const phases = "phases" in t ? t.phases : [];
  const careerOptions = "careerOptions" in t ? t.careerOptions : [];
  const filmGenres = "filmGenres" in t ? t.filmGenres : null;
  const stats = "stats" in t ? t.stats : [];
  const venues = "venues" in t ? t.venues : [];
  const instructors = "instructors" in t ? t.instructors : [];

  const i18n = {
    vi: {
      instructorEyebrow: "Đội ngũ Giảng viên & Diễn giả",
      instructorTitle: "VU LEE & HOÀ NGUYỄN (Hulk Nón Lá)",
      instructorSubtitle: "Khóa đào tạo được đồng dẫn dắt trực tiếp bởi hai chuyên gia tiên phong: Giám đốc sản xuất phim AI và Nhà sáng tạo nội dung sở hữu kênh Hulk Nón Lá triệu view.",
      gallery1: "Hội trường hội thảo AI Film Production thực chiến",
      gallery2: "Không gian thực hành & sáng tạo tại Hỷ Garden Workspace",
      curriculumEyebrow: "Chương trình đào tạo",
      curriculumSubtitle: "Quy trình đào tạo nén gọn trong 15 buổi thực chiến, kết hợp lý thuyết tinh gọn, thực hành trên máy và sản xuất bài tốt nghiệp có thể phát hành trực tiếp.",
      phasePrefix: "Giai đoạn",
      sessionPrefix: "Buổi",
      careerEyebrow: "Cam kết nghề nghiệp",
      careerTitle: "3 Hướng Hợp Tác Sau Tốt Nghiệp",
      careerSubtitle: "Mục tiêu của khóa học là giúp học viên làm ra sản phẩm có thể phát hành và tạo thu nhập thực tế ngay sau khi hoàn thành.",
      incomeCaption: "Mức thu nhập dự kiến",
      genresTitle: "Thể loại phim & Video ưu tiên phát hành",
      genresPromo: "Chủ đề Quảng bá & Văn hóa",
      genresModern: "Chủ đề Hiện đại & Kịch tính",
      genresCommercial: "Video Thương mại & Doanh nghiệp",
      philosophyPrefix: "Định hướng Coco Drama:",
      venueEyebrow: t.venueTitle ?? "Địa điểm & Liên hệ",
      venueTitle: "Địa Điểm Đào Tạo & Liên Hệ",
      hotlineLabel: "Hotline tư vấn & hỗ trợ trực tiếp",
      registerSubtitle: "Điền thông tin vào phiếu đăng ký để nhận tư vấn chi tiết về lịch khai giảng và học phí ưu đãi.",
      qrNote: "Quét mã QR bằng camera điện thoại để mở form đăng ký di động nhanh chóng.",
      closingTitle: "Sẵn sàng bắt đầu hành trình sản xuất phim AI cùng VuLee & Triệu Hỷ Media?",
    },
    en: {
      instructorEyebrow: "Instructors & Keynote Speakers",
      instructorTitle: "VU LEE & HOÀ NGUYỄN (Hulk Nón Lá)",
      instructorSubtitle: "The masterclass is directly led by two pioneering industry experts: an AI Film Director and the Creator behind the multi-million-view channel Hulk Nón Lá.",
      gallery1: "AI Film Production Live Studio & Conference Hall",
      gallery2: "Creative Workspace & Practice Studio at Hy Garden",
      curriculumEyebrow: "Curriculum Roadmap",
      curriculumSubtitle: "An intensive 15-session studio-grade pipeline combining concise theory, hands-on software mastery, and production of ready-to-release films.",
      phasePrefix: "Phase",
      sessionPrefix: "Session",
      careerEyebrow: "Career & Monetization",
      careerTitle: "3 Career Pathways Post-Graduation",
      careerSubtitle: "Our primary mission is empowering creators to produce commercial-grade films and generate immediate income post-graduation.",
      incomeCaption: "Estimated Earnings / Fee",
      genresTitle: "Priority Genres & Commercial Formats",
      genresPromo: "Cultural & Tourism Showcase",
      genresModern: "Modern Drama & Sci-Fi",
      genresCommercial: "Commercial & Brand Video (TVC)",
      philosophyPrefix: "Coco Drama Philosophy:",
      venueEyebrow: t.venueTitle ?? "Venue & Inquiries",
      venueTitle: "Training Venue & Direct Contact",
      hotlineLabel: "Direct Admissions & Support Hotline",
      registerSubtitle: "Submit your registration to receive admissions guidance, schedule confirmation, and early-bird tuition benefits.",
      qrNote: "Scan QR code with your phone camera to open the official registration form instantly.",
      closingTitle: "Ready to launch your studio-grade AI filmmaking journey with VuLee & Trieu Hy Media?",
    },
    zh: {
      instructorEyebrow: "核心导师与主讲嘉宾",
      instructorTitle: "VU LEE 与 HOÀ NGUYỄN (Hulk Nón Lá)",
      instructorSubtitle: "本课程由两位行业先锋导师亲自带教：AI 电影导演与拥有数百万播放量的知名创作者。",
      gallery1: "实战 AI 影视制作大师课现场",
      gallery2: "Hỷ Garden 线下实训与创作空间",
      curriculumEyebrow: "特训课程体系",
      curriculumSubtitle: "15 节高强度实战课，融合精炼理论与上机实操，确保学员产出可直接发行的毕业大作。",
      phasePrefix: "阶段",
      sessionPrefix: "第",
      careerEyebrow: "就业与商业变现",
      careerTitle: "毕业后 3 大商业合作方向",
      careerSubtitle: "课程核心目标是帮助学员产出具备商业发行价值的优质作品，毕业后快速实现商业变现。",
      incomeCaption: "预期收益 / 制作报酬",
      genresTitle: "重点发行与商业定制片种",
      genresPromo: "文旅宣传与历史文化",
      genresModern: "现代都市与悬疑科幻",
      genresCommercial: "商业定制与企业 TVC",
      philosophyPrefix: "Coco Drama 核心理念：",
      venueEyebrow: t.venueTitle ?? "培训地点",
      venueTitle: "培训地点与联系方式",
      hotlineLabel: "招生咨询与官方热线",
      registerSubtitle: "提交报名申请，获取开班时间安排与早鸟学费优惠详情。",
      qrNote: "使用手机相机扫描二维码，快速打开官方移动端报名表单。",
      closingTitle: "准备好与 VuLee 及 Triệu Hỷ Media 一同开启 AI 电影制作之旅了吗？",
    },
    ko: {
      instructorEyebrow: "전문 강사진 & 디렉터",
      instructorTitle: "VU LEE & HOÀ NGUYỄN (Hulk Nón Lá)",
      instructorSubtitle: "AI 영화 디렉터와 수백만 뷰를 기록한 전문 크리에이터가 전 과정을 1:1로 직접 이끕니다.",
      gallery1: "실전 AI 영화 제작 워크숍 현장",
      gallery2: "Hỷ Garden 워크스페이스 실습 공간",
      curriculumEyebrow: "커리큘럼 체계",
      curriculumSubtitle: "15회 실전 세션으로 압축된 파이프라인. 이론과 실습을 거쳐 즉시 배급 가능한 작품을 완성합니다.",
      phasePrefix: "단계",
      sessionPrefix: "세션",
      careerEyebrow: "진로 및 수익 창출",
      careerTitle: "수료 후 3가지 진로 및 협업 기회",
      careerSubtitle: "수료 후 즉시 배급 및 실질적인 수익 창출이 가능한 상업용 포트폴리오 완성을 목표로 합니다.",
      incomeCaption: "예상 수익 / 제작료",
      genresTitle: "공식 배급 및 상업 제작 우선 장르",
      genresPromo: "문화·관광 홍보",
      genresModern: "현대 드라마·미스터리",
      genresCommercial: "상업 광고 & 기업 TVC",
      philosophyPrefix: "Coco Drama 철학:",
      venueEyebrow: t.venueTitle ?? "교육 장소",
      venueTitle: "교육 장소 & 문의처",
      hotlineLabel: "입학 상담 및 공식 핫라인",
      registerSubtitle: "신청서를 작성하시면 개강 일정 및 얼리버드 수강 혜택을 상세히 안내해 드립니다.",
      qrNote: "스마트폰 카메라로 QR 코드를 스캔하여 간편하게 신청하세요.",
      closingTitle: "VuLee & Triệu Hỷ Media와 함께 실전 AI 영화 제작을 시작할 준비가 되셨나요?",
    },
  }[locale] || {
    instructorEyebrow: "Đội ngũ Giảng viên",
    instructorTitle: "VU LEE & HOÀ NGUYỄN",
    instructorSubtitle: "",
    gallery1: "AI Studio",
    gallery2: "Hy Garden",
    curriculumEyebrow: "Lộ trình",
    curriculumSubtitle: "",
    phasePrefix: "Giai đoạn",
    sessionPrefix: "Buổi",
    careerEyebrow: "Cơ hội nghề nghiệp",
    careerTitle: "Hướng phát triển",
    careerSubtitle: "",
    incomeCaption: "Thu nhập",
    genresTitle: "Thể loại phim",
    genresPromo: "Quảng bá",
    genresModern: "Hiện đại",
    genresCommercial: "Thương mại",
    philosophyPrefix: "Triết lý:",
    venueEyebrow: "Địa điểm",
    venueTitle: "Địa điểm đào tạo",
    hotlineLabel: "Hotline",
    registerSubtitle: "Đăng ký ngay",
    qrNote: "Quét mã QR",
    closingTitle: "Bắt đầu ngay",
  };

  return (
    <>
      {/* Hero Section Editorial chuẩn CocoDrama & Hy Garden */}
      <section className="page-hero page-hero--visual workshop-hero-section">
        <div className="site-container workshop-hero-grid">
          <div className="workshop-hero-copy">
            <span className="eyebrow">{t.collaboration ?? "FDV × TRIỆU HỶ | COCO DRAMA"}</span>
            <h1 className="workshop-hero-title">{t.title}</h1>
            <p className="workshop-hero-intro">{t.headline}</p>

            {/* Facts bar phong cách Coco */}
            {stats.length > 0 && (
              <ul className="workshop-facts-bar">
                {stats.map((s) => (
                  <li key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-actions" style={{ marginTop: "32px" }}>
              <a href="#register" className="button-primary">
                {t.ctaRegister}
              </a>
              <a href="#curriculum" className="button-secondary">
                {t.curriculumTitle}
              </a>
            </div>
          </div>

          <div className="workshop-hero-media-wrap">
            <figure className="workshop-cinematic-frame" data-tilt>
              <Image
                src="/workshop/vulee-speaker.jpg"
                alt="Vu Lee & Hoà Nguyễn"
                width={1200}
                height={800}
                priority
                unoptimized
              />
              <div className="workshop-speaker-pill">
                <span className="speaker-name">VU LEE × HOÀ NGUYỄN</span>
                <span className="speaker-role">AI Film Director · Hulk Nón Lá</span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Thông tin 2 Diễn giả & Giảng viên */}
      <section className="section-space rule">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">{i18n.instructorEyebrow}</span>
              <h2 className="section-title">{i18n.instructorTitle}</h2>
            </div>
            <p>{i18n.instructorSubtitle}</p>
          </div>

          <div className="workshop-speakers-grid" style={{ marginTop: "36px" }}>
            {instructors.map((inst, idx) => (
              <article key={inst.name} className="workshop-speaker-card">
                <div className="speaker-card-header">
                  <span className="speaker-tag-number">0{idx + 1}</span>
                  <div>
                    <h3 className="speaker-card-name">{inst.name}</h3>
                    <p className="speaker-card-role">{inst.title}</p>
                  </div>
                </div>
                <p className="speaker-card-bio">{inst.bio}</p>
              </article>
            ))}
          </div>

          <div className="workshop-event-gallery" style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <figure className="garden-photo" data-tilt style={{ margin: 0 }}>
              <Image src="/workshop/workshop-attendees.jpg" alt={i18n.gallery1} width={1000} height={667} unoptimized />
              <figcaption>{i18n.gallery1}</figcaption>
            </figure>
            <figure className="garden-photo" data-tilt style={{ margin: 0 }}>
              <Image src="/hy-garden/coffee-workspace.jpg" alt={i18n.gallery2} width={1000} height={667} unoptimized />
              <figcaption>{i18n.gallery2}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Lộ trình chi tiết 15 Buổi — Phong cách Editorial Academic Stream */}
      <section className="section-space rule" id="curriculum">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">{i18n.curriculumEyebrow}</span>
              <h2 className="section-title">{t.curriculumTitle}</h2>
            </div>
            <p>{i18n.curriculumSubtitle}</p>
          </div>

          <div className="workshop-editorial-phases" style={{ marginTop: "44px" }}>
            {phases.map((phase) => (
              <div key={phase.phaseNumber} className="editorial-phase-block">
                <div className="editorial-phase-header">
                  <span className="phase-index">{i18n.phasePrefix} {phase.phaseNumber}</span>
                  <h3>{phase.phaseTitle}</h3>
                </div>

                <div className="editorial-sessions-grid">
                  {phase.sessions.map((s) => (
                    <article key={s.sessionNumber} className="editorial-session-item">
                      <div className="session-meta-row">
                        <span className="session-number">
                          {locale === "zh" ? `第 ${s.sessionNumber} 课` : `${i18n.sessionPrefix} ${s.sessionNumber}`}
                        </span>
                        <span className="session-tag-soft">{s.tag}</span>
                      </div>
                      <h4 className="session-item-title">{s.title}</h4>
                      <ul className="session-item-points">
                        {s.items.map((item, idx) => (
                          <li key={idx}>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="session-tool-tags">
                        {s.tools.map((tool) => (
                          <span key={tool} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cơ hội Đầu ra & Hợp tác sau tốt nghiệp */}
      <section className="section-space rule">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">{i18n.careerEyebrow}</span>
              <h2 className="section-title">{t.careerOutcomesTitle ?? i18n.careerTitle}</h2>
            </div>
            <p>{i18n.careerSubtitle}</p>
          </div>

          <div className="career-editorial-grid" style={{ marginTop: "36px" }}>
            {careerOptions.map((opt) => (
              <article key={opt.direction} className="career-editorial-card">
                <span className="career-index">{opt.direction}</span>
                <h3 className="career-title">{opt.model}</h3>
                <p className="career-desc">{opt.desc}</p>
                <div className="career-income-box">
                  <span className="income-caption">{i18n.incomeCaption}</span>
                  <strong className="income-amount">{opt.income}</strong>
                </div>
              </article>
            ))}
          </div>

          {/* Thể loại phim ưu tiên */}
          {filmGenres && (
            <div className="genres-editorial-box" style={{ marginTop: "40px" }}>
              <h3 className="genres-main-title">{i18n.genresTitle}</h3>
              <div className="genres-three-cols">
                <div>
                  <h4>{i18n.genresPromo}</h4>
                  <div className="genres-tag-wrap">
                    {filmGenres.promo.map((g) => <span key={g} className="genre-item-tag">{g}</span>)}
                  </div>
                </div>
                <div>
                  <h4>{i18n.genresModern}</h4>
                  <div className="genres-tag-wrap">
                    {filmGenres.modern.map((g) => <span key={g} className="genre-item-tag">{g}</span>)}
                  </div>
                </div>
                <div>
                  <h4>{i18n.genresCommercial}</h4>
                  <div className="genres-tag-wrap">
                    {filmGenres.commercial.map((g) => <span key={g} className="genre-item-tag">{g}</span>)}
                  </div>
                </div>
              </div>
              <p className="genres-note">
                💡 <strong>{i18n.philosophyPrefix}</strong> {t.cocoPhilosophy ?? ""}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Địa điểm & Thông tin Đào tạo */}
      <section className="section-space rule">
        <div className="site-container split-section">
          <div>
            <span className="eyebrow">{i18n.venueEyebrow}</span>
            <h2 className="section-title">{i18n.venueTitle}</h2>
          </div>
          <div>
            <div className="venues-editorial-list">
              {venues.map((v, i) => (
                <div key={i} className="venue-item-box">
                  <strong>{v.name}</strong>
                  <p>📍 {v.address}</p>
                </div>
              ))}
              <div className="venue-item-box">
                <strong>{i18n.hotlineLabel}</strong>
                <p className="hotline-highlight">
                  📞 <a href="tel:0961499943">0961 499 943</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khu vực Đăng ký Native Form */}
      <section className="section-space rule" id="register">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">{t.eyebrow}</span>
              <h2 className="section-title">{t.ctaRegister}</h2>
            </div>
            <p>{i18n.registerSubtitle}</p>
          </div>

          <div className="workshop-register-clean-layout" style={{ marginTop: "40px" }}>
            {/* Native Form */}
            <div className="register-form-column">
              <WorkshopRegisterForm locale={locale} formUrl={t.formUrl} />
            </div>

            {/* QR Card Clean */}
            <div className="register-side-column">
              <div className="qr-soft-card">
                <h3>{t.scanQr}</h3>
                <div className="qr-center-block">
                  <div className="qr-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrCodeUrl} alt="Google Form QR Code" width={200} height={200} className="qr-clean-img" />
                  </div>
                  <p className="qr-note-clean">
                    {i18n.qrNote}
                  </p>
                </div>
                <div className="qr-alt-action">
                  <a
                    href={t.formUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="qr-alt-button"
                  >
                    <span>{t.openInNewTab}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="closing-cta">
        <div className="site-container">
          <h2>{i18n.closingTitle}</h2>
          <a href="#register" className="button-primary">
            {t.ctaRegister}
          </a>
        </div>
      </section>
    </>
  );
}
