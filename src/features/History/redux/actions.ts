import { ADD_TO_HISTORY } from './actionTypes';

export interface AddToHistoryAction {
  type: typeof ADD_TO_HISTORY;
  payload: {
    slug: string;
  };
}

export const addToHistory = (payload: { slug: string }) => {
  return { type: ADD_TO_HISTORY, payload };
};
