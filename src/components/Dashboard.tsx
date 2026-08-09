import { Flame, CalendarDays, Zap, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import type { DayEntry, View } from "../lib/progress";
import { addDays, computeBest, toKey } from "../lib/progress";
import AppNav from "./AppNav";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useParallaxContainer } from "../lib/useParallax";

export default function Dashboard({
  entries,
  streak,
  onNavigate,
  onReset,
}: {
  entries: DayEntry[];
  streak: number;
  onNavigate: (v: View) => void;
  onReset: () => void;
}) {
  const bgRef = useParallaxContainer<HTMLDivElement>();
  const byDate = new Map(entries.map((e) => [e.date, e] as const));
  const totalDays = entries.length;
  const best = computeBest(entries);

  const today = new Date();
  const start = addDays(today, -(60 - 1));
  const dayCells = Array.from({ length: 60 }, (_, i) => {
    const date = addDays(start, i);
    const key = toKey(date);
    const entry = byDate.get(key);
    const isFuture = date.getTime() > today.getTime();
    return { key, entry, isFuture, label: String(i + 1) };
  });

  const stats = [
    { icon: Flame, value: streak, label: "Current streak", tint: "text-orange-500" },
    { icon: CalendarDays, value: totalDays, label: "Days completed", tint: "text-emerald-600" },
    { icon: Zap, value: best, label: "Best streak", tint: "text-sky-600" },
    { icon: Clock, value: 60 - totalDays, label: "Days to go", tint: "text-violet-600" },
  ];

  return (
    <div
      ref={bgRef}
      className="min-h-screen bg-[#f3f2ee] text-stone-900 relative overflow-hidden"
    >
      {/* Spatial ambient orbs */}
      <div className="orb -top-24 right-0 h-[28rem] w-[28rem] bg-orange-200/50" style={{ transform: "translate3d(calc(var(--px,0)*18px), calc(var(--py,0)*18px),0)" }} />
      <div className="orb bottom-[-8rem] -left-24 h-[30rem] w-[30rem] bg-sky-200/40" style={{ transform: "translate3d(calc(var(--px,0)*-22px), calc(var(--py,0)*14px),0)", animationDelay: "2s" }} />
      <div className="orb top-1/2 right-[-6rem] h-64 w-64 bg-violet-200/30" style={{ transform: "translate3d(calc(var(--px,0)*14px), calc(var(--py,0)*-20px),0)", animationDelay: "4s" }} />

      <AppNav onNavigate={onNavigate} variant="light" streak={streak} />

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 pb-24 pt-14">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 persp">
          <div className="tilt-card liquid-glass-light rounded-3xl p-7 sm:p-8">
            <p className="font-serif-display italic text-xl text-stone-500">
              Your streak is your resume.
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-serif-display leading-tight">
              Day <span className="italic">{totalDays + 1}</span>
              <span className="text-stone-400"> / 60</span>
            </h1>
          </div>
          <button
            onClick={() => onNavigate("activity")}
            className="font-body flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:shadow-xl hover:shadow-stone-900/20"
          >
            Check in today <ArrowRight size={15} />
          </button>
        </div>

        {/* Stat cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 persp">
          {stats.map((s) => (
            <div
              key={s.label}
              className="tilt-card liquid-glass-light rounded-3xl p-5 sm:p-6 group"
            >
              <s.icon size={20} className={s.tint} />
              <p className="mt-4 text-3xl sm:text-4xl font-light">{s.value}</p>
              <p className="mt-1 font-body text-xs text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 60-day grid */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-light">60-day grid</h2>
            <div className="flex items-center gap-4 font-body text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-stone-900" /> Done
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm border border-stone-400" /> Missed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-stone-300" /> Ahead
              </span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-8 gap-1.5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
            {dayCells.map((cell, i) => (
              <div
                key={cell.key}
                title={`Day ${cell.label} — ${cell.entry ? cell.entry.track : cell.isFuture ? "Upcoming" : "Missed"}`}
                style={{
                  transform: `translate3d(calc(var(--px,0)*${(i % 5) - 2}px), calc(var(--py,0)*${((i * 7) % 5) - 2}px),0)`,
                }}
                className={`flex aspect-square items-center justify-center rounded-md font-body text-[10px] sm:text-[11px] transition-colors duration-200 ${
                  cell.entry
                    ? "bg-stone-900 text-white font-semibold shadow-md shadow-stone-900/20 hover:-translate-y-0.5"
                    : cell.isFuture
                      ? "border border-stone-200 text-stone-300 bg-white/50 hover:bg-white"
                      : "border border-stone-300 text-stone-400 bg-white/60 hover:bg-white"
                }`}
              >
                {cell.label}
              </div>
            ))}
          </div>
        </div>

        {/* Recent proof */}
        <div className="mt-12">
          <h2 className="text-2xl font-light italic">Recent proof</h2>
          <div className="mt-5 flex flex-col gap-3 persp">
            {entries.length === 0 && (
              <div className="liquid-glass-light rounded-3xl p-8 text-center font-body text-stone-500">
                No check-ins yet. Make day 1 count.
              </div>
            )}
            {entries.slice(0, 6).map((entry) => (
              <div
                key={entry.date}
                className="liquid-glass-light tilt-card flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-body text-xs text-stone-500">
                    <span>{entry.date}</span>
                    <span className="rounded-full bg-stone-900/5 px-2.5 py-0.5">{entry.track}</span>
                  </div>
                  {entry.note && (
                    <p className="mt-2 truncate font-body text-sm text-stone-700">{entry.note}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2 font-body">
                  <a
                    href={entry.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs text-stone-700 hover:text-stone-950 transition-colors bg-white/60"
                  >
                    <GithubIcon /> Commit <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={entry.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs text-stone-700 hover:text-stone-950 transition-colors bg-white/60"
                  >
                    <LinkedinIcon /> Post <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              if (window.confirm("Reset all progress?")) onReset();
            }}
            className="font-body text-xs text-stone-400 hover:text-stone-600 transition-colors"
          >
            Reset demo data
          </button>
        </div>
      </main>
    </div>
  );
}