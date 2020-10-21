import { AddToHistoryAction } from './actions';
import { ADD_TO_HISTORY } from './actionTypes';

interface ISavedSlug {
  slug: string;
  timestamp: Date;
}

export interface IHistoryState {
  savedSlugs: ISavedSlug[];
}

const initialState: IHistoryState = {
  savedSlugs: [],
};

const historyReducer = (state = initialState, action: AddToHistoryAction) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return { savedSlugs: [{ slug: action.payload.slug, timestamp: new Date() }, ...state.savedSlugs] };
    default:
      return state;
  }
};

export default historyReducer;
