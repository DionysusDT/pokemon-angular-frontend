import { createAction, props } from '@ngrx/store';

export type LayoutType = 'main' | 'empty';

export const setLayout = createAction(
  '[Layout] Set Layout',
  props<{ layout: LayoutType }>(),
);
