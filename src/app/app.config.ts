import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { layoutReducer } from './store/layout/reducer';
import { LayoutEffects } from './store/layout/effects';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environment/enviroment';
import { API_BASE_URL } from './core/config/config';
import { authReducer } from './store/auth/reducer';
import { AuthEffects } from './store/auth/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './core/auth/auth.interceptor';
import { PokemonEffects } from './store/pokemon/effects';
import { pokemonReducer } from './store/pokemon/reducer';
import { SettingEffects } from './store/setting/effects';
import { settingReducer } from './store/setting/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      layout: layoutReducer,
      auth: authReducer,
      pokemon: pokemonReducer,
      setting: settingReducer
    }),
    provideAnimationsAsync(),
    provideEffects([LayoutEffects, AuthEffects, PokemonEffects, SettingEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(withInterceptors([authTokenInterceptor])),
  ]
};
