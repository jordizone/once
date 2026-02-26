import type { LeagueCode } from "./types";

const BASE_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer";

export function scoreboardUrl(league: LeagueCode): string {
  return `${BASE_URL}/${league}/scoreboard`;
}

export function standingsUrl(league: LeagueCode): string {
  return `${BASE_URL}/${league}/standings`;
}

export function teamScheduleUrl(league: LeagueCode, teamId: string): string {
  return `${BASE_URL}/${league}/teams/${teamId}/schedule`;
}
