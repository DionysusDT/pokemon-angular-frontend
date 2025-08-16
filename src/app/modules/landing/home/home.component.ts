import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../../common/component/pokemon-card/pokemon-card.component';
import { register } from 'swiper/element/bundle';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { PokemonActions } from '../../../store/pokemon/action';
import { selectHomeSlides, selectHomeTop10 } from '../../../store/pokemon/selectors';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, AsyncPipe, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  slides$;
  top$;

  constructor(private store: Store) {
    this.slides$ = this.store.select(selectHomeSlides);
    this.top$ = this.store.select(selectHomeTop10);
  }

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.loadHomeTop10Requested());
    this.store.dispatch(PokemonActions.loadHomeSlidesRequested());
  }

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
}
