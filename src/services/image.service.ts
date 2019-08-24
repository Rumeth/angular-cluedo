import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Card } from '../model/card.interface';

import { IMAGE } from '../constants/image';

import { SanitizerPipe } from '../pipe/sanitizer';

@Injectable()
export class ImageService {
  images = {};

  observables = {};

  constructor(private httpClient: HttpClient, private sanitizerPipe: SanitizerPipe) {
  }

  getImage(image: string): string {
    if (!this.images[image]) {
      if (localStorage.getItem(image)) {
        this.images[image] = this.sanitizerPipe.transform(localStorage.getItem(image));
      }
      else {
        this.images[image] = this.sanitizerPipe.transform(IMAGE);

        this.httpClient.get<any>(`../assets/images/${image}.json`)
          .subscribe((card: any) => {
            this.images[image] = this.sanitizerPipe.transform(card.image);

            localStorage.setItem(image, card.image);
          });
      }
    }

    return this.images[image];
  }
}