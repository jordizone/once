"use client";

import useSWR from "swr";
import type { LeagueCode, ScoreboardResponse, StandingsResponse } from "./types";
import { getWeekRange } from "./week";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useScoreboard(league: LeagueCode, weekOffset: number = 0) {
  const { dates, label } = getWeekRange(weekOffset);
  const isPast = weekOffset < 0;
  const result = useSWR<ScoreboardResponse>(
    `/api/scoreboard?league=${league}&dates=${dates}${isPast ? "&past=true" : ""}`,
    fetcher,
    {
      refreshInterval: weekOffset === 0 ? 60_000 : 0,
      dedupingInterval: 10_000,
    }
  );
  return { ...result, weekLabel: label };
}

export function useStandings(league: LeagueCode) {
  return useSWR<StandingsResponse>(
    `/api/standings?league=${league}`,
    fetcher,
    {
      refreshInterval: 300_000,
      dedupingInterval: 10_000,
    }
  );
}
