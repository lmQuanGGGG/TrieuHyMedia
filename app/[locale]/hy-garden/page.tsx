import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuCard } from "@/src/components/hy-garden/MenuCard";
import { OrderWebview } from "@/src/components/hy-garden/OrderWebview";
import { isLocale, type Locale } from "@/src/content/site";
import { pageMetadata } from "@/src/lib/metadata";

type Translated = Record<Locale, string>;
type MenuItem = { code: string; price: string; name: Translated };
type MenuGroup = { id: string; title: Translated; items: MenuItem[] };

const menu: MenuGroup[] = [
  { id: "coffee", title: { vi: "Cà phê truyền thống & Ý", en: "Traditional & Italian coffee", zh: "传统与意式咖啡" }, items: [
    { code: "A1", price: "25K", name: { vi: "Cà phê đen nóng/đá", en: "Black Coffee — Hot/Iced", zh: "越南黑咖啡（热/冰）" } },
    { code: "A2", price: "28K", name: { vi: "Cà phê sữa nóng/đá", en: "Vietnamese Milk Coffee — Hot/Iced", zh: "越南炼乳咖啡（热/冰）" } },
    { code: "A3", price: "35K", name: { vi: "Bạc xỉu nóng/đá", en: "Bac Xiu Milk Coffee — Hot/Iced", zh: "白咖啡（热/冰）" } },
    { code: "A4", price: "40K", name: { vi: "Cà phê muối", en: "Salted Coffee", zh: "海盐咖啡" } },
    { code: "A5", price: "40K", name: { vi: "Cà phê trứng", en: "Vietnamese Egg Coffee", zh: "越南鸡蛋咖啡" } },
    { code: "A6", price: "45K", name: { vi: "Cà phê dừa", en: "Coconut Coffee", zh: "椰子咖啡" } },
    { code: "A7", price: "45K", name: { vi: "Cà phê đá xay", en: "Coffee Frappe", zh: "咖啡冰沙" } },
    { code: "A8", price: "30K", name: { vi: "Espresso nóng/đá", en: "Espresso — Hot/Iced", zh: "浓缩咖啡（热/冰）" } },
    { code: "A9", price: "45K", name: { vi: "Latte nóng/đá", en: "Latte — Hot/Iced", zh: "拿铁咖啡（热/冰）" } },
    { code: "A10", price: "45K", name: { vi: "Cappuccino nóng/đá", en: "Cappuccino — Hot/Iced", zh: "卡布奇诺（热/冰）" } },
    { code: "A11", price: "40K", name: { vi: "Americano", en: "Americano", zh: "美式咖啡" } },
    { code: "A12", price: "55K", name: { vi: "Americano dừa", en: "Coconut Americano", zh: "椰子美式咖啡" } },
    { code: "A13", price: "65K", name: { vi: "Cà phê V60", en: "V60 Hand-Drip Coffee", zh: "V60 手冲咖啡" } },
    { code: "A14", price: "45K", name: { vi: "Magenta Espresso", en: "Magenta Espresso", zh: "洋红浓缩咖啡" } },
    { code: "A15", price: "45K", name: { vi: "Cold Brew vải", en: "Lychee Cold Brew", zh: "荔枝冷萃咖啡" } },
    { code: "A16", price: "45K", name: { vi: "Cold Brew ổi hồng", en: "Pink Guava Cold Brew", zh: "红心芭乐冷萃咖啡" } },
    { code: "A17", price: "45K", name: { vi: "Cold Brew cam vàng", en: "Orange Cold Brew", zh: "香橙冷萃咖啡" } },
  ] },
  { id: "juice", title: { vi: "Nước ép trái cây", en: "Fresh juice", zh: "鲜榨果汁" }, items: [
    { code: "B1", price: "40K", name: { vi: "Nước ép dưa hấu", en: "Watermelon Juice", zh: "西瓜汁" } },
    { code: "B2", price: "40K", name: { vi: "Nước cam ép", en: "Orange Juice", zh: "鲜榨橙汁" } },
    { code: "B3", price: "40K", name: { vi: "Nước ép thơm", en: "Pineapple Juice", zh: "菠萝汁" } },
  ] },
  { id: "smoothies", title: { vi: "Sinh tố & đá xay", en: "Smoothies & frappés", zh: "冰沙与奶昔" }, items: [
    { code: "C1", price: "45K", name: { vi: "Sinh tố xoài", en: "Mango Smoothie", zh: "芒果冰沙" } },
    { code: "C2", price: "45K", name: { vi: "Sữa chua xoài", en: "Mango Yogurt", zh: "芒果酸奶" } },
    { code: "C3", price: "45K", name: { vi: "Sữa chua đào", en: "Peach Yogurt", zh: "蜜桃酸奶" } },
    { code: "C4", price: "45K", name: { vi: "Sinh tố bơ", en: "Avocado Smoothie", zh: "牛油果冰沙" } },
    { code: "C5", price: "45K", name: { vi: "Bơ già dừa non", en: "Ripe Avocado & Young Coconut", zh: "熟牛油果椰子冰沙" } },
    { code: "C6", price: "45K", name: { vi: "Sô-cô-la đá xay", en: "Chocolate Frappe", zh: "巧克力冰沙" } },
    { code: "C7", price: "45K", name: { vi: "Matcha đá xay", en: "Matcha Frappe", zh: "抹茶冰沙" } },
    { code: "C8", price: "45K", name: { vi: "Matcha latte", en: "Matcha Latte", zh: "抹茶拿铁" } },
  ] },
  { id: "tea", title: { vi: "Trà", en: "Tea", zh: "茶饮" }, items: [
    { code: "D1", price: "45K", name: { vi: "Trà đào cam sả", en: "Peach, Orange & Lemongrass Tea", zh: "蜜桃香橙香茅茶" } },
    { code: "D2", price: "45K", name: { vi: "Trà vải", en: "Lychee Tea", zh: "荔枝茶" } },
    { code: "D3", price: "45K", name: { vi: "Trà xoài chanh dây", en: "Mango & Passion Fruit Tea", zh: "芒果百香果茶" } },
    { code: "D5", price: "45K", name: { vi: "Trà gừng thảo mộc nóng", en: "Hot Herbal Ginger Tea", zh: "热姜味草本茶" } },
  ] },
  { id: "other", title: { vi: "Thức uống khác", en: "Other drinks", zh: "其他饮品" }, items: [
    { code: "F1", price: "45K", name: { vi: "Cacao nóng/đá", en: "Cocoa — Hot/Iced", zh: "可可（热/冰）" } },
    { code: "F2", price: "45K", name: { vi: "Matcha nóng/đá", en: "Matcha — Hot/Iced", zh: "抹茶（热/冰）" } },
  ] },
];

