import { combineReducers } from 'redux';
import historyReducer from '../features/History/redux/reducers';
import pokemonReducer from '../features/Pokemon/redux/reducers';
import settingsReducer from '../features/Settings/redux/reducers';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  settings: settingsReducer,
  history: historyReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
