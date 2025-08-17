import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../landing/pokemon/pokemon.types';
import { FavoriteActions } from '../../../../store/favorite/action';
import { selectIsFavorite, selectIsLoading } from '../../../../store/favorite/selectors';

type DialogData = {
  pokemon: Pokemon;
  favorite: boolean;
};

@Component({
  selector: 'app-pokemon-compose',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './pokemon-compose.component.html',
  styleUrl: './pokemon-compose.component.scss'
})
export class PokemonComposeComponent implements OnInit {
  favorite$!: Observable<boolean>;
  loading$!: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PokemonComposeComponent, { favorite: boolean }>,
    private store: Store
  ) {}

  ngOnInit() {
    const id = this.data.pokemon.id;
    this.favorite$ = this.store.select(selectIsFavorite(id));
    this.loading$  = this.store.select(selectIsLoading(id));
    this.store.dispatch(FavoriteActions.syncOneRequested({ id }));
  }

  toggle() {
    const id = this.data.pokemon.id;
    this.favorite$.pipe(take(1)).subscribe(isFav => {
      this.store.dispatch(FavoriteActions.toggleRequested({ id, next: !isFav }));
    });
  }

  close() {
    this.favorite$.pipe(take(1)).subscribe(fav => {
      this.dialogRef.close({ favorite: fav });
    });
  }
}
