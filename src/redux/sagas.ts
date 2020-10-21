import { all } from 'redux-saga/effects';
import pokemonSaga from '../features/Pokemon/redux/sagas';

function* rootSaga() {
  yield all([pokemonSaga()]);
}

export default rootSaga;
