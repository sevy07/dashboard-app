import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions as RxActions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DashboardActions, DashboardActionTypes } from './dashboard.actions';

@Injectable()
export class DashboardEffect {
  // Listen for the 'LOAD_DASHBOARDS' action
  @Effect()
  loadDashboards$: Observable<Action> = this.actions$
    .ofType<DashboardActions.LoadDashboards>(DashboardActionTypes.LOAD_DASHBOARDS)
    .pipe(
      switchMap(action =>
        action.payload.request.pipe(
          // If successful, dispatch success action with result
          map(dashboards => new DashboardActions.UpdateDashboards({ dashboards: dashboards })),
          // If request fails, dispatch failed action
          catchError((err) => of(new DashboardActions.FailDashboards(err)))
        )
      )
    );

  constructor(private actions$: RxActions) { }
}
