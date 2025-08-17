import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { startWith, firstValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from '../../../common/component/pokemon-card/pokemon-card.component';
import { PokemonComposeComponent } from '../../../common/component/pokemon-compose/pokemon-compose.component';
import { Pokemon } from '../pokemon.types';
import { Store } from '@ngrx/store';
import { PokemonActions } from '../../../../store/pokemon/action';
import { PokemonApiService } from '../pokemon.service';
import { selectPokemonItems, selectPokemonTotal, selectPokemonLoading } from '../../../../store/pokemon/selectors';
import { selectSpeedRanges, selectTypes } from '../../../../store/setting/selectors';
import { SettingActions } from '../../../../store/setting/action';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatPaginatorModule,
    PokemonCardComponent,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private api = inject(PokemonApiService);
  private store = inject(Store);

  items$ = this.store.select(selectPokemonItems);
  total$ = this.store.select(selectPokemonTotal);
  pageSize$ = this.store.select((state: any) => state?.pokemon?.limit ?? this.pageSize);
  loading$ = this.store.select(selectPokemonLoading);

  types$ = this.store.select(selectTypes);
  speedRanges$ = this.store.select(selectSpeedRanges);

  form = this.fb.group({
    search: [''],
    type: [''],
    legendary: [''],
    speedRange: [''],
  });

  page = 1;
  pageSize = 20;
  pageSizeOptions = [10, 20, 50, 100];

  ngOnInit() {
    this.store.dispatch(SettingActions.loadPokemonConfigRequested());
    this.route.queryParamMap
      .pipe(startWith(this.route.snapshot.queryParamMap), takeUntilDestroyed(this.destroyRef))
      .subscribe(q => {
        const search = q.get('search') ?? '';
        const type = q.get('type') ?? '';
        const legendary = q.get('legendary') ?? '';
        const speedRange = q.get('speedRange') ?? '';
        const page = Number(q.get('page') ?? this.page);
        const pageSize = Number(q.get('pageSize') ?? this.pageSize);

        this.form.patchValue({ search, type, legendary, speedRange }, { emitEvent: false });
        this.page = Number.isFinite(page) && page > 0 ? page : 1;
        this.pageSize = this.pageSizeOptions.includes(pageSize) ? pageSize : 20;
        const query = this.buildQuery();
        this.store.dispatch(PokemonActions.listRequested({ query }));
      });

    this.form.controls.search.valueChanges
      ?.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.page = 1; this.updateUrlQuery(); });

    this.form.controls.type.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.page = 1; this.updateUrlQuery(); });

    this.form.controls.legendary.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.page = 1; this.updateUrlQuery(); });

    this.form.controls.speedRange.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.page = 1; this.updateUrlQuery(); });
  }

  onPage(e: PageEvent) {
    this.page = (e.pageIndex ?? 0) + 1;
    this.pageSize = e.pageSize ?? this.pageSize;
    this.updateUrlQuery();
  }

  reset() {
    this.form.reset({ search: '', type: '', legendary: '', speedRange: '' });
    this.page = 1;
    this.pageSize = 20;
    this.updateUrlQuery();
  }

  openDetail(p: Pokemon) {
    this.dialog.open(PokemonComposeComponent, {
      autoFocus: false,
      data: { pokemon: p }
    });
  }

  async onImportCsv(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    try {
      await firstValueFrom(this.api.importCsv(file));
      this.snack.open('Imported CSV successfully', 'Close', { duration: 2500 });
      this.store.dispatch(PokemonActions.listRequested({ query: this.buildQuery() }));
    } catch (err: any) {
      const message = err?.error?.message || err?.message || 'Failed to import CSV';
      this.snack.open(message, 'Close', { duration: 4000, panelClass: ['snack-error'] });
    } finally {
      input.value = '';
    }
  }

  private buildQuery() {
    const { search, type, legendary, speedRange } = this.form.getRawValue();
    let legendaryBool: boolean | undefined;
    if (legendary === 'true') legendaryBool = true;
    if (legendary === 'false') legendaryBool = false;
    let speedMin: number | undefined;
    let speedMax: number | undefined;
    if (speedRange) {
      const [rawMin, rawMax] = (speedRange as string).split('-');
      const min = Number(rawMin);
      const max = Number(rawMax);
      if (Number.isFinite(min)) speedMin = min;
      if (Number.isFinite(max)) speedMax = max;
    }

    return {
      page: this.page,
      limit: this.pageSize,
      search: (search || undefined) as string | undefined,
      type: (type || undefined) as string | undefined,
      legendary: legendaryBool,
      speedMin,
      speedMax,
    };
  }

  private updateUrlQuery() {
    const { search, type, legendary, speedRange } = this.form.getRawValue();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: search || null,
        type: type || null,
        legendary: legendary || null,
        speedRange: speedRange || null,
        page: this.page,
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
