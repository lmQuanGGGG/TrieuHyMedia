"use client";

/* Static previews bypass Vinext's worker image optimizer in local development. */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { Locale } from "@/src/content/site";

const platforms = [
  {
    id: "shopee",
    name: "ShopeeFood",
    url: "https://shopeefood.vn/da-nang/hy-garden-coffee-wordspace.kyaxua",
    embeddable: true,
  },
  {
    id: "grab",
    name: "GrabFood",
    url: "https://food.grab.com/vn/vi/restaurant/h%E1%BB%B7-garden-coffee-workspace-delivery/5-C8CGLLAUPA61G6",
    preview: "/hy-garden/order-preview/grab-menu.png",
    qr: "/hy-garden/order-qr/grab.svg",
    embeddable: false,
  },
  {
    id: "ipos",
    name: "iPOS",
    url: "https://order.ipos.vn/menu?pos_parent=BRAND-XOOL&pos_id=163522",
    preview: "/hy-garden/order-preview/ipos-menu.png",
    qr: "/hy-garden/order-qr/ipos.svg",
    embeddable: false,
  },
] as const;

const copy = {
  vi: {
    eyebrow: "Đặt món online",
    title: "Chọn nền tảng bạn quen dùng.",
    intro: "ShopeeFood có thể đặt ngay trong trang. GrabFood và iPOS mở an toàn trên nền tảng chính thức.",
    open: "Mở trên tab mới",
    scan: "Quét mã để mở trên điện thoại",
    fallback: "Không thấy nội dung trong khung?",
  },
  en: {
    eyebrow: "Order online",
    title: "Choose the platform you know best.",
    intro: "Order directly in the ShopeeFood panel. GrabFood and iPOS open safely on their official platforms.",
    open: "Open in a new tab",
    scan: "Scan to open on your phone",
    fallback: "Can’t see the content in the frame?",
  },
  zh: {
    eyebrow: "在线点单",
    title: "选择您常用的平台。",
    intro: "ShopeeFood 可直接在本页使用；GrabFood 与 iPOS 将在官方平台安全打开。",
    open: "在新标签页打开",
    scan: "扫码在手机上打开",
    fallback: "看不到框内内容？",
  },
} as const;

type Platform = (typeof platforms)[number];

export function OrderWebview({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<Platform["id"]>("shopee");
  const active = platforms.find((platform) => platform.id === activeId) ?? platforms[0];
  const t = copy[locale];

  return (
    <section className="hy-order hy-order--tabs" id="order">
      <div className="site-container">
        <div className="hy-order-heading hy-order-heading--tabs">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2>{t.title}</h2>
          </div>
          <p>{t.intro}</p>
        </div>

        <div className="hy-order-shell hy-order-shell--tabs">
          <div className="hy-order-tabs" role="tablist" aria-label={t.eyebrow}>
            {platforms.map((platform) => (
              <button
                aria-controls={`order-panel-${platform.id}`}
                aria-selected={active.id === platform.id}
                className="hy-order-tab"
                id={`order-tab-${platform.id}`}
                key={platform.id}
                onClick={() => setActiveId(platform.id)}
                role="tab"
                type="button"
              >
                {platform.name}
              </button>
            ))}
          </div>

          <div aria-labelledby={`order-tab-${active.id}`} className="hy-order-panel" id={`order-panel-${active.id}`} role="tabpanel">
            {active.embeddable ? (
              <>
                <div className="hy-order-frame hy-order-frame--live">
                  <iframe allow="clipboard-read; clipboard-write" loading="eager" src={active.url} title={`Hỷ Garden on ${active.name}`} />
                </div>
                <div className="hy-order-fallback">
                  <span>{t.fallback}</span>
                  <a href={active.url} rel="noreferrer" target="_blank">{active.name}</a>
                </div>
              </>
            ) : (
              <div className="hy-order-preview-panel">
                <a className="hy-order-platform-preview hy-order-platform-preview--large" href={active.url} rel="noreferrer" target="_blank">
                  <img alt={`${active.name} preview`} src={active.preview} />
                </a>
                <div className="hy-order-preview-footer">
                  <p className="hy-order-preview-platform-name">{active.name}</p>
                  <a className="hy-order-qr hy-order-qr--compact" href={active.url} rel="noreferrer" target="_blank">
                    <img alt="" src={active.qr} />
                    <span>{t.scan}</span>
                  </a>
                  <a className="hy-order-direct-button" href={active.url} rel="noreferrer" target="_blank">{t.open}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
