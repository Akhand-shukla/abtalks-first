import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, CheckCircle2, Sparkles } from "lucide-react";
import type { DayEntry, Track, View } from "../lib/progress";
import { isValidUrl, todayKey, TRACKS } from "../lib/progress";
import AppNav from "./AppNav";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useParallaxContainer } from "../lib/useParallax";

export default function Activity({
  entries,
  onNavigate,
  onSubmit,
}: {
  entries: DayEntry[];
  onNavigate: (v: View) => void;
  onSubmit: (entry: DayEntry) => void;
}) {
  const bgRef = useParallaxContainer<HTMLDivElement>();
  const [track, setTrack] = useState<Track | null>(null);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const already = entries.find((e) => e.date === todayKey());

  useEffect(() => {
    if (already) {
      setTrack(already.track);
      setGithub(already.github);
      setLinkedin(already.linkedin);
      setNote(already.note ?? "");
    }
  }, [already]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!track) return setError("Pick the track you are building today.");
    if (!isValidUrl(github)) return setError("Add a link to today's GitHub commit.");
    if (!isValidUrl(linkedin)) return setError("Add a link to today's LinkedIn post.");
    onSubmit({ date: todayKey(), track, github, linkedin, note: note.trim() });
    setDone(true);
  };

  return (
    <div
      ref={bgRef}
      className="min-h-screen bg-[#f3f2ee] text-stone-900 relative overflow-hidden"
    >
      {/* Spatial ambient orbs */}
      <div className="orb -top-20 left-0 h-80 w-80 bg-violet-200/40" style={{ transform: "translate3d(calc(var(--px,0)*20px), calc(var(--py,0)*18px),0)" }} />
      <div className="orb bottom-[-8rem] right-0 h-96 w-96 bg-sky-200/40" style={{ transform: "translate3d(calc(var(--px,0)*-24px), calc(var(--py,0)*12px),0)", animationDelay: "3s" }} />
      <div className="orb top-1/3 -left-16 h-56 w-56 bg-orange-200/30" style={{ transform: "translate3d(calc(var(--px,0)*16px), calc(var(--py,0)*-18px),0)", animationDelay: "1.5s" }} />

      <AppNav onNavigate={onNavigate} variant="light" />

      <main className="relative mx-auto max-w-2xl px-5 sm:px-8 pb-24 pt-14">
        <div className="persp">
          <div className="liquid-glass-light tilt-card rounded-3xl p-6 sm:p-8">
            <p className="font-serif-display italic text-xl text-stone-500">
              Proof of work, day in, day out.
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-light leading-tight">
              {already ? "You're already checked in" : "Check in for today"}
            </h1>
          </div>
        </div>

        {done ? (
          <div className="liquid-glass-light mt-10 rounded-3xl p-10 text-center persp">
            <div className="tilt-card mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={30} />
            </div>
            <h2 className="mt-6 text-3xl font-light italic">Streak locked in.</h2>
            <p className="mx-auto mt-3 max-w-sm font-body text-sm text-stone-600">
              Your commit and post are on the wall. Recruiters see it, the streak lives.
            </p>
            <button
              onClick={() => onNavigate("dashboard")}
              className="mt-8 font-body inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:shadow-xl hover:shadow-stone-900/20"
            >
              View dashboard <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
            {/* Track picker */}
            <div>
              <label className="font-body mb-3 block text-xs uppercase tracking-widest text-stone-500">
                01 — Track
              </label>
              <div className="grid grid-cols-2 gap-3 persp">
                {TRACKS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrack(t)}
                    className={`tilt-card liquid-glass-light rounded-2xl px-4 py-4 text-left transition-all ${
                      track === t ? "ring-1 ring-stone-900 shadow-lg shadow-stone-900/10" : "hover:opacity-90"
                    }`}
                  >
                    <span className="block font-body text-sm font-medium">{t}</span>
                    <span className="mt-0.5 block font-body text-[11px] text-stone-500">
                      Build daily for 60 days
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="font-body mb-2 block text-xs uppercase tracking-widest text-stone-500">
                  GitHub commit URL
                </label>
                <div className="liquid-glass-light flex items-center gap-3 rounded-2xl px-4 py-3.5 bg-white/70">
                  <GithubIcon size={16} className="shrink-0 text-stone-500" />
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/you/…/commit"
                    className="font-body flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-stone-400 text-stone-900"
                  />
                </div>
              </div>
              <div>
                <label className="font-body mb-2 block text-xs uppercase tracking-widest text-stone-500">
                  LinkedIn post URL
                </label>
                <div className="liquid-glass-light flex items-center gap-3 rounded-2xl px-4 py-3.5 bg-white/70">
                  <LinkedinIcon size={18} className="shrink-0 text-stone-500" />
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://www.linkedin.com/…"
                    className="font-body flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-stone-400 text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="font-body mb-2 block text-xs uppercase tracking-widest text-stone-500">
                What did you build? <span className="normal-case text-stone-400">(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="A line of context for your future self…"
                className="font-body liquid-glass-light w-full resize-none rounded-2xl px-4 py-3.5 text-sm outline-none placeholder-stone-400 text-stone-900 bg-white/70"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-orange-600">
                <span className="mr-1.5">•</span>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:shadow-xl hover:shadow-stone-900/20"
            >
              <Check size={16} /> {already ? "Update today's proof" : "Lock in today's proof"}
            </button>
          </form>
        )}

        {!done && (
          <div className="mt-10 liquid-glass-light rounded-3xl p-6 persp">
            <div className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-stone-500">
              <Sparkles size={14} /> The ritual
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-stone-600">
              One small commit. One honest post. That&apos;s the whole challenge — momentum
              survives the late nights, the bad days, the Wi‑Fi that dies. Show up anyway.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}