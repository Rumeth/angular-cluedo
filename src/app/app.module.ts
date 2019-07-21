import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SanitizerPipe } from './sanitizer';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, SanitizerPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
