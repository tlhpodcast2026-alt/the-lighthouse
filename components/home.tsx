"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DAILY_VERSES, PASSAGES, PLANS } from "@/content/scripture";
import { TEACHINGS } from "@/content/teachings";
import { dayOfYear } from "@/lib/format";
import { useStored } from "@/lib/useStored";
import { Arrow, BookIcon, ListenIcon, PrayIcon } from "./Icons";

/** The "Today" panel: verse of the day, today's reading, prayer and latest teaching. */
export function TodayPanel() {
  const [planId] = useStored<string>("plan", "foundations");
  const [days] = useStored<Record<string, number>>("day", {});
  const [today, setToday] = useState<{ label: string; idx: number } | null>(null);

  useEffect(() => {
    const d = new Date();
    setToday({ label: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), idx: dayOfYear(d) });
  }, []);

  const verse = DAILY_VERSES[(today?.idx ?? 0) % DAILY_VERSES.length];
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const di = Math.min(days[plan.id] ?? 0, plan.days.length - 1);
  const passage = PASSAGES[plan.days[di].passage];
  const latest = TEACHINGS[0];

  const row = "grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-t border-line px-6 py-3.5 first:border-t-0 hover:bg-paper";
  const ic = "grid h-10 w-10 place-items-center rounded-full bg-sage-soft text-sage";

  return (
    <aside aria-label="Today" className="overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="border-b border-line bg-paper-2 p-6">
        <p className="eyebrow min-h-[1.2em]">{today?.label ?? "Today"}</p>
        <p className="mt-3 font-serif text-2xl leading-snug">“{verse.text}”</p>
        <p className="mt-3 text-sm text-ink-2">{verse.ref} · {verse.version}</p>
      </div>
      <div>
        <Link href="/study" className={row}>
          <span className={ic}><BookIcon width={19} height={19} /></span>
          <span><b className="block font-medium">Read · {passage.ref}</b><span className="text-sm text-ink-3">{plan.name}, day {di + 1} of {plan.days.length}</span></span>
          <Arrow />
        </Link>
        <Link href="/prayer" className={row}>
          <span className={ic}><PrayIcon width={19} height={19} /></span>
          <span><b className="block font-medium">Pray · The Kingdom prayer</b><span className="text-sm text-ink-3">A six-step guided prayer, about 10 minutes</span></span>
          <Arrow />
        </Link>
        <Link href={`/teachings/${latest.id}`} className={row}>
          <span className={ic}><ListenIcon width={19} height={19} /></span>
          <span><b className="block font-medium">Listen · {latest.title}</b><span className="text-sm text-ink-3">{latest.mins} min · {latest.ref}</span></span>
          <Arrow />
        </Link>
      </div>
    </aside>
  );
}

/** The single orchestrated motion moment: a slow sweeping beam of light. */
export function Beacon() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * devicePixelRatio;
      c.height = r.height * devicePixelRatio;
    };
    size();
    window.addEventListener("resize", size, { passive: true });
    let raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      const ox = w * 0.92, oy = h * 0.28;
      const a = reduce ? Math.PI * 1.05 : Math.PI + Math.sin((now - t0) / 5200) * 0.35;
      const spread = 0.16, len = Math.hypot(w, h);
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, len * 0.9);
      g.addColorStop(0, "rgba(201,133,58,0.30)");
      g.addColorStop(0.35, "rgba(201,133,58,0.10)");
      g.addColorStop(1, "rgba(201,133,58,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(a - spread) * len, oy + Math.sin(a - spread) * len);
      ctx.lineTo(ox + Math.cos(a + spread) * len, oy + Math.sin(a + spread) * len);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(201,133,58,0.15)";
      ctx.beginPath(); ctx.arc(ox, oy, 18 * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(201,133,58,0.9)";
      ctx.beginPath(); ctx.arc(ox, oy, 5 * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
