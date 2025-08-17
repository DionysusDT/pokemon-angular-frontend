import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PokemonConfig } from '../../modules/common/service/settings/setting.types';

export const SettingActions = createActionGroup({
  source: 'Setting',
  events: {
    'Load Pokemon Config Requested': emptyProps(),
    'Load Pokemon Config Succeeded': props<{ config: PokemonConfig }>(),
    'Load Pokemon Config Failed': props<{ error: any }>(),
  },
});
