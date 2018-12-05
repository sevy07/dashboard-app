import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { adapter } from './dashboard.reducer';
import { DashboardState } from './dashboard.state';

const selectors = adapter.getSelectors();

export const selectDashboardState: MemoizedSelector<object, DashboardState> = createFeatureSelector('dashboard');

export const selectAllDashboards = createSelector(selectDashboardState, selectors.selectAll);
