import { SET_DARK_MODE } from './actionTypes';

export interface ISetDarkModeAction {
  type: typeof SET_DARK_MODE;
  payload: {
    darkMode: boolean;
  };
}

export const setDarkMode = (payload: { darkMode: boolean }) => {
  return { type: SET_DARK_MODE, payload };
};
