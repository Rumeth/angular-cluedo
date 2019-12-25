import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { PlayerComponent } from './player/player.component';
import { SessionComponent } from './session/session.component';

const routes : Routes = [
    {
        path      : 'session' ,
        component : SessionComponent ,
        pathMatch : 'full'
    } ,
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
        redirectTo : '/session' ,
        pathMatch  : 'full'
    } ,
    {
        path       : '**' ,
        redirectTo : '/session'
    }
];

@NgModule ( {
                imports : [ RouterModule.forRoot ( routes ) ] ,
                exports : [ RouterModule ]
            } )
export class AppRouting
{
}
