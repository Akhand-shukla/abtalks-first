import { useState } from "react";
import type { DayEntry, View } from "./lib/progress";
import { computeStreak, loadEntries, STORAGE_KEY } from "./lib/progress";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Activity from "./components/Activity";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [entries, setEntries] = useState<DayEntry[]>(() => loadEntries());

  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0 });
  };

  const persist = (next: DayEntry[]) => {
    setEntries(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const addEntry = (entry: DayEntry) => {
    const rest = entries.filter((e) => e.date !== entry.date);
    persist([...rest, entry].sort((a, b) => (a.date < b.date ? 1 : -1)));
  };

  const reset = () => persist([]);

  return (
    <div className="bg-black text-white min-h-screen font-body">
      {view === "home" && <Landing onNavigate={navigate} streak={computeStreak(entries)} />}
      {view === "dashboard" && (
        <Dashboard
          entries={entries}
          streak={computeStreak(entries)}
          onNavigate={navigate}
          onReset={reset}
        />
      )}
      {view === "activity" && (
        <Activity entries={entries} onNavigate={navigate} onSubmit={addEntry} />
      )}
    </div>
  );
}