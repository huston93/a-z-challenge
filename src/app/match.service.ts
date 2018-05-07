import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MATCHES } from './mock-data';
import { MATCHLIST } from './matchList';
import { MatchSummary } from './match';

@Injectable()
export class MatchService {
  private liveApi = false;

  private apiUrl = 'https://api.opendota.com/api/';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<MatchSummary[]> {
    if (this.liveApi) {
      return of(MATCHES);
    } else {
      const matchList = new Array<MatchSummary>();

      for (const match of MATCHLIST) {
          this.getMatch(match).subscribe(
          matchSummary => matchList.push(matchSummary));
      }
      return of(matchList);
    }
  }

  getMatch(matchId: number): Observable<MatchSummary> {
    return this.http.get(this.apiUrl + 'matches/' + matchId).pipe(
      map(res => this.parseMatchSummary(res))
    );
  }

  parseMatchSummary(res: Object): MatchSummary {
    const matchSum = new MatchSummary();
    matchSum.id = res['match_id'];
    matchSum.time = res['duration'];
    matchSum.arbitraryStats = {hero:undefined, kills:undefined, assists: undefined, deaths:undefined};
    matchSum.whimsyStats = {hero:undefined, kills:undefined, assists: undefined, deaths:undefined};
    return matchSum;
  }

}
