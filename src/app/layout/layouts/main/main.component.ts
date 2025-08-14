import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    RouterLink, RouterLinkActive,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isOpen = false;
  toggle() { this.isOpen = !this.isOpen; }
  close() { this.isOpen = false; }
}
