import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Pokemon, PokemonQuery, PokemonListResponse } from '../../modules/landing/pokemon/pokemon.types';

export const PokemonActions = createActionGroup({
  source: 'Pokemon',
  events: {
    'Load Home Slides Requested': emptyProps(),
    'Load Home Slides Succeeded': props<{ urls: string[] }>(),
    'Load Home Slides Failed': props<{ error: string }>(),

    'Load Home Top10 Requested': emptyProps(),
    'Load Home Top10 Succeeded': props<{ items: Pokemon[] }>(),
    'Load Home Top10 Failed': props<{ error: string }>(),

    'List Requested': props<{ query: PokemonQuery }>(),
    'List Succeeded': props<{ response: PokemonListResponse }>(),
    'List Failed': props<{ error: string }>(),

    'Import Requested': props<{ file: File }>(),
    'Import Succeeded': emptyProps(),
    'Import Failed': props<{ error: string }>(),
  },
});
