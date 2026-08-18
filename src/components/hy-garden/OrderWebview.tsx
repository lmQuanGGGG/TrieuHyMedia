"use client";

/* Static previews bypass Vinext's worker image optimizer in local development. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import type { Locale } from "@/src/content/site";

const platforms = [
  {
    id: "shopee",
    name: "ShopeeFood",
    url: "https://shopeefood.vn/da-nang/hy-garden-coffee-wordspace.kyaxua",
    embeddable: true,
    mobilePreview: "/hy-garden/order-preview/shopee-mobile.png",
    qr: "/hy-garden/order-qr/shopee.png",
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
    id: "deliveryk",
    name: "DeliveryK",
    url: "https://www.deliveryk.com/shops/15579",
    embeddable: true,
    mobilePreview: "/hy-garden/order-preview/deliveryk-mobile.png",
    qr: "/hy-garden/order-qr/deliveryk.png",
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
    intro: "ShopeeFood và DeliveryK có thể đặt ngay trong trang. GrabFood và iPOS mở an toàn trên nền tảng chính thức.",
    open: "Mở trên tab mới",
    scan: "Quét mã để mở trên điện thoại",
    fallback: "Không thấy nội dung trong khung?",
    mobileOpen: "Mở nền tảng để đặt món trên điện thoại",
  },
  en: {
    eyebrow: "Order online",
    title: "Choose the platform you know best.",
    intro: "Order directly in the ShopeeFood or DeliveryK panel. GrabFood and iPOS open safely on their official platforms.",
    open: "Open in a new tab",
    scan: "Scan to open on your phone",
    fallback: "Can’t see the content in the frame?",
    mobileOpen: "Open the platform to order on your phone",
  },
  zh: {
    eyebrow: "在线点单",
    title: "选择您常用的平台。",
    intro: "ShopeeFood 与 DeliveryK 可直接在本页使用；GrabFood 与 iPOS 将在官方平台安全打开。",
    open: "在新标签页打开",
    scan: "扫码在手机上打开",
    fallback: "看不到框内内容？",
    mobileOpen: "在手机上打开平台点单",
  },
  ko: {
    eyebrow: "온라인 주문", title: "익숙한 주문 플랫폼을 선택하세요.", intro: "ShopeeFood와 DeliveryK는 이 페이지에서 바로 이용할 수 있으며 GrabFood와 iPOS는 공식 플랫폼에서 안전하게 열립니다.", open: "새 탭에서 열기", scan: "휴대폰에서 열려면 QR 코드를 스캔하세요", fallback: "프레임 안의 내용이 보이지 않나요?", mobileOpen: "휴대폰에서 플랫폼을 열어 주문하세요",
  },
} as const;

type Platform = (typeof platforms)[number];

export function OrderWebview({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<Platform["id"]>("shopee");
  const [useDirectMobileLink, setUseDirectMobileLink] = useState(false);
  const active = platforms.find((platform) => platform.id === activeId) ?? platforms[0];
  const t = copy[locale];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const update = () => setUseDirectMobileLink(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
            {active.embeddable && !useDirectMobileLink ? (
              <>
                <div className="hy-order-frame hy-order-frame--live">
                  <iframe allow="clipboard-read; clipboard-write; fullscreen; payment" loading="eager" referrerPolicy="strict-origin-when-cross-origin" src={active.url} title={`Hỷ Garden on ${active.name}`} />
                </div>
                <div className="hy-order-fallback">
                  <span>{t.fallback}</span>
                  <div className="hy-order-fallback-actions">
                    <a href={active.url} rel="noreferrer" target="_blank">{active.name}</a>
                    <a aria-label={`${t.open}: ${active.name}`} className="hy-order-external-button" href={active.url} rel="noreferrer" target="_blank"><svg aria-hidden="true" className="external-link-icon" fill="none" viewBox="0 0 24 24"><path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></svg></a>
                  </div>
                </div>
              </>
            ) : active.embeddable ? (
              <div className="hy-order-preview-panel hy-order-preview-panel--mobile-direct">
                <a className="hy-order-platform-preview hy-order-platform-preview--large hy-order-platform-preview--mobile-direct" href={active.url} rel="noreferrer" target="_blank">
                  {active.mobilePreview && <img alt={`${active.name} mobile order preview`} src={active.mobilePreview} />}
                </a>
                <div className="hy-order-preview-footer">
                  <p className="hy-order-preview-platform-name">{active.name}</p>
                  <a className="hy-order-qr hy-order-qr--compact" href={active.url} rel="noreferrer" target="_blank">
                    {active.qr && <img alt="" src={active.qr} />}
                    <span>{t.scan}</span>
                  </a>
                  <a className="hy-order-direct-button" href={active.url} rel="noreferrer" target="_blank">{t.open}</a>
                </div>
              </div>
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
