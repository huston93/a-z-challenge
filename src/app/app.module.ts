import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { AppRoutingModule } from './/app-routing.module';
import { MatchService } from './match.service';
import { MatchDurationPipe } from './pipes/matchDuration.pipe';
import { HeroNamePipe } from './pipes/heroName.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDurationPipe,
    HeroNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule 
  ],
  providers: [
    MatchService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
