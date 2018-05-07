import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { AppRoutingModule } from './/app-routing.module';
import { MatchService } from './match.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MatchService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
