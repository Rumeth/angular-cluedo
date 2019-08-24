import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Status } from '../../constants/status';

import { History } from '../../model/history.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';
import { Card, CardStatus } from '../../model/card.interface';

import { StorageService } from '../../services/storage.service';

@Injectable()
export class PlayerService {
  public resetSubject: Subject<void> = new Subject<void>();

  private session: Session;

  private player: Player;

  private pieces: Types[];

  Status = Status;

  constructor(private storageService: StorageService) {
  }

  reset() {
    this.resetSubject.next();
  }

  storeProgress(key, value): void {
    this.storageService.storeProgress(key, value);
  }

  freezeAll(types: Types[]) {
    for (const pieceType of types) {
      for (const piece of pieceType.pieces) {
        for (const cardStatus of piece.status) {
          //if (cardStatus.status !== Status.YES) {
          cardStatus.frozen = true;
          //}
        }

        piece.frozen = true;
      }
    }

    this.storeProgress('types', types);
  }

  freezePiece(piece: Card, types: Types[]): void {
    for (const cardStatus of piece.status) {
      if (cardStatus.status !== Status.YES) {
        cardStatus.frozen = true;
      }
    }

    piece.frozen = true;

    this.storeProgress('types', types);
  }

  unfreezePiece(piece: Card, types: Types[]): void {
    for (const cardStatus of piece.status) {
      cardStatus.frozen = false;
    }

    piece.frozen = false;

    this.storeProgress('types', types);
  }

  updateHistory(session: Session, player: Player, types: Types[]): void {
    let history: History[] = [];

    if (localStorage.getItem('history')) {
      history = JSON.parse(localStorage.getItem('history'));
    }

    history.push({ session, player, types });

    this.storeProgress('history', history);
  }
}
