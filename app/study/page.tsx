import type { Metadata } from "next";
import { Suspense } from "react";
import StudyClient from "@/components/StudyClient";

export const metadata: Metadata = {
  title: "Bible Study",
  description: "Reading plans through the Kingdom passages, with verse highlighting and personal notes.",
};

export default function StudyPage() {
  return (
    <div className="wrap">
      <h1 className="sr-only">Bible Study</h1>
      <Suspense fallback={<p className="cap py-18">Opening the reader…</p>}>
        <StudyClient />
      </Suspense>
    </div>
  );
}
