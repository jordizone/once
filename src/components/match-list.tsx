"use client";

import type { Event } from "@/lib/types";
import { useFavTeam } from "@/lib/fav-team";
import { FeaturedMatch } from "./featured-match";
import { MatchRow } from "./match-row";

function getDateKey(event: Event): string {
  return new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function groupByDate(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();
  for (const event of events) {
    const key = getDateKey(event);
    const group = groups.get(key);
    if (group) {
      group.push(event);
    } else {
      groups.set(key, [event]);
    }
  }
  return groups;
}

function isToday(event: Event): boolean {
  const d = new Date(event.date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function MatchList({ events }: { events: Event[] }) {
  const [favTeamId] = useFavTeam();

  const isFavMatch = (event: Event) =>
    event.competitions[0].competitors.some((c) => c.team.id === favTeamId);

  // Find the most relevant fav team match: live > today > next upcoming > last played
  const favEvents = events.filter(isFavMatch);
  const featuredMatch =
    favEvents.find((e) => e.status.type.state === "in") ??
    favEvents.find((e) => e.status.type.state === "pre" && isToday(e)) ??
    favEvents.find((e) => e.status.type.state === "pre") ??
    favEvents.findLast((e) => e.status.type.state === "post") ??
    null;

  const otherEvents = events.filter((e) => e !== featuredMatch);
  const grouped = groupByDate(otherEvents);

  return (
    <div className="flex flex-col gap-4 py-4">
      {featuredMatch ? (
        <FeaturedMatch event={featuredMatch} />
      ) : (
        <div className="px-4 text-xs text-fg-muted">
          No match for your team this week
        </div>
      )}

      {grouped.size > 0 ? (
        <div className="border-t border-border pt-2">
          {Array.from(grouped).map(([date, dayEvents]) => (
            <div key={date}>
              <div className="px-4 py-1.5 text-[10px] text-fg-muted uppercase tracking-wider">
                {date}
              </div>
              {dayEvents.map((event) => (
                <MatchRow key={event.id} event={event} />
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
