import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MATCHLIST } from './matchList';
import { MatchSummary } from './match';

@Injectable()
export class MatchService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<MatchSummary[]> {
    return this.http.get(this.apiUrl + 'matches/').pipe(
      map(res => this.parseMatchArray(res))
    );

  }

  getMatch(matchId: number): Observable<MatchSummary> {
    return this.http.get(this.apiUrl + 'matches/' + matchId).pipe(
      map(res => this.parseMatchSummary(res))
    );
  }

  parseMatchArray(res: Object): MatchSummary[] {
    const matchList = new Array<MatchSummary>();
    for (const match of Object.keys(res)) {
      matchList.push(this.parseMatchSummary(res[match]));
    }
    return matchList;
  }

  parseMatchSummary(res: Object): MatchSummary {
    const matchSum = new MatchSummary();
    matchSum.id = res['match_id'];
    if (matchSum.id !== null) {
      matchSum.time = res['duration'];
      matchSum.arbitraryStats = { hero: undefined, kills: undefined, assists: undefined, deaths: undefined };
      matchSum.whimsyStats = { hero: undefined, kills: undefined, assists: undefined, deaths: undefined };
    }
    return matchSum;
  }

}
