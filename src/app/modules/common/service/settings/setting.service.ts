import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonConfig } from './setting.types';
import { API_BASE_URL } from '../../../../core/config/config';

@Injectable({ providedIn: 'root' })
export class SettingsApi {
  private http = inject(HttpClient);
  private apiBase = inject(API_BASE_URL);

  getPokemonConfig() {
    return this.http.get<PokemonConfig>(`${this.apiBase}/settings/pokemon`);
  }
}
