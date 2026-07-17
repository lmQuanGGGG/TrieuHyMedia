import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/src/content/site";

export default async function AboutRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}#about`);
}
