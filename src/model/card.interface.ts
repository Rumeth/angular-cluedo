export interface Card {
  id?: number;

  name: string;

  description: string;

  image: string;

  type: number;

  accused?: boolean;

  frozen: boolean;

  status: CardStatus[];
}

export interface CardStatus {
  player: string;

  status: number;

  frozen: boolean;
}
