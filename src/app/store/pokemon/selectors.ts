import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './reducer';

export const POKEMON_FEATURE = 'pokemon';
const selectPokemonState = createFeatureSelector<PokemonState>(POKEMON_FEATURE);

export const selectPokemonLoading = createSelector(selectPokemonState, s => s.loading);
export const selectPokemonItems   = createSelector(selectPokemonState, s => s.items);
export const selectPokemonTotal   = createSelector(selectPokemonState, s => s.total);

export const selectHomeTop10  = createSelector(selectPokemonState, s => s.homeTop10);
export const selectHomeSlides = createSelector(selectPokemonState, s => s.homeSlides);
