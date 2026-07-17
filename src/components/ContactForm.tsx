"use client";

import { FormEvent, useState } from "react";
import { company } from "@/src/config/company";
import type { Locale } from "@/src/content/site";
import { getContent } from "@/src/content/site";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getContent(locale).contactPage;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "fallback">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { message?: string; fallback?: boolean };
      if (response.ok) {
        setStatus("success");
        setMessage(locale === "en" ? "Your inquiry was sent successfully." : "Yêu cầu của bạn đã được gửi thành công.");
        form.reset();
      } else if (result.fallback) {
        setStatus("fallback");
        setMessage(locale === "en" ? "Online delivery is not configured yet. Please send your inquiry directly by email." : "Dịch vụ gửi trực tuyến chưa được cấu hình. Vui lòng gửi yêu cầu trực tiếp qua email.");
      } else {
        setStatus("error");
        setMessage(result.message || (locale === "en" ? "Please review the form and try again." : "Vui lòng kiểm tra biểu mẫu và thử lại."));
      }
    } catch {
      setStatus("fallback");
      setMessage(locale === "en" ? "We could not connect to the delivery service. Please send your inquiry directly by email." : "Không thể kết nối dịch vụ gửi. Vui lòng gửi yêu cầu trực tiếp qua email.");
    }
  }

  const fields = t.fields;
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-grid">
        <label>{fields.name}<input name="name" required minLength={2} maxLength={100} autoComplete="name" /></label>
        <label>{fields.company}<input name="company" maxLength={120} autoComplete="organization" /></label>
        <label>{fields.email}<input name="email" type="email" required maxLength={160} autoComplete="email" /></label>
        <label>{fields.phone}<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label>
      </div>
      <label>{fields.subject}<input name="subject" required minLength={3} maxLength={160} /></label>
      <label>{fields.message}<textarea name="message" required minLength={10} maxLength={3000} rows={7} /></label>
      <label className="consent"><input name="consent" type="checkbox" value="yes" required /><span>{fields.consent}</span></label>
      <button className="button-primary submit-button" type="submit" disabled={status === "loading"}>{status === "loading" ? fields.sending : fields.submit}</button>
      {message && <div className={`form-status form-status--${status}`} role="status">{message}{status === "fallback" && <>{" "}<a href={`mailto:${company.email}`}>{company.email}</a></>}</div>}
    </form>
  );
}
