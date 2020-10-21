import { addToHistory } from './../../History/redux/actions';
import {
  fetchPokemonSucceeded,
  fetchPokemonFailed,
  FetchPokemonRequestedAction,
  FetchEvolutionChainRequestedAction,
  fetchEvolutionChainSucceeded,
  fetchEvolutionChainFailed,
  setPokemonSpeciesData,
  setPokemonLocationData,
} from './actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAPI, BASE_URL } from './../../../utils/api';
import { FETCH_POKEMON_LIST_REQUESTED, FETCH_EVOLUTION_CHAIN_REQUESTED } from './actionTypes';

function* fetchPokemon(action: FetchPokemonRequestedAction) {
  try {
    const { data } = yield call(fetchAPI, `${BASE_URL}/pokemon/${action.payload.slug}`);
    if (data) {
      yield put(fetchPokemonSucceeded({ pokemon: data }));
      if (action.payload.saveToHistory) {
        yield put(addToHistory({ slug: action.payload.slug }));
      }
      // load species data
      if (data?.species?.url) {
        const species = yield call(fetchAPI, data.species.url);
        yield put(setPokemonSpeciesData({ speciesData: species.data }));
      }

      // load location_area_encounters
      if (data?.location_area_encounters) {
        const locationEncounters = yield call(fetchAPI, data.location_area_encounters);

        const locationAreas = yield all(
          locationEncounters.data.map((locationArea: { location_area: { url: string } }) =>
            call(fetchAPI, locationArea.location_area.url)
          )
        );

        const locations = locationAreas.map(
          (locationArea: { data: { location: { name: string } } }) => locationArea.data.location.name
        );

        yield put(
          setPokemonLocationData({
            locations: locations.filter((location: string, index: number) => locations.indexOf(location) === index), // set unique locations
          })
        );
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(fetchPokemonFailed({ error: 'Something Went Wrong! Data Not Found' }));
  }
}

function* fetchEvolutionChain(action: FetchEvolutionChainRequestedAction) {
  try {
    const { data } = yield call(fetchAPI, action.payload.url);
    if (data) {
      yield put(fetchEvolutionChainSucceeded({ evolutionChain: data }));
    }
  } catch (err) {
    yield put(fetchEvolutionChainFailed({ error: 'Something Went Wrong! Data Not Found' }));
  }
}

export default function* pokemonSaga() {
  yield takeLatest(FETCH_POKEMON_LIST_REQUESTED, fetchPokemon);
  yield takeLatest(FETCH_EVOLUTION_CHAIN_REQUESTED, fetchEvolutionChain);
}
