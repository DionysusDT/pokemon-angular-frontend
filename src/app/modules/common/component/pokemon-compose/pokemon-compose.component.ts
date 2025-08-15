import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../../landing/pokemon/pokemon.types';

type DialogData = {
  pokemon: Pokemon;
  favorite: boolean;
};

@Component({
  selector: 'app-pokemon-compose',
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './pokemon-compose.component.html',
  styleUrl: './pokemon-compose.component.scss'
})
export class PokemonComposeComponent {
  favorite: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<
      PokemonComposeComponent,
      { favorite: boolean }
    >
  ) {
    this.favorite = data.favorite;
  }

  toggle() {
    this.favorite = !this.favorite;
  }

  close() {
    this.dialogRef.close({ favorite: this.favorite });
  }
}
