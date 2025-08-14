import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../landing/pokemon/pokemon.types';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
   @Input() pokemon!: Pokemon;
}
