import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { LayoutType, setLayout } from './action';

function readLayoutFromSnapshot(root: ActivatedRouteSnapshot): LayoutType {
  let cur: ActivatedRouteSnapshot | null = root;
  let found: any = null;
  while (cur) {
    if (cur.data && cur.data['layout']) found = cur.data['layout'];
    cur = cur.firstChild as any;
  }
  return (found === 'empty') ? 'empty' : 'main';
}

@Injectable()
export class LayoutEffects {
  private router = inject(Router);

  updateLayout$ = createEffect(() =>
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => readLayoutFromSnapshot(this.router.routerState.snapshot.root)),
      distinctUntilChanged(),
      map(layout => setLayout({ layout }))
    )
  );
}
