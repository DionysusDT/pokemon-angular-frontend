
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, s => s.user);
export const selectToken = createSelector(selectAuthState, s => s.token);
export const selectLoading = createSelector(selectAuthState, s => s.loading);
export const selectError = createSelector(selectAuthState, s => s.error);
export const selectIsAuthenticated = createSelector(selectAuthState, s => !!s.token && !!s.user);
