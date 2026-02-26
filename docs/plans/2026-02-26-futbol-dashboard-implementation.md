# Futbol Dashboard — Implementation Plan

## Phase 1: Project Setup

1. Initialize Next.js 16 project with TypeScript, Tailwind CSS, App Router
2. Configure monospace font (JetBrains Mono via `next/font/google`)
3. Set up dark/light theme support (CSS variables + `next-themes` or manual toggle with `prefers-color-scheme`)
4. Create base layout with nav bar: `FUTBOL` brand, `DASHBOARD | STANDINGS` links, theme toggle

## Phase 2: API Layer

5. Create API route `/api/scoreboard` — proxies ESPN scoreboard endpoint, accepts `league` query param
6. Create API route `/api/standings` — proxies ESPN standings endpoint, accepts `league` query param
7. Create API route `/api/team/schedule` — proxies ESPN team schedule endpoint for Barça (ID `83`)
8. Create shared types for ESPN API response shapes (matches, teams, standings)
9. Create SWR hooks: `useScoreboard(league)`, `useStandings(league)`, `useTeamSchedule(league)`

## Phase 3: Dashboard Page

10. Build competition selector component (`LA LIGA | CHAMPIONS LEAGUE | COPA DEL REY`)
11. Build featured match card — large bordered box showing Barça's current/next/last match
12. Build match list component — compact rows for other matches with score/time/status
13. Wire up SWR polling (60s) for live score updates
14. Handle match states: upcoming (kickoff time), live (score + minute), finished (FT + score)

## Phase 4: Standings Page

15. Build standings table — position, team, P, W, D, L, GD, Pts
16. Highlight Barça row with subtle accent
17. Share competition selector state with dashboard (URL query param `?league=esp.1`)

## Phase 5: Polish

18. Responsive layout (mobile-friendly)
19. Loading states (skeleton or terminal-style loading indicators)
20. Error handling for API failures
21. Verify dark/light theme across all components
