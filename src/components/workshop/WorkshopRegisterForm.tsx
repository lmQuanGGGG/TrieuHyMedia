"use client";

import type { Locale } from "@/src/content/site";

interface Props {
  locale: Locale;
  formUrl: string;
}

export function WorkshopRegisterForm({ locale, formUrl }: Props) {
  const content = {
    vi: {
      badge: "Tuyển Sinh 2026",
      title: "Phiếu Đăng Ký Tham Dự Khóa Học",
      subtitle: "Khám phá sức mạnh của AI trong điện ảnh cùng Vu Lee & Hoà Nguyễn (Hulk Nón Lá). Điền biểu mẫu chính thức của Ban Tổ Chức để giữ chỗ và nhận giáo trình thực chiến.",
      cta: "Mở Phiếu Đăng Ký Chính Thức (Google Form) ↗",
      benefits: [
        "Đăng ký trực tiếp vào hệ thống dữ liệu chính thức của Ban Tổ Chức",
        "Nhận giáo trình 15 buổi & hướng dẫn chuẩn bị công cụ trước khai giảng",
        "Cơ hội tuyển dụng trực tiếp vào đội ngũ sản xuất VuLee & Triệu Hỷ Media",
        "Cam kết hỗ trợ thực hành thực chiến tại Studio Hỷ Garden",
      ],
      hotlineText: "Hotline hỗ trợ & đăng ký trực tiếp:",
      hotline: "0961 499 943",
    },
    en: {
      badge: "Admissions 2026",
      title: "Official Workshop Registration",
      subtitle: "Discover the power of AI in filmmaking with Vu Lee & Hoà Nguyễn (Hulk Nón Lá). Fill out the official form to reserve your seat and receive curriculum assets.",
      cta: "Open Official Registration Form (Google Form) ↗",
      benefits: [
        "Direct registration to the official admissions database",
        "Receive the 15-session syllabus & tool setup guide before kickoff",
        "Direct hiring opportunities with VuLee & Trieu Hy Media production team",
        "Hands-on studio access & mentoring at Hy Garden Workspace",
      ],
      hotlineText: "Direct Support & Admissions Hotline:",
      hotline: "0961 499 943",
    },
    zh: {
      badge: "2026 特训招生",
      title: "官方课程报名申请",
      subtitle: "携手 Vu Lee 与 Hoà Nguyễn (Hulk Nón Lá) 探索 AI 电影前沿技术。填写官方表单锁定名额并获取实战教材。",
      cta: "打开官方报名表单 (Google Form) ↗",
      benefits: [
        "直接录入官方特训营学员录取系统",
        "开课前获取 15 节完整教案与 AI 工具配置指南",
        "签约 Coco Drama 与 VuLee / Triệu Hỷ Media 核心团队机会",
        "在 Hỷ Garden 线下空间享受 1 对 1 导师实战指导",
      ],
      hotlineText: "咨询与报名热线：",
      hotline: "0961 499 943",
    },
    ko: {
      badge: "2026 신입 모집",
      title: "공식 워크숍 참가 신청",
      subtitle: "Vu Lee & Hoà Nguyễn (Hulk Nón Lá)과 함께하는 실전 AI 영화 제작. 공식 신청 양식을 작성하고 교재를 수령하세요.",
      cta: "공식 신청서 열기 (Google Form) ↗",
      benefits: [
        "공식 입학 데이터베이스에 직접 접수",
        "개강 전 15회차 전체 커리큘럼 및 툴 준비 가이드 제공",
        "VuLee & Triệu Hỷ Media 제작팀 정규직/파트너 채용 기회",
        "Hỷ Garden 워크스페이스 실습실 이용 및 1:1 멘토링",
      ],
      hotlineText: "입학 상담 및 문의:",
      hotline: "0961 499 943",
    },
  }[locale] || {
    badge: "Tuyển Sinh 2026",
    title: "Phiếu Đăng Ký Tham Dự Khóa Học",
    subtitle: "Khám phá sức mạnh của AI trong điện ảnh. Điền biểu mẫu chính thức để nhận giáo trình.",
    cta: "Mở Phiếu Đăng Ký Chính Thức (Google Form) ↗",
    benefits: [
      "Đăng ký trực tiếp với Ban Tổ Chức",
      "Nhận giáo trình 15 buổi học thực chiến",
      "Cơ hội tuyển dụng vào Triệu Hỷ Media",
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
