import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/blocks";
import { ComposeForm } from "@/components/forms";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Lighthouse.",
};

export default function ContactPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Contact" title="We'd be glad to hear from you.">
        Questions about a teaching, partnership, media, or just to say hello.
      </PageHeader>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <ComposeForm
          subject="Message for The Lighthouse"
          submitLabel="Send message"
          fields={[
            { id: "cName", label: "Name", required: true, autoComplete: "name", half: true },
            { id: "cEmail", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
            { id: "cTopic", label: "Topic", type: "select", options: ["A question about a teaching", "Speaking invitation", "Partnership or media", "Prayer", "Something else"] },
            { id: "cMsg", label: "Message", type: "textarea", required: true },
          ]}
        />
        <div className="grid gap-6">
          <div className="border-t border-ink pt-4">
            <p className="eyebrow">YouTube</p>
            <a className="mt-1.5 block font-serif text-2xl hover:text-sage" href={site.channelUrl} target="_blank" rel="noopener noreferrer">{site.channelHandle}</a>
            <p className="text-sm text-ink-2">New teachings weekly, live sessions and community posts.</p>
          </div>
          {site.contactEmail && (
            <div className="border-t border-ink pt-4">
              <p className="eyebrow">Email</p>
              <p className="mt-1.5 select-all font-serif text-2xl">{site.contactEmail}</p>
            </div>
          )}
          <div className="border-t border-ink pt-4">
            <p className="eyebrow">Prayer</p>
            <p className="mt-1.5 text-sm text-ink-2">For prayer, the <Link className="link" href="/prayer#request">prayer request page</Link> is the quickest way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
