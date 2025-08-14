import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokemonCardComponent } from '../../common/component/pokemon-card/pokemon-card.component';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { Pokemon } from '../pokemon/pokemon.types';

register();
@Component({
  selector: 'app-home',
  imports: [
    CommonModule, PokemonCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  slides = [
    'https://youtu.be/uBYORdr_TY8',
    'https://youtu.be/uBYORdr_TY8',
    'https://youtu.be/D0zYJ1RQ-fs',
    'https://youtu.be/uBYORdr_TY8',
  ];

  private ytId(url: string): string | null {
    const m = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : null;
  }

  thumb(url: string): string {
    const id = this.ytId(url);
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : 'assets/placeholder-16x9.jpg';
  }

  top: Pokemon[] = [];

  ngOnInit() {
    this.top = [
      { id: 1, name: 'Pokemon-1', type1: 'Dark', type2: 'Water', total: 474, hp: 209, attack: 241, defense: 102, spAttack: 22, spDefense: 202, speed: 140, generation: 6, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
      { id: 2, name: 'Pokemon-2', type1: 'Dragon', type2: '', total: 683, hp: 43, attack: 247, defense: 196, spAttack: 202, spDefense: 134, speed: 212, generation: 5, legendary: true, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
      { id: 3, name: 'Pokemon-3', type1: 'Grass', type2: '', total: 399, hp: 181, attack: 80, defense: 72, spAttack: 104, spDefense: 44, speed: 121, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' },
      { id: 4, name: 'Pokemon-4', type1: 'Dark', type2: 'Steel', total: 580, hp: 25, attack: 231, defense: 119, spAttack: 91, spDefense: 230, speed: 161, generation: 1, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
      { id: 5, name: 'Pokemon-5', type1: 'Fighting', type2: 'Bug', total: 255, hp: 224, attack: 244, defense: 246, spAttack: 39, spDefense: 21, speed: 124, generation: 2, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
      { id: 6, name: 'Pokemon-6', type1: 'Fairy', type2: '', total: 383, hp: 73, attack: 119, defense: 64, spAttack: 90, spDefense: 96, speed: 205, generation: 7, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
      { id: 7, name: 'Pokemon-7', type1: 'Dark', type2: '', total: 362, hp: 197, attack: 28, defense: 107, spAttack: 88, spDefense: 188, speed: 33, generation: 8, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
      { id: 8, name: 'Pokemon-8', type1: 'Fire', type2: 'Rock', total: 555, hp: 84, attack: 99, defense: 242, spAttack: 146, spDefense: 68, speed: 33, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
      { id: 9, name: 'Pokemon-9', type1: 'Bug', type2: 'Flying', total: 530, hp: 97, attack: 44, defense: 42, spAttack: 22, spDefense: 250, speed: 214, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' },
      { id: 10, name: 'Pokemon-10', type1: 'Flying', type2: '', total: 259, hp: 84, attack: 96, defense: 113, spAttack: 186, spDefense: 127, speed: 74, generation: 8, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' }
    ]
  }
}
