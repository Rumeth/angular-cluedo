import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';

@Injectable()
export class PlayerService {
  public resetSubject: Subject<void> = new Subject<void>();

  private session: Session;

  private player: Player;

  private pieces: Types[];

  constructor(private httpClient: HttpClient) {
  }

  getPieces(): Observable<Types[]> {
    if (this.pieces) {
      return of(this.pieces);
    } else {
      return this.httpClient.get<Types[]>('../assets/mocks/pieces.json')
        .pipe(tap((pieces: Types[]) => {
          this.pieces = pieces;
        }));
    }
  }

  getSession(): Observable<Session> {
    if (this.session) {
      return of(this.session);
    } else {
      return this.httpClient.get<Session>('../assets/mocks/lounge-status.json')
        .pipe(tap((session: Session) => {
          this.session = session;
        }));
    }
  }

  getPlayer(): Observable<Player> {
    if (this.player) {
      return of(this.player);
    } else {
      return this.httpClient.get<Player>('../assets/mocks/player-status.json')
        .pipe(tap((player: Player) => {
          this.player = player;
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

  reset() {
    this.resetSubject.next();
  }
}