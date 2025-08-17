export interface SpeedRange {
  label: string;
  value: string;
}
export interface PokemonConfig {
  types: string[];
  speedRanges: SpeedRange[];
}
