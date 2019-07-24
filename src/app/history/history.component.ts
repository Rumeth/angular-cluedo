import { Component, OnInit } from '@angular/core';

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

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.historyService.getHistory()
      .subscribe((history: History[]) => {
        this.history = history;

        this.loading = false;
      });
  }
}