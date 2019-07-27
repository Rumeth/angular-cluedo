import { Injectable } from '@angular/core';

import { Status } from '../../constants/status';

import { Card, CardStatus } from '../../model/card.interface';
import { Types } from '../../model/types.interface';

@Injectable()
export class ChecklistService {
  Status = Status;

  constructor() {
  }

  storeProgress(types: Types[]): void {
    localStorage.setItem('types', JSON.stringify(types));
  }

  freezePiece(piece: Card, types: Types[]): void {
    for (const cardStatus of piece.status) {
      if (cardStatus.status !== Status.YES) {
        cardStatus.frozen = true;
      }
    }

    piece.frozen = true;

    this.storeProgress(types);
  }

  unfreezePiece(piece: Card, types: Types[]): void {
    for (const cardStatus of piece.status) {
      cardStatus.frozen = false;
    }

    piece.frozen = false;

    this.storeProgress(types);
  }
}