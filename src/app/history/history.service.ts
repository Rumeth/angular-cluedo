import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { History } from '../../model/history.interface';

@Injectable ()
export class HistoryService
{
    constructor ( private httpClient : HttpClient )
    {
    }

    getHistory () : Observable<History[]>
    {
        let history : History[] = [];

        if ( localStorage.getItem ( 'history' ) )
        {
            history = JSON.parse ( localStorage.getItem ( 'history' ) );
        }

        return of ( history );
    }
}
