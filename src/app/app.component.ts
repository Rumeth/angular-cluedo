import { Component, ViewChild } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentUrl: string;

  constructor(private playerService: PlayerService, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
  }

  restartSession() {
    this.playerService.reset();
  }

  redirectToHistory() {
    this.router.navigate(['history']);
  }

  redirectToSession() {
    this.router.navigate(['player']);
  }
}
