import type { Metadata } from "next";
import { WorkshopRecap } from "@/src/components/news/WorkshopRecap";
import { workshopRecap } from "@/src/content/workshopRecap";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/src/content/site";
import { company } from "@/src/config/company";
import { pageMetadata } from "@/src/lib/metadata";

const copy = {
  vi: {
    pageTitle: "Tin tức & câu chuyện",
    eyebrow: "Workshop recap · 19.9",
    title: "AI Short Drama Making Workshop",
    lead: "Ngày 19.9 vừa qua, Hỷ Garden đã có một buổi gặp gỡ nhỏ nhưng nhiều năng lượng, nơi mọi người cùng nói về AI, phim ngắn và cách làm nghề đang đổi.",
    recapTitle: "Ý tưởng hôm nay — những câu chuyện ngày mai",
    recap: "Từ những phần chia sẻ thực tế, buổi workshop không chỉ mở ra thêm góc nhìn về storytelling và công cụ AI, mà còn gợi ra những cơ hội học hỏi, hợp tác và phát triển cho những người đang tìm đến sáng tạo nội dung và short drama.",
    quote: "Một workshop nhỏ, cho những câu hỏi lớn hơn sau này.",
    photoAlt: "Người tham dự trao đổi về làm phim AI tại Hỷ Garden",
    lionEyebrow: "KHOẢNH KHẮC CỘNG ĐỒNG · HỶ GARDEN",
    lionTitle: "Sắc màu múa lân, niềm vui kết nối",
    lionCopy: "Tiếng trống rộn ràng, sắc vàng và hồng nổi bật giữa khu vườn. Những khoảnh khắc biểu diễn và mọi người cùng dõi theo mang không khí lễ hội đến Hỷ Garden — một lát cắt cộng đồng bên cạnh câu chuyện sáng tạo.",
    lionAlt: "Đội múa lân biểu diễn trong không khí lễ hội tại Hỷ Garden",
    nextLabel: "Khám phá workshop",
    nextTitle: "Cùng bắt đầu câu chuyện của bạn",
    nextCopy: "Tìm hiểu AI Short Drama Making Workshop và hành trình từ ý tưởng đến câu chuyện được kể bằng AI.",
    cta: "Tìm hiểu workshop",
  },
  en: {
    pageTitle: "News & stories",
    eyebrow: "Workshop recap · Sep 19",
    title: "AI Short Drama Making Workshop",
    lead: "On September 19, Hy Garden hosted a small but energetic gathering to talk about AI, short films, and a changing creative practice.",
    recapTitle: "Today's ideas — tomorrow's stories",
    recap: "Practical conversations brought fresh perspectives on storytelling and AI tools, along with opportunities to learn, collaborate, and grow for people exploring content creation and short drama.",
    quote: "A small workshop for the bigger questions ahead.",
    photoAlt: "Participants discussing AI filmmaking at Hy Garden",
    lionEyebrow: "COMMUNITY MOMENTS · HY GARDEN",
    lionTitle: "Lion dance, shared celebration",
    lionCopy: "Drums set the rhythm as vivid yellow and pink lions fill the garden. Performers and guests share the moment, bringing a festive note to Hy Garden alongside its creative workshops.",
    lionAlt: "Lion dancers performing for guests in a festive garden setting",
    nextLabel: "Explore the workshop",
    nextTitle: "Start shaping your story",
    nextCopy: "Explore the AI Short Drama Making Workshop and the journey from an idea to a story told with AI.",
    cta: "Explore the workshop",
  },
  zh: {
    pageTitle: "新闻与故事",
    eyebrow: "工作坊回顾 · 9月19日",
    title: "AI 短剧创作工作坊",
    lead: "9月19日，Hỷ Garden 举办了一场小而充满活力的聚会，大家一起交流 AI、短片与不断变化的创作方式。",
    recapTitle: "今日灵感，明日故事",
    recap: "实践交流带来了关于故事表达与 AI 工具的新视角，也为探索内容创作和短剧的朋友创造了学习、合作与成长的机会。",
    quote: "一场小小的工作坊，聊聊更大的创作问题。",
    photoAlt: "参与者在 Hỷ Garden 交流 AI 电影制作",
    lionEyebrow: "社区时刻 · HỶ GARDEN",
    lionTitle: "舞狮欢腾，共享喜悦",
    lionCopy: "鼓声响起，明亮的黄色与粉色舞狮为花园增添节日气氛。表演者与来宾共同感受这一刻，也为 Hỷ Garden 的创意活动增添了一段社区记忆。",
    lionAlt: "舞狮队在花园为来宾带来节庆表演",
    nextLabel: "探索工作坊",
    nextTitle: "一起开始你的故事",
    nextCopy: "了解 AI 短剧创作工作坊，探索从灵感到 AI 故事的创作过程。",
    cta: "了解工作坊",
  },
  ko: {
    pageTitle: "뉴스와 이야기",
    eyebrow: "워크숍 후기 · 9월 19일",
    title: "AI 숏드라마 제작 워크숍",
    lead: "9월 19일, Hỷ Garden에서 작지만 활기찬 만남이 열렸습니다. AI와 단편 영화, 변화하는 창작 방식에 대해 함께 이야기했습니다.",
    recapTitle: "오늘의 아이디어, 내일의 이야기",
    recap: "실전 대화를 통해 스토리텔링과 AI 도구를 새롭게 바라보고, 콘텐츠와 숏드라마를 만드는 이들이 배우고 협업하며 성장할 기회를 나눴습니다.",
    quote: "작은 워크숍에서 시작하는 더 큰 질문들.",
    photoAlt: "Hỷ Garden에서 AI 영화 제작을 이야기하는 참가자들",
    lionEyebrow: "커뮤니티 순간 · HỶ GARDEN",
    lionTitle: "사자춤으로 함께한 축제의 순간",
    lionCopy: "북소리와 함께 노란색과 분홍색 사자춤이 정원을 채웁니다. 공연자와 손님이 함께 즐긴 순간은 Hỷ Garden의 창작 워크숍 곁에 축제의 기억을 더했습니다.",
    lionAlt: "정원에서 손님들을 위해 공연하는 사자춤 팀",
    nextLabel: "워크숍 둘러보기",
    nextTitle: "함께 당신의 이야기를 시작해요",
    nextCopy: "AI 숏드라마 제작 워크숍과 아이디어를 AI 이야기로 만드는 과정을 알아보세요.",
    cta: "워크숍 알아보기",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = copy[locale];
  return pageMetadata(locale, "/news", `${t.pageTitle} | ${company.brandName}`, workshopRecap[locale].lead);
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  return (
    <div className="news-page">
      <WorkshopRecap locale={locale} />
      <div className="site-container news-archive-label"><span className="eyebrow">{workshopRecap[locale].archive}</span></div>
      <section className="page-hero page-hero--visual news-hero">
        <div className="site-container page-hero-grid news-hero-grid">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="page-title news-title">{t.title}</h2>
            <p className="body-large page-intro">{t.lead}</p>
          </div>
          <aside className="news-hero-stack" aria-label={t.photoAlt}>
            <figure className="page-hero-media news-hero-photo" data-reveal>
              <Image src="/news/ai-workshop-session.jpg" alt={t.photoAlt} width={940} height={1660} unoptimized />
            </figure>
          </aside>
        </div>
      </section>

      <section className="section-space rule news-recap">
        <div className="site-container">
          <div className="news-recap-copy" data-reveal>
            <span className="eyebrow">TRIỆU HỶ MEDIA × HỶ GARDEN</span>
            <h2 className="section-title">{t.recapTitle}</h2>
            <p className="body-large">{t.recap}</p>
            <blockquote>{t.quote}</blockquote>
          </div>
          <div className="news-photo-pair">
            <figure className="news-photo news-photo-wide" data-tilt data-reveal>
              <Image src="/news/creative-workshop.jpg" alt={t.photoAlt} width={940} height={1660} unoptimized />
            </figure>
            <figure className="news-photo news-photo-tall" data-tilt data-reveal>
              <Image src="/news/workshop-presentation.jpg" alt={t.photoAlt} width={940} height={1660} unoptimized />
            </figure>
          </div>
        </div>
      </section>

      <section className="section-space news-lion">
        <div className="site-container news-lion-grid">
          <div className="news-lion-copy" data-reveal>
            <span className="eyebrow">{t.lionEyebrow}</span>
            <h2 className="section-title">{t.lionTitle}</h2>
            <p className="body-large">{t.lionCopy}</p>
          </div>
          <div className="news-lion-photos">
            <figure className="news-photo news-lion-main" data-tilt data-reveal>
              <Image src="/news/lion-performance.jpg" alt={t.lionAlt} width={940} height={1660} unoptimized />
            </figure>
            <figure className="news-photo news-lion-detail" data-tilt data-reveal>
              <Image src="/news/lion-procession.jpg" alt={t.lionAlt} width={940} height={1660} unoptimized />
            </figure>
          </div>
        </div>
      </section>

      <section className="section-space rule news-next">
        <div className="site-container news-next-inner" data-reveal>
          <div>
            <span className="eyebrow">{t.nextLabel}</span>
            <h2 className="section-title">{t.nextTitle}</h2>
            <p className="body-large">{t.nextCopy}</p>
          </div>
          <Link href={`/${locale}/workshop`} className="button-primary">{t.cta}</Link>
        </div>
      </section>
    </div>
  );
}
