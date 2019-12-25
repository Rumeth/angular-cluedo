import { Injectable } from '@angular/core';

import { Status } from '../../constants/status';

@Injectable ()
export class ChecklistService
{
    Status = Status;

    constructor ()
    {
    }
}
