import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from '../../constants/status';
import { PlayerService } from './player.service';
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

  accusing: boolean = false;

  resetSubject;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.getSession();

    this.resetSubject = this.playerService.resetSubject.subscribe(() => {
      this.restartSession();
    });
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
          session.startedOn = new Date();
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

    localStorage.setItem('types', JSON.stringify(this.types));
  }

  storeProgress(): void {
    localStorage.setItem('types', JSON.stringify(this.types));
  }

  clearSession(): void {
    localStorage.removeItem('session');
    localStorage.removeItem('player');
    localStorage.removeItem('types');
  }

  restartSession(): void {
    if (window.confirm('Are you sure you want to clear everything?')) {
      if (this.session.endedOn === '') {
        this.session.endedOn = new Date();
      }

      this.updateHistory();

      this.clearSession();

      this.loading = true;

      this.getSession();
    }
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

      this.storeProgress();

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
    let history: History[] = [];

    if (localStorage.getItem('history')) {
      history = JSON.parse(localStorage.getItem('history'));
    }

    history.push({
      session: this.session,
      player: this.player,
      types: this.types
    });

    localStorage.setItem('history', JSON.stringify(history));
  }
}