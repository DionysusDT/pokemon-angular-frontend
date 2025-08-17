import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../../../core/config/config';

type ApiResp<T> = { success: boolean; data: T };

@Injectable({ providedIn: 'root' })
export class FavoriteApi {
  private http = inject(HttpClient);
  private apiBase = inject(API_BASE_URL);

  isFavorite(pokemonId: number) {
    return this.http
      .get<ApiResp<{ favorite: boolean }>>(
        `${this.apiBase}/favorites/${pokemonId}/is-favorite`
      )
      .pipe(map(r => r.data.favorite));
  }

  set(pokemonId: number) {
    return this.http
      .post<ApiResp<{ favorite: boolean }>>(
        `${this.apiBase}/favorites/${pokemonId}`,
        {}
      )
      .pipe(map(r => r.data.favorite));
  }

  unset(pokemonId: number) {
    return this.http
      .delete<ApiResp<{ favorite: boolean }>>(
        `${this.apiBase}/favorites/${pokemonId}`
      )
      .pipe(map(r => r.data.favorite));
  }
}
