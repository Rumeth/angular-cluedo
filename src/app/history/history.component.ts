import { DatePipe } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { History } from '../../model/history.interface';
import { Player } from '../../model/player.interface';
import { Session } from '../../model/session.interface';
import { Types } from '../../model/types.interface';

import { HistoryService } from './history.service';

@Component ( {
                 selector : 'app-history' ,
                 templateUrl : './history.component.html' ,
                 styleUrls : [ './history.component.css' ]
             } )
export class HistoryComponent implements OnInit
{
    loading : boolean = true;

    showSession : boolean = false;

    session : Session;

    player : Player;

    types : Types[];

    history : History[] = [];

    constructor ( private historyService : HistoryService , private datePipe : DatePipe )
    {
    }

    ngOnInit ()
    {
        this.getHistory ();
    }

    getHistory ()
    {
        this.historyService.getHistory ()
            .subscribe ( ( history : History[] ) =>
                         {
                             const formattedHistory : History[] = [];

                             const dates : string[] = [];

                             for ( const currentSession of history )
                             {
                                 const currentDate = this.datePipe.transform ( currentSession.session.startedOn , 'yyyyMMdd' );

                                 if ( dates.indexOf ( currentDate ) === -1 )
                                 {
                                     dates.push ( currentDate );

                                     formattedHistory.push ( {
                                                                 ...currentSession ,
                                                                 header : true
                                                             } );
                                 }

                                 formattedHistory.push ( currentSession );
                             }

                             this.history = formattedHistory;

                             this.loading = false;
                         } );
    }

    loadSession ( history : History )
    {
        this.session = history.session;
        this.player = history.player;
        this.types = history.types;

        this.showSession = true;
    }

    hideSession ()
    {
        this.showSession = false;
    }
}
