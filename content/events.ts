/**
 * Recurring live sessions. Dates are calculated in the visitor's browser,
 * so the site always shows the next upcoming session.
 *   weekday: 0 = Sunday … 6 = Saturday
 *   rule "weekly" or "first" (first such weekday of the month)
 */
export type RecurringEvent = {
  title: string;
  kind: string;
  weekday: number;
  rule: "weekly" | "first";
  time: string;
  blurb: string;
};

export const EVENTS: RecurringEvent[] = [
  { title: "Sunday Kingdom Teaching", kind: "Live on YouTube", weekday: 0, rule: "weekly", time: "7:00 PM ET",
    blurb: "The week's main teaching, streamed live with Pastor Johnson. Questions are answered in the chat." },
  { title: "Tuesday Bible Study", kind: "Live on YouTube", weekday: 2, rule: "weekly", time: "8:00 PM ET",
    blurb: "An open study through the current reading plan. Bring your Bible and your notes." },
  { title: "First Friday Prayer Night", kind: "Live on YouTube", weekday: 5, rule: "first", time: "9:00 PM ET",
    blurb: "An hour of guided prayer for requests sent in through the month." },
];

export function nextOccurrence(e: RecurringEvent, from: Date = new Date()): Date {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 12);
  if (e.rule === "weekly") {
    const d = new Date(today);
    d.setDate(d.getDate() + ((e.weekday - d.getDay() + 7) % 7));
    return d;
  }
  for (let m = 0; m < 3; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() + m, 1, 12);
    while (d.getDay() !== e.weekday) d.setDate(d.getDate() + 1);
    if (d >= today) return d;
  }
  return today;
}
