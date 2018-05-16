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
      map(res => this.parseMatchSummary(res[0]))
    );
  }

  private parseMatchArray(res: Object): MatchSummary[] {
    const matchList = new Array<MatchSummary>();
    for (const match of Object.keys(res)) {
      matchList.push(this.parseMatchSummary(res[match]));
    }
    return matchList;
  }

  private parseMatchSummary(res: Object): MatchSummary {
    const matchSum = new MatchSummary();
    // Retrieve individual player stats
    const arbitrary = res['players'].find((player) => player.account_id === 93830833);
    const whimsy = res['players'].find((player) => player.account_id === 27781077);
    // Todo: implement handling for either player not found

    // Extract summary details
    matchSum.id = res['match_id'];
    matchSum.time = res['duration'];
    matchSum.arbitraryStats = { hero: arbitrary.hero_id, kills: arbitrary.kills, assists: arbitrary.assists, deaths: arbitrary.deaths };
    matchSum.whimsyStats = { hero: whimsy.hero_id, kills: whimsy.kills, assists: whimsy.assists, deaths: whimsy.deaths };
    if (arbitrary.isRadiant === arbitrary.radiant_win) {
      matchSum.result = 'Win';
    } else {
      matchSum.result = 'Loss';
    }
  return matchSum;
  }

}
