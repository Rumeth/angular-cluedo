import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { SanitizerPipe } from '../pipe/sanitizer';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';

const routes: Routes = [
  {
    path: 'player',
    component: PlayerComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/player',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/player'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    SanitizerPipe,
    PlayerComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    PlayerService
  ]
})

export class AppModule {
}
