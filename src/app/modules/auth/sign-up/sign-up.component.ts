import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
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
import { Subject, takeUntil, filter } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { selectError, selectLoading } from '../../../store/auth/selectors';
import { AuthActions } from '../../../store/auth/action';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm!: UntypedFormGroup;
  showSuccessAlert = false;
  loading$!: ReturnType<Store['select']>;
  error$!: ReturnType<Store['select']>;
  
  private destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      agreements: ['', Validators.requiredTrue],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.actions$.pipe(
      ofType(AuthActions.signupSucceeded),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showSuccessAlert = true;
      this.signUpForm.reset();
    });

    this.error$.pipe(
      takeUntil(this.destroy$),
      filter(error => !!error)
    ).subscribe(() => {
      this.showSuccessAlert = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    
    this.showSuccessAlert = false;

    const { name, email, password } = this.signUpForm.value;
    this.store.dispatch(AuthActions.signupRequested({ 
      dto: { full_name: name, email, password } 
    }));
  }
}