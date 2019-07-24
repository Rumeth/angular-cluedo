import { Player } from './player.interface';
import { Session } from './session.interface';
import { Types } from './types.interface';

export interface History {
  player? : Player;
  
  session? : Session;
  
  types? : Types[];
}