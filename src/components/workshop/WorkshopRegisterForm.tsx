"use client";

import type { Locale } from "@/src/content/site";

interface Props {
  locale: Locale;
  formUrl: string;
}

export function WorkshopRegisterForm({ locale, formUrl }: Props) {
  const content = {
    vi: {
      badge: "Ưu Đãi Khai Giảng 7 Triệu · Coco Drama Scholarship",
      title: "Đăng Ký Khóa Học AI SHORT DRAMA MAKER",
      subtitle: "Học phí gốc 12.000.000đ — Ưu đãi khai giảng chỉ còn 7.000.000đ/khóa cùng chương trình Coco Drama Scholarship hỗ trợ học phí 7 triệu. Điền biểu mẫu chính thức để giữ chỗ và nhận tư vấn.",
      cta: "Mở Phiếu Đăng Ký Chính Thức (Google Form) ↗",
      benefits: [
        "Học phí ưu đãi khai giảng: 7.000.000đ/khóa (Học phí tiêu chuẩn: 12.000.000đ)",
        "Chương trình học bổng Coco Drama Scholarship hỗ trợ học phí 7 triệu",
        "Sau khóa học: Hoàn thiện 01 sản phẩm phim AI & có portfolio chuyên nghiệp",
        "Nhận giấy xác nhận hoàn thành từ Triệu Hỷ Media × Đạo diễn Vũ Lee",
        "Cơ hội tham gia trực tiếp dự án Short Drama trên nền tảng Coco Drama",
        "Địa điểm học thực chiến: HỶ GARDEN - 15 Trung Lương 16, Đà Nẵng",
      ],
      hotlineText: "Hotline tư vấn & hỗ trợ trực tiếp:",
      hotline: "0961 499 943",
    },
    en: {
      badge: "Early-Bird 7M VND · Coco Drama Scholarship",
      title: "Enroll in AI SHORT DRAMA MAKER",
      subtitle: "Standard tuition 12,000,000 VND — Early-bird rate is only 7,000,000 VND/course with Coco Drama Scholarship supporting 7M VND. Complete the official form to reserve your seat.",
      cta: "Open Official Registration Form (Google Form) ↗",
      benefits: [
        "Early-bird tuition: 7,000,000 VND/course (Standard: 12,000,000 VND)",
        "Coco Drama Scholarship program supporting 7 Million VND tuition",
        "Post-graduation: Complete 01 AI film product & build your professional portfolio",
        "Official Certificate of Completion from Trieu Hy Media × Director Vu Lee",
        "Direct opportunity to join commercial Short Drama projects on Coco Drama",
        "Hands-on studio venue: Hy Garden - 15 Trung Luong 16, Da Nang",
      ],
      hotlineText: "Direct Support & Admissions Hotline:",
      hotline: "0961 499 943",
    },
    zh: {
      badge: "早鸟特惠 700 万 · Coco Drama 奖学金",
      title: "报名 AI SHORT DRAMA MAKER 实战营",
      subtitle: "标准学费 12,000,000 越南盾 — 开营早鸟仅需 7,000,000 越南盾/期，并享 Coco Drama Scholarship 700 万学费奖学金扶持。填写官方表单锁定席位。",
      cta: "打开官方报名表单 (Google Form) ↗",
      benefits: [
        "开班早鸟特惠学费：7,000,000 越南盾/期（原价 12,000,000 越南盾）",
        "Coco Drama Scholarship 奖学金支持 700 万越南盾学费资助",
        "结业产出：完成 1 部达到发行标准的 AI 电影作品 & 建立专业作品集",
        "获得 Triệu Hỷ Media × 导演 Vũ Lee 联合颁发的结业认证证书",
        "直接签约入选 Coco Drama 平台官方商业短剧制作项目",
        "实战授课地点：HỶ GARDEN - 岘港市和春坊 Trung Lương 16 街 15 号",
      ],
      hotlineText: "咨询与报名热线：",
      hotline: "0961 499 943",
    },
    ko: {
      badge: "얼리버드 700만 VND · Coco Drama 장학금",
      title: "AI SHORT DRAMA MAKER 수강 신청",
      subtitle: "정규 수강료 12,000,000 VND — 얼리버드 혜택 적용 시 7,000,000 VND/과정 및 Coco Drama Scholarship 700만 VND 학비 장학 지원. 공식 양식을 작성해 주세요.",
      cta: "공식 신청서 열기 (Google Form) ↗",
      benefits: [
        "개강 얼리버드 수강료: 7,000,000 VND/과정 (정규 학비 12,000,000 VND)",
        "Coco Drama Scholarship 장학 프로그램을 통한 700만 VND 학비 지원",
        "수료 성과: 완성된 AI 영상 1편 제작 & 스튜디오급 포트폴리오 구축",
        "Triệu Hỷ Media × Vũ Lee 디렉터 공식 수료 인증서 발급",
        "Coco Drama 플랫폼 상업 숏폼 드라마 프로젝트 직접 참여 기회",
        "실습 교육 장소: HỶ GARDEN - 15 Trung Lương 16, Đà Nẵng",
      ],
      hotlineText: "입학 상담 및 문의:",
      hotline: "0961 499 943",
    },
  }[locale] || {
    badge: "Ưu Đãi Khai Giảng 7 Triệu · Coco Drama Scholarship",
    title: "Đăng Ký Khóa Học AI SHORT DRAMA MAKER",
    subtitle: "Học phí gốc 12.000.000đ — Ưu đãi khai giảng chỉ còn 7.000.000đ/khóa.",
    cta: "Mở Phiếu Đăng Ký Chính Thức (Google Form) ↗",
    benefits: [
      "Học phí ưu đãi khai giảng: 7.000.000đ/khóa (Học phí gốc: 12.000.000đ)",
      "Chương trình Coco Drama Scholarship hỗ trợ học phí 7 triệu",
      "Sau khóa học: Hoàn thiện 01 sản phẩm AI & có portfolio",
      "Giấy xác nhận hoàn thành từ Triệu Hỷ Media × Vũ Lee",
      "Cơ hội tham gia dự án Short Drama trên Coco Drama",
      "Địa điểm: HỶ GARDEN - 15 Trung Lương 16, Đà Nẵng",
    ],
    hotlineText: "Hotline hỗ trợ:",
    hotline: "0961 499 943",
  };

  return (
    <div className="workshop-native-card">
      <div className="workshop-native-card-header">
        <div className="card-badge-soft">{content.badge}</div>
        <h3 className="card-native-title">{content.title}</h3>
        <p className="card-native-subtitle">{content.subtitle}</p>
      </div>

      <ul className="workshop-register-benefits">
        {content.benefits.map((b, i) => (
          <li key={i}>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="workshop-direct-cta-wrap">
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="workshop-direct-submit-btn"
        >
          {content.cta}
        </a>
        <div className="workshop-hotline-inline">
          <span>{content.hotlineText}</span>
          <a href={`tel:${content.hotline.replace(/\s/g, "")}`}>
            <strong>{content.hotline}</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
