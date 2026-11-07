import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks";
import { GiveBox } from "@/components/forms";

export const metadata: Metadata = {
  title: "Give",
  description: "Support free Kingdom teaching, study resources and live prayer.",
};

const USES = [
  ["Teaching", "Recording, editing and publishing weekly teachings and the podcast."],
  ["Free resources", "Study guides, reading plans and the prayer journal, free for everyone."],
  ["Live sessions", "Weekly Bible study and monthly prayer nights, streamed worldwide."],
  ["Books", "Getting Kingdom teaching into print and into readers' hands."],
];

export default function GivePage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Give" title="Help keep the light on.">
        Every teaching, reading plan and resource on The Lighthouse is free. Your generosity keeps it that way.
      </PageHeader>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <GiveBox />
        <div>
          <p className="eyebrow">Where your gift goes</p>
          <div className="mt-3">
            {USES.map(([h, d]) => (
              <div key={h} className="border-t border-line py-4 last:border-b">
                <h4 className="text-[1.1875rem]">{h}</h4>
                <p className="mt-1 text-sm text-ink-2">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-serif italic text-ink-2">
            “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.” <span className="cap not-italic">2 Corinthians 9:7</span>
          </p>
        </div>
      </div>
    </div>
  );
}
