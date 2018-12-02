import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Dashboard } from '../../models/dashboard.model';

export enum DasboardActionTypes {
  LOAD_DASHBOARDS = '[Dashboard] Load Dasboards',
  ADD_DASHBOARD = '[Dashboard] Add Dashboard',
  UPSERT_DASHBOARD = '[Dashboard] Upsert Dashboard',
  ADD_DASHBOARDS = '[Dashboard] Add Dasboards',
  UPSERT_DASHBOARDS = '[Dashboard] Upsert Dasboards',
  UPDATE_DASHBOARD = '[Dashboard] Update Dashboard',
  UPDATE_DASHBOARDS = '[Dashboard] Update Dasboards',
  DELETE_DASHBOARD = '[Dashboard] Delete Dashboard',
  DELETE_DASHBOARDS = '[Dashboard] Delete Dasboards',
  CLEAR_DASHBOARDS = '[Dashboard] Clear Dasboards',
}

export class LoadDasboards implements Action {
  readonly type = DasboardActionTypes.LOAD_DASHBOARDS;

  constructor(public payload: { dasboards: Dashboard[] }) { }
}

export class AddDasboard implements Action {
  readonly type = DasboardActionTypes.ADD_DASHBOARD;

  constructor(public payload: { dasboard: Dashboard }) { }
}

export class UpsertDasboard implements Action {
  readonly type = DasboardActionTypes.UPSERT_DASHBOARD;

  constructor(public payload: { dasboard: Dashboard }) { }
}

export class AddDasboards implements Action {
  readonly type = DasboardActionTypes.ADD_DASHBOARDS;

  constructor(public payload: { dasboards: Dashboard[] }) { }
}

export class UpsertDasboards implements Action {
  readonly type = DasboardActionTypes.UPSERT_DASHBOARDS;

  constructor(public payload: { dasboards: Dashboard[] }) { }
}

export class UpdateDasboard implements Action {
  readonly type = DasboardActionTypes.UPDATE_DASHBOARD;

  constructor(public payload: { dasboard: Update<Dashboard> }) { }
}

export class UpdateDasboards implements Action {
  readonly type = DasboardActionTypes.UPDATE_DASHBOARDS;

  constructor(public payload: { dasboards: Update<Dashboard>[] }) { }
}

export class DeleteDasboard implements Action {
  readonly type = DasboardActionTypes.DELETE_DASHBOARD;

  constructor(public payload: { id: string }) { }
}

export class DeleteDasboards implements Action {
  readonly type = DasboardActionTypes.DELETE_DASHBOARDS;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearDasboards implements Action {
  readonly type = DasboardActionTypes.CLEAR_DASHBOARDS;
}

export type DasboardActionsUnion =
  | LoadDasboards
  | AddDasboard
  | UpsertDasboard
  | AddDasboards
  | UpsertDasboards
  | UpdateDasboard
  | UpdateDasboards
  | DeleteDasboard
  | DeleteDasboards
  | ClearDasboards;
