import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { company } from "@/src/config/company";
import { isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

const copy = {
  vi: {
    pageTitle: "Tuyển cộng tác viên Media",
    eyebrow: "TRIỆU HỶ MEDIA · TEAM CTV",
    titleA: "Tuyển cộng tác viên",
    titleB: "Media phù hợp",
    intro: "Quay/chụp, dựng video và đồng hành cùng team trong những câu chuyện thương hiệu đời thường.",
    imageAlt: "Cộng tác viên ghi hình nội dung tại không gian cà phê xanh",
    quick: ["Quay & chụp", "Dựng video ngắn", "Phối hợp tại hiện trường"],
    scoreTitle: "Đánh giá năng lực nhanh",
    scoreNote: "Mỗi dự án có yêu cầu riêng. Đây là thang tham khảo để cùng chọn cách phối hợp phù hợp.",
    headers: ["Tiêu chí", "Cấp 1", "Cấp 2", "Cấp 3", "Cấp 4"],
    rows: [
      ["Góc quay / bố cục", "Rối", "Yếu", "Ổn", "Có gu rõ"],
      ["Màu / ánh sáng", "Sai màu", "Thiếu ổn định", "Ổn", "Đúng tinh thần brand"],
      ["Nhịp dựng / 3 giây đầu", "Chưa cuốn", "Chậm", "Ổn", "Có hook tốt"],
      ["Bắt khoảnh khắc thật", "Gượng", "Ít", "Ổn", "Tự nhiên, có cảm xúc"],
      ["Giao tiếp với khách & mẫu", "Ngại / cứng", "Ít tương tác", "Lịch sự", "Tạo cảm giác thoải mái"],
      ["Chủ động tại hiện trường", "Cần nhắc nhiều", "Thụ động", "Ổn", "Tự xử lý tốt"],
      ["Deadline / phối hợp team", "Chưa ổn", "Chậm phản hồi", "Đúng hẹn", "Rõ ràng, đáng tin"],
    ],
    teamTitle: "Team Triệu Hỷ đang tìm gì?",
    teamNote: "Một người làm nghề có trách nhiệm, tinh ý và dễ phối hợp.",
    qualities: [
      ["01", "Vui vẻ, thân thiện", "Giao tiếp tự nhiên và lịch sự với khách hàng, mẫu ảnh và đồng đội."],
      ["02", "Nhanh mắt, bắt khoảnh khắc", "Nhìn ra chi tiết đẹp, phản ứng nhanh và biết giữ cảm xúc thật."],
      ["03", "Chủ động hỗ trợ", "Biết quan sát hiện trường, hỗ trợ khách và hỏi trước khi quay cận mặt."],
      ["04", "Tôn trọng câu chuyện", "Không ép tạo dáng; góp ý nhẹ để mọi người thoải mái trước ống kính."],
      ["05", "Dựng gọn, có nhịp", "Với editor: giữ video gọn, mở đầu cuốn, đồng bộ nhận diện và dễ xem trên mạng xã hội."],
    ],
    paletteEyebrow: "VISUAL DIRECTION · TRIỆU HỶ MEDIA",
    paletteTitle: "Gam màu kể câu chuyện của team",
    paletteIntro: "Ấm, tự nhiên và có điểm nhấn. Màu sắc hỗ trợ hình ảnh thật, không lấn át con người hay sản phẩm.",
    palette: [
      ["#123A32", "Xanh rêu đậm", "Màu nhận diện chính · vững, tin cậy"],
      ["#F5F0E6", "Kem ấm", "Nền sáng · dịu mắt, nhiều khoảng thở"],
      ["#C6572B", "Cam đất", "Điểm nhấn · năng lượng và gần gũi"],
      ["#AAB79A", "Xanh sage", "Màu phụ · cân bằng, tự nhiên"],
      ["#B23F35", "Đỏ ánh kem", "Điểm nhấn ấm · thanh lịch, giàu cảm xúc"],
      ["#0E2338", "Xanh navy đậm", "Chiều sâu cinematic · vững chãi, đĩnh đạc"],
    ],
    brandHeading: "Mỗi thương hiệu, một chất riêng",
    brands: [["Triệu Hỷ Media", "Xanh rêu · kem · cam đất", "Editorial, trẻ trung, rõ ràng."], ["Hỷ Garden", "Xanh lá · kem · gỗ ấm", "Tự nhiên, thư giãn, có chất lifestyle."], ["CocoDrama", "Navy · teal · coral", "Cinematic, cảm xúc, tương phản có chủ đích."], ["Tasting", "Đỏ · trắng ấm · than", "Nổi bật, ngon mắt, giàu năng lượng."]],
    photoTitle: "Quay/chụp sao cho đúng tinh thần?",
    photoCopy: "Ưu tiên ánh sáng cửa sổ, màu da thật, cây xanh và chất liệu gỗ. Giữ khung hình gọn, khoảnh khắc tự nhiên; hạn chế filter lạnh, màu quá gắt và tạo dáng cứng.",
    goalLabel: "Mục tiêu chung",
    goal: "Hình ảnh đẹp, khách hàng thoải mái, video có điểm cuốn và nhận diện thương hiệu nhất quán.",
    applyLabel: "Muốn cộng tác cùng team?",
    apply: "Gửi vài dòng giới thiệu, vị trí bạn muốn cộng tác và link sản phẩm đã làm.",
    cta: "Gửi thông tin ứng tuyển",
  },
  en: {
    pageTitle: "Media Collaborator Recruitment",
    eyebrow: "TRIEU HY MEDIA · CREATOR TEAM",
    titleA: "Looking for",
    titleB: "the right media collaborators",
    intro: "Shoot, edit, and work alongside our team to tell everyday brand stories.",
    imageAlt: "A creator filming content in a leafy coffee workspace",
    quick: ["Photo & video", "Short-form editing", "On-site collaboration"],
    scoreTitle: "A quick skill guide",
    scoreNote: "Every project is different. Use these levels as a starting point for finding the right way to work together.",
    headers: ["Criteria", "Level 1", "Level 2", "Level 3", "Level 4"],
    rows: [
      ["Framing / composition", "Cluttered", "Needs work", "Solid", "Distinct eye"],
      ["Color / lighting", "Off color", "Inconsistent", "Solid", "On brand"],
      ["Edit pace / first 3 sec", "No hook", "Slow", "Solid", "Strong hook"],
      ["Candid moments", "Stiff", "Few", "Solid", "Natural, expressive"],
      ["Client & talent", "Awkward", "Limited", "Polite", "At ease"],
      ["On-set initiative", "Needs prompts", "Passive", "Solid", "Self-directed"],
      ["Deadlines / teamwork", "Unreliable", "Slow replies", "On time", "Clear & trusted"],
    ],
    teamTitle: "What matters to our team",
    teamNote: "A thoughtful collaborator who takes responsibility and works well with people.",
    qualities: [
      ["01", "Warm and friendly", "Communicate naturally and respectfully with clients, talent, and teammates."],
      ["02", "Quick to notice", "Spot a good detail, respond quickly, and keep real emotion in the frame."],
      ["03", "Proactive on set", "Read the room, help guests, and ask before filming close-up."],
      ["04", "Respect the story", "Keep direction gentle; help people feel at ease on camera."],
      ["05", "Edit with rhythm", "For editors: keep it concise, open with a hook, and stay consistent with the brand."],
    ],
    paletteEyebrow: "VISUAL DIRECTION · TRIEU HY MEDIA",
    paletteTitle: "A palette for the way we tell stories",
    paletteIntro: "Warm, natural, with a considered accent. Color should support real people and products, never overpower them.",
    palette: [
      ["#123A32", "Deep forest", "Primary identity · steady and trusted"],
      ["#F5F0E6", "Warm cream", "Light ground · calm with room to breathe"],
      ["#C6572B", "Terracotta", "Accent · energy and approachability"],
      ["#AAB79A", "Soft sage", "Supporting tone · balanced and natural"],
      ["#B23F35", "Creamy crimson", "Warm accent · elegant and nuanced"],
      ["#0E2338", "Deep navy", "Cinematic depth · grounded and deliberate"],
    ],
    brandHeading: "A distinct character for each brand",
    brands: [["Trieu Hy Media", "Forest · cream · terracotta", "Editorial, youthful, clear."], ["Hy Garden", "Leaf green · cream · warm wood", "Natural, relaxed, lifestyle-led."], ["CocoDrama", "Navy · teal · coral", "Cinematic, emotional, intentional contrast."], ["Tasting", "Red · warm white · charcoal", "Appetizing, vivid, energetic." ]],
    photoTitle: "How we like to shoot",
    photoCopy: "Look for window light, true-to-life skin tones, greenery, and warm materials. Keep frames clear and moments candid; avoid cold filters, harsh color, and stiff posing.",
    goalLabel: "One shared goal",
    goal: "Beautiful images, comfortable clients, engaging video, and a consistent brand presence.",
    applyLabel: "Interested in working together?",
    apply: "Send a short introduction, the role you are interested in, and links to a few work samples.",
    cta: "Send your introduction",
  },
  zh: {
    pageTitle: "媒体合作伙伴招募",
    eyebrow: "TRIEU HY MEDIA · 创作团队",
    titleA: "寻找合适的",
    titleB: "媒体合作伙伴",
    intro: "参与拍摄、剪辑，与团队一起记录品牌日常故事。",
    imageAlt: "创作者在绿意咖啡空间拍摄内容",
    quick: ["摄影与摄像", "短视频剪辑", "现场协作"],
    scoreTitle: "能力快速参考",
    scoreNote: "每个项目的要求不同，这些等级用于帮助双方找到合适的合作方式。",
    headers: ["标准", "等级 1", "等级 2", "等级 3", "等级 4"],
    rows: [["构图", "杂乱", "待提升", "稳定", "有鲜明风格"], ["色彩 / 光线", "偏色", "不稳定", "稳定", "符合品牌"], ["剪辑 / 前 3 秒", "不吸引", "节奏慢", "稳定", "开场有吸引力"], ["真实瞬间", "生硬", "较少", "稳定", "自然有情绪"], ["客户与出镜者沟通", "拘谨", "互动少", "礼貌", "让人放松"], ["现场主动性", "需要提醒", "被动", "稳定", "能主动处理"], ["进度与团队协作", "不稳定", "回复慢", "按时", "清晰可靠"]],
    teamTitle: "团队看重什么？", teamNote: "有责任心、善于观察并乐于协作。", qualities: [["01", "友善亲切", "与客户、出镜者和团队自然、礼貌地沟通。"], ["02", "观察敏锐", "及时发现细节，捕捉真实情绪。"], ["03", "现场主动", "观察现场、协助来宾，近距离拍摄前先征求同意。"], ["04", "尊重故事", "引导自然轻松，不强迫摆拍。"], ["05", "剪辑有节奏", "视频简洁、开头吸引，并保持品牌一致。"]],
    paletteEyebrow: "视觉方向 · TRIEU HY MEDIA", paletteTitle: "用色彩讲述团队故事", paletteIntro: "温暖、自然，并有克制的重点色。色彩衬托真实的人与产品，不喧宾夺主。", palette: [["#123A32", "深森林绿", "主品牌色 · 稳重可信"], ["#F5F0E6", "暖米色", "明亮底色 · 舒适留白"], ["#C6572B", "陶土橙", "强调色 · 活力亲和"], ["#AAB79A", "柔和鼠尾草绿", "辅助色 · 平衡自然"], ["#B23F35", "奶油暖红", "暖调点缀 · 典雅细腻富情感"], ["#0E2338", "深海军蓝", "电影感深邃 · 沉稳内敛有力量"]],
    brandHeading: "每个品牌都有自己的气质", brands: [["Triệu Hỷ Media", "森林绿 · 米色 · 陶土橙", "清晰、年轻的编辑感。"], ["Hỷ Garden", "叶绿 · 米色 · 暖木色", "自然放松的生活方式。"], ["CocoDrama", "海军蓝 · 蓝绿 · 珊瑚色", "电影感、情绪感与克制对比。"], ["Tasting", "红色 · 暖白 · 炭灰", "醒目、有食欲、充满活力。"]],
    photoTitle: "怎样拍出合适的感觉？", photoCopy: "优先选择窗边自然光、真实肤色、绿植与木质纹理。画面保持简洁，记录自然瞬间；避免冷色滤镜、强烈色彩和僵硬摆拍。", goalLabel: "共同目标", goal: "画面好看、客户自在、视频有吸引力，品牌表达保持一致。", applyLabel: "想与团队合作？", apply: "请发送简单自我介绍、感兴趣的合作岗位和作品链接。", cta: "发送合作申请",
  },
  ko: {
    pageTitle: "미디어 협업자 모집",
    eyebrow: "TRIEU HY MEDIA · 크리에이터 팀",
    titleA: "미디어 협업자를",
    titleB: "찾고 있어요",
    intro: "촬영과 편집에 참여하고 팀과 함께 브랜드의 일상적인 이야기를 기록해요.",
    imageAlt: "초록이 있는 커피 공간에서 콘텐츠를 촬영하는 크리에이터",
    quick: ["사진 및 영상", "숏폼 편집", "현장 협업"],
    scoreTitle: "역량 빠른 가이드",
    scoreNote: "프로젝트마다 요구가 다릅니다. 함께 일하는 방식을 찾기 위한 참고 기준입니다.",
    headers: ["기준", "레벨 1", "레벨 2", "레벨 3", "레벨 4"],
    rows: [["구도", "복잡함", "개선 필요", "안정적", "뚜렷한 감각"], ["색감 / 빛", "색 부정확", "불안정", "안정적", "브랜드에 적합"], ["편집 / 첫 3초", "흥미 없음", "느림", "안정적", "좋은 훅"], ["자연스러운 순간", "경직됨", "적음", "안정적", "자연스러운 감정"], ["고객 및 출연자 소통", "어색함", "소통 적음", "예의 바름", "편안하게 함"], ["현장 주도성", "자주 안내 필요", "수동적", "안정적", "스스로 해결"], ["마감 / 팀워크", "불안정", "답변 느림", "기한 준수", "명확하고 신뢰감"]],
    teamTitle: "팀이 중요하게 보는 것", teamNote: "책임감 있고 세심하며 협업하기 편한 사람.", qualities: [["01", "밝고 친절하게", "고객, 출연자, 팀원과 자연스럽고 예의 있게 소통해요."], ["02", "빠르게 포착하기", "좋은 디테일을 발견하고 진짜 감정을 담아요."], ["03", "현장에서 먼저 돕기", "상황을 살피고 가까이 촬영하기 전에 먼저 물어봐요."], ["04", "이야기를 존중하기", "억지 포즈 대신 편안한 분위기를 만들어요."], ["05", "리듬감 있는 편집", "짧고 매력적인 시작, 일관된 브랜드 표현을 지켜요."]],
    paletteEyebrow: "비주얼 방향 · TRIEU HY MEDIA", paletteTitle: "팀의 이야기를 담는 색", paletteIntro: "따뜻하고 자연스러우며 절제된 포인트가 있습니다. 색은 사람과 제품을 돋보이게 하고 압도하지 않아요.", palette: [["#123A32", "딥 포레스트", "주요 색상 · 안정과 신뢰"], ["#F5F0E6", "웜 크림", "밝은 배경 · 편안한 여백"], ["#C6572B", "테라코타", "포인트 · 에너지와 친근함"], ["#AAB79A", "세이지", "보조 색상 · 균형과 자연스러움"], ["#B23F35", "크림 레드", "따뜻한 포인트 · 우아하고 감성적인 표현"], ["#0E2338", "딥 네이비", "시네마틱한 깊이 · 차분함과 절제"]],
    brandHeading: "브랜드마다 고유한 분위기", brands: [["Trieu Hy Media", "포레스트 · 크림 · 테라코타", "젊고 명확한 에디토리얼."], ["Hy Garden", "그린 · 크림 · 따뜻한 우드", "자연스럽고 편안한 라이프스타일."], ["CocoDrama", "네이비 · 틸 · 코랄", "시네마틱하고 감정적인 대비."], ["Tasting", "레드 · 웜 화이트 · 차콜", "선명하고 먹음직스러운 에너지."]],
    photoTitle: "이런 분위기로 촬영해요", photoCopy: "창가의 빛, 자연스러운 피부 톤, 식물과 나무 질감을 살려요. 구도는 간결하고 순간은 자연스럽게, 차가운 필터와 과한 색감, 굳은 포즈는 피합니다.", goalLabel: "함께 만드는 목표", goal: "아름다운 이미지, 편안한 고객, 매력적인 영상, 일관된 브랜드 표현.", applyLabel: "함께하고 싶으신가요?", apply: "간단한 소개와 관심 있는 역할, 작업물 링크를 보내주세요.", cta: "지원 정보 보내기",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale: Locale = rawLocale;
  const t = copy[locale];
  return pageMetadata(locale, "/careers", `${t.pageTitle} | ${company.brandName}`, t.intro);
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = copy[locale];

  return (
    <div className={`careers-page locale--${locale}`}>
      <section className="careers-hero">
        <div className="site-container careers-hero-inner">
          <div className="careers-heading" data-reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="careers-title"><span>{t.titleA}</span><span>{t.titleB}</span></h1>
            <p className="careers-intro">{t.intro}</p>
            <div className="careers-quick">{t.quick.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
          </div>
          <figure className="careers-hero-image" data-tilt data-reveal>
            <Image src="/careers-hero-creator.png" alt={t.imageAlt} width={1024} height={1280} priority unoptimized />
            <figcaption>{locale === "vi" ? "QUAY THẬT · KỂ CHUYỆN THẬT" : locale === "zh" ? "真实记录 · 自然表达" : locale === "ko" ? "진짜 순간 · 진솔한 이야기" : "REAL MOMENTS · CLEAR STORIES"}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-space careers-score">
        <div className="site-container">
          <div className="careers-section-head" data-reveal>
            <span className="careers-index">01</span>
            <div><h2 className="section-title">{t.scoreTitle}</h2><p>{t.scoreNote}</p></div>
          </div>
          <div className="careers-table-wrap" data-reveal>
            <table className="careers-table">
              <thead><tr>{t.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
              <tbody>{t.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-space careers-team" id="team">
        <div className="site-container careers-team-layout">
          <header className="careers-team-head" data-reveal>
            <span className="careers-index">02</span>
            <h2 className="section-title">{t.teamTitle}</h2>
            <p>{t.teamNote}</p>
            <figure className="careers-team-photo" data-tilt>
              <Image src="/careers-team-moment.webp" alt={t.imageAlt} width={1024} height={1536} unoptimized />
            </figure>
          </header>
          <div className="careers-qualities">{t.qualities.map(([number, title, body]) => <article className="careers-quality" key={number} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section-space careers-visual">
        <div className="site-container">
          <div className="careers-visual-top" data-reveal>
            <div><span className="eyebrow">{t.paletteEyebrow}</span><h2 className="section-title">{t.paletteTitle}</h2></div>
            <p>{t.paletteIntro}</p>
          </div>
          <div className="careers-palette">{t.palette.map(([hex, name, use], index) => <div className="careers-swatch" key={hex} data-reveal><div className="careers-swatch-color" style={{ backgroundColor: hex }} /><span className="careers-swatch-index">0{index + 1} / {hex}</span><h3>{name}</h3><p>{use}</p></div>)}</div>
          <div className="careers-brand-direction" data-reveal><h3>{t.brandHeading}</h3><div>{t.brands.map(([name, colors, description]) => <article key={name}><h4>{name}</h4><p className="careers-brand-colors">{colors}</p><p>{description}</p></article>)}</div></div>
          <div className="careers-photo-direction" data-reveal><span className="eyebrow">02 — SHOOTING NOTES</span><h3>{t.photoTitle}</h3><p>{t.photoCopy}</p></div>
        </div>
      </section>

      <section className="careers-goal">
        <div className="site-container careers-goal-inner" data-reveal><span>{t.goalLabel}</span><p>{t.goal}</p></div>
      </section>

      <section className="section-space careers-apply">
        <div className="site-container careers-apply-inner" data-reveal>
          <div><span className="eyebrow">TRIỆU HỶ MEDIA · DA NANG</span><h2 className="section-title">{t.applyLabel}</h2><p>{t.apply}</p></div>
          <a className="careers-apply-link" href="https://forms.gle/H7SkqwSHmoAFN5kq7" target="_blank" rel="noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </div>
  );
}
