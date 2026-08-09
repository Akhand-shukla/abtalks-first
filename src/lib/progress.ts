export type Track = "Frontend" | "Backend" | "AI / ML" | "Full-Stack";

export const TRACKS: Track[] = ["Frontend", "Backend", "AI / ML", "Full-Stack"];

export type DayEntry = {
  date: string; // YYYY-MM-DD
  track: Track;
  github: string;
  linkedin: string;
  note?: string;
};

export type View = "home" | "dashboard" | "activity";

export const STORAGE_KEY = "abtalks-entries";

/* ---- Dates ---- */

export function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export const todayKey = () => toKey(new Date());

/* ---- Persistence ---- */

export function loadEntries(): DayEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DayEntry[];
  } catch {
    /* ignore */
  }
  return [];
}

/* ---- Calculations ---- */

export function computeStreak(entries: DayEntry[]): number {
  const set = new Set(entries.map((e) => e.date));
  let streak = 0;
  let cursor = new Date();
  if (!set.has(toKey(cursor))) cursor = addDays(cursor, -1);
  while (set.has(toKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function computeBest(entries: DayEntry[]): number {
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  const keys = [...new Set(entries.map((e) => e.date))].sort();
  for (const k of keys) {
    const d = new Date(k + "T00:00:00");
    if (prev && d.getTime() - prev.getTime() === 86400000) run += 1;
    else run = 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}