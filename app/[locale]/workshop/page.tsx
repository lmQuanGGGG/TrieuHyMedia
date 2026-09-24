import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkshopCardDeal } from "@/src/components/workshop/WorkshopCardDeal";
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

  const qrCodeUrl = "/workshop/google-form-registration-qr.png";

  const phases = "phases" in t ? t.phases : [];
  const careerOptions = "careerOptions" in t ? t.careerOptions : [];
  const filmGenres = "filmGenres" in t ? t.filmGenres : null;
  const stats = "stats" in t ? t.stats : [];
  const venues = "venues" in t ? t.venues : [];
  const instructors = "instructors" in t ? t.instructors : [];

  const tuition = "tuition" in t ? t.tuition : null;

  const i18n = {
    vi: {
      instructorEyebrow: "Giảng viên & Đạo diễn",
      instructorTitle: "ĐẠO DIỄN VŨ LEE & KHÁCH MỜI HÒA NGUYỄN",
      instructorSubtitle: "Khóa học do Đạo diễn Vũ Lee (AI Film Director) trực tiếp giảng dạy cùng sự đồng hành của Triệu Hỷ Media và Khách mời Hòa Nguyễn (Hulk Nón Lá).",
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
      pricingEyebrow: "Học Phí & Học Bổng",
      pricingTitle: "Chính Sách Học Phí & Học Bổng Coco Drama",
      pricingIntro: "Chính sách học phí minh bạch kết hợp chương trình học bổng Coco Drama hỗ trợ các nhà sáng tạo làm phim AI thế hệ mới.",
      saveNote: "Ưu đãi đặc biệt giảm ngay 5.000.000đ dành cho học viên đăng ký sớm đợt khai giảng đầu tiên.",
      scholarshipLevelLabel: "Mức hỗ trợ học bổng",
      scholarshipPerk1Title: "Tài trợ Credit AI thực hành",
      scholarshipPerk1Desc: "Cấp tài nguyên và credit thực hành sản xuất phim trên các nền tảng AI tân tiến (Veo 3, Seedance 2.0...).",
      scholarshipPerk2Title: "Phát hành phim trên Coco Drama",
      scholarshipPerk2Desc: "Sản phẩm tốt nghiệp đạt tiêu chuẩn được phát hành trực tiếp đến hàng trăm ngàn khán giả Đông Nam Á.",
      scholarshipPerk3Title: "Cơ chế trả thù lao sản xuất",
      scholarshipPerk3Desc: "Cơ hội tham gia sản xuất có trả phí: từ 500k/source 4 phút đến 15 triệu/bộ phim ngắn hoàn chỉnh.",
      venueEyebrow: t.venueTitle ?? "Địa điểm & Liên hệ",
      venueTitle: "Địa Điểm Đào Tạo & Liên Hệ",
      hotlineLabel: "Hotline tư vấn & hỗ trợ trực tiếp",
      registerSubtitle: "Điền thông tin vào phiếu đăng ký để nhận tư vấn chi tiết về lịch khai giảng và học phí ưu đãi 7 triệu.",
      qrNote: "Quét mã QR bằng camera điện thoại để mở form đăng ký di động nhanh chóng.",
      closingTitle: "Sẵn sàng bắt đầu hành trình sản xuất phim AI cùng Vũ Lee & Triệu Hỷ Media?",
    },
    en: {
      instructorEyebrow: "Lead Instructor & Director",
      instructorTitle: "DIRECTOR VU LEE & GUEST HOÀ NGUYỄN",
      instructorSubtitle: "Directly led by AI Film Director Vu Lee in official partnership with Trieu Hy Media and Guest Creator Hoa Nguyen (Hulk Non La).",
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
      pricingEyebrow: "Tuition & Scholarship",
      pricingTitle: "Tuition Policy & Coco Drama Scholarship",
      pricingIntro: "Transparent tuition policy combined with the Coco Drama Scholarship program empowering next-generation AI creators.",
      saveNote: "Special early-bird discount saving 5,000,000 VND for the opening masterclass cohort.",
      scholarshipLevelLabel: "Scholarship Support Value",
      scholarshipPerk1Title: "Sponsored AI Studio Credits",
      scholarshipPerk1Desc: "Access computational assets & credits for cutting-edge AI models (Veo 3, Seedance 2.0...).",
      scholarshipPerk2Title: "Commercial Distribution on Coco Drama",
      scholarshipPerk2Desc: "Qualifying graduation films get distributed directly across Southeast Asian streaming audiences.",
      scholarshipPerk3Title: "Production Fee Monetization",
      scholarshipPerk3Desc: "Paid production contracts: from 500k VND/4-min source to 15M VND for a full series.",
      venueEyebrow: t.venueTitle ?? "Venue & Inquiries",
      venueTitle: "Training Venue & Direct Contact",
      hotlineLabel: "Direct Admissions & Support Hotline",
      registerSubtitle: "Submit your registration to receive admissions guidance, schedule confirmation, and early-bird tuition benefits.",
      qrNote: "Scan QR code with your phone camera to open the official registration form instantly.",
      closingTitle: "Ready to launch your studio-grade AI filmmaking journey with VuLee & Trieu Hy Media?",
    },
    zh: {
      instructorEyebrow: "主讲导师与特邀嘉宾",
      instructorTitle: "VU LEE 导演与 HOÀ NGUYỄN (Hulk Nón Lá)",
      instructorSubtitle: "由 AI 电影导演 Vu Lee 亲自执教，联合 Triệu Hỷ Media 官方及特邀嘉宾 Hoà Nguyễn 倾力打造。",
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
      pricingEyebrow: "学费与奖学金",
      pricingTitle: "特惠学费与 Coco Drama 奖学金计划",
      pricingIntro: "公开透明的特训学费体系，协同 Coco Drama 官方奖学金计划扶持新一代 AI 影视创作者。",
      saveNote: "首期开班学员立减 5,000,000 越南盾特惠福利。",
      scholarshipLevelLabel: "学费资助额度",
      scholarshipPerk1Title: "资助实战 AI 算力额度",
      scholarshipPerk1Desc: "提供前沿 AI 模型（Veo 3、Seedance 2.0 等）官方实操算力与制作资源。",
      scholarshipPerk2Title: "Coco Drama 官方直发",
      scholarshipPerk2Desc: "达到发行标准的毕业成片将直接上线 Coco Drama 平台面向东南亚海量观众播出。",
      scholarshipPerk3Title: "商业制作付费报酬",
      scholarshipPerk3Desc: "签约商业制作：从 500k 越盾/4分钟 source 到 1500万 越盾/部完整短剧。",
      venueEyebrow: t.venueTitle ?? "培训地点",
      venueTitle: "培训地点与联系方式",
      hotlineLabel: "招生咨询与官方热线",
      registerSubtitle: "提交报名申请，获取开班时间安排与早鸟学费优惠详情。",
      qrNote: "使用手机相机扫描二维码，快速打开官方移动端报名表单。",
      closingTitle: "准备好与 VuLee 及 Triệu Hỷ Media 一同开启 AI 电影制作之旅了吗？",
    },
    ko: {
      instructorEyebrow: "전문 강사진 & 디렉터",
      instructorTitle: "VU LEE 디렉터 & HOÀ NGUYỄN",
      instructorSubtitle: "AI 영화 디렉터 Vu Lee 직강 및 Triệu Hỷ Media 공식 협력, 특별 게스트 Hoà Nguyễn 동행.",
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
      pricingEyebrow: "수강료 및 장학 혜택",
      pricingTitle: "수강료 정책 및 Coco Drama 장학 프로그램",
      pricingIntro: "차세대 AI 영화 창작자를 위한 투명한 수강료 정책과 Coco Drama 공식 장학 지원 프로그램.",
      saveNote: "첫 개강 기수 조기 등록 시 5,000,000 VND 즉시 할인 혜택.",
      scholarshipLevelLabel: "장학 지원 규모",
      scholarshipPerk1Title: "실전 AI 제작 크레딧 지원",
      scholarshipPerk1Desc: "최신 AI 모델(Veo 3, Seedance 2.0 등) 실습용 제작 리소스 및 크레딧 지원.",
      scholarshipPerk2Title: "Coco Drama 공식 배급",
      scholarshipPerk2Desc: "기준을 충족한 수료작은 동남아 관객 대상 Coco Drama 플랫폼에 공식 배급.",
      scholarshipPerk3Title: "상업 제작 유료 계약 기회",
      scholarshipPerk3Desc: "유료 제작 기회: 4분 source당 50만 VND ~ 완편 시리즈당 1,500만 VND.",
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
    pricingEyebrow: "Học Phí & Học Bổng",
    pricingTitle: "Học Phí Ưu Đãi & Học Bổng Coco Drama",
    pricingIntro: "Chính sách học phí và học bổng hỗ trợ học viên.",
    saveNote: "Ưu đãi khai giảng đặc biệt",
    scholarshipLevelLabel: "Mức hỗ trợ",
    scholarshipPerk1Title: "Tài trợ Credit AI",
    scholarshipPerk1Desc: "Cấp tài nguyên thực hành.",
    scholarshipPerk2Title: "Phát hành trên Coco Drama",
    scholarshipPerk2Desc: "Phát hành phim đến khán giả.",
    scholarshipPerk3Title: "Thù lao sản xuất",
    scholarshipPerk3Desc: "Hợp tác sản xuất có trả phí.",
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
            <span className="eyebrow">{t.collaboration ?? "TRIỆU HỶ MEDIA × VŨ LEE | COCO DRAMA"}</span>
            <h1 className="workshop-hero-title">{t.title}</h1>
            {"courseSubtitle" in t && (
              <p className="workshop-hero-course-sub">{t.courseSubtitle}</p>
            )}
            <p className="workshop-hero-intro">{t.headline}</p>

            {tuition && (
              <div className="workshop-hero-scholarship-pill">
                <span className="pill-badge">{tuition.discountPriceLabel}</span>
                <span className="pill-price">{tuition.discountPrice}</span>
                <del className="pill-orig">{tuition.originalPrice}</del>
                <span className="pill-sep">·</span>
                <span className="pill-scholarship">{tuition.scholarshipSupport}</span>
              </div>
            )}

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
              <a href="#tuition" className="button-secondary">
                {tuition?.title ?? t.curriculumTitle}
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
                <span className="speaker-name">VŨ LEE · AI FILM DIRECTOR</span>
                <span className="speaker-role">Triệu Hỷ Media × Vũ Lee · Đồng hành dự án Coco Drama</span>
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

          <WorkshopCardDeal className="workshop-speakers-grid" style={{ marginTop: "36px" }}>
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
          </WorkshopCardDeal>

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

                <WorkshopCardDeal className="editorial-sessions-grid">
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
                </WorkshopCardDeal>
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

          <WorkshopCardDeal className="career-editorial-grid" style={{ marginTop: "36px" }}>
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
          </WorkshopCardDeal>

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
                <strong>{i18n.philosophyPrefix}</strong> {t.cocoPhilosophy ?? ""}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Học Phí & Học Bổng Coco Drama Section */}
      {tuition && (
        <section className="section-space rule" id="tuition">
          <div className="site-container">
            <div className="section-heading-row">
              <div>
                <span className="eyebrow">{i18n.pricingEyebrow}</span>
                <h2 className="section-title">{i18n.pricingTitle}</h2>
              </div>
              <p>{i18n.pricingIntro}</p>
            </div>

            <div className="workshop-pricing-grid" style={{ marginTop: "40px" }}>
              {/* Thẻ học phí chính */}
              <div className="workshop-pricing-card">
                <div className="pricing-card-header">
                  <div>
                    <span className="pricing-badge-soft">{t.courseSubtitle ?? "Khóa học thực chiến"}</span>
                    <h3 className="pricing-card-name">{t.title}</h3>
                  </div>
                  <div className="pricing-discount-tag">
                    <span>{tuition.discountPriceLabel}</span>
                  </div>
                </div>

                <div className="pricing-figure-block">
                  <div className="pricing-current-row">
                    <strong className="pricing-current-amount">{tuition.discountPrice}</strong>
                    <del className="pricing-original-amount">{tuition.originalPrice}</del>
                  </div>
                  <p className="pricing-save-caption">{i18n.saveNote}</p>
                </div>

                <div className="pricing-meta-row">
                  <div className="pricing-meta-col">
                    <span className="meta-icon-text">{tuition.durationLabel}</span>
                    <strong className="meta-value">{tuition.duration}</strong>
                  </div>
                  <div className="pricing-meta-col">
                    <span className="meta-icon-text">{tuition.locationLabel}</span>
                    <strong className="meta-value">{tuition.location}</strong>
                  </div>
                </div>

                <div className="pricing-outcomes-block">
                  <h4 className="pricing-outcomes-heading">{tuition.outcomesTitle}</h4>
                  <ul className="pricing-outcomes-list">
                    {tuition.outcomes.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card-action">
                  <a href="#register" className="button-primary pricing-action-btn">
                    {tuition.cta}
                  </a>
                </div>
              </div>

              {/* Thẻ học bổng Coco Drama Scholarship */}
              <div className="workshop-scholarship-card">
                <div className="scholarship-card-header">
                  <span className="scholarship-pill">COCO DRAMA SCHOLARSHIP</span>
                  <h3 className="scholarship-title">{tuition.scholarshipTitle}</h3>
                </div>

                <div className="scholarship-benefit-badge">
                  <span className="scholarship-benefit-label">{i18n.scholarshipLevelLabel}</span>
                  <strong className="scholarship-benefit-val">{tuition.scholarshipSupport}</strong>
                </div>

                <p className="scholarship-desc">{tuition.scholarshipNote}</p>

                <div className="scholarship-features-list">
                  <div className="scholarship-feature-item">
                    <span className="scholarship-perk-index">01</span>
                    <div>
                      <strong>{i18n.scholarshipPerk1Title}</strong>
                      <p>{i18n.scholarshipPerk1Desc}</p>
                    </div>
                  </div>
                  <div className="scholarship-feature-item">
                    <span className="scholarship-perk-index">02</span>
                    <div>
                      <strong>{i18n.scholarshipPerk2Title}</strong>
                      <p>{i18n.scholarshipPerk2Desc}</p>
                    </div>
                  </div>
                  <div className="scholarship-feature-item">
                    <span className="scholarship-perk-index">03</span>
                    <div>
                      <strong>{i18n.scholarshipPerk3Title}</strong>
                      <p>{i18n.scholarshipPerk3Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
                  <p>{v.address}</p>
                </div>
              ))}
              <div className="venue-item-box">
                <strong>{i18n.hotlineLabel}</strong>
                <p className="hotline-highlight">
                  <a href="tel:0961499943">0961 499 943</a>
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
