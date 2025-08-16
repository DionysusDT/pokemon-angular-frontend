import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../../modules/landing/pokemon/pokemon.types';
import { PokemonActions } from './action';

export type PokemonState = {
  items: Pokemon[];
  total: number;
  page: number;
  limit: number;

  homeTop10: Pokemon[];
  homeSlides: string[];

  loading: boolean;
  error: string | null;
};

export const initialState: PokemonState = {
  items: [],
  total: 0,
  page: 1,
  limit: 20,

  homeTop10: [],
  homeSlides: [],

  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,

  on(PokemonActions.listRequested, (s, { query }) => ({
    ...s,
    loading: true,
    error: null,
    page: query.page ?? s.page,
    limit: query.limit ?? s.limit,
  })),
  on(PokemonActions.listSucceeded, (s, { response }) => ({
    ...s,
    loading: false,
    items: response.items,
    total: response.total,
    page: response.page,
    limit: response.limit,
  })),
  on(PokemonActions.listFailed, (s, { error }) => ({ ...s, loading: false, error })),

  on(PokemonActions.importRequested, (s) => ({ ...s, loading: true, error: null })),
  on(PokemonActions.importSucceeded, (s) => ({ ...s, loading: false })),
  on(PokemonActions.importFailed, (s, { error }) => ({ ...s, loading: false, error })),

  on(PokemonActions.loadHomeTop10Requested, (s) => ({ ...s, loading: true, error: null })),
  on(PokemonActions.loadHomeTop10Succeeded, (s, { items }) => ({
    ...s,
    loading: false,
    homeTop10: items,
  })),
  on(PokemonActions.loadHomeTop10Failed, (s, { error }) => ({ ...s, loading: false, error })),

  on(PokemonActions.loadHomeSlidesRequested, (s) => ({ ...s, loading: true, error: null })),
  on(PokemonActions.loadHomeSlidesSucceeded, (s, { urls }) => ({
    ...s,
    loading: false,
    homeSlides: urls,
  })),
  on(PokemonActions.loadHomeSlidesFailed, (s, { error }) => ({ ...s, loading: false, error })),
);
