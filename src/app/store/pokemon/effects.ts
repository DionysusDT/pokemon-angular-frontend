import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PokemonApiService } from '../../modules/landing/pokemon/pokemon.service';
import { PokemonActions } from './action';

@Injectable()
export class PokemonEffects {
  private actions$ = inject(Actions);
  private api = inject(PokemonApiService);

  loadHomeTop10$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadHomeTop10Requested),
      mergeMap(() =>
        this.api.list({ page: 1, limit: 10 }).pipe(
          map(res => PokemonActions.loadHomeTop10Succeeded({ items: res.items })),
          catchError(err => of(PokemonActions.loadHomeTop10Failed({
            error: err?.error?.message ?? 'Load Top10 failed',
          }))),
        )
      )
    )
  );

  loadHomeSlides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadHomeSlidesRequested),
      mergeMap(() =>
        this.api.list({ page: 1, limit: 4 }).pipe(
          map(res => {
            const urls = res.items
              .filter(i => !!i.ytbUrl)
              .slice(0, 4)
              .map(i => i.ytbUrl!);
            return PokemonActions.loadHomeSlidesSucceeded({ urls });
          }),
          catchError(err => of(PokemonActions.loadHomeSlidesFailed({
            error: err?.error?.message ?? 'Load slides failed',
          }))),
        )
      )
    )
  );

  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.listRequested),
      mergeMap(({ query }) =>
        this.api.list(query).pipe(
          map(response => PokemonActions.listSucceeded({ response })),
          catchError(err => of(PokemonActions.listFailed({
            error: err?.error?.message ?? 'Load list failed',
          }))),
        )
      )
    )
  );

  import$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.importRequested),
      mergeMap(({ file }) =>
        this.api.importCsv(file).pipe(
          map(() => PokemonActions.importSucceeded()),
          catchError(err => of(PokemonActions.importFailed({
            error: err?.error?.message ?? 'Import CSV failed',
          }))),
        )
      )
    )
  );
}
