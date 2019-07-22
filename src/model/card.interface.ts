export interface Card
{
  id? : number;

  name : string;

  description : string;

  image : string;

  type : number;

  frozen : boolean;

  status : CardStatus[];
}

export interface CardStatus
{
  player : string;

  status : number;

  frozen : boolean;
}
