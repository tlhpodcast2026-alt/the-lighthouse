import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-[2.75rem]">That page isn&apos;t here.</h1>
      <p className="mt-4 text-lg text-ink-2">The light is still on, though. <Link className="link" href="/">Return home</Link> or <Link className="link" href="/teachings">browse the teachings</Link>.</p>
    </div>
  );
}
