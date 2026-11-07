import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks";
import { ComposeForm } from "@/components/forms";
import { Mark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description: "Why The Lighthouse exists, our mission and vision, and Pastor Johnson Jayeola.",
};

export default function AboutPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="About" title="Why The Lighthouse">
        Many people have heard of the Kingdom of God. Few have had it explained clearly. The Lighthouse exists to change that.
      </PageHeader>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="max-w-[66ch] space-y-4 text-[1.0625rem] leading-[1.75]">
          <p>A lighthouse does not chase ships, argue with storms or call attention to itself. It stands on a firm foundation and keeps shining, so that anyone looking for the way can find it.</p>
          <p>That is the posture of this ministry. We stand on Scripture. We teach the Kingdom of God with clarity, depth and love. And we build simple tools so that what you hear on Sunday becomes how you read, pray and live on Monday.</p>
        </div>
        <div className="grid gap-6">
          <div className="border-t border-ink pt-4"><p className="eyebrow">Mission</p><p className="mt-2 font-serif text-2xl">To reveal and teach the Kingdom of God with clarity, depth and love, and help people find their way into it.</p></div>
          <div className="border-t border-ink pt-4"><p className="eyebrow">Vision</p><p className="mt-2 font-serif text-2xl">A generation that knows the King, studies His Word daily, prays with confidence and lives as light in the world.</p></div>
        </div>
      </div>

      <section className="grid items-center gap-8 py-18 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12">
        {/* Replace with a portrait: put the photo in /public and use <img src="..." /> */}
        <div className="relative grid aspect-[4/5] max-w-full place-items-center overflow-hidden rounded-2xl bg-paper-2">
          <Mark size={96} />
          <span className="cap absolute bottom-3.5 left-4">Portrait</span>
        </div>
        <div>
          <p className="eyebrow">The teacher</p>
          <h2 className="mt-2.5 text-[2.75rem]">Pastor Johnson Jayeola</h2>
          <div className="mt-4 max-w-[66ch] space-y-4 text-[1.0625rem] leading-[1.75]">
            <p>Johnson Jayeola is a teacher of the Kingdom of God and the host of The Lighthouse Podcast. His teaching is marked by careful attention to Scripture and a desire to make the message of the Kingdom plain enough for anyone to understand and live.</p>
            <p>He is the author of <em>Winning Every Day: The Principle of KOR</em>, a practical framework of Knowing, Own and Repeat for daily faithfulness.</p>
          </div>
        </div>
      </section>

      <section id="speaking" className="grid scroll-mt-24 items-start gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Speaking invitations</p>
          <h2 className="mt-2 text-[2rem]">Invite Pastor Johnson</h2>
          <p className="mt-2.5 max-w-[46ch] text-ink-2">Available for churches, conferences, retreats, campus gatherings and podcasts. Common topics: the gospel of the Kingdom, prayer, Kingdom identity and the Principle of KOR.</p>
        </div>
        <ComposeForm
          subject="Speaking invitation — Pastor Johnson Jayeola"
          submitLabel="Send invitation"
          fields={[
            { id: "spOrg", label: "Organisation or church", required: true },
            { id: "spDate", label: "Preferred date", type: "date", half: true },
            { id: "spLoc", label: "Location or online", half: true },
            { id: "spTopic", label: "Topic and audience", type: "textarea" },
            { id: "spName", label: "Your name", required: true, autoComplete: "name", half: true },
            { id: "spEmail", label: "Your email", type: "email", required: true, autoComplete: "email", half: true },
          ]}
        />
      </section>
    </div>
  );
}
