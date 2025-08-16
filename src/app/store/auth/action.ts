import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { LoginDto, AuthUser, SignupDto } from '../../core/auth/auth.types';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Requested': props<{ dto: LoginDto }>(),
    'Login Succeeded': props<{ token: string; expiry: string; user: AuthUser; login_id: number }>(),
    'Login Failed': props<{ error: string }>(),

    'Logout Requested': emptyProps(),
    'Logout Succeeded': emptyProps(),
    'Logout Failed': props<{ error: string }>(),

    'Signup Requested': props<{ dto: SignupDto }>(),
    'Signup Succeeded': emptyProps(),
    'Signup Failed': props<{ error: string }>()
  },
});
