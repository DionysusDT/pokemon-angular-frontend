import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../../core/auth/auth.types';
import { AuthActions } from './action';

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  expiry: string | null;
  login_id: number | null;
  loading: boolean;
  error?: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  expiry: null,
  login_id: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginRequested, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSucceeded, (state, { token, expiry, user, login_id }) => ({
    ...state, loading: false, token, expiry, user, login_id, error: null,
  })),
  on(AuthActions.loginFailed, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.logoutRequested, state => ({ ...state, loading: true })),
  on(AuthActions.logoutSucceeded, _ => ({ ...initialState })),
  on(AuthActions.logoutFailed, (state, { error }) => ({ ...state, loading: false, error }))
);
