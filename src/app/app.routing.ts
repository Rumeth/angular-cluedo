import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { PlayerComponent } from './player/player.component';

const routes : Routes = [
  {
    path      : 'player' ,
    component : PlayerComponent ,
    pathMatch : 'full'
  } ,
  {
    path      : 'history' ,
    component : HistoryComponent ,
    pathMatch : 'full'
  } ,
  {
    path       : '' ,
    redirectTo : '/player' ,
    pathMatch  : 'full'
  } ,
  {
    path       : '**' ,
    redirectTo : '/player'
  }
];

@NgModule ( {
              imports : [ RouterModule.forRoot ( routes ) ] ,
              exports : [ RouterModule ]
            } )
export class AppRouting
{
}
