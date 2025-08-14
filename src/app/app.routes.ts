import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
        children: [
          { path: 'home', loadChildren: () => import('./modules/landing/home/home.routes') },
          { path: 'pokemon', loadChildren: () => import('./modules/landing/pokemon/pokemon.routes') }
        ]
    }
];
