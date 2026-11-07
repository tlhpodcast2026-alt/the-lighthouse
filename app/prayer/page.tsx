import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks";
import { GuidedPrayer, PrayerRequestAndJournal } from "@/components/PrayerClient";

export const metadata: Metadata = {
  title: "Prayer",
  description: "Pray through the Kingdom prayer, share a prayer request and keep a private prayer journal.",
};

export default function PrayerPage() {
  return (
    <div className="wrap">
      <PageHeader eyebrow="Prayer" title="Come as you are. Pray as He taught.">
        Pray through the Kingdom prayer, bring a request, and keep a journal of what God is doing.
      </PageHeader>
      <section aria-label="Guided prayer"><GuidedPrayer /></section>
      <section className="py-18"><PrayerRequestAndJournal /></section>
    </div>
  );
}
