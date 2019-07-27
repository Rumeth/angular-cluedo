import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlayerService } from './player.service';

import { Status } from '../../constants/status';

import { Card, CardStatus } from '../../model/card.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';
import { History } from '../../model/history.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  session: Session;

  player: Player;

  types: Types[];

  Status = Status;

  started: boolean = false;

  accusing: boolean = false;

  resetSubject;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.getSession();

    this.resetSubject = this.playerService.resetSubject.subscribe(() => {
      this.confirmRestart();
    });

    if (localStorage.getItem('started')) {
      this.started = JSON.parse(localStorage.getItem('started'));
    }
  }

  ngOnDestroy(): void {
    this.resetSubject.unsubscribe();
  }

  getSession(): void {
    if (localStorage.getItem('session')) {
      this.session = JSON.parse(localStorage.getItem('session'));

      this.getPlayer();
    } else {
      this.playerService.getSession()
        .subscribe((session: Session) => {
          session.endedOn = '';

          this.session = session;

          this.session.players = this.playerService.shuffle(this.session.players);

          localStorage.setItem('session', JSON.stringify(this.session));

          this.getPlayer();
        });
    }
  }

  getPlayer(): void {
    if (localStorage.getItem('player')) {
      this.player = JSON.parse(localStorage.getItem('player'));

      this.getPieces();
    } else {
      this.playerService.getPlayer()
        .subscribe((player: Player) => {
          this.player = player;

          localStorage.setItem('player', JSON.stringify(this.player));

          this.getPieces();
        });
    }
  }

  getPieces(): void {
    if (localStorage.getItem('types')) {
      this.types = JSON.parse(localStorage.getItem('types'));

      this.loading = false;
    } else {
      this.playerService.getPieces()
        .subscribe((types: Types[]) => this.processPieces(types));
    }
  }

  processPieces(types: Types[]): void {
    const shuffledTypes: Types[] = this.playerService.shuffle(types);

    const playerHand: number[] = [];

    for (const hand of this.player.hand) {
      playerHand.push(hand.id);
    }

    for (const shuffledType of shuffledTypes) {
      shuffledType.pieces = this.playerService.shuffle(shuffledType.pieces);

      shuffledType.pieces.map((piece: Card) => {
        piece.status = [];

        piece.frozen = false;

        for (const player of this.session.players) {
          const cardStatus: CardStatus = {
            player: player.hash,
            status: Status.EMPTY,
            frozen: false
          };

          if (playerHand.indexOf(piece.id) > -1) {
            cardStatus.status = Status.NO;
            cardStatus.frozen = true;

            piece.frozen = true;

            if (player.hash === this.player.hash) {
              cardStatus.status = Status.YES;
            }
          }

          piece.status.push(cardStatus);
        }
      });
    }

    this.types = shuffledTypes;

    this.loading = false;

    this.playerService.storeProgress(this.types);

    if (!this.started) {
      this.playerService.freezeAll(this.types);
    }
  }

  clearSession(): void {
    localStorage.removeItem('session');
    localStorage.removeItem('player');
    localStorage.removeItem('types');
    localStorage.removeItem('started');
  }

  confirmRestart(): void {
    if (this.started) {
      if (window.confirm('Are you sure you want to clear everything?')) {
        this.restartSession();
      }
    }
    else {
      this.restartSession();
    }
  }

  restartSession(): void {
    if (this.session.endedOn === '') {
      this.session.endedOn = new Date();
    }

    if (this.started) {
      this.updateHistory();
    }

    this.clearSession();

    this.started = false;

    this.loading = true;

    this.getSession();
  }

  startGame() {
    this.started = true;

    localStorage.setItem('started', JSON.stringify(this.started));

    this.session.startedOn = new Date();

    localStorage.setItem('session', JSON.stringify(this.session));

    this.playerService.unfreezeAll(this.types);
  }

  startAccusal() {
    this.accusing = true;
  }

  confirmAccusal(): void {
    if (window.confirm('Are you sure you want to accuse?')) {
      for (const pieceType of this.types) {
        for (const currentPiece of pieceType.pieces) {
          currentPiece.frozen = false;

          for (const cardStatus of currentPiece.status) {
            if (cardStatus.status !== Status.YES) {
              cardStatus.frozen = true;
            }
          }
        }
      }

      this.accusing = false;

      this.session.endedOn = new Date();

      this.playerService.storeProgress(this.types);

      localStorage.setItem('player', JSON.stringify(this.player));
    }
  }

  cancelAccusal(): void {
    for (const pieceType of this.types) {
      for (const currentPiece of pieceType.pieces) {
        currentPiece.accused = false;
      }
    }

    this.player.accusal = [];

    this.accusing = false;
  }

  updateHistory(): void {
    this.playerService.updateHistory(this.session, this.player, this.types);
  }
}