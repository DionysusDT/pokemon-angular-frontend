import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthApiService } from '../auth.service';

export const AuthGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const auth   = inject(AuthApiService);

  return auth.check().pipe(
    map(ok =>
      ok
        ? true
        : router.createUrlTree(
            ['/sign-in'],
            { queryParams: { redirectURL: state.url } }
          )
    )
  );
};

export const AuthChildGuard: CanActivateChildFn = AuthGuard as CanActivateChildFn;
