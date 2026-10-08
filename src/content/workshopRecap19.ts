import type { Locale } from "./site";

export interface RecapPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
}

export const wsh1909Photos: RecapPhoto[] = [
  {
    id: "wsh-01",
    src: "/wsh1909/1790134848450_2322971061220623662_g302943778068785446_f1597444ab3b7580f18f2afeb272a6f3.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-02",
    src: "/wsh1909/1790134848464_2322971061220623662_g302943778068785446_ce241cf76c521c7a9c2d971fe089336a.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-03",
    src: "/wsh1909/1790134848473_2322971061220623662_g302943778068785446_0a5ec7443b4d5cefa13de91e90ec3d42.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-04",
    src: "/wsh1909/1790134848482_2322971061220623662_g302943778068785446_8965090826621bf9624f3b4abfe0c260.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-05",
    src: "/wsh1909/1790134848489_2322971061220623662_g302943778068785446_1e7fb744fe5c4225420061f14a75dfb8.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-06",
    src: "/wsh1909/1790134848495_2322971061220623662_g302943778068785446_125b76106ec62c01243d5e8f77319d69.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "wsh-07",
    src: "/wsh1909/1790134848501_2322971061220623662_g302943778068785446_214504b244807ca8977fc224ddcd7d33.jpg",
    width: 941,
    height: 1672,
  },
];

export const mualanPhotos: RecapPhoto[] = [
  {
    id: "mualan-01",
    src: "/mualan/1790131716126_2322971061220623662_g302943778068785446_6548ec62a64094538a5abf19f0fd4a60.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-02",
    src: "/mualan/1790131716141_2322971061220623662_g302943778068785446_412e541683ab9d57b412e418b2bc08c3.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-03",
    src: "/mualan/1790131716155_2322971061220623662_g302943778068785446_ef8ec8bf610d289daa2de551f0934f0e.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-04",
    src: "/mualan/1790131716168_2322971061220623662_g302943778068785446_cba416c09b429f6a5a5747a3afcc3def.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-05",
    src: "/mualan/1790131716179_2322971061220623662_g302943778068785446_c8c6913c5e1eeaa747b4539e6bf46ac3.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-06",
    src: "/mualan/1790131716203_2322971061220623662_g302943778068785446_365645f24abac8211dfa5dadaab7a979.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-07",
    src: "/mualan/1790131716210_2322971061220623662_g302943778068785446_2e74dd0d946537af743824e1ed34bcd9.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-08",
    src: "/mualan/1790131716217_2322971061220623662_g302943778068785446_d458154b10034e45d701a131d19fccff.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-09",
    src: "/mualan/1790131716235_2322971061220623662_g302943778068785446_0ce10c574208b57444dd9789d4d50825.jpg",
    width: 941,
    height: 1672,
  },
  {
    id: "mualan-10",
    src: "/mualan/1790131716250_2322971061220623662_g302943778068785446_d3184cd62dd29b7a9df17a09b52118e5.jpg",
    width: 941,
    height: 1672,
  },
];

export const workshopRecap19: Record<
  Locale,
  {
    label: string;
    date: string;
    title: [string, string];
    lead: string;
    scroll: string;
    intro: string;
    story: string;
    quote: string;
    gallery: string;
    galleryHint: string;
    deckBadge: string;
    deckTitle: [string, string];
    captions: string[];
    lionEyebrow: string;
    lionTitle: string;
    lionCopy: string;
    lionGalleryHint: string;
    lionBadge: string;
    lionHeadTitle: [string, string];
    lionCaptions: string[];
    lionTitles: string[];
    lionArchiveLabel: string;
    lionOverviewLabel: string;
    lionVenueName: string;
    lionVenueAddress: string;
    nextLabel: string;
    nextTitle: string;
    nextCopy: string;
    cta: string;
    previous: string;
    next: string;
  }
