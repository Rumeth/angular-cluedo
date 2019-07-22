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
  session: Session;

  player: Player;

  types: Types[];

  Status = Status;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void {
    this.appService.getSession()
      .subscribe((session: Session) => {
        this.session = session;

        this.session.players = this.appService.shuffle(this.session.players);

        this.getPlayer();
      });
  }

  getPlayer(): void {
    this.appService.getPlayer()
      .subscribe((player: Player) => {
        this.player = player;

        this.getPieces();
      });
  }

  getPieces(): void {
    this.appService.getPieces()
      .subscribe((types: Types[]) => {
        const shuffledTypes: Types[] = this.appService.shuffle(types);

        const playerHand: number[] = [];

        for (const hand of this.player.hand) {
          playerHand.push(hand.id);
        }

        for (const type of shuffledTypes) {
          type.pieces = this.appService.shuffle(type.pieces);

          type.pieces.map((piece: Card) => {
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
      });
  }

  toggleStatus(cardStatus: CardStatus, piece: Card): void {
    if (!cardStatus.frozen) {
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
  }

  unfreezePiece(piece: Card): void {
    for (const cardStatus of piece.status) {
      cardStatus.frozen = false;
    }

    piece.frozen = false;
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

    const shortlisted: number = piece.status.reduce((total: number, cardStatus: CardStatus) => {
      if (cardStatus.status === Status.NO) {
        return total + 1;
      }

      return total;
    }, 0);

    if (shortlisted === piece.status.length) {
      styles.push('text-danger');
    }

    return styles.join(' ');
  }
}
