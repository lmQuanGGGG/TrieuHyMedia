/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

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
