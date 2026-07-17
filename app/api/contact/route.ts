import { NextResponse } from "next/server";
import { company } from "@/src/config/company";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (text(body.website, 200)) return NextResponse.json({ message: "Accepted." });

  const name = text(body.name, 100);
  const senderCompany = text(body.company, 120);
  const email = text(body.email, 160);
  const phone = text(body.phone, 30);
  const subject = text(body.subject, 160);
  const message = text(body.message, 3000);
  const consent = text(body.consent, 10);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || !validEmail || subject.length < 3 || message.length < 10 || consent !== "yes") {
    return NextResponse.json({ message: "Please complete all required fields with valid information." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ message: "Email delivery is not configured.", fallback: true }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [company.email],
      reply_to: email,
      subject: `[Website] ${subject}`,
      text: `Name: ${name}\nCompany: ${senderCompany || "Not provided"}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`,
    }),
  });

  if (!response.ok) return NextResponse.json({ message: "The delivery service could not send this inquiry." }, { status: 502 });
  return NextResponse.json({ message: "Sent." });
}
