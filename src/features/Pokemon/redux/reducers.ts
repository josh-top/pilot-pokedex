import { PokemonActions } from './actions';
import {
  FETCH_POKEMON_LIST_REQUESTED,
  FETCH_POKEMON_LIST_SUCCEEDED,
  FETCH_POKEMON_LIST_FAILED,
  FETCH_EVOLUTION_CHAIN_REQUESTED,
  FETCH_EVOLUTION_CHAIN_SUCCEEDED,
  FETCH_EVOLUTION_CHAIN_FAILED,
  SET_POKEMON_SPECIES_DATA,
  SET_POKEMON_LOCATION_DATA,
} from './actionTypes';
import { IPokemon, IEvolutionChain } from './../pokemonDto';

export interface IPokemonState {
  loading: boolean;
  loadingSpecies: boolean;
  loadingLocations: boolean;
  loadingEvolutionChain: boolean;
  error: string | null;
  pokemon: IPokemon | null;
  evolutionChain: IEvolutionChain | null;
}

const initialState: IPokemonState = {
  loading: false,
  loadingSpecies: false,
  loadingLocations: false,
  loadingEvolutionChain: false,
  error: null,
  pokemon: null,
  evolutionChain: null,
};

const pokemonReducer = (state = initialState, action: PokemonActions) => {
  switch (action.type) {
    case FETCH_POKEMON_LIST_REQUESTED:
      return { ...state, loading: true, loadingSpecies: true, loadingLocations: true };
    case FETCH_POKEMON_LIST_SUCCEEDED:
      const { pokemon } = action.payload;
      return { ...state, loading: false, error: null, pokemon };
    case FETCH_POKEMON_LIST_FAILED:
      const { error } = action.payload;
      return { ...state, pokemon: null, loading: false, error };
    case FETCH_EVOLUTION_CHAIN_REQUESTED:
      return { ...state, loadingEvolutionChain: true };
    case FETCH_EVOLUTION_CHAIN_SUCCEEDED:
      const { evolutionChain } = action.payload;
      return { ...state, loadingEvolutionChain: false, error: null, evolutionChain };
    case FETCH_EVOLUTION_CHAIN_FAILED:
      return { ...state, pokemon: null, loadingEvolutionChain: false, error: action.payload.error };
    case SET_POKEMON_SPECIES_DATA:
      if (!state.pokemon) {
        return state;
      }
      const { speciesData } = action.payload;
      return { ...state, loadingSpecies: false, pokemon: { ...state.pokemon, speciesData } };
    case SET_POKEMON_LOCATION_DATA:
      if (!state.pokemon) {
        return state;
      }
      const { locations } = action.payload;
      return { ...state, loadingLocations: false, pokemon: { ...state.pokemon, locations } };
    default:
      return state;
  }
};

export default pokemonReducer;
