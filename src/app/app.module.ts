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
import { SessionComponent } from './session/session.component';
import { SessionService } from './session/session.service';
import { ImageService } from '../services/image.service';
import { StorageService } from '../services/storage.service';

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
    HistoryComponent,
    SessionComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DatePipe,
    SanitizerPipe,
    PlayerService,
    HistoryService,
    ChecklistService,
    SessionService,
    ImageService,
    StorageService
  ]
})

export class AppModule {
}
