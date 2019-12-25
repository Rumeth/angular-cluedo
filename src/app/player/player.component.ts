import { Component , OnDestroy , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Status } from '../../constants/status';

import { Card , CardStatus } from '../../model/card.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';

import { PlayerService } from './player.service';

@Component ( {
                 selector    : 'app-player' ,
                 templateUrl : './player.component.html' ,
                 styleUrls   : [ './player.component.css' ]
             } )
export class PlayerComponent implements OnInit , OnDestroy
{
    loading : boolean = true;

    session : Session;

    player : Player;

    types : Types[];

    Status = Status;

    started : boolean = false;

    accusing : boolean = false;

    resetSubject;

    constructor ( private playerService : PlayerService , private router : Router )
    {
    }

    ngOnInit () : void
    {
        if ( localStorage.getItem ( 'started' ) )
        {
            this.started = JSON.parse ( localStorage.getItem ( 'started' ) );
        }

        if ( this.started )
        {
            this.resetSubject = this.playerService.resetSubject.subscribe ( () =>
                                                                            {
                                                                                this.confirmRestart ();
                                                                            } );

            this.getSession ();
        }
        else
        {
            this.redirectToSession ();
        }
    }

    ngOnDestroy () : void
    {
        if ( this.resetSubject )
        {
            this.resetSubject.unsubscribe ();
        }
    }

    getSession () : void
    {
        if ( localStorage.getItem ( 'session' ) )
        {
            this.session = JSON.parse ( localStorage.getItem ( 'session' ) );

            this.getPlayer ();
        }
        else
        {
            this.redirectToSession ();
        }
    }

    getPlayer () : void
    {
        if ( localStorage.getItem ( 'player' ) )
        {
            this.player = JSON.parse ( localStorage.getItem ( 'player' ) );

            this.getPieces ();
        }
        else
        {
            this.redirectToSession ();
        }
    }

    getPieces () : void
    {
        if ( localStorage.getItem ( 'types' ) )
        {
            this.types = JSON.parse ( localStorage.getItem ( 'types' ) );

            this.loading = false;
        }
        else
        {
            this.redirectToSession ();
        }
    }

    clearSession () : void
    {
        localStorage.removeItem ( 'session' );
        localStorage.removeItem ( 'player' );
        localStorage.removeItem ( 'types' );
        localStorage.removeItem ( 'started' );
    }

    confirmRestart () : void
    {
        if ( this.started )
        {
            if ( window.confirm ( 'Are you sure you want to clear everything?' ) )
            {
                this.restartSession ();
            }
        }
        else
        {
            this.restartSession ();
        }
    }

    restartSession () : void
    {
        if ( this.session.endedOn === '' )
        {
            this.session.endedOn = new Date ();
        }

        if ( this.started )
        {
            this.playerService.freezeAll ( this.types );

            this.updateHistory ();
        }

        this.clearSession ();

        this.started = false;

        this.loading = true;

        this.redirectToSession ();
    }

    startAccusal ()
    {
        this.accusing = true;
    }

    toggleStatus ( toggle : { cardStatus : CardStatus, piece : Card } ) : void
    {
        if ( !toggle.cardStatus.disabled && !toggle.cardStatus.frozen && !this.accusing )
        {
            const status : number[] = Object.values ( Status )
                                            .filter ( ( value : number ) => !isNaN ( value ) );

            let index : number = status.indexOf ( toggle.cardStatus.status );

            if ( index > -1 )
            {
                index++;

                if ( index >= status.length )
                {
                    index = 0;
                }

                toggle.cardStatus.status = status[ index ];
            }

            if ( toggle.cardStatus.status === Status.YES )
            {
                this.playerService.freezePiece ( toggle.piece , this.types );
            }
            else
            {
                this.playerService.unfreezePiece ( toggle.piece , this.types );
            }
        }
    }

    accusePiece ( accuse : { piece : Card, pieces : Card[] } ) : void
    {
        if ( this.accusing && !accuse.piece.frozen )
        {
            for ( const currentPiece of accuse.pieces )
            {
                currentPiece.accused = currentPiece.id === accuse.piece.id;
            }

            const accusal = [];

            for ( const pieceType of this.types )
            {
                for ( const currentPiece of pieceType.pieces )
                {
                    if ( currentPiece.accused )
                    {
                        accusal.push ( currentPiece );
                    }
                }
            }

            this.player.accusal = accusal;
        }
    }

    confirmAccusal () : void
    {
        if ( window.confirm ( 'Are you sure you want to accuse?' ) )
        {
            this.playerService.freezeAll ( this.types );

            this.accusing = false;

            this.session.endedOn = new Date ();

            this.playerService.storeProgress ( 'session' , this.session );

            this.playerService.storeProgress ( 'types' , this.types );

            this.playerService.storeProgress ( 'player' , this.player );
        }
    }

    cancelAccusal () : void
    {
        for ( const pieceType of this.types )
        {
            for ( const currentPiece of pieceType.pieces )
            {
                currentPiece.accused = false;
            }
        }

        this.player.accusal = [];

        this.accusing = false;
    }

    updateHistory () : void
    {
        this.playerService.updateHistory ( this.session , this.player , this.types );
    }

    redirectToSession ()
    {
        this.router.navigate ( [ 'session' ] );
    }
}