const menuImages: Record<string, string> = {
  A1: "/hy-garden/menu-cutout/coffee-black.webp", A2: "/hy-garden/menu-cutout/coffee-milk.webp", A3: "/hy-garden/menu-cutout/bac-xiu.webp", A4: "/hy-garden/menu-cutout/salt-coffee.webp", A5: "/hy-garden/menu-cutout/egg-coffee.webp", A6: "/hy-garden/menu-cutout/coconut-coffee.webp", A7: "/hy-garden/menu-cutout/coffee-frappe.webp", A8: "/hy-garden/menu-cutout/coffee-black.webp", A9: "/hy-garden/menu-cutout/latte.webp", A10: "/hy-garden/menu-cutout/cappuccino.webp", A11: "/hy-garden/menu-cutout/americano.webp", A12: "/hy-garden/menu-cutout/coconut-americano.webp", A13: "/hy-garden/menu-cutout/v60.webp", A14: "/hy-garden/menu-cutout/magenta-espresso.webp", A15: "/hy-garden/menu-cutout/cold-brew-lychee.webp", A16: "/hy-garden/menu-cutout/cold-brew-guava.webp", A17: "/hy-garden/menu-cutout/cold-brew-orange.webp",
  B1: "/hy-garden/menu-cutout/watermelon-v3.webp", B2: "/hy-garden/menu-cutout/orange-juice-v3.webp", B3: "/hy-garden/menu-cutout/pineapple-juice-v3.webp",
  C1: "/hy-garden/menu-cutout/mango-smoothie.webp", C2: "/hy-garden/menu-full/mango-yogurt-studio.webp", C3: "/hy-garden/menu-full/peach-yogurt-studio.webp", C4: "/hy-garden/menu-full/avocado-smoothie-studio.webp", C5: "/hy-garden/menu-full/avocado-coconut-studio.webp", C6: "/hy-garden/menu-cutout/chocolate-frappe.webp", C7: "/hy-garden/menu-cutout/matcha-frappe.webp", C8: "/hy-garden/menu-full/matcha-latte-studio.webp",
  D1: "/hy-garden/menu-cutout/peach-orange-lemongrass-tea.webp", D2: "/hy-garden/menu-cutout/lychee-tea.webp", D3: "/hy-garden/menu-cutout/mango-passion-tea.webp", D5: "/hy-garden/menu-cutout/ginger-tea.webp",
  F1: "/hy-garden/menu-cutout/cacao.webp", F2: "/hy-garden/menu-cutout/matcha-hot-v3.webp",
};