> = {
  vi: {
    label: "Workshop recap / 19.9",
    date: "19.09.2026",
    title: ["AI Short Drama", "Khởi nguồn câu chuyện"],
    lead: "Ngày 19.9 vừa qua, Hỷ Garden đã có một buổi gặp gỡ nhỏ nhưng nhiều năng lượng, nơi mọi người cùng nói về AI, phim ngắn và cách làm nghề đang đổi.",
    scroll: "Cuộn để khám phá",
    intro: "Ý tưởng hôm nay. Những câu chuyện ngày mai",
    story: "Từ những phần chia sẻ thực tế, buổi workshop không chỉ mở ra thêm góc nhìn về storytelling và công cụ AI, mà còn gợi ra những cơ hội học hỏi, hợp tác và phát triển cho những người đang tìm đến sáng tạo nội dung và short drama.",
    quote: "Một workshop nhỏ, cho những câu hỏi lớn hơn sau này.",
    gallery: "Khoảnh khắc workshop 19.9",
    galleryHint: "Cuộn qua những khoảnh khắc",
    deckBadge: "19 / 09",
    deckTitle: ["Ideas in motion", "Stories unfold"],
    captions: [
      "Không gian gặp gỡ và mở đầu buổi chia sẻ tại Hỷ Garden.",
      "Trực tiếp trao đổi về ứng dụng AI trong quy trình sản xuất nội dung.",
      "Người tham dự theo dõi các phần demo kỹ thuật và storytelling.",
      "Những câu hỏi thực tế về cách AI định hình lại làm phim ngắn.",
      "Chia sẻ góc nhìn, kết nối ý tưởng giữa các thành viên.",
      "Lắng nghe và ghi chú các giải pháp sáng tạo mới.",
      "Good People. Great Stories — khép lại buổi gặp gỡ nhiều năng lượng.",
    ],
    lionEyebrow: "KHOẢNH KHẮC CỘNG ĐỒNG — HỶ GARDEN",
    lionTitle: "Sắc màu múa lân, niềm vui kết nối",
    lionCopy: "Tiếng trống rộn ràng, sắc vàng và hồng nổi bật giữa khu vườn. Những khoảnh khắc biểu diễn và mọi người cùng dõi theo mang không khí lễ hội đến Hỷ Garden — một lát cắt cộng đồng bên cạnh câu chuyện sáng tạo.",
    lionGalleryHint: "10 khoảnh khắc múa lân lễ hội",
    lionBadge: "FESTIVE",
    lionHeadTitle: ["Rực rỡ sắc màu", "Gắn kết cộng đồng"],
    lionCaptions: [
      "Tiếng trống khai hội rộn ràng mở đầu buổi chiều tại Hỷ Garden.",
      "Sắc vàng và hồng rực rỡ nổi bật giữa không gian xanh của khu vườn.",
      "Những bước nhảy uyển chuyển và khí thế tưng bừng của đội múa lân.",
      "Mọi ánh mắt chăm chú dõi theo từng nhịp trống và chuyển động.",
      "Niềm vui rạng rỡ lan tỏa khắp không gian sân vườn.",
      "Khoảnh khắc tương tác gần gũi giữa đội lân và người tham dự.",
      "Nụ cười và năng lượng tích cực gắn kết mọi người cùng nhau.",
      "Một nét văn hoá truyền thống rực rỡ giữa buổi gặp gỡ hiện đại.",
      "Những tràng pháo tay giòn giã khép lại màn biểu diễn ấn tượng.",
      "Kỷ niệm đáng nhớ cho cộng đồng sáng tạo tại Hỷ Garden.",
    ],
    lionTitles: [
      "Tiếng Trống Khai Hội",
      "Sắc Vàng Hoàng Kim & Hồng Ngọc",
      "Vũ Điệu Lân Sư Rồng",
      "Ánh Mắt Dõi Theo",
      "Niềm Vui Lan Tỏa",
      "Tương Tác Gần Gũi",
      "Năng Lượng Kết Nối",
      "Nét Đẹp Truyền Thống",
      "Tràng Pháo Tay Rộn Rã",
      "Kỷ Niệm Đáng Nhớ",
    ],
    lionArchiveLabel: "KHOẢNH KHẮC LỄ HỘI",
    lionOverviewLabel: "10 KHOẢNH KHẮC / TRỌN VẸN MỘT LỄ HỘI",
    lionVenueName: "Hỷ Garden — Coffee & Workspace",
    lionVenueAddress: "15 Trung Lương 16, Cẩm Lệ, Đà Nẵng — Không gian kết nối sáng tạo",
    nextLabel: "Khám phá workshop",
    nextTitle: "Cùng bắt đầu câu chuyện của bạn",
    nextCopy: "Tìm hiểu AI Short Drama Making Workshop và hành trình từ ý tưởng đến câu chuyện được kể bằng AI.",
    cta: "Tìm hiểu workshop",
    previous: "Ảnh trước",
    next: "Ảnh tiếp",
  },
  en: {
    label: "Workshop recap / Sep 19",
    date: "19.09.2026",
    title: ["AI Short Drama", "Where stories begin"],
    lead: "On September 19, Hy Garden hosted a small but energetic gathering to talk about AI, short films, and a changing creative practice.",
    scroll: "Scroll to explore",
    intro: "Today's ideas. Tomorrow's stories",
    story: "Practical conversations brought fresh perspectives on storytelling and AI tools, along with opportunities to learn, collaborate, and grow for people exploring content creation and short drama.",
    quote: "A small workshop for the bigger questions ahead.",
    gallery: "Workshop moments / Sep 19",
    galleryHint: "Scroll through the moments",
    deckBadge: "19 / 09",
    deckTitle: ["Ideas in motion", "Stories unfold"],
    captions: [
      "Welcoming participants and opening the session at Hy Garden.",
      "Live discussions on applying AI workflows to content production.",
      "Attendees exploring technical demos and narrative approaches.",
      "Practical questions on how AI reshapes modern short filmmaking.",
      "Sharing perspectives and connecting creative ideas together.",
      "Focused listening and capturing new production insights.",
      "Good People. Great Stories — wrapping up an inspiring session.",
    ],
    lionEyebrow: "COMMUNITY MOMENTS — HY GARDEN",
    lionTitle: "Lion dance, shared celebration",
    lionCopy: "Drums set the rhythm as vivid yellow and pink lions fill the garden. Performers and guests share the moment, bringing a festive note to Hy Garden alongside its creative workshops.",
    lionGalleryHint: "10 festive lion dance moments",
    lionBadge: "FESTIVE",
    lionHeadTitle: ["Vivid celebration", "Community spirit"],
    lionCaptions: [
      "Festive drums open the celebratory afternoon at Hy Garden.",
      "Vivid yellow and pink lions brightening the lush green courtyard.",
      "Agile movements and energetic rhythms of the lion dance troupe.",
      "Guests captivated by the rhythmic drumbeats and performance.",
      "Joyful smiles and festive celebration spreading through the garden.",
      "Close interactions between performers and delighted guests.",
      "Positive energy and laughter bringing people closer together.",
      "A vibrant touch of tradition amidst a modern creative gathering.",
      "Warm applause concluding an unforgettable performance.",
      "Lasting memories for the creative community at Hy Garden.",
    ],
    lionTitles: [
      "Opening Festival Drums",
      "Vivid Golden & Ruby Lions",
      "Spirited Dance Rhythms",
      "Captivated Eyes",
      "Joyful Celebration",
      "Warm Community Interaction",
      "Positive Connection",
      "Living Cultural Heritage",
      "Resounding Applause",
      "Cherished Memories",
    ],
    lionArchiveLabel: "FESTIVE ARCHIVE",
    lionOverviewLabel: "10 MOMENTS / ONE CELEBRATION",
    lionVenueName: "Hy Garden — Coffee & Workspace",
    lionVenueAddress: "15 Trung Luong 16, Da Nang — Creative Community Space",
    nextLabel: "Explore the workshop",
    nextTitle: "Start shaping your story",
    nextCopy: "Explore the AI Short Drama Making Workshop and the journey from an idea to a story told with AI.",
    cta: "Explore the workshop",
    previous: "Previous photo",
    next: "Next photo",
  },
  zh: {
    label: "工作坊回顾 / 9月19日",
    date: "19.09.2026",
    title: ["AI 短剧", "故事由此启程"],
    lead: "9月19日，Hỷ Garden 举办了一场小而充满活力的聚会，大家一起交流 AI、短片与不断变化的创作方式。",
    scroll: "向下滚动探索",
    intro: "今日灵感，明日故事",
    story: "实践交流带来了关于故事表达与 AI 工具的新视角，也为探索内容创作和短剧的朋友创造了学习、合作与成长的机会。",
    quote: "一场小小的工作坊，聊聊更大的创作问题。",
    gallery: "9月19日 活动瞬间",
    galleryHint: "滚动浏览活动瞬间",
    deckBadge: "19 / 09",
    deckTitle: ["灵感流动", "故事展开"],
    captions: [
      "Hỷ Garden 聚会空间与交流开场。",
      "就 AI 在内容生产流程中的实际应用展开热烈讨论。",
      "来宾专注观看技术演示与故事表达拆解。",
      "探讨 AI 如何重构短片创作实践的深刻提问。",
      "分享观点，连接创作者之间的灵感火花。",
      "悉心聆听并记录前沿创作方法与思路。",
      "Good People. Great Stories —— 充满活力的圆满收尾。",
    ],
    lionEyebrow: "社区时刻 — HỶ GARDEN",
    lionTitle: "舞狮欢腾，共享喜悦",
    lionCopy: "鼓声响起，明亮的黄色与粉色舞狮为花园增添节日气氛。表演者与来宾共同感受这一刻，也为 Hỷ Garden 的创意活动增添了一段社区记忆。",
    lionGalleryHint: "10个舞狮节庆精彩瞬间",
    lionBadge: "FESTIVE",
    lionHeadTitle: ["色彩斑斓", "凝聚社区"],
    lionCaptions: [
      "阵阵开场锣鼓拉开 Hỷ Garden 欢庆午后的序幕。",
      "鲜亮明艳的黄粉醒狮在绿意盎然的庭院中格外耀眼。",
      "舞狮队伍矫健灵动的步伐与欢腾热烈的气势。",
      "全场来宾聚精会神注视着每一个精彩动作与鼓点。",
      "欢声笑语洋溢在花园的每一个角落。",
      "舞狮队员与来宾亲切互动的美好瞬间。",
      "笑容与饱满的正能量拉近了彼此的距离。",
      "现代创意聚会中融入传统民俗的生动光彩。",
      "热烈掌声为令人难忘的表演画上圆满句号。",
      "为 Hỷ Garden 创意社区留下一段珍贵的共同回忆。",
    ],
    lionTitles: [
      "开场喧天锣鼓",
      "金黄与粉红醒狮",
      "生龙活虎舞姿",
      "全神贯注目光",
      "欢声笑语洋溢",
      "近距离温暖互动",
      "真挚笑容相连",
      "绚丽传统文化",
      "全场热烈掌声",
      "难忘美好回忆",
    ],
    lionArchiveLabel: "节日精彩瞬间",
    lionOverviewLabel: "10 个瞬间 / 完整节日盛典",
    lionVenueName: "Hỷ Garden — 咖啡与创享空间",
    lionVenueAddress: "岘港锦丽区 Trung Lương 16 街 15 号 — 创意与连接空间",
    nextLabel: "探索工作坊",
    nextTitle: "一起开始你的故事",
    nextCopy: "了解 AI 短剧创作工作坊，探索从灵感到 AI 故事的创作过程。",
    cta: "了解工作坊",
    previous: "上一张",
    next: "下一张",
  },
  ko: {
    label: "워크숍 후기 / 9월 19일",
    date: "19.09.2026",
    title: ["AI 숏드라마", "이야기가 시작되는 곳"],
    lead: "9월 19일, Hỷ Garden에서 작지만 활기찬 만남이 열렸습니다. AI와 단편 영화, 변화하는 창작 방식에 대해 함께 이야기했습니다.",
    scroll: "스크롤하여 둘러보기",
    intro: "오늘의 아이디어, 내일의 이야기",
    story: "실전 대화를 통해 스토리텔링과 AI 도구를 새롭게 바라보고, 콘텐츠와 숏드라마를 만드는 이들이 배우고 협업하며 성장할 기회를 나눴습니다.",
    quote: "작은 워크숍에서 시작하는 더 큰 질문들.",
    gallery: "9월 19일 워크숍 순간들",
    galleryHint: "스크롤로 만나는 순간들",
    deckBadge: "19 / 09",
    deckTitle: ["움직이는 아이디어", "펼쳐지는 이야기"],
    captions: [
      "Hỷ Garden에서 열린 아늑한 만남과 세션의 시작.",
      "콘텐츠 제작 워크플로우에 AI를 적용하는 실전 대화.",
      "기술 시연과 스토리텔링 쇼케이스에 집중하는 참가자들.",
      "AI가 단편 영화 제작을 어떻게 바꾸는지에 대한 질문과 고민.",
      "참가자들 사이에서 관점을 나누고 아이디어를 연결하는 시간.",
      "새로운 창작 솔루션을 경청하고 기록하는 순간들.",
      "Good People. Great Stories — 에너지 넘치게 마무리된 만남.",
    ],
    lionEyebrow: "커뮤니티 순간 — HỶ GARDEN",
    lionTitle: "사자춤으로 함께한 축제의 순간",
    lionCopy: "북소리와 함께 노란색과 분홍색 사자춤이 정원을 채웁니다. 공연자와 손님이 함께 즐긴 순간은 Hỷ Garden의 창작 워크숍 곁에 축제의 기억을 더했습니다.",
    lionGalleryHint: "10가지 사자춤 축제 순간",
    lionBadge: "FESTIVE",
    lionHeadTitle: ["화려한 색채", "하나 된 커뮤니티"],
    lionCaptions: [
      "Hỷ Garden의 오후를 여는 신명나는 축제 북소리.",
      "초록빛 정원을 화사하게 물들인 노랑과 분홍의 사자춤.",
      "사자춤 팀의 역동적인 몸짓과 활기찬 호흡.",
      "북소리와 동작 하나하나에 몰입한 손님들의 시선.",
      "정원 가득 번지는 환한 웃음과 축제의 즐거움.",
      "공연팀과 참가자들이 가까이서 호흡하는 다정한 순간.",
      "모두를 하나로 잇는 긍정적인 에너지와 미소.",
      "현대적 창작 모임 속에 자연스럽게 어우러진 전통의 멋.",
      "인상 깊은 공연을 마무리하는 따뜻한 박수갈채.",
      "Hỷ Garden 창작 커뮤니티에 남은 잊지 못할 추억.",
    ],
    lionTitles: [
      "개막을 알리는 북소리",
      "황금빛과 분홍빛 사자",
      "생동감 넘치는 춤사위",
      "모두의 집중된 시선",
      "가든에 번지는 기쁨",
      "다정한 현장 교감",
      "미소로 맺어진 유대",
      "빛나는 전통의 멋",
      "힘찬 환호와 박수",
      "오래 남을 추억",
    ],
    lionArchiveLabel: "축제 아카이브",
    lionOverviewLabel: "10가지 순간 / 하나의 축제",
    lionVenueName: "Hỷ Garden — 커피 & 워크스페이스",
    lionVenueAddress: "다낭 Trung Lương 16 15번지 — 창작과 교류의 공간",
    nextLabel: "워크숍 둘러보기",
    nextTitle: "함께 당신의 이야기를 시작해요",
    nextCopy: "AI 숏드라마 제작 워크숍과 아이디어를 AI 이야기로 만드는 과정을 알아보세요.",
    cta: "워크숍 알아보기",
    previous: "이전 사진",
    next: "다음 사진",
  },
};
