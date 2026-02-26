"use client";

import type { Event } from "@/lib/types";
import { BARCA_ID } from "@/lib/types";
import { FeaturedMatch } from "./featured-match";
import { MatchRow } from "./match-row";

function isBarcaMatch(event: Event): boolean {
  return event.competitions[0].competitors.some(
    (c) => c.team.id === BARCA_ID
  );
}

export function MatchList({ events }: { events: Event[] }) {
  const barcaMatch = events.find(isBarcaMatch);
  const otherMatches = events.filter((e) => !isBarcaMatch(e));

  return (
    <div className="flex flex-col gap-4 py-4">
      {barcaMatch ? (
        <FeaturedMatch event={barcaMatch} />
      ) : (
        <div className="px-4 text-xs text-fg-muted">
          No FC Barcelona match today
        </div>
      )}

      {otherMatches.length > 0 ? (
        <div className="border-t border-border pt-2">
          {otherMatches.map((event) => (
            <MatchRow key={event.id} event={event} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
