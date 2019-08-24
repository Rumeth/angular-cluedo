import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  limit: number = 1024 * 3;

  constructor() { }

  storeProgress(key, value): void {
    localStorage.setItem(key, JSON.stringify(value));

    if (key === 'history') {
      this.trimHistory();
    }
  }

  trimHistory() {
    if (localStorage.getItem('history')) {
      const usedSpace: number = (localStorage.getItem('history').length * 16) / (8 * 1024);

      if (usedSpace > this.limit) {
        const history = JSON.parse(localStorage.getItem('history'));

        history.shift();

        this.storeProgress('history', history);
      }
    }
  }
}