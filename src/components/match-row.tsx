"use client";

import type { Event } from "@/lib/types";

export function MatchRow({ event }: { event: Event }) {
  const competition = event.competitions[0];
  const home = competition.competitors.find((c) => c.homeAway === "home");
  const away = competition.competitors.find((c) => c.homeAway === "away");

  if (!home || !away) return null;

  const { state } = event.status.type;
  const isLive = state === "in";

  let statusText: string;
  if (state === "pre") {
    statusText = new Date(event.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (state === "in") {
    statusText = event.status.type.shortDetail;
  } else {
    statusText = "FT";
  }

  return (
    <div className="flex items-center justify-between px-4 py-1.5 text-xs hover:bg-bg-secondary">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-[80px] text-right truncate">
          {home.team.abbreviation}
        </span>
        <span className="text-fg-muted w-[50px] text-center">
          {state === "pre" ? "vs" : `${home.score}-${away.score}`}
        </span>
        <span className="w-[80px] truncate">{away.team.abbreviation}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {isLive ? (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        ) : null}
        <span className="text-fg-muted w-[60px] text-right">{statusText}</span>
      </div>
    </div>
  );
}
