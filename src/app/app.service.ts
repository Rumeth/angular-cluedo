import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player.interface';
import { Session } from '../model/session.interface';
import { Types } from '../model/types.interface';

@Injectable ( {
                  providedIn : 'root'
              } )

export class AppService
{
    constructor ( private httpClient : HttpClient )
    {
    }

    getPieces () : Observable<Types[]>
    {
        return this.httpClient.get <Types[]> ( '../mocks/pieces.json' );
    }

    getSession () : Observable<Session>
    {
        return this.httpClient.get <Session> ( '../mocks/lounge-status.json' );
    }

    getPlayer () : Observable<Player>
    {
        return this.httpClient.get <Player> ( '../mocks/player-status.json' );
    }

    shuffle ( array : any[] ) : any[]
    {
        let currentIndex : number = array.length;

        let temporaryValue : any;

        let randomIndex : number;

        // While there remain elements to shuffle...
        while ( currentIndex !== 0 )
        {

            // Pick a remaining element...
            randomIndex = Math.floor ( Math.random () * currentIndex );

            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[ currentIndex ];
            array[ currentIndex ] = array[ randomIndex ];
            array[ randomIndex ] = temporaryValue;
        }

        return array;
    }
}
