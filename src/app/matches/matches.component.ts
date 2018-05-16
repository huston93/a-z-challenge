import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { MatchSummary } from '../match';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: MatchSummary[];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
      this.matches.sort((match1, match2)  => match2.id - match1.id);
    });
  }

  addMatch(matchId: number): void {
    this.matchService.getMatch(matchId).subscribe(match => {
      this.matches.push(match);
      this.matches.sort((match1, match2)  => match2.id - match1.id);
    });
  }

}
