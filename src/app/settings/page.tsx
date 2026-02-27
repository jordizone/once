"use client";

import { useStandings } from "@/lib/hooks";
import { useFavTeam } from "@/lib/fav-team";

export default function Settings() {
  const { data, isLoading, error } = useStandings("esp.1");
  const [favTeamId, setFavTeamId] = useFavTeam();

  const teams = (data?.children?.[0]?.standings?.entries ?? []).map(
    (e) => e.team
  );

  return (
    <div className="px-4 py-6">
      <h1 className="text-xs font-bold tracking-widest mb-6">SETTINGS</h1>

      <div className="text-xs text-fg-muted mb-2 uppercase tracking-wider">
        Favorite team
      </div>

      {isLoading ? (
        <div className="text-xs text-fg-muted py-4">Loading teams...</div>
      ) : error ? (
        <div className="text-xs text-fg-muted py-4">Failed to load teams</div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {teams.map((team) => {
            const selected = team.id === favTeamId;
            return (
              <button
                key={team.id}
                onClick={() => setFavTeamId(team.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-xs text-left hover:bg-bg-secondary transition-colors cursor-pointer ${
                  selected ? "bg-highlight/10 text-fg font-bold" : "text-fg"
                }`}
              >
                {team.logos?.[0]?.href ? (
                  <img src={team.logos[0].href} alt="" className="w-5 h-5" />
                ) : (
                  <span className="w-5 h-5" />
                )}
                <span className="flex-1">{team.displayName}</span>
                {selected ? (
                  <span className="text-highlight text-[10px] tracking-wider">
                    SELECTED
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
