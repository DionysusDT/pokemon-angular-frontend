import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PokemonCardComponent } from '../../../common/component/pokemon-card/pokemon-card.component';
import { Pokemon } from '../pokemon.types';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonComposeComponent } from '../../../common/component/pokemon-compose/pokemon-compose.component';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatPaginatorModule,
    PokemonCardComponent,
    MatDialogModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly all: Pokemon[] = [
    { id: 1, name: 'Pokemon-1', type1: 'Dark', type2: 'Water', total: 474, hp: 209, attack: 241, defense: 102, spAttack: 22, spDefense: 202, speed: 140, generation: 6, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
    { id: 2, name: 'Pokemon-2', type1: 'Dragon', type2: '', total: 683, hp: 43, attack: 247, defense: 196, spAttack: 202, spDefense: 134, speed: 212, generation: 5, legendary: true, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
    { id: 3, name: 'Pokemon-3', type1: 'Grass', type2: '', total: 399, hp: 181, attack: 80, defense: 72, spAttack: 104, spDefense: 44, speed: 121, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' },
    { id: 4, name: 'Pokemon-4', type1: 'Dark', type2: 'Steel', total: 580, hp: 25, attack: 231, defense: 119, spAttack: 91, spDefense: 230, speed: 161, generation: 1, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
    { id: 5, name: 'Pokemon-5', type1: 'Fighting', type2: 'Bug', total: 255, hp: 224, attack: 244, defense: 246, spAttack: 39, spDefense: 21, speed: 124, generation: 2, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
    { id: 6, name: 'Pokemon-6', type1: 'Fairy', type2: '', total: 383, hp: 73, attack: 119, defense: 64, spAttack: 90, spDefense: 96, speed: 205, generation: 7, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
    { id: 7, name: 'Pokemon-7', type1: 'Dark', type2: '', total: 362, hp: 197, attack: 28, defense: 107, spAttack: 88, spDefense: 188, speed: 33, generation: 8, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
    { id: 8, name: 'Pokemon-8', type1: 'Fire', type2: 'Rock', total: 555, hp: 84, attack: 99, defense: 242, spAttack: 146, spDefense: 68, speed: 33, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
    { id: 9, name: 'Pokemon-9', type1: 'Bug', type2: 'Flying', total: 530, hp: 97, attack: 44, defense: 42, spAttack: 22, spDefense: 250, speed: 214, generation: 3, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' },
    { id: 10, name: 'Pokemon-10', type1: 'Flying', type2: '', total: 259, hp: 84, attack: 96, defense: 113, spAttack: 186, spDefense: 127, speed: 74, generation: 8, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png', ytbUrl: 'https://youtu.be/D0zYJ1RQ-fs' },
    { id: 11, name: 'Pokemon-11', type1: 'Poison', type2: '', total: 549, hp: 245, attack: 193, defense: 158, spAttack: 52, spDefense: 217, speed: 108, generation: 2, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png', ytbUrl: 'https://youtu.be/1roy4o4tqQM' },
    { id: 12, name: 'Pokemon-12', type1: 'Grass', type2: '', total: 680, hp: 50, attack: 247, defense: 83, spAttack: 207, spDefense: 196, speed: 195, generation: 7, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png', ytbUrl: 'https://youtu.be/bILE5BEyhdo' },
    { id: 13, name: 'Pokemon-13', type1: 'Fire', type2: 'Dragon', total: 356, hp: 214, attack: 208, defense: 76, spAttack: 84, spDefense: 51, speed: 146, generation: 2, legendary: false, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png', ytbUrl: 'https://youtu.be/uBYORdr_TY8' },
  ];

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  types: string[] = [];

  form = this.fb.group({
    search: [''],
    type: [''],
    legendary: [''],
    speedRange: [''],
  });

  page = 1;
  pageSize = 20;
  pageSizeOptions = [10, 20, 50, 100];

  filtered: Pokemon[] = [];
  total() { return this.filtered.length; }

  pageData(): Pokemon[] {
    const p = this.page;
    const l = this.pageSize;
    const start = (p - 1) * l;
    return this.filtered.slice(start, start + l);
  }

  ngOnInit() {
    this.filtered = [...this.all];

    this.form.controls.search.valueChanges?.pipe(debounceTime(300)).subscribe(() => {
      this.page = 1;
      this.applyFilters();
    });

    this.applyFilters();
  }

  onPage(e: PageEvent) {
    this.page = (e.pageIndex ?? 0) + 1;
    this.pageSize = e.pageSize ?? this.pageSize;
  }

  reset() {
    this.form.reset({ search: '', type: '', legendary: '', speedRange: '' });
    this.page = 1;
    this.pageSize = 20;
    this.applyFilters();
  }

  private applyFilters() {

  }

  openDetail(p: Pokemon){
    this.dialog.open(PokemonComposeComponent, {
      data: {
        pokemon: p
      }
    });
  }
}