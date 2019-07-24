import { Component, OnInit, Input } from '@angular/core';

import { Status } from '../../constants/status';
import { Card, CardStatus } from '../../model/card.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input() session: Session;

  @Input() player: Player;

  @Input() types: Types[];

  @Input() accusing: boolean = false;

  Status = Status;

  constructor() { }

  ngOnInit() {
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
}