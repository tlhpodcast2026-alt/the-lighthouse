import Link from "next/link";

/**
 * The Lighthouse mark: horizon, tower, and one point of light.
 * Clear space around the lockup = x, the diameter of the light.
 */
export function Mark({ size = 30, reverse = false, className }: { size?: number; reverse?: boolean; className?: string }) {
  const ink = reverse ? "#FBFAF6" : "#24272B";
  const cut = reverse ? "#24272B" : "#FBFAF6";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M8 32h24" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.6 15h4.8l2.2 17h-9.2z" fill={ink} />
      <rect x="19.25" y="20" width="1.5" height="4.2" rx=".75" fill={cut} />
      <circle cx="20" cy="10" r="3.2" fill="#C9853A" />
      <path d="M9 10h5.2M25.8 10H31" stroke="#C9853A" strokeWidth="1.5" strokeLinecap="round" opacity=".75" />
    </svg>
  );
}

export function Wordmark({ reverse = false, scale = 1 }: { reverse?: boolean; scale?: number }) {
  return (
    <span className="flex items-center gap-2.5" style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}>
      <Mark reverse={reverse} />
      <span className="flex flex-col leading-none">
        <small
          className="mb-[3px] pl-px text-[9px] font-semibold uppercase tracking-[0.32em]"
          style={{ color: reverse ? "rgba(251,250,246,.6)" : "var(--color-ink-3)" }}
        >
          The
        </small>
        <span className="font-serif text-[21px] tracking-[-0.01em]" style={{ color: reverse ? "#FBFAF6" : undefined }}>
          Lighthouse
        </span>
      </span>
    </span>
  );
}

export function LogoLink() {
  return (
    <Link href="/" aria-label="The Lighthouse, home" className="flex-none">
      <Wordmark />
    </Link>
  );
}
