export const LEAGUES = {
  "esp.1": "LA LIGA",
  "uefa.champions": "CHAMPIONS LEAGUE",
  "esp.copa_del_rey": "COPA DEL REY",
} as const;

export type LeagueCode = keyof typeof LEAGUES;

export interface Competitor {
  id: string;
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    logo: string;
  };
  score: string;
  homeAway: "home" | "away";
  winner?: boolean;
}

export interface Status {
  clock: number;
  displayClock: string;
  type: {
    id: string;
    name: string;
    state: "pre" | "in" | "post";
    completed: boolean;
    description: string;
    detail: string;
    shortDetail: string;
  };
}

export interface Competition {
  id: string;
  competitors: Competitor[];
  venue?: {
    fullName: string;
    address?: {
      city: string;
    };
  };
}

export interface Event {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: Status;
  competitions: Competition[];
}

export interface ScoreboardResponse {
  events: Event[];
  leagues: {
    name: string;
    abbreviation: string;
  }[];
}

export interface StandingEntry {
  team: {
    id: string;
    displayName: string;
    abbreviation: string;
    logos: { href: string }[];
  };
  note?: {
    color: string;
    description: string;
    rank: number;
  };
  stats: {
    name: string;
    value: number;
    displayValue: string;
  }[];
}

export interface StandingsResponse {
  children: {
    name: string;
    standings: {
      entries: StandingEntry[];
    };
  }[];
}
