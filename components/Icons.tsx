import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const BookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" /></svg>
);
export const PrayIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M12 3v6" /><path d="M8.5 6.5 12 9l3.5-2.5" /><circle cx="12" cy="15" r="6" /><path d="M12 12v3l2 1.5" /></svg>
);
export const PlayIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
);
export const ListenIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="7" rx="1.5" /><rect x="17" y="14" width="4" height="7" rx="1.5" /></svg>
);
export const NoteIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
);
export const HomeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></svg>
);
export const LibraryIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M5 4v16M10 4v16M15 5l4 15" /></svg>
);
export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={1.8} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={2.4} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const CalendarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const PlanIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></svg>
);
export const Arrow = () => <span className="arrow" aria-hidden="true">→</span>;
