import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks";
import TeachingArchive from "@/components/TeachingArchive";

export const metadata: Metadata = {
  title: "Teachings & Podcast",
  description: "The full archive of The Lighthouse teachings on the Kingdom of God, with study notes and reflection questions.",
};

export default function TeachingsPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Teachings & Podcast" title="Every teaching, in one calm archive.">
        Search by title, scripture or topic. Each teaching has study notes, key passages and questions for reflection or small groups.
      </PageHeader>
      <TeachingArchive />
    </div>
  );
}
