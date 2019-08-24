import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './session.service';
import { ImageService } from '../../services/image.service';

import { Status } from '../../constants/status';

import { Card, CardStatus } from '../../model/card.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';
import { History } from '../../model/history.interface';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class SessionComponent implements OnInit {
  loading: boolean = true;

  session: Session;

  player: Player;

  players: Player[] = [];

  otherPlayers: string[] = [];

  types: Types[];

  Status = Status;

  started: boolean = false;

  step: number = 1;

  constructor(private sessionService: SessionService, private router: Router, private imageService: ImageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('started')) {
      this.redirectToPlayer();
    } else {
      this.getSession();
    }
  }

  getSession(): void {
    this.sessionService.getSession()
      .subscribe((session: Session) => {
        session.createdOn = new Date();

        session.endedOn = '';

        this.session = session;

        this.players = session.players;

        this.loading = false;
      });
  }

  getPieces(): void {
    const players: Player[] = [];

    for (const player of this.session.players) {
      if (this.otherPlayers.indexOf(player.hash) > -1) {
        players[this.otherPlayers.indexOf(player.hash)] = player;
      }
    }

    players.unshift(this.player);

    this.session.players = players;

    this.sessionService.getPieces()
      .subscribe((types: Types[]) => this.processPieces(types));
  }

  processPieces(types: Types[]): void {
    const shuffledTypes: Types[] = this.sessionService.shuffle(types);

    for (const shuffledType of shuffledTypes) {
      shuffledType.pieces = this.sessionService.shuffle(shuffledType.pieces);

      shuffledType.pieces.map((piece: Card) => {
        piece.status = [];

        piece.frozen = false;

        for (const player of this.session.players) {
          const cardStatus: CardStatus = {
            player: player.hash,
            status: Status.EMPTY,
            frozen: false,
            disabled: false
          };

          piece.status.push(cardStatus);
        }
      });
    }

    this.types = shuffledTypes;

    this.loading = false;

    this.startGame();
  }

  startGame() {
    this.started = true;

    this.session.createdBy = this.player.hash;

    this.session.startedOn = new Date();

    this.sessionService.storeProgress('started', this.started);

    this.sessionService.storeProgress('player', this.player);

    this.sessionService.storeProgress('types', this.types);

    this.sessionService.storeProgress('session', this.session);

    this.redirectToPlayer();
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  setOtherPlayers(player: Player): void {
    if (this.otherPlayers.indexOf(player.hash) > -1) {
      this.otherPlayers.splice(this.otherPlayers.indexOf(player.hash), 1);
    } else {
      this.otherPlayers.push(player.hash);
    }
  }

  back() {
    this.step--;

    switch (this.step) {
      case 1:
        this.players = this.session.players.filter((player: Player) => player);
        break;
      case 2:
        this.players = this.session.players.filter((player: Player) => player.hash !== this.player.hash);
        break;
    }
  }

  next() {
    switch (this.step) {
      case 1:
        this.players = this.session.players.filter((player: Player) => player.hash !== this.player.hash);

        if (this.otherPlayers.indexOf(this.player.hash) > -1) {
          this.otherPlayers.splice(this.otherPlayers.indexOf(this.player.hash), 1);
        }
        break;
      case 2:
        const players: Player[] = [];

        for (const player of this.session.players) {
          if (this.otherPlayers.indexOf(player.hash) > -1) {
            players[this.otherPlayers.indexOf(player.hash)] = player;
          }
        }

        this.players = players;
        break;
    }

    this.step++;
  }

  disableNext() {
    switch (this.step) {
      case 1:
        return !this.player;
        break;
      case 2:
        return this.otherPlayers.length < 1;
        break;
    }
  }

  redirectToPlayer() {
    this.router.navigate(['player']);
  }

  getImage(image: string) {
    return this.imageService.getImage(image);
  }
}