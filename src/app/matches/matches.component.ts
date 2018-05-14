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

  constructor(private matchService: MatchService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches().subscribe(matches => this.matches = matches);
  }

  addMatch(matchId: number): void {
    this.matchService.getMatch(matchId).subscribe(match => {
      this.matches.push(match);
    });
  }

}
