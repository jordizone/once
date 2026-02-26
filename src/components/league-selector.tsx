"use client";

import { LEAGUES, type LeagueCode } from "@/lib/types";

interface LeagueSelectorProps {
  selected: LeagueCode;
  onChange: (league: LeagueCode) => void;
}

const leagueCodes = Object.keys(LEAGUES) as LeagueCode[];

export function LeagueSelector({ selected, onChange }: LeagueSelectorProps) {
  return (
    <div className="flex gap-4 px-4 py-3 text-xs">
      {leagueCodes.map((code) => (
        <button
          key={code}
          onClick={() => onChange(code)}
          className={
            selected === code
              ? "text-fg font-bold underline underline-offset-4"
              : "text-fg-muted hover:text-fg"
          }
        >
          {LEAGUES[code]}
        </button>
      ))}
    </div>
  );
}
