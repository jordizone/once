"use client";

import { useSyncExternalStore, useCallback } from "react";

const KEY = "favTeamId";
const DEFAULT = "83"; // FC Barcelona

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): string {
  if (typeof window === "undefined") return DEFAULT;
  return localStorage.getItem(KEY) ?? DEFAULT;
}

function getServerSnapshot(): string {
  return DEFAULT;
}

export function useFavTeam() {
  const teamId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTeamId = useCallback((id: string) => {
    localStorage.setItem(KEY, id);
    for (const cb of listeners) cb();
  }, []);

  return [teamId, setTeamId] as const;
}
