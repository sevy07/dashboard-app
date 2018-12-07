import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Dashboard } from '../models';

import { DashboardActionTypes, DashboardActionsUnion } from './dashboard.actions';
import { DashboardState, StateStatus } from './dashboard.state';

export const adapter: EntityAdapter<Dashboard> = createEntityAdapter<Dashboard>();

export const initialState: DashboardState = adapter.getInitialState({
  // additional entity state properties
  selectedDashboardId: null,

  stateStatus: StateStatus.ready
});

export function reducer(state = initialState, action: DashboardActionsUnion): DashboardState {

  switch (action.type) {
    case DashboardActionTypes.LOAD_DASHBOARDS: {
      return { ...state, stateStatus: StateStatus.loading};
    }

    case DashboardActionTypes.UPDATE_DASHBOARDS: {
      return adapter.addAll(action.payload.dashboards, state);
    }

    case DashboardActionTypes.FAIL_DASHBOARDS: {
      // TODO to be replaced with proper logger
      console.log(action.error);
      return { ...state, stateStatus: StateStatus.failed };
    }

    case DashboardActionTypes.ADD_DASHBOARD: {
      return adapter.addOne(action.payload.dashboard, state);
    }

    case DashboardActionTypes.UPDATE_DASHBOARD: {
      return adapter.updateOne(action.payload.dashboard , state);
    }

    case DashboardActionTypes.UPSERT_DASHBOARD: {
      return adapter.upsertOne(action.payload.dashboard, state);
    }

    case DashboardActionTypes.SELECT_DASHBOARD: {
      return { ...state, selectedDashboardId: action.payload.id };
    }

    case DashboardActionTypes.CLEAR_SELECTION: {
      return { ...state, selectedDashboardId: null };
    }

    case DashboardActionTypes.DELETE_DASHBOARD: {
      return adapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedDashboardId = (state: DashboardState) => state.selectedDashboardId;
