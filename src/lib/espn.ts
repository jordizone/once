import type { LeagueCode } from "./types";

const BASE_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer";

export function scoreboardUrl(league: LeagueCode, dates?: string): string {
  const url = `${BASE_URL}/${league}/scoreboard`;
  return dates ? `${url}?dates=${dates}` : url;
}

const WEB_BASE_URL =
  "https://site.web.api.espn.com/apis/v2/sports/soccer";

export function standingsUrl(league: LeagueCode): string {
  return `${WEB_BASE_URL}/${league}/standings`;
}

export function teamScheduleUrl(league: LeagueCode, teamId: string): string {
  return `${BASE_URL}/${league}/teams/${teamId}/schedule`;
}
