import { Player } from './player.interface';

export interface Session
{
    isActive? : boolean;

    createdOn? : string | Date;

    createdBy? : string;

    startedOn? : string | Date;

    endedOn? : string | Date;

    wonBy? : string;

    players? : Player[];

    hash? : string;

    player? : Player;
}
