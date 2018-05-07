export class MatchSummary {
  id: number;
  time: number;
  arbitraryStats: {
    hero: string;
    kills: number;
    deaths: number;
    assists: number;
  };
  whimsyStats: {
    hero: string;
    kills: number;
    deaths: number;
    assists: number;
  };
  result: string;
}
