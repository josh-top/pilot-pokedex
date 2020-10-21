import { ISetDarkModeAction } from './actions';
import { SET_DARK_MODE } from './actionTypes';

export interface ISettingsState {
  darkMode: boolean;
}

const initialState: ISettingsState = {
  darkMode: true,
};

const pokemonReducer = (state = initialState, action: ISetDarkModeAction): ISettingsState => {
  switch (action.type) {
    case SET_DARK_MODE:
      return { ...state, darkMode: action.payload.darkMode };
    default:
      return state;
  }
};

export default pokemonReducer;
