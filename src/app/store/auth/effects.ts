import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from '../../core/auth/auth.service';
import { AuthActions } from './action';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(AuthApiService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequested),
      mergeMap(({ dto }) =>
        this.api.login(dto).pipe(
          map(d => AuthActions.loginSucceeded({
            token: d.access_token,
            expiry: d.access_token_expiry,
            login_id: d.login_id,
            user: { id: d.user_id, email: d.email, full_name: d.full_name },
          })),
          catchError(err =>
            of(AuthActions.loginFailed({ error: err?.error?.message ?? 'Login failed' })),
          ),
        ),
      ),
    ),
  );

  loginPersistAndNav$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSucceeded),
        tap(({ token, expiry, user, login_id }) => {
            localStorage.setItem('token', token);
          this.router.navigateByUrl('/home');
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutRequested),
      mergeMap(() =>
        this.api.logout().pipe(
          map(() => AuthActions.logoutSucceeded()),
          catchError(err => of(AuthActions.logoutFailed({ error: err?.error?.message ?? 'Logout failed' }))),
        ),
      ),
    ),
  );

  logoutCleanup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSucceeded),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/sign-in');
        }),
      ),
    { dispatch: false },
  );
}
