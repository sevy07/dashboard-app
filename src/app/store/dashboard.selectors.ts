import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Dashboard} from '../models';

import { adapter } from './dashboard.reducer';
import { DashboardState } from './dashboard.state';

const selectors = adapter.getSelectors();

export const selectDashboardState: MemoizedSelector<object, DashboardState> = createFeatureSelector('dashboard');

export const selectAllDashboards = createSelector(selectDashboardState, selectors.selectAll);

export const selectDashboardEntities: MemoizedSelector<object, {[key: string]: Dashboard}> = createSelector(
  selectDashboardState, selectors.selectEntities);

export const selectCurrentDashboardId = createSelector(selectDashboardState, (state) => state.selectedDashboardId);

export const selectCurrentDashboard = createSelector(
  selectDashboardEntities,
  selectCurrentDashboardId,
  (dashboards, id): Dashboard | null => id ? dashboards[id] : null);
