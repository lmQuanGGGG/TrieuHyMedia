import type { Locale } from "./site";

export const workshopRecap: Record<Locale, {
  label: string; title: [string, string]; lead: string; scroll: string;
  intro: string; story: string; quote: string; gallery: string; galleryHint: string;
  captions: string[]; agenda: string; schedule: string[]; video: string; videoCopy: string;
  poster: string; previous: string; next: string; archive: string;
}> = {
  vi: {
    label: "Tin tức / Workshop recap", title: ["AI Short Drama", "Một chiều sáng tạo"],
    lead: "Ngày 27/9/2026, Triệu Hỷ Media × Hỷ Garden – Vulee cùng gặp gỡ cộng đồng sáng tạo tại Đà Nẵng, chia sẻ về AI, storytelling và short drama.",
    scroll: "Cuộn để khám phá", intro: "Ý tưởng gặp gỡ. Câu chuyện bắt đầu",
    story: "Một buổi gặp gỡ nhỏ nhưng nhiều năng lượng tại Hỷ Garden. Từ ứng dụng AI trong làm phim và TVC đến showcase Hulk Nón Lá, những chia sẻ và câu hỏi mở ra thêm góc nhìn về cách kể chuyện bằng hình ảnh.",
    quote: "Kiến thức có giá trị khi được chia sẻ.", gallery: "Những người làm nên buổi chiều ấy", galleryHint: "Cuộn qua những khoảnh khắc", 
    captions: ["Cùng nhìn lại những câu chuyện được kể bằng AI.", "Chia sẻ góc nhìn, kết nối ý tưởng.", "Lắng nghe giữa một không gian nhiều cảm hứng.", "Những cuộc trò chuyện quanh bàn cà phê.", "Một câu hỏi, thêm một góc nhìn.", "Ghi lại ý tưởng cho câu chuyện tiếp theo.", "Good People. Great Stories."],
    agenda: "Hai giờ dành cho sáng tạo", schedule: ["Tiếp đón – chụp ảnh", "Giới thiệu mở đầu", "Ứng dụng AI làm phim – TVC", "Coffee Break", "Showcase: Hulk Nón Lá", "Q&A", "Cảm ơn – kết thúc"],
    video: "Trở lại không khí workshop", videoCopy: "Một đoạn ghi hình từ buổi gặp gỡ ngày 27/9 tại Hỷ Garden.", poster: "Bản recap workshop", previous: "Ảnh trước", next: "Ảnh tiếp", archive: "Những câu chuyện trước đó",
  },
  en: {
    label: "News / Workshop recap", title: ["AI Short Drama", "An afternoon of ideas"],
    lead: "On September 27, 2026, Trieu Hy Media × Hy Garden – Vulee brought Da Nang’s creative community together to explore AI, storytelling and short drama.",
    scroll: "Scroll to explore", intro: "Ideas meet. Stories begin",
    story: "A small gathering full of energy at Hy Garden. From AI filmmaking and commercials to the Hulk Nón Lá showcase, shared experiences and questions opened up fresh perspectives on visual storytelling.",
    quote: "Knowledge has value when it is shared.", gallery: "The people behind the afternoon", galleryHint: "Scroll through the moments",
    captions: ["Exploring stories told with AI.", "Sharing perspectives, connecting ideas.", "Listening in an inspiring space.", "Conversations around the coffee table.", "One question, another perspective.", "Ideas for the next story.", "Good People. Great Stories."],
    agenda: "Two hours for creativity", schedule: ["Welcome & photos", "Opening introduction", "AI filmmaking & commercials", "Coffee break", "Showcase: Hulk Nón Lá", "Q&A", "Thanks & closing"],
    video: "Back to the workshop", videoCopy: "A recording from the September 27 gathering at Hy Garden.", poster: "Workshop recap poster", previous: "Previous photo", next: "Next photo", archive: "Earlier stories",
  },
  zh: {
    label: "新闻 / 工作坊回顾", title: ["AI 短剧", "一个充满灵感的下午"],
    lead: "2026年9月27日，Triệu Hỷ Media × Hỷ Garden – Vulee 与岘港创意社区相聚，交流 AI、故事创作与短剧。",
    scroll: "向下滚动探索", intro: "灵感相遇，故事开始",
    story: "Hỷ Garden 的一场小聚会充满活力。从 AI 电影和广告制作到 Hulk Nón Lá 案例展示，经验分享与提问为影像叙事带来了新的视角。",
    quote: "知识的价值在于分享。", gallery: "共同创造这个下午的人们", galleryHint: "滚动浏览活动瞬间",
    captions: ["一起探索 AI 讲述的故事。", "分享观点，连接灵感。", "在充满灵感的空间里聆听。", "咖啡桌旁的交流。", "一个问题，一种新视角。", "为下一个故事记录灵感。", "Good People. Great Stories."],
    agenda: "两小时的创意时光", schedule: ["签到与拍照", "开场介绍", "AI 电影与广告制作", "咖啡休息", "案例展示：Hulk Nón Lá", "问答", "致谢与结束"],
    video: "重温工作坊", videoCopy: "9月27日 Hỷ Garden 聚会的现场记录。", poster: "工作坊回顾海报", previous: "上一张", next: "下一张", archive: "往期故事",
  },
  ko: {
    label: "소식 / 워크숍 후기", title: ["AI 숏드라마", "아이디어가 모인 오후"],
    lead: "2026년 9월 27일, Triệu Hỷ Media × Hỷ Garden – Vulee가 다낭의 창작 커뮤니티와 함께 AI, 스토리텔링, 숏드라마에 대해 이야기했습니다.",
    scroll: "스크롤하여 둘러보기", intro: "아이디어가 만나고, 이야기가 시작됩니다",
    story: "Hỷ Garden에서 열린 작지만 활기찬 만남. AI 영화와 광고 제작부터 Hulk Nón Lá 쇼케이스까지, 경험과 질문을 나누며 영상 스토리텔링을 새로운 시각으로 바라봤습니다.",
    quote: "지식은 나눌 때 가치가 있습니다.", gallery: "그 오후를 함께 만든 사람들", galleryHint: "스크롤로 만나는 순간들",
    captions: ["AI로 전하는 이야기를 함께 살펴봅니다.", "관점을 나누고 아이디어를 연결합니다.", "영감이 있는 공간에서 경청합니다.", "커피 테이블에서 나눈 대화.", "하나의 질문, 또 다른 관점.", "다음 이야기를 위한 아이디어.", "Good People. Great Stories."],
    agenda: "창작을 위한 두 시간", schedule: ["환영 및 사진 촬영", "오프닝 소개", "AI 영화 및 광고 제작", "커피 브레이크", "쇼케이스: Hulk Nón Lá", "Q&A", "감사 인사 및 마무리"],
    video: "워크숍의 순간으로", videoCopy: "9월 27일 Hỷ Garden에서 열린 모임의 현장 영상입니다.", poster: "워크숍 후기 포스터", previous: "이전 사진", next: "다음 사진", archive: "이전 이야기",
  },
};
