import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonListResponse, PokemonQuery } from './pokemon.types';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/config';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private http = inject(HttpClient);
  private apiBase = inject(API_BASE_URL);

  list(q: PokemonQuery): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiBase}/pokemon`, { params: q as any });
  }

  importCsv(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.apiBase}/pokemon/import-csv`, form);
  }
}
