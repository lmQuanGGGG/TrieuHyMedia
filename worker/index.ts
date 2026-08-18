/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  TELEGRAM_BOT_TOKEN?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const telegramAssets = {
  "hy-garden-hero-video": { fileId: "BAACAgUAAxkDAAIRSWqDK6mXeV_nWpJH5ljIIZrSdZBbAAL1IQACA5wZVBwO8cKivTSCPQQ", fallback: "/hy-garden/hero-video.mp4" },
  "coconut-coffee": { fileId: "BQACAgUAAxkDAAIRAWqDDgmr1EAirjVrYIPFXGhbW-hLAAJyIQACA5wZVNJt4CJY1URdPQQ", fallback: "/hy-garden/menu/coconut-coffee.webp" },
  "salt-coffee": { fileId: "BQACAgUAAxkDAAIRAmqDDguQRg0EoGeKme1SxwrrcIDZAAJzIQACA5wZVDjnUW2WNtY1PQQ", fallback: "/hy-garden/menu/salt-coffee.webp" },
  "coconut-americano": { fileId: "BQACAgUAAxkDAAIRA2qDDgyrdicWPyNFPs_4rATWeo7sAAJ0IQACA5wZVJ4QyTdizbXCPQQ", fallback: "/hy-garden/menu/coconut-americano.webp" },
  "mango-passion-tea": { fileId: "BQACAgUAAxkDAAIRBGqDDg0O6cZXgaFIk0L6h2oPjY4gAAJ1IQACA5wZVEKiBT1RVmjzPQQ", fallback: "/hy-garden/menu/mango-passion-tea.webp" },
  "lychee-rose-tea": { fileId: "BQACAgUAAxkDAAIRBWqDDg-aRdUCHcNYdqC5-5P_EhBXAAJ2IQACA5wZVHz5THCShyZ8PQQ", fallback: "/hy-garden/menu/lychee-rose-tea.webp" },
  "mango-smoothie": { fileId: "BQACAgUAAxkDAAIRBmqDDhAXHes75h3aAAGW0nH9DELoJAACdyEAAgOcGVSEqBBuCtWkTT0E", fallback: "/hy-garden/menu/mango-smoothie.webp" },
  "matcha-frappe": { fileId: "BQACAgUAAxkDAAIRB2qDDhIoT4aLUxba5rFtXl9ymNo-AAJ4IQACA5wZVKH_vrq3mU3jPQQ", fallback: "/hy-garden/menu/matcha-frappe.webp" },
  v60: { fileId: "BQACAgUAAxkDAAIRCGqDDhMlF_VlIxEu1FT85n9g2U18AAJ5IQACA5wZVHe_nG6hxJMAAT0E", fallback: "/hy-garden/menu/v60.webp" },
  "magenta-espresso": { fileId: "BQACAgUAAxkDAAIRCWqDDhUPZRoLUZUqN10fSAjH69SpAAJ6IQACA5wZVKJg40O_dzsyPQQ", fallback: "/hy-garden/menu/magenta-espresso.webp" },
} as const;

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const STATIC_ASSET = /\.(?:avif|gif|ico|jpe?g|png|svg|webp|woff2?|css|js|mjs|map)$/i;

function cacheControlFor(request: Request, url: URL) {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;
  if (url.pathname.startsWith("/api/")) return undefined;
  if (url.pathname === "/_vinext/image" || url.pathname.startsWith("/_next/")) {
    return `public, max-age=${ONE_DAY}, s-maxage=${ONE_MONTH}, immutable`;
  }
  if (url.pathname.startsWith("/hy-garden/order-preview/") || url.pathname.startsWith("/hy-garden/order-qr/")) {
    return "public, max-age=31536000, s-maxage=31536000, immutable";
  }
  if (STATIC_ASSET.test(url.pathname)) {
    return `public, max-age=${ONE_DAY}, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_MONTH}`;
  }
  if (!url.search) {
    return `public, max-age=0, s-maxage=${ONE_DAY}, stale-while-revalidate=${ONE_WEEK}`;
  }
  return undefined;
}

function withCacheControl(response: Response, cacheControl: string | undefined) {
  if (!cacheControl) return response;
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", cacheControl);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/telegram-media") {
      const asset = telegramAssets[url.searchParams.get("asset") as keyof typeof telegramAssets];
      if (!asset) return Response.json({ error: "Unknown media asset" }, { status: 404 });

      // Local development and deployments without the secret still render the
      // page from its bundled image. Production fetches the immutable Telegram
      // document without ever exposing the bot token to visitors.
      if (!env.TELEGRAM_BOT_TOKEN) return Response.redirect(new URL(asset.fallback, request.url), 302);

      const metadata = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${encodeURIComponent(asset.fileId)}`).then((response) => response.json()) as { ok?: boolean; result?: { file_path?: string } };
      if (!metadata.ok || !metadata.result?.file_path) return Response.json({ error: "Telegram file is unavailable" }, { status: 502 });

      const media = await fetch(`https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${metadata.result.file_path}`);
      if (!media.ok) return Response.json({ error: "Unable to load Telegram media" }, { status: 502 });
      return new Response(media.body, { headers: { "Content-Type": media.headers.get("content-type") ?? "image/webp", "Cache-Control": "public, max-age=31536000, immutable" } });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withCacheControl(response, cacheControlFor(request, url));
    }

    const response = await handler.fetch(request, env, ctx);
    return withCacheControl(response, cacheControlFor(request, url));
  },
};

export default worker;
