import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';

import { SanitizerPipe } from '../pipe/sanitizer';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { ChecklistComponent } from './checklist/checklist.component';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from './history/history.service';
import { ChecklistService } from './checklist/checklist.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    SanitizerPipe,
    PlayerComponent,
    ChecklistComponent,
    HistoryComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DatePipe,
    PlayerService,
    HistoryService,
    ChecklistService
  ]
})

export class AppModule {
}
