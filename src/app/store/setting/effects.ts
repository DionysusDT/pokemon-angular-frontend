import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SettingsApi } from '../../modules/common/service/settings/setting';
import { SettingActions } from './action';

@Injectable()
export class SettingEffects {
  private actions$ = inject(Actions);
  private api = inject(SettingsApi);

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.loadPokemonConfigRequested),
      switchMap(() =>
        this.api.getPokemonConfig().pipe(
          map((config) => SettingActions.loadPokemonConfigSucceeded({ config })),
          catchError((error) => of(SettingActions.loadPokemonConfigFailed({ error })))
        )
      )
    )
  );
}
