import { Injectable } from '@angular/core';

import { Status } from '../../constants/status';

import { Card, CardStatus } from '../../model/card.interface';
import { Types } from '../../model/types.interface';

@Injectable()
export class ChecklistService {
  Status = Status;

  constructor() {
  }
}