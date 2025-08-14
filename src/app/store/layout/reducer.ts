import { createReducer, on } from '@ngrx/store';
import { LayoutType, setLayout } from './action';

export interface LayoutState { layout: LayoutType; }
export const initialLayout: LayoutState = { layout: 'main' };

export const layoutReducer = createReducer(
  initialLayout,
  on(setLayout, (s, { layout }) => ({ ...s, layout })),
);
