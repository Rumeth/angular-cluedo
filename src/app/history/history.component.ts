import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { HistoryService } from './history.service';
import { History } from '../../model/history.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  loading: boolean = true;

  history: History[] = [];

  constructor(private historyService: HistoryService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.historyService.getHistory()
      .subscribe((history: History[]) => {
        const formattedHistory: History[] = [];

        const dates: string[] = [];

        for (const currentSession of history) {
          const currentDate = this.datePipe.transform(currentSession.session.startedOn, 'yyyyMMdd');

          if (dates.indexOf(currentDate) === -1) {
            dates.push(currentDate);

            formattedHistory.push({ ...currentSession, header: true });
          }

          formattedHistory.push(currentSession);
        }

        this.history = formattedHistory;

        this.loading = false;
      });
  }
}