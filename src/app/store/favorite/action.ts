import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FavoriteActions = createActionGroup({
  source: 'Favorite',
  events: {
    'Toggle Requested': props<{ id: number; next: boolean }>(),
    'Toggle Succeeded': props<{ id: number; favorite: boolean }>(),
    'Toggle Failed': props<{ id: number; prev: boolean; error: any }>(),

    'Sync One Requested': props<{ id: number }>(),
    'Sync One Succeeded': props<{ id: number; favorite: boolean }>(),
    'Sync One Failed': props<{ id: number; error: any }>(),
  },
});
