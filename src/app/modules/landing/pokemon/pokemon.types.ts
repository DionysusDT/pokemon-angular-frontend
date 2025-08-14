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
