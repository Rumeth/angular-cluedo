import { Component, ViewChild } from '@angular/core';

import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
  }

  restartSession() {
    this.playerService.reset();
  }
}
