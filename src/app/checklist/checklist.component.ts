import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ChecklistService } from './checklist.service';
import { ImageService } from '../../services/image.service';

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

  @Output() toggle = new EventEmitter();

  @Output() accuse = new EventEmitter();

  @Output() disable = new EventEmitter();

  Status = Status;

  constructor(private checklistService: ChecklistService, private imageService: ImageService) {
  }

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
    this.toggle.emit({ cardStatus, piece });
  }

  accusePiece(piece: Card, pieces: Card[]): void {
    this.accuse.emit({ piece, pieces });
  }

  togglePlayer(player: Player): void {
    this.disable.emit(player);
  }

  getImage(image: string) {
   return this.imageService.getImage(image);
  }
}