# ABTalks Redesign — AI Usage Log

This document logs every AI-assisted prompt used to build this project, as
required for the vibe-coding hackathon submission.

## How the build worked

- The entire app was generated and iterated on with an AI coding agent in a
  single continuous session.
- The agent read the inbox/reference spec (visual system + screen
  requirements), scaffolded a Vite + React + TypeScript + Tailwind v4 project,
  wired the three screens together, and iterated on each change request below.
- Every UI decision (fonts, animation timing, gradients, values) came from the
  written spec; the code was written by the AI, then regularly type-checked
  (`tsc -b`) and built (`vite build`) by the agent. The remote asset URLs in
  the hero (4 CloudFront videos + overlay PNG) were verified live against the
  CDN mid-session to fix two broken/mistyped IDs.

## Prompt history (chronological)

1. **Initial spec + scaffold** — "Create a Vite + React + Tailwind project in
   my folder. Build the new ABTalks platform as this single-page app with
   Landing, Dashboard, and Check-in screens. Style it definitively like the
   reference spec." This produced the app shell: Instrument Serif italic as
   the display font, Inter as body, stone/ink palette, `.liquid-glass`
   gradient-border glass surfaces, and the four CloudFront hero videos plus
   the overlay PNG wired into a cinematic hero.

2. **Wire the navigation** — "Nav is a liquid-glass pill; when the hamburger
   opens, the overlay menu and the X animate in with long tapered strokes;
   close on nav click." Tuned the hamburger→X morph and 300/500/600 ms
   overlay animations and reduced-motion support.

3. **Hero video switcher** — "Cycle the four videos on a 5 s timer with a
   1 s crossfade; animate a different design note over each one; add a warm
   glow onto the video." Deep Woods (#182c41) shifts the hero text color at
   its moment. Gracefully idle until the videos mount.

4. **Landing stats and CTAs** — "Season the landing hero with stats and an
   email CTA; keep it client-side, no backend."

5. **Dashboard** — "Show current streak, best streak, a 60-day checkbox
   grid, and the most recent proofs." Each entry stores
   {date, track, github, linkedin, note} in localStorage under
   `abtalks-entries`; streaks are computed from entry dates (see
   `src/lib/progress.ts`).

6. **Check-in / Activity screen** — "The check-in: pick a track (Frontend /
   Backend / AI / ML / Full-Stack), paste GitHub and LinkedIn proof URLs,
   optional note; validate the URLs; on save show a success state and
   update the streak instantly."

7. **Icons + polish** — Inline SVG GitHub and LinkedIn brand icons (no icon
   dependency that would bloat the bundle), lucide-react arrows for CTAs,
   consistent type scale, spacing, and roundness across all screens.

8. **Security + submission prep** — Seeded demo data made realistic; added
   PROMPTS.md (this file); replaced the template README with a real one;
   verified `.gitignore` covers `dist`/`node_modules`/`.env`; confirmed zero
   secrets in the codebase and `npm audit` clean.

## Decisions worth flagging to a judge

- **Data layer is intentionally client-side**: no database or backend was
  required, so the app persists entries in `localStorage`. This keeps the
  footprint minimal and the live demo trivially deployable.
- **Remote media is spec-defined**: all hero videos and the overlay PNG are
  referenced from the CDN URLs provided in the spec, not copied into the repo.

## Reference spec (source of design decisions)

The visual spec used throughout (abridged): ABTalks redesign — Instrument
Serif italic display + Inter body; stone/ink palette (`#0c0a09`,
`#1c1917`, `#f5f5f4`, `#ffffff`); `.liquid-glass` gradient-border glass
surfaces; `#182c41` "Deep Woods" deep-color text moment; 1000 ms video
crossfade/switch cooldown; mobile-first with a full-screen overlay nav.

## How to reproduce

```bash
npm install
npm run dev      # Vite dev server on http://localhost:5173
npm run build    # type-check (tsc -b) + production build
```