```
┌──────────────────────────────────────────────┐
│                                              │
│   ██████╗ ███╗   ██╗ ██████╗███████╗        │
│  ██╔═══██╗████╗  ██║██╔════╝██╔════╝        │
│  ██║   ██║██╔██╗ ██║██║     █████╗          │
│  ██║   ██║██║╚██╗██║██║     ██╔══╝          │
│  ╚██████╔╝██║ ╚████║╚██████╗███████╗        │
│   ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚══════╝        │
│                                              │
│  FC Barcelona match tracker                  │
│                                              │
└──────────────────────────────────────────────┘
```

A minimal, terminal-styled dashboard to follow FC Barcelona across La Liga, Champions League, and Copa del Rey. Open it, glance at the scores, close it. That's it.

---

## Preview

```
 ONCE        DASHBOARD  STANDINGS          DARK

 [LA LIGA]  CHAMPIONS LEAGUE  COPA DEL REY

 ┌────────────────────────────────────────┐
 │  FC Barcelona  2 - 1  Real Madrid      │
 │  ● 78'  ·  Spotify Camp Nou           │
 └────────────────────────────────────────┘

  CHE  1-0  SEV                         FT
  ATM  2-2  VIL                         FT
  VAL  0-1  BET                      ● 65'
  RSO  1-2  ATH                         FT
  GIR  0-0  CEL                      20:00
```

## Features

- **Dashboard** — featured Barca match + all other matches for the selected competition
- **Standings** — full league table with Barca row highlighted
- **Live scores** — auto-refreshes every 60 seconds
- **Light / Dark theme** — toggle or follows system preference
- **Terminal aesthetic** — monospace, bordered, data-dense

## Tech

```
Next.js 16  ·  React 19  ·  TypeScript  ·  Tailwind CSS 4  ·  SWR
```

Data from ESPN's public API. No API key needed.

## Getting started

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/
│   ├── page.tsx              # dashboard
│   ├── standings/page.tsx    # league table
│   └── api/
│       ├── scoreboard/       # ESPN scoreboard proxy
│       └── standings/        # ESPN standings proxy
├── components/
│   ├── nav.tsx               # top bar
│   ├── league-selector.tsx   # competition tabs
│   ├── featured-match.tsx    # large Barca match card
│   ├── match-row.tsx         # compact match row
│   ├── match-list.tsx        # match list container
│   └── theme-toggle.tsx      # light/dark switch
└── lib/
    ├── types.ts              # TypeScript types
    ├── espn.ts               # ESPN URL helpers
    └── hooks.ts              # SWR data hooks
```

## License

MIT
