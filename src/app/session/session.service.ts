import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { History } from '../../model/history.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';
import { Card, CardStatus } from '../../model/card.interface';

import { StorageService } from '../../services/storage.service';

@Injectable()
export class SessionService {
  private session: Session;

  private player: Player;

  private pieces: Types[];

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getPieces(): Observable<Types[]> {
    if (this.pieces) {
      return of(JSON.parse(JSON.stringify(this.pieces)));
    } else {
      return this.httpClient.get<Types[]>('../assets/mocks/pieces.json')
        .pipe(tap((pieces: Types[]) => {
          this.pieces = JSON.parse(JSON.stringify(pieces));
        }));
    }
  }

  getSession(): Observable<Session> {
    if (this.session) {
      return of(JSON.parse(JSON.stringify(this.session)));
    } else {
      return this.httpClient.get<Session>('../assets/mocks/lounge-status.json')
        .pipe(tap((session: Session) => {
          this.session = JSON.parse(JSON.stringify(session));
        }));
    }
  }

  getPlayer(): Observable<Player> {
    if (this.player) {
      return of(JSON.parse(JSON.stringify(this.player)));
    } else {
      return this.httpClient.get<Player>('../assets/mocks/player-status.json')
        .pipe(tap((player: Player) => {
          this.player = JSON.parse(JSON.stringify(player));
        }));
    }
  }

  shuffle(array: any[]): any[] {
    let currentIndex: number = array.length;

    let temporaryValue: any;

    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  storeProgress(key, value): void {
    this.storageService.storeProgress(key, value);
  }
}