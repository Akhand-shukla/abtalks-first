# ABTalks — 60-Day Build Streak

A redesigned ABTalks homepage for India's 60-day coding challenge. Build and
ship something every day, share the proof on GitHub and LinkedIn, and keep your
streak alive.

Built for the vibe-coding hackathon with **React 19 + TypeScript + Vite 8 +
Tailwind CSS v4**. Designed mobile-first from a written visual spec (Instrument
Serif display type, stone/ink palette, liquid-glass gradient-border surfaces).
See [PROMPTS.md](./PROMPTS.md) for the full AI-assist usage log.

## Screens

- **Landing** — cinematic hero cycling 4 spec-provided CloudFront videos with a
  1000 ms crossfade and animated design notes; stats and an email CTA. Includes
  a "Deep Woods" deep-color text moment.
- **Dashboard** — current streak, best streak, a 60-day progress grid, and the
  most recent day proofs (GitHub commit + LinkedIn post links).
- **Check-in** — record today's proof: pick a track (Frontend / Backend /
  AI & ML / Full-Stack), paste your GitHub and LinkedIn URLs, add a note. URLs
  are validated before saving; a success state appears on save.

## Data

Everything lives in the browser — no backend required. Entries are persisted to
`localStorage` under `abtalks-entries`; streaks are computed from the stored
entry dates in `src/lib/progress.ts`.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Project structure

```
src/
  components/
    AppNav.tsx     # glass pill nav + mobile overlay menu
    Landing.tsx    # hero with 4-video switcher + CTAs
    Dashboard.tsx  # streak cards, 60-day grid, recent proofs
    Activity.tsx   # daily check-in form + success state
    icons.tsx      # inline SVG GitHub / LinkedIn icons
  lib/
    progress.ts    # types, date utils, localStorage, streak logic
  App.tsx          # view switcher (home / dashboard / activity)
```

## Security

Static client-side app with a minimal footprint: no secrets, no backend, a
clean `npm audit`, and all persisted user input is rendered as text (never
`innerHTML`) and validated to `http/https` only.   

contributer -Akhand Shukla
            -Akshay Shukla
            -Aditya Mishra(leader)
