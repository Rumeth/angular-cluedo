import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  session = {
    "hash": "SessionHash",
    "isActive": true,
    "createdOn": "2019-06-16T06:25:33.883Z",
    "createdBy": "Player1Hash",
    "startedOn": "",
    "endedOn": "",
    "wonBy": "Player1Hash",
    "players": [
      {
        "name": "Player 1",
        "hash": "Player1Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/ColMustard.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ]
      },
      {
        "name": "Player 2",
        "hash": "Player2Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/MrsWhite.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": []
      },
      {
        "name": "Player 3",
        "hash": "Player3Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/MsScarlett.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ]
      },
      {
        "name": "Player 4",
        "hash": "Player4Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/RevGreen.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ]
      },
      {
        "name": "Player 5",
        "hash": "Player5Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/MsPeacock.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": []
      },
      {
        "name": "Player 6",
        "hash": "Player6Hash",
        "character": {
          "name": "",
          "description": "",
          "image": "Suspects/ProfPlum.png"
        },
        "hand": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ],
        "accusal": [
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          },
          {
            "name": "",
            "description": "",
            "image": "",
            "type": 1
          }
        ]
      }
    ]
  };

  player = {
    "name": "Player 1",
    "hash": "Player1Hash",
    "character": {
      "id": 2,
      "name": "Colonel Mustard",
      "description": "A stock great white hunter and colonial imperialist, he is usually a dignified, dapper and dangerous military man. Originally Colonel Yellow, his name was changed before the game's first edition. He rolls second. Age 31.",
      "image": "Suspects/ColMustard.png",
      "type": 1
    },
    "hand": []
  }


  types = [
    {
      "id": 1,
      "name": "Suspects",
      "pieces": [
        {
          "id": 1,
          "name": "Miss Scarlett",
          "description": "A stock femme fatale, she is typically portrayed as young, cunning and attractive. Known as Miss Scarlet in North America after 1963, she rolls first in the game. Age 25.",
          "image": "Suspects/MsScarlett.png",
          "type": 1
        },
        {
          "id": 2,
          "name": "Col. Mustard",
          "description": "A stock great white hunter and colonial imperialist, he is usually a dignified, dapper and dangerous military man. Originally Colonel Yellow, his name was changed before the game's first edition. He rolls second. Age 31.",
          "image": "Suspects/ColMustard.png",
          "type": 1
        },
        {
          "id": 3,
          "name": "Mrs. White",
          "description": "Usually a frazzled servant, Mrs. White appeared in the film as a resident guest. Originally Nurse White and changed before publication of the first edition, she rolls third in the game. Age 62.",
          "image": "Suspects/MrsWhite.png",
          "type": 1
        },
        {
          "id": 4,
          "name": "Rev. Green",
          "description": "Originally patented as \"the Rev. Mr. Green\" in Britain, Reverend Green is a hypocritical Anglican priest who wavers when the subject is murder. In North America he is Mr. Green, who has taken money-oriented roles from mobster to businessman. Parker Brothers insisted on the name change, believing that the American public would object to a parson as a murder suspect.[1] In some later UK versions of the game, he was also renamed Mr. Green. He rolls fourth. Age 53.",
          "image": "Suspects/RevGreen.png",
          "type": 1
        },
        {
          "id": 5,
          "name": "Ms. Peacock",
          "description": "A grande dame, an elderly, still-attractive woman who nearly always maintains her dignity and rolls fifth in the game. Age 45.",
          "image": "Suspects/MsPeacock.png",
          "type": 1
        },
        {
          "id": 6,
          "name": "Prof. Plum",
          "description": "A quick-witted, young (or middle-aged) professor with a bow tie and glasses, he rolls last in the game. Age 37.",
          "image": "Suspects/ProfPlum.png",
          "type": 1
        }
      ]
    },
    {
      "id": 2,
      "name": "Weapons",
      "pieces": [
        {
          "id": 7,
          "name": "Candlestick",
          "description": null,
          "image": "Weapons/Candlestick.png",
          "type": 2
        },
        {
          "id": 8,
          "name": "Ice Pick",
          "description": null,
          "image": "Weapons/IcePick.png",
          "type": 2
        },
        {
          "id": 9,
          "name": "Poison",
          "description": null,
          "image": "Weapons/Poison.png",
          "type": 2
        },
        {
          "id": 10,
          "name": "Poker",
          "description": null,
          "image": "Weapons/Poker.png",
          "type": 2
        },
        {
          "id": 11,
          "name": "Revolver",
          "description": null,
          "image": "Weapons/Revolver.png",
          "type": 2
        },
        {
          "id": 12,
          "name": "Shears",
          "description": null,
          "image": "Weapons/Shears.png",
          "type": 2
        }
      ]
    },
    {
      "id": 3,
      "name": "Rooms",
      "pieces": [
        {
          "id": 13,
          "name": "Bedroom",
          "description": null,
          "image": "Rooms/Bedroom.png",
          "type": 3
        },
        {
          "id": 14,
          "name": "Billiards",
          "description": null,
          "image": "Rooms/Billiards.png",
          "type": 3
        },
        {
          "id": 15,
          "name": "Conservatory",
          "description": null,
          "image": "Rooms/Conservatory.png",
          "type": 3
        },
        {
          "id": 16,
          "name": "Kitchen",
          "description": null,
          "image": "Rooms/Kitchen.png",
          "type": 3
        },
        {
          "id": 17,
          "name": "Library",
          "description": null,
          "image": "Rooms/Library.png",
          "type": 3
        },
        {
          "id": 18,
          "name": "Lounge",
          "description": null,
          "image": "Rooms/Lounge.png",
          "type": 3
        },
        {
          "id": 19,
          "name": "Stairs",
          "description": null,
          "image": "Rooms/Stairs.png",
          "type": 3
        },
        {
          "id": 20,
          "name": "Studio",
          "description": null,
          "image": "Rooms/Studio.png",
          "type": 3
        },
        {
          "id": 21,
          "name": "Trophy Hall",
          "description": null,
          "image": "Rooms/TrophyHall.png",
          "type": 3
        }
      ]
    }
  ];

  Status = Status;

  imagePath: string='';

  constructor() {
  }

  ngOnInit(): void {
    this.session.players = this.shuffle(this.session.players);

    this.getPieces();
  }

  getPieces(): void {
        const shuffledTypes =this.shuffle(this.types);

        const playerHand: number[] = [];

        for (const hand of this.player.hand) {
          playerHand.push(hand.id);
        }

        for (const type of shuffledTypes) {
          type.pieces =this.shuffle(type.pieces);

          type.pieces.map((piece) => {
            piece.status = [];

            piece.frozen = false;

            for (const player of this.session.players) {
              const cardStatus = {
                player: player.hash,
                status: Status.EMPTY,
                frozen: false
              };

              if (playerHand.indexOf(piece.id) > -1) {
                cardStatus.status = Status.NO;
                cardStatus.frozen = true;

                piece.frozen = true;

                if (player.hash === this.player.hash) {
                  cardStatus.status = Status.YES;
                }
              }

              piece.status.push(cardStatus);
            }
          });
        }

        this.types = shuffledTypes;
  }

  toggleStatus(cardStatus, piece): void {
    if (!cardStatus.frozen) {
      const status: number[] = Object.values(Status)
        .filter((value: number) => !isNaN(value));

      let index: number = status.indexOf(cardStatus.status);

      if (index > -1) {
        index++;

        if (index >= status.length) {
          index = 0;
        }

        cardStatus.status = status[index];
      }

      if (cardStatus.status === Status.YES) {
        this.freezePiece(piece);
      }
      else {
        this.unfreezePiece(piece);
      }
    }
  }

  freezePiece(piece): void {
    for (const cardStatus of piece.status) {
      if (cardStatus.status !== Status.YES) {
        cardStatus.frozen = true;
      }
    }

    piece.frozen = true;
  }

  unfreezePiece(piece): void {
    for (const cardStatus of piece.status) {
      cardStatus.frozen = false;
    }

    piece.frozen = false;
  }

  getStatusIcon(cardStatus): string {
    const styles: string[] = [];

    switch (cardStatus.status) {
      case Status.YES:
        styles.push('fa-check');
        styles.push('text-success');
        break;
      case Status.NO:
        styles.push('fa-times');
        styles.push('text-danger');
        break;
      case Status.DOUBT:
        styles.push('fa-question');
        styles.push('text-warning');
        break;
      default:
    }

    return styles.join(' ');
  }

  getPieceStatus(piece): string {
    const styles: string[] = [];

    const existingIndex: number = piece.status.findIndex((cardStatus) => {
      return cardStatus.status === Status.YES;
    });

    if (existingIndex > -1) {
      styles.push('text-success');
      styles.push('line-through');
    }

    const shortlisted: number = piece.status.reduce((total: number, cardStatus) => {
      if (cardStatus.status === Status.NO) {
        return total + 1;
      }

      return total;
    }, 0);

    if (shortlisted === piece.status.length) {
      styles.push('text-danger');
    }

    return styles.join(' ');
  }

   shuffle ( array : any[] ) : any[]
  {
    let currentIndex : number = array.length;

    let temporaryValue : any;

    let randomIndex : number;

    // While there remain elements to shuffle...
    while ( currentIndex !== 0 )
    {

      // Pick a remaining element...
      randomIndex = Math.floor ( Math.random () * currentIndex );

      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }

    return array;
  }
}


export enum Status
{
  EMPTY , NO , DOUBT , YES
}