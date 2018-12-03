import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Dashboard } from '../../models';

import { DashboardActionTypes, DashboardActionsUnion } from './dashboard.actions';
import { State, StateStatus } from './dashboard.state';

export const adapter: EntityAdapter<Dashboard> = createEntityAdapter<Dashboard>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedDashboardId: null,

  stateStatus: StateStatus.ready
});

export function reducer(state = initialState, action: DashboardActionsUnion): State {

  switch (action.type) {
    case DashboardActionTypes.LOAD_DASHBOARDS: {
      console.log('LOAD_DASHBOARDS');
      return { ...state, stateStatus: StateStatus.loading};
    }

    case DashboardActionTypes.UPDATE_DASHBOARDS: {
      console.log('UPDATE_DASHBOARDS');
      return adapter.addAll(action.payload, initialState);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedDashboardId = (state: State) => state.selectedDashboardId;
