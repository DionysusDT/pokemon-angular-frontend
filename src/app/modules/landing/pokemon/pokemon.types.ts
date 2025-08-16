export type Pokemon = {
  id: number;
  name: string;
  image: string;
  type1: string;
  type2?: string | null;
  total?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  spAttack?: number;
  spDefense?: number;
  speed?: number
  generation?: number;
  legendary?: boolean;
  ytbUrl?: string;
};

export interface PokemonListResponse {
  items: Pokemon[];
  total: number;
  page: number;
  limit: number;
}

export interface PokemonQuery {
  limit?: number
  page?: number;
  name?: string;
  type?: string;
  legendary?: boolean;
  speedMin?: number;
  speedMax?: number;
}