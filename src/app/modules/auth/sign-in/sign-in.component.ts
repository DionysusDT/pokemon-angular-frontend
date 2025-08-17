import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { AsyncPipe, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { selectError, selectLoading } from '../../../store/auth/selectors';
import { AuthActions } from '../../../store/auth/action';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: UntypedFormGroup;
  showSuccessAlert = false;
  loading$!: ReturnType<Store['select']>;
  error$!: ReturnType<Store['select']>;
  
  private destroy$ = new Subject<void>();
  private _formBuilder = inject(UntypedFormBuilder);
  private store = inject(Store);
  private actions$ = inject(Actions);

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.actions$.pipe(
      ofType(AuthActions.loginSucceeded),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showSuccessAlert = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.store.dispatch(AuthActions.loginRequested({ 
      dto: { email, password } 
    }));
  }
}