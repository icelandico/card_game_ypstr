interface ICard {
  suit: CardSuits;
  value: string;
}

export enum CardSuits {
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export const compareCards = (card1: ICard, card2: ICard) => {
  const rankValues = {
    ACE: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 10, JACK: 11, QUEEN: 12, KING: 13
  };

  const suitValues = {
    SPADES: 4, DIAMONDS: 3, CLUBS: 2, HEARTS: 1
  };

  const rankComparison = rankValues[card1.value] - rankValues[card2.value];

  if (rankComparison === 0) {
    return suitValues[card1.suit] - suitValues[card2.suit];
  }

  return rankComparison;
}
