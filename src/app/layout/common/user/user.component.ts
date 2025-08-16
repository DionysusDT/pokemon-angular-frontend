import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../../store/auth/selectors';
import { AuthActions } from '../../../store/auth/action';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isAuth$;
  user$;

  constructor(private store: Store){
    this.isAuth$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectUser);
  }

  logOut() {
    this.store.dispatch(AuthActions.logoutRequested())
  }
}
