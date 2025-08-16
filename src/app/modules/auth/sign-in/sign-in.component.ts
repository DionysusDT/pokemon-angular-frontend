// src/app/modules/auth/sign-in/sign-in.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectError, selectLoading } from '../../../store/auth/selectors';
import { AuthActions } from '../../../store/auth/action';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatCheckboxModule, MatProgressSpinnerModule, AsyncPipe, NgIf,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  loading$!: ReturnType<Store['select']>;
  error$!: ReturnType<Store['select']>;

  constructor(private fb: UntypedFormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  signIn(): void {
    if (this.signInForm.invalid) return;
    const { email, password } = this.signInForm.value;
    this.store.dispatch(AuthActions.loginRequested({ dto: { email, password } }));
  }
}
