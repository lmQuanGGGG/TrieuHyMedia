import { NextResponse } from "next/server";

export const runtime = "edge";

const LONG_CACHE = "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable";

export async function GET(request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.TELE_BOT_TOKEN;

  if (!fileId) return NextResponse.json({ error: "Missing Telegram file ID" }, { status: 400 });
  if (!botToken) return NextResponse.json({ error: "Telegram media is not configured" }, { status: 503 });

  try {
    const metadataResponse = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`);
    const metadata = await metadataResponse.json() as { ok?: boolean; result?: { file_path?: string } };
    const filePath = metadata.result?.file_path;

    if (!metadata.ok || !filePath) return NextResponse.json({ error: "Telegram file is unavailable" }, { status: 404 });

    const range = request.headers.get("range");
    const mediaResponse = await fetch(`https://api.telegram.org/file/bot${botToken}/${filePath}`, {
      headers: range ? { Range: range } : undefined,
    });

    if (!mediaResponse.ok && mediaResponse.status !== 206) {
      return NextResponse.json({ error: "Unable to retrieve Telegram media" }, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", mediaResponse.headers.get("content-type") ?? "application/octet-stream");
    headers.set("Cache-Control", LONG_CACHE);
    headers.set("Accept-Ranges", "bytes");

    for (const header of ["content-length", "content-range"]) {
      const value = mediaResponse.headers.get(header);
      if (value) headers.set(header, value);
    }

    return new Response(mediaResponse.body, { status: mediaResponse.status, headers });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve Telegram media" }, { status: 502 });
  }
}