const copy = {
  vi: { eyebrow: "Coffee & Workspace", title: "Một khoảng vườn cho cà phê, công việc và những cuộc gặp gỡ đẹp.", intro: "Hỷ Garden là không gian cà phê chậm rãi, thoáng đãng - nơi bạn có thể tập trung làm việc, hẹn gặp bạn bè hoặc chỉ đơn giản là dành một buổi sáng cho mình.", menu: "Thực đơn", menuIntro: "Những món quen thuộc được làm chỉn chu, từ cà phê truyền thống đến trà trái cây và cà phê thủ công.", featured: "Gợi ý từ Hỷ Garden", address: "15 Trung Lương 16", hours: "Mở cửa mỗi ngày · 07:00–21:00", call: "Gọi đặt chỗ", explore: "Xem toàn bộ menu", note: "Giá đã niêm yết theo thực đơn tại quán.", contact: "Liên hệ" },
  en: { eyebrow: "Coffee & Workspace", title: "A garden setting for coffee, focused work and beautiful conversations.", intro: "Hy Garden is an unhurried coffee space for productive work, time with friends, and a gentle morning to yourself.", menu: "Menu", menuIntro: "Familiar favourites, carefully prepared — from Vietnamese coffee to fruit tea and hand-brewed coffee.", featured: "Hy Garden favourites", address: "15 Trung Luong 16", hours: "Open daily · 07:00–21:00", call: "Call to reserve", explore: "View the full menu", note: "Prices follow the menu displayed at the café.", contact: "Contact" },
  zh: { eyebrow: "咖啡与工作空间", title: "一处适合咖啡、专注工作与美好相聚的花园空间。", intro: "Hỷ Garden 是一个从容舒适的咖啡空间，适合专注工作、与朋友相聚，或享受属于自己的清晨。", menu: "菜单", menuIntro: "从越南咖啡到水果茶与手冲咖啡，熟悉的风味都经过细心准备。", featured: "Hỷ Garden 推荐", address: "15 Trung Luong 16", hours: "每日营业 · 07:00–21:00", call: "致电预订", explore: "查看完整菜单", note: "价格以店内菜单为准。", contact: "联系我们" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "vi" ? "Hỷ Garden | Coffee & Workspace" : "Hy Garden | Coffee & Workspace";
  const description = "Hy Garden coffee and workspace menu in Da Nang.";
  const metadata = pageMetadata(locale, "/hy-garden", title, description);

  return {
    ...metadata,
    openGraph: {
      type: "website",
      siteName: "Hỷ Garden",
      title,
      description,
      url: `https://trieuhymedia.net/${locale}/hy-garden`,
      locale: locale === "vi" ? "vi_VN" : locale === "zh" ? "zh_CN" : "en_US",
      images: [{ url: "/hy-garden/og.jpg", width: 1200, height: 630, alt: "Hỷ Garden — Coffee & Workspace" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/hy-garden/og.jpg"] },
  };
}

export default async function HyGardenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = copy[locale];
  return <>
    <link rel="preconnect" href="https://shopeefood.vn" />
    <link rel="dns-prefetch" href="https://shopeefood.vn" />
    <section className="hy-hero">
      <div className="site-container hy-hero-grid">
        <div className="hy-hero-copy"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p><div className="hy-hero-actions"><a className="button-primary" href="#menu">{t.explore}</a><a className="button-secondary" href="tel:0399219143">{t.call}</a></div><div className="hy-hero-meta"><span>{t.address}</span><span>{t.hours}</span></div></div>
        <figure className="hy-hero-image"><video autoPlay muted loop playsInline preload="metadata" poster="/api/telegram-file/BQACAgUAAxkDAAIRAWqDDgmr1EAirjVrYIPFXGhbW-hLAAJyIQACA5wZVNJt4CJY1URdPQQ"><source src="/api/telegram-file/BAACAgUAAxkDAAIRSWqDK6mXeV_nWpJH5ljIIZrSdZBbAAL1IQACA5wZVBwO8cKivTSCPQQ" type="video/mp4" /></video></figure>
      </div>
    </section>
    <section className="hy-menu section-space" id="menu"><div className="site-container"><div className="hy-menu-intro"><span className="eyebrow">{t.menu}</span><h2>{t.menuIntro}</h2></div><div className="hy-menu-grid">{menu.map((group) => <section className="hy-menu-group" key={group.id}><h3>{group.title[locale]}</h3><ul>{group.items.map((item, index) => <li key={item.code}><MenuCard code={item.code} name={item.name[locale]} price={item.price} image={menuImages[item.code]} index={index} /></li>)}</ul></section>)}</div><p className="hy-menu-note">{t.note}</p></div></section>
    <OrderWebview locale={locale} />
    <section className="hy-visit"><div className="site-container hy-visit-inner"><div><span className="eyebrow">Hỷ Garden</span><h2>Where ideas bloom.</h2></div><div className="hy-visit-details"><p>{t.address}<br />{t.hours}</p><a href="tel:0399219143">0399 219 143</a><Link href={`/${locale}/contact`}>{t.contact} <span aria-hidden="true">↗</span></Link></div></div></section>
  </>;
}
