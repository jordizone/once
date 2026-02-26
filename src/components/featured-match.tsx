"use client";

import type { Event } from "@/lib/types";

function getMatchStatus(event: Event): string {
  const { state } = event.status.type;
  if (state === "pre") {
    return new Date(event.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (state === "in") {
    return event.status.type.shortDetail;
  }
  return "FT";
}

export function FeaturedMatch({ event }: { event: Event }) {
  const competition = event.competitions[0];
  const home = competition.competitors.find((c) => c.homeAway === "home");
  const away = competition.competitors.find((c) => c.homeAway === "away");

  if (!home || !away) return null;

  const status = getMatchStatus(event);
  const isLive = event.status.type.state === "in";
  const venue = competition.venue?.fullName;

  return (
    <div className="border border-border p-4 mx-4">
      <div className="flex items-center justify-center gap-4 text-lg">
        <div className="flex items-center gap-2 min-w-[140px] justify-end">
          <span className="truncate">{home.team.displayName}</span>
          <img src={home.team.logo} alt="" className="w-6 h-6" />
        </div>
        <span className="text-fg-muted text-sm">
          {event.status.type.state === "pre" ? (
            "vs"
          ) : (
            <>
              {home.score} - {away.score}
            </>
          )}
        </span>
        <div className="flex items-center gap-2 min-w-[140px]">
          <img src={away.team.logo} alt="" className="w-6 h-6" />
          <span className="truncate">{away.team.displayName}</span>
        </div>
      </div>
      <div className="text-center text-xs text-fg-muted mt-2 flex items-center justify-center gap-2">
        {isLive ? (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        ) : null}
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>&middot;</span>
        <span>{status}</span>
        {venue ? (
          <>
            <span>&middot;</span>
            <span>{venue}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
