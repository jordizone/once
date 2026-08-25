import type { LeagueCode } from "./types";

// ESPN rejects requests whose User-Agent is absent or browser-like (403), and
// allows known non-browser clients. Workers' fetch sends no User-Agent, so one
// has to be set explicitly for the API routes to work off localhost.
export const ESPN_HEADERS = {
  "User-Agent": "curl/8.11.1 (once; +https://once.jordi.zone)",
};

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
