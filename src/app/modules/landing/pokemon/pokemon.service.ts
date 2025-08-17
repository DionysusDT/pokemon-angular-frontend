
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PokemonListResponse, PokemonQuery } from './pokemon.types';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/config';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private http = inject(HttpClient);
  private apiBase = inject(API_BASE_URL);

  list(q: PokemonQuery): Observable<PokemonListResponse> {
  let params = new HttpParams();
  Object.entries(q).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, value as any);
    }
  });

  return this.http.get<PokemonListResponse>(`${this.apiBase}/pokemon`, { params });
}

  importCsv(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.apiBase}/pokemon/import-csv`, form);
  }
}
