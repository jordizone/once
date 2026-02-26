"use client";

import { useState } from "react";
import { LeagueSelector } from "@/components/league-selector";
import { useStandings } from "@/lib/hooks";
import { BARCA_ID, type LeagueCode } from "@/lib/types";

function getStat(
  stats: { name: string; displayValue: string }[],
  name: string
): string {
  return stats.find((s) => s.name === name)?.displayValue ?? "-";
}

export default function Standings() {
  const [league, setLeague] = useState<LeagueCode>("esp.1");
  const { data, isLoading, error } = useStandings(league);

  const entries = data?.children?.[0]?.standings?.entries ?? [];

  return (
    <div>
      <LeagueSelector selected={league} onChange={setLeague} />
      {isLoading ? (
        <div className="px-4 py-8 text-xs text-fg-muted">Loading...</div>
      ) : error ? (
        <div className="px-4 py-8 text-xs text-fg-muted">
          Failed to load standings
        </div>
      ) : entries.length === 0 ? (
        <div className="px-4 py-8 text-xs text-fg-muted">
          No standings available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-fg-muted">
                <th className="px-4 py-2 text-left w-8">#</th>
                <th className="px-2 py-2 text-left">TEAM</th>
                <th className="px-2 py-2 text-center w-8">P</th>
                <th className="px-2 py-2 text-center w-8">W</th>
                <th className="px-2 py-2 text-center w-8">D</th>
                <th className="px-2 py-2 text-center w-8">L</th>
                <th className="px-2 py-2 text-center w-10">GD</th>
                <th className="px-2 py-2 text-center w-10">PTS</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => {
                const isBarca = entry.team.id === BARCA_ID;
                const noteColor = entry.note?.color;
                return (
                  <tr
                    key={entry.team.id}
                    className={`border-b border-border hover:bg-bg-secondary ${
                      isBarca ? "bg-highlight/10 font-bold" : ""
                    }`}
                  >
                    <td className="px-4 py-1.5 text-fg-muted">
                      <div className="flex items-center gap-1.5">
                        {noteColor ? (
                          <span
                            className="inline-block w-1 h-3.5 rounded-sm"
                            style={{ backgroundColor: noteColor }}
                            title={entry.note?.description}
                          />
                        ) : (
                          <span className="inline-block w-1" />
                        )}
                        {i + 1}
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        {entry.team.logos?.[0]?.href ? (
                          <img src={entry.team.logos[0].href} alt="" className="w-4 h-4" />
                        ) : null}
                        <span className="truncate">{entry.team.abbreviation}</span>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStat(entry.stats, "gamesPlayed")}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStat(entry.stats, "wins")}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStat(entry.stats, "ties")}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStat(entry.stats, "losses")}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStat(entry.stats, "pointDifferential")}
                    </td>
                    <td className="px-2 py-1.5 text-center font-bold">
                      {getStat(entry.stats, "points")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(() => {
            const zones = new Map<string, string>();
            for (const entry of entries) {
              if (entry.note?.description && entry.note?.color) {
                zones.set(entry.note.description, entry.note.color);
              }
            }
            return zones.size > 0 ? (
              <div className="flex flex-wrap gap-4 px-4 py-3 text-[10px] text-fg-muted">
                {Array.from(zones).map(([desc, color]) => (
                  <div key={desc} className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-2 h-2 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}
