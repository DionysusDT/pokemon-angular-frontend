import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthApiService } from '../auth.service';

export const NoAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth   = inject(AuthApiService);

  return auth.check().pipe(
    map(ok => (ok ? router.createUrlTree(['/home']) : true))
  );
};``

export const NoAuthChildGuard: CanActivateChildFn = NoAuthGuard as CanActivateChildFn;
