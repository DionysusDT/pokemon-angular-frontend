import { createReducer, on } from "@ngrx/store";
import { FavoriteActions } from "./action";

export interface FavoriteState {
  ids: Record<number, boolean>;
  loading: Record<number, boolean>;
  error?: any;
}

export const initialState: FavoriteState = { ids: {}, loading: {} };

export const favoriteReducer = createReducer(
  initialState,

  on(FavoriteActions.syncOneRequested, FavoriteActions.toggleRequested, (s, { id }) => ({
    ...s,
    loading: { ...s.loading, [id]: true },
    error: undefined,
  })),

  on(FavoriteActions.syncOneSucceeded, FavoriteActions.toggleSucceeded, (s, { id, favorite }) => ({
    ...s,
    ids: { ...s.ids, [id]: favorite },
    loading: { ...s.loading, [id]: false },
  })),

  on(FavoriteActions.syncOneFailed, FavoriteActions.toggleFailed, (s, { id, error }) => ({
    ...s,
    loading: { ...s.loading, [id]: false },
    error,
  })),
);
