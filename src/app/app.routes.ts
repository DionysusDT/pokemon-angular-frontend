import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NoAuthChildGuard, NoAuthGuard } from './core/auth/guard/no-auth.guard';
import { AuthChildGuard, AuthGuard } from './core/auth/guard/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthChildGuard],
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.routes') },
      { path: 'sign-up', loadChildren: () => import('./modules/auth/sign-up/sign-up.routes') }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthChildGuard],
    data: {
      layout: 'main'
    },
    children: [
      { path: 'home', loadChildren: () => import('./modules/landing/home/home.routes') },
      { path: 'pokemon', loadChildren: () => import('./modules/landing/pokemon/pokemon.routes') },
      { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('./modules/landing/error/error-404/error-404.routes') },
      { path: '**', redirectTo: '404-not-found' }
    ]
  },
  { path: '**', redirectTo: 'home' },
];
