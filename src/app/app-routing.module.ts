import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatchesComponent } from './matches/matches.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/matches',
    pathMatch: 'full'
  },
  {
    path: 'matches',
    component: MatchesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
