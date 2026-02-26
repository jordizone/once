"use client";

import { useState } from "react";
import { LeagueSelector } from "@/components/league-selector";
import { MatchList } from "@/components/match-list";
import { WeekNav } from "@/components/week-nav";
import { useScoreboard } from "@/lib/hooks";
import type { LeagueCode } from "@/lib/types";

export default function Dashboard() {
  const [league, setLeague] = useState<LeagueCode>("esp.1");
  const [weekOffset, setWeekOffset] = useState(0);
  const { data, isLoading, error, weekLabel } = useScoreboard(
    league,
    weekOffset
  );

  return (
    <div>
      <LeagueSelector selected={league} onChange={setLeague} />
      <WeekNav
        label={weekLabel}
        onPrev={() => setWeekOffset((o) => o - 1)}
        onNext={() => setWeekOffset((o) => o + 1)}
      />
      {isLoading ? (
        <div className="px-4 py-8 text-xs text-fg-muted">Loading...</div>
      ) : error ? (
        <div className="px-4 py-8 text-xs text-fg-muted">
          Failed to load matches
        </div>
      ) : data?.events ? (
        <MatchList events={data.events} />
      ) : (
        <div className="px-4 py-8 text-xs text-fg-muted">
          No matches found
        </div>
      )}
    </div>
  );
}
