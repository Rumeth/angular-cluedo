import { Component } from '@angular/core';
import { Status } from '../constants/status';
import { AppService } from './app.service';
import { Card, CardStatus } from '../model/card.interface';
import { Player } from '../model/player.interface';
import { Session } from '../model/session.interface';
import { Types } from '../model/types.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loading: boolean = true;

  session: Session;

  player: Player;

  types: Types[];

  Status = Status;

  accusing: boolean = false;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void {
    if (localStorage.getItem('session')) {
      this.session = JSON.parse(localStorage.getItem('session'));

      this.getPlayer();
    } else {
      this.appService.getSession()
        .subscribe((session: Session) => {
          this.session = session;

          this.session.players = this.appService.shuffle(this.session.players);

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
      this.appService.getPlayer()
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
      this.appService.getPieces()
        .subscribe((types: Types[]) => this.processPieces(types));
    }
  }

  processPieces(types: Types[]): void {
    const shuffledTypes: Types[] = this.appService.shuffle(types);

    const playerHand: number[] = [];

    for (const hand of this.player.hand) {
      playerHand.push(hand.id);
    }

    for (const shuffledType of shuffledTypes) {
      shuffledType.pieces = this.appService.shuffle(shuffledType.pieces);

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

  toggleStatus(cardStatus: CardStatus, piece: Card): void {
    if (!cardStatus.frozen && !this.accusing) {
      const status: number[] = Object.values(Status)
        .filter((value: number) => !isNaN(value));

      let index: number = status.indexOf(cardStatus.status);

      if (index > -1) {
        index++;

        if (index >= status.length) {
          index = 0;
        }

        cardStatus.status = status[index];
      }

      if (cardStatus.status === Status.YES) {
        this.freezePiece(piece);
      }
      else {
        this.unfreezePiece(piece);
      }
    }
  }

  freezePiece(piece: Card): void {
    for (const cardStatus of piece.status) {
      if (cardStatus.status !== Status.YES) {
        cardStatus.frozen = true;
      }
    }

    piece.frozen = true;

    this.storeProgress();
  }

  unfreezePiece(piece: Card): void {
    for (const cardStatus of piece.status) {
      cardStatus.frozen = false;
    }

    piece.frozen = false;

    this.storeProgress();
  }

  storeProgress(): void {
    localStorage.setItem('types', JSON.stringify(this.types));
  }

  getStatusIcon(cardStatus: CardStatus): string {
    const styles: string[] = [];

    switch (cardStatus.status) {
      case Status.YES:
        styles.push('fa-check');
        styles.push('text-success');
        break;
      case Status.NO:
        styles.push('fa-times');
        styles.push('text-danger');
        break;
      case Status.DOUBT:
        styles.push('fa-question');
        styles.push('text-warning');
        break;
      default:
    }

    return styles.join(' ');
  }

  getPieceStatus(piece: Card): string {
    const styles: string[] = [];

    const existingIndex: number = piece.status.findIndex((cardStatus: CardStatus) => {
      return cardStatus.status === Status.YES;
    });

    if (existingIndex > -1) {
      styles.push('text-success');
      styles.push('line-through');
    }

    if (piece.accused) {
      styles.push('text-warning');
    } else {
      const shortlisted: number = piece.status.reduce((total: number, cardStatus: CardStatus) => {
        if (cardStatus.status === Status.NO) {
          return total + 1;
        }

        return total;
      }, 0);

      if (shortlisted === piece.status.length) {
        styles.push('text-danger');
      }
    }

    return styles.join(' ');
  }

  clearSession(): void {
    localStorage.removeItem('session');
    localStorage.removeItem('player');
    localStorage.removeItem('types');
  }

  restartSession(): void {
    this.clearSession();

    this.loading = true;

    this.getSession();
  }

  startAccusal() {
    this.accusing = true;
  }

  accusePiece(piece: Card, pieces: Card[]): void {
    if (this.accusing && !piece.frozen) {
      for (const currentPiece of pieces) {
        currentPiece.accused = currentPiece.id === piece.id;
      }

      const accusal = [];

      for (const pieceType of this.types) {
        for (const currentPiece of pieceType.pieces) {
          if (currentPiece.accused) {
            accusal.push(currentPiece);
          }
        }
      }

      this.player.accusal = accusal;
    }
  }

  confirmAccusal(): void {
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

    this.storeProgress();

    localStorage.setItem('player', JSON.stringify(this.player));
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
}
