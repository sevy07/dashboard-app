import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Dashboard } from '../models';
import { Observable } from 'rxjs';

export enum DashboardActionTypes {
  LOAD_DASHBOARDS = '[Dashboard] Load Dashboards',
  UPDATE_DASHBOARDS = '[Dashboard] Update Dashboards',
  FAIL_DASHBOARDS = '[Dashboard] Fail Dashboards',

  ADD_DASHBOARD = '[Dashboard] Add Dashboard',
  UPDATE_DASHBOARD = '[Dashboard] Update Dashboard',
  DELETE_DASHBOARD = '[Dashboard] Delete Dashboard',
  SELECT_DASHBOARD = '[Dashboard] Select Dashboard',
  CLEAR_SELECTION = '[Dashboard] Clear selected Dashboard'
}

export namespace DashboardActions {
  export class LoadDashboards implements Action {
    readonly type = DashboardActionTypes.LOAD_DASHBOARDS;

    constructor(public payload: Observable<Dashboard[]>) { }
  }

  export class UpdateDashboards implements Action {
    readonly type = DashboardActionTypes.UPDATE_DASHBOARDS;

    constructor(public payload: Dashboard[]) { }
  }

  export class FailDashboards implements Action {
    readonly type = DashboardActionTypes.FAIL_DASHBOARDS;

    constructor(public error?: any) { }
  }

  export class AddDashboard implements Action {
    readonly type = DashboardActionTypes.ADD_DASHBOARD;

    constructor(public payload: Dashboard) { }
  }

  export class UpdateDashboard implements Action {
    readonly type = DashboardActionTypes.UPDATE_DASHBOARD;

    constructor(public payload: { dashboard: Update<Dashboard> }) { }
  }

  export class SelectDashboard implements Action {
    readonly type = DashboardActionTypes.SELECT_DASHBOARD;

    constructor(public payload: { id: string }) { }
  }

  export class ClearSelection implements Action {
    readonly type = DashboardActionTypes.CLEAR_SELECTION;

    constructor() { }
  }

  export class DeleteDashboard implements Action {
    readonly type = DashboardActionTypes.DELETE_DASHBOARD;

    constructor(public payload: { id: string }) { }
  }
}

export type DashboardActionsUnion =
  | DashboardActions.LoadDashboards
  | DashboardActions.UpdateDashboards
  | DashboardActions.FailDashboards
  | DashboardActions.AddDashboard
  | DashboardActions.UpdateDashboard
  | DashboardActions.SelectDashboard
  | DashboardActions.ClearSelection
  | DashboardActions.DeleteDashboard;
