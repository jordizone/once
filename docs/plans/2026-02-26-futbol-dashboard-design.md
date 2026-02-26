# Futbol Dashboard — Design Document

## Overview

A minimal, terminal-styled web app to track FC Barcelona matches and results across La Liga, Champions League, and Copa del Rey. Two pages: a match dashboard and a standings table. Data sourced from ESPN's undocumented public API. Light and dark themes.

## Architecture

- **Next.js 16** (App Router, React 19)
- **Client-side data fetching** via Next.js API routes as proxy to ESPN API
- **SWR** for caching and polling (60s interval for live matches)
- **Tailwind CSS** for styling
- **No database, no auth** — purely read-only, stateless

## Data Source

ESPN's public Site API. No API key required.

### Base URL

```
https://site.api.espn.com/apis/site/v2/sports/soccer/{league}
```

### League Codes

| Competition      | Code                |
|------------------|---------------------|
| La Liga          | `esp.1`             |
| Champions League | `uefa.champions`    |
| Copa del Rey     | `esp.copa_del_rey`  |

### Endpoints Used

| Purpose            | Endpoint                              |
|--------------------|---------------------------------------|
| Scoreboard (today) | `/{league}/scoreboard`                |
| Scoreboard (date)  | `/{league}/scoreboard?dates=YYYYMMDD` |
| Standings          | `/{league}/standings`                 |
| Team schedule      | `/{league}/teams/83/schedule`         |
| Team info          | `/{league}/teams/83`                  |

FC Barcelona team ID: `83`

## Pages

### Dashboard (`/`)

- **Competition selector** at top: `LA LIGA | CHAMPIONS LEAGUE | COPA DEL REY`
- **Featured card**: next/live/last Barça match in the selected competition (large, prominent, bordered box)
- **Match list**: all other matches for the current matchday in that competition
- **Match states**: upcoming (show time), live (show score + minute), finished (show final score)

### Standings (`/standings`)

- Full league table for the selected competition
- Columns: position, team, played, W/D/L, GD, points
- Barça row highlighted
- Same competition selector as dashboard

## Navigation

- Minimal top bar: `FUTBOL` brand + `DASHBOARD | STANDINGS` links + theme toggle (light/dark)
- Competition selector shared across both pages (URL query param or state)

## Styling

- **Terminal aesthetic**: monospace font (JetBrains Mono), bordered boxes, minimal color, data-dense
- **Light theme**: white background, dark text, subtle borders
- **Dark theme**: near-black background, light text, subtle borders
- **Accent color**: used sparingly for live match indicators and Barça row highlight
- **Tailwind CSS** for utility-based styling

## Data Flow

```
ESPN API → Next.js API route (proxy) → Client SWR fetch → React components
```

- API routes: `/api/scoreboard?league=esp.1`, `/api/standings?league=esp.1`
- Client passes competition code as query parameter
- SWR handles caching + automatic revalidation
- Polling enabled (60s) when live matches detected

## Layout Wireframe

```
┌──────────────────────────────────────────────┐
│  FUTBOL        DASHBOARD  STANDINGS      ◐   │
├──────────────────────────────────────────────┤
│  [LA LIGA]  CHAMPIONS LEAGUE  COPA DEL REY   │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  FC BARCELONA  2 - 1  REAL MADRID      │  │
│  │  La Liga · 78' · Camp Nou              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  CHE 1-0 SEV  FT                             │
│  ATM 2-2 VIL  FT                             │
│  VAL 0-1 BET  65'                            │
│  RSO 1-2 ATH  FT                             │
│  GIR 0-0 CEL  20:00                          │
└──────────────────────────────────────────────┘
```

## Scope

### In scope

- Dashboard with featured Barça match + other matches
- Competition selector (La Liga, Champions League, Copa del Rey)
- Standings page with league table
- Light/dark theme toggle
- Live score polling

### Out of scope

- Player stats or detailed match pages
- Notifications or alerts
- User accounts or preferences persistence
- Mobile native app
