import { NgIf, NgClass, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { EmptyComponent } from './layouts/empty/empty.component';
import { selectLayout } from '../store/layout/selectors';
import { Store } from '@ngrx/store';
import { LayoutType } from '../store/layout/action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    MainComponent,
    EmptyComponent,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private store = inject(Store);
  layout$: Observable<LayoutType> = this.store.select(selectLayout);
}
