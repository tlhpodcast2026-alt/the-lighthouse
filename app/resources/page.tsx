import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks";
import ResourceGrid from "@/components/ResourceGrid";

export const metadata: Metadata = {
  title: "Free Resources",
  description: "Free study guides, reading plans, a prayer journal, note sheets and devotionals.",
};

export default function ResourcesPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Free resources" title="Tools for study and prayer, free to use.">
        Open any resource instantly. Plans and the journal work right here on the site; guides can be copied into your own notes or shared with a group.
      </PageHeader>
      <ResourceGrid />
    </div>
  );
}
