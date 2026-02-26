"use client";

import useSWR from "swr";
import type { LeagueCode, ScoreboardResponse, StandingsResponse } from "./types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useScoreboard(league: LeagueCode) {
  return useSWR<ScoreboardResponse>(
    `/api/scoreboard?league=${league}`,
    fetcher,
    { refreshInterval: 60_000 }
  );
}

export function useStandings(league: LeagueCode) {
  return useSWR<StandingsResponse>(
    `/api/standings?league=${league}`,
    fetcher,
    { refreshInterval: 300_000 }
  );
}
