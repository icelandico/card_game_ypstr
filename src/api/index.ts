import {fetchData} from "./fetchData";

const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

export interface IFetchInitDeck {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}

export interface IApiResponse<T> {
  data: T,
  error?: Error,
  success?: boolean;
}

export const fetchInitShuffleDeck = async () => {
  return await fetchData(`${BASE_API_URL}/new/shuffle/?deck_count=1`);
}

export const fetchDrawACard = async (deckId: string, cardsToDraw = 1) => {
  return await fetchData(`${BASE_API_URL}/${deckId}/draw/?count=${cardsToDraw}`);
}
