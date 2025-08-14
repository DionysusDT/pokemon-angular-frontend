import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  onKeydown(e: KeyboardEvent) {

  }
}
