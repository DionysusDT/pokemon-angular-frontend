import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserComponent } from '../../common/user/user.component';
import { SearchComponent } from '../../common/search/search.component';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    RouterLink, RouterLinkActive,
    UserComponent,
    SearchComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isOpen = false;
  toggle() { this.isOpen = !this.isOpen; }
  close() { this.isOpen = false; }
}
