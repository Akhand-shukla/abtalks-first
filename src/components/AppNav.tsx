import { useState } from "react";
import { Menu, X, ChevronRight, Flame } from "lucide-react";
import type { View } from "../lib/progress";

const LINKS: { label: string; view: View }[] = [
  { label: "Dashboard", view: "dashboard" },
  { label: "Check-in", view: "activity" },
  { label: "Tracks", view: "dashboard" },
  { label: "Community", view: "home" },
];

export default function AppNav({
  onNavigate,
  variant,
  streak,
}: {
  onNavigate: (v: View) => void;
  variant: "overlay" | "solid" | "light";
  streak?: number;
}) {
  const [open, setOpen] = useState(false);

  const isLight = variant === "light";
  const linkCls = isLight
    ? "text-stone-600 hover:text-stone-950 transition-colors"
    : "text-white/70 hover:text-white transition-colors";
  const streakChip = isLight
    ? "flex items-center gap-1.5 rounded-full bg-stone-900/5 border border-stone-900/10 px-4 py-1.5 text-sm font-semibold text-stone-900"
    : "flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm font-semibold";
  const joinBtn = isLight
    ? "ml-1 rounded-full bg-stone-900 px-5 py-1.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03] font-body"
    : "ml-1 rounded-full bg-white px-5 py-1.5 text-[13px] font-semibold text-black transition-transform hover:scale-[1.03] font-body";

  return (
    <>
      <nav
        className={`w-full relative flex items-center justify-between gap-4 px-5 sm:px-8 pt-5 ${
          variant === "overlay" ? "text-white" : ""
        } ${isLight ? "text-stone-950" : ""}`}
      >
        <button
          onClick={() => onNavigate("home")}
          className={`font-serif-display italic text-2xl sm:text-[1.7rem] tracking-tight ${
            isLight ? "text-stone-950" : "text-white"
          }`}
        >
          AB<span className="not-italic">/</span>Talks
        </button>

        {/* Desktop pill */}
        {variant === "overlay" ? (
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full pl-2 pr-2 py-1.5 font-body">
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => onNavigate(l.view)}
                className="px-4 py-1.5 text-sm text-white/80 hover:text-white transition-colors font-body"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate("activity")}
              className={joinBtn}
            >
              Join Now
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-7 font-body">
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => onNavigate(l.view)}
                className={linkCls}
              >
                {l.label}
              </button>
            ))}
            {typeof streak === "number" && (
              <div className={streakChip}>
                <Flame size={14} className="text-orange-400" />
                {streak}d
              </div>
            )}
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className={`relative md:hidden w-11 h-11 flex items-center justify-center ${
            isLight
              ? "text-stone-900 bg-white/70 border border-stone-900/10 backdrop-blur rounded-full"
              : "liquid-glass rounded-full text-white"
          }`}
        >
          <span
            className={`absolute transition-all duration-300 ${
              open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          >
            <Menu size={20} />
          </span>
          <span
            className={`absolute transition-all duration-300 ${
              open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          >
            <X size={20} />
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-overlay-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
            {LINKS.map((l, i) => (
              <button
                key={l.label}
                onClick={() => {
                  setOpen(false);
                  onNavigate(l.view);
                }}
                style={{ animationDelay: `${100 + i * 50}ms` }}
                className={`flex items-center justify-between py-5 border-b border-white/10 text-left text-3xl animate-fade-up font-serif-display`}
              >
                <span className="italic">{l.label}</span>
                <ChevronRight size={22} className="text-white/40" />
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onNavigate("activity");
              }}
              style={{ animationDelay: "350ms" }}
              className="mt-10 w-full rounded-full bg-white text-black py-4 font-body font-semibold text-base animate-fade-up transition-transform hover:scale-[1.02]"
            >
              Start Day 1 →
            </button>
          </div>
        </div>
      )}
    </>
  );
}