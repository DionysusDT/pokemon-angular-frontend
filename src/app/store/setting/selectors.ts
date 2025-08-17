import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingState } from './reducer';

export const selectSettingsState = createFeatureSelector<SettingState>('setting');

export const selectPokemonConfig   = createSelector(selectSettingsState, s => s.pokemon);
export const selectTypes           = createSelector(selectPokemonConfig, c => c?.types ?? []);
export const selectSpeedRanges     = createSelector(selectPokemonConfig, c => c?.speedRanges ?? []);
export const selectSettingsLoading = createSelector(selectSettingsState, s => s.loading);
