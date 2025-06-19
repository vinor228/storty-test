export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface Season {
  strSeason: string;
  strBadge?: string;
}

export interface LeaguesResponse {
  leagues: League[];
}

export interface SeasonsResponse {
  seasons: Season[];
}
