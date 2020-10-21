import {
  SET_POKEMON_SPECIES_DATA,
  SET_POKEMON_LOCATION_DATA,
  FETCH_POKEMON_LIST_REQUESTED,
  FETCH_POKEMON_LIST_SUCCEEDED,
  FETCH_POKEMON_LIST_FAILED,
  FETCH_EVOLUTION_CHAIN_REQUESTED,
  FETCH_EVOLUTION_CHAIN_SUCCEEDED,
  FETCH_EVOLUTION_CHAIN_FAILED,
} from './actionTypes';
import { IPokemon, IPokemonSpecies, IEvolutionChain } from './../pokemonDto';

export interface FetchPokemonRequestedAction {
  type: typeof FETCH_POKEMON_LIST_REQUESTED;
  payload: {
    slug: string;
    saveToHistory: boolean;
  };
}

export interface FetchPokemonSucceededAction {
  type: typeof FETCH_POKEMON_LIST_SUCCEEDED;
  payload: {
    pokemon: IPokemon;
  };
}

export interface FetchPokemonFailedAction {
  type: typeof FETCH_POKEMON_LIST_FAILED;
  payload: {
    error: string;
  };
}

export interface FetchEvolutionChainRequestedAction {
  type: typeof FETCH_EVOLUTION_CHAIN_REQUESTED;
  payload: {
    url: string;
  };
}

export interface FetchEvolutionChainSucceededAction {
  type: typeof FETCH_EVOLUTION_CHAIN_SUCCEEDED;
  payload: {
    evolutionChain: IEvolutionChain;
  };
}

export interface FetchEvolutionChainFailedAction {
  type: typeof FETCH_EVOLUTION_CHAIN_FAILED;
  payload: {
    error: string;
  };
}

export interface SetPokemonDataAction {
  type: typeof SET_POKEMON_SPECIES_DATA;
  payload: {
    speciesData: IPokemonSpecies;
  };
}

export interface SetPokemonLocationDataAction {
  type: typeof SET_POKEMON_LOCATION_DATA;
  payload: {
    locations: string[];
  };
}

export const fetchPokemonRequested = (payload: {
  slug: string;
  saveToHistory: boolean;
}): FetchPokemonRequestedAction => {
  return { type: FETCH_POKEMON_LIST_REQUESTED, payload };
};

export const fetchPokemonSucceeded = (payload: { pokemon: IPokemon }): FetchPokemonSucceededAction => {
  return { type: FETCH_POKEMON_LIST_SUCCEEDED, payload };
};

export const fetchPokemonFailed = (payload: { error: string }): FetchPokemonFailedAction => {
  return { type: FETCH_POKEMON_LIST_FAILED, payload };
};

export const fetchEvolutionChainRequested = (payload: { url: string }): FetchEvolutionChainRequestedAction => {
  return { type: FETCH_EVOLUTION_CHAIN_REQUESTED, payload };
};

export const fetchEvolutionChainSucceeded = (payload: {
  evolutionChain: IEvolutionChain;
}): FetchEvolutionChainSucceededAction => {
  return { type: FETCH_EVOLUTION_CHAIN_SUCCEEDED, payload };
};

export const fetchEvolutionChainFailed = (payload: { error: string }): FetchEvolutionChainFailedAction => {
  return { type: FETCH_EVOLUTION_CHAIN_FAILED, payload };
};

export const setPokemonSpeciesData = (payload: { speciesData: IPokemonSpecies }) => {
  return { type: SET_POKEMON_SPECIES_DATA, payload };
};

export const setPokemonLocationData = (payload: { locations: string[] }) => {
  return { type: SET_POKEMON_LOCATION_DATA, payload };
};

export type PokemonActions =
  | FetchPokemonRequestedAction
  | FetchPokemonSucceededAction
  | FetchPokemonFailedAction
  | FetchEvolutionChainRequestedAction
  | FetchEvolutionChainSucceededAction
  | FetchEvolutionChainFailedAction
  | SetPokemonDataAction
  | SetPokemonLocationDataAction;
