import {createContext, ReactNode, useContext, useMemo, useState} from "react";
export const DEFAULT_CARDS_NUMBER = 52;

interface IProvider {
  children: ReactNode;
}

interface IDrawCardResponse {
  code: string;
  image: string;
  images: string[];
  value: string;
  suit: string;
}

export interface ICardContext {
  isLoading: boolean;
  cardsRemaining: number;
  deckId: string;
  setDeckId: (deckId: string) => void;
  setCardsRemaining: (card: number) => void;
  setIsLoading: (state: boolean) => void;
  setScore: (score: number) => {};
  drawCardResponse?: IDrawCardResponse;
  setDrawCardResponse: (cardRes: IDrawCardResponse) => void;
  score: number;
}

const initialState: ICardContext = {
  isLoading: false,
  cardsRemaining: DEFAULT_CARDS_NUMBER,
  deckId: '',
  setDeckId: () => {},
  setCardsRemaining: () => {},
  setIsLoading: () => {},
  setDrawCardResponse: () => {},
  setScore: () => {},
  drawCardResponse: undefined,
  score: 0,
}

export const CardContext = createContext<ICardContext | undefined>(initialState);
export const useCardContext = () => useContext(CardContext);

export const Provider = ({ children }: IProvider) => {
  const [cardsRemaining, setCardsRemaining] = useState(initialState.cardsRemaining);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [deckId, setDeckId] = useState('');
  const [score, setScore] = useState(initialState.score);
  const [drawCardResponse, setDrawCardResponse] = useState(initialState.drawCardResponse);

  return (
    <CardContext.Provider value={{
      cardsRemaining,
      deckId,
      setCardsRemaining,
      setDeckId,
      isLoading,
      setIsLoading,
      drawCardResponse,
      setDrawCardResponse,
      score,
      setScore,
    }}>
      {children}
    </CardContext.Provider>
  );
}