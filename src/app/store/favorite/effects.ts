import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteActions } from './action';
import { catchError, map, of, switchMap } from 'rxjs';
import { FavoriteApi } from '../../modules/common/service/favorite/favorite.service';

@Injectable()
export class FavoriteEffects {
  private actions$ = inject(Actions);
  private api = inject(FavoriteApi);

  syncOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.syncOneRequested),
      switchMap(({ id }) =>
        this.api.isFavorite(id).pipe(
          map(fav => FavoriteActions.syncOneSucceeded({ id, favorite: fav })),
          catchError(error => of(FavoriteActions.syncOneFailed({ id, error })))
        )
      )
    )
  );

  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.toggleRequested),
      switchMap(({ id, next }) =>
        (next ? this.api.set(id) : this.api.unset(id)).pipe(
          map(fav => FavoriteActions.toggleSucceeded({ id, favorite: fav })),
          catchError(error => of(FavoriteActions.toggleFailed({ id, prev: !next, error })))
        )
      )
    )
  );
}
