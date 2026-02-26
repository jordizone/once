"use client";

import useSWR from "swr";
import type { LeagueCode, ScoreboardResponse, StandingsResponse } from "./types";
import { getWeekRange } from "./week";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useScoreboard(league: LeagueCode) {
  const dates = getWeekRange();
  return useSWR<ScoreboardResponse>(
    `/api/scoreboard?league=${league}&dates=${dates}`,
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
