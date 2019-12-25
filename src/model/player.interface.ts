import { Card } from './card.interface';

export interface Player
{
    name : string;

    hash : string;

    character? : Card;

    hand? : Card[];

    accusal? : Card[];

    disabled? : boolean;
}
