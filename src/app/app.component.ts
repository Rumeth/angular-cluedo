import { Component , OnDestroy , OnInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';

import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-cluedo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  currentUrl: string = '/player';

  routerEvents;

  constructor(private playerService: PlayerService, private router: Router) {
    this.routerEvents = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && event.url !== '/') {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe();
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
