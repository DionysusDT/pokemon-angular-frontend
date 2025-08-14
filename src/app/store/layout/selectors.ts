import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './reducer';

export const selectedLayout = createFeatureSelector<LayoutState>('layout');
export const selectLayout = createSelector(selectedLayout, s => s.layout);
