import { createReducer, on } from '@ngrx/store';
import { PokemonConfig } from '../../modules/common/service/settings/setting.types';
import { SettingActions } from './action';

export interface SettingState {
  pokemon?: PokemonConfig;
  loading: boolean;
  error?: any;
}
export const initialState: SettingState = { loading: false };

export const settingReducer = createReducer(
  initialState,
  on(SettingActions.loadPokemonConfigRequested, (s) => ({ ...s, loading: true, error: undefined })),
  on(SettingActions.loadPokemonConfigSucceeded, (s, { config }) => ({ ...s, loading: false, pokemon: config })),
  on(SettingActions.loadPokemonConfigFailed, (s, { error }) => ({ ...s, loading: false, error }))
);
