import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, goal, message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: true, message: "Registered" });
    }

    if (!name || !phone) {
      return NextResponse.json({ ok: false, message: "Vui lòng nhập Họ tên và Số điện thoại." }, { status: 400 });
    }

    // Ghi nhận thành công
    return NextResponse.json({
      ok: true,
      message: "Đăng ký thành công! Đội ngũ tuyển sinh VuLee & Triệu Hỷ Media sẽ liên hệ với bạn trong vòng 24h.",
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
  }
}
