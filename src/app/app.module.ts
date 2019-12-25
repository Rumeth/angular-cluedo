import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SanitizerPipe } from '../pipe/sanitizer';
import { ImageService } from '../services/image.service';
import { StorageService } from '../services/storage.service';

import { AppComponent } from './app.component';

import { AppRouting } from './app.routing';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistService } from './checklist/checklist.service';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from './history/history.service';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { SessionComponent } from './session/session.component';
import { SessionService } from './session/session.service';

@NgModule ( {
                imports      : [
                    BrowserModule ,
                    HttpClientModule ,
                    AppRouting
                ] ,
                declarations : [
                    AppComponent ,
                    SanitizerPipe ,
                    PlayerComponent ,
                    ChecklistComponent ,
                    HistoryComponent ,
                    SessionComponent
                ] ,
                bootstrap    : [
                    AppComponent
                ] ,
                providers    : [
                    DatePipe ,
                    SanitizerPipe ,
                    PlayerService ,
                    HistoryService ,
                    ChecklistService ,
                    SessionService ,
                    ImageService ,
                    StorageService
                ]
            } )

export class AppModule
{
}
