import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './reducer';

export const FAVORITE_FEATURE = 'favorite';
export const selectFavoriteState = createFeatureSelector<FavoriteState>(FAVORITE_FEATURE);

export const selectIsFavorite = (id: number) =>
  createSelector(selectFavoriteState, s => !!s.ids[id]);

export const selectIsLoading = (id: number) =>
  createSelector(selectFavoriteState, s => !!s.loading[id]);

