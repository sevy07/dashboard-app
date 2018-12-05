import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Dashboard } from '../models';
import { DashboardApiService } from '../api';
import { DashboardActions, DashboardState } from '../store';

/**
 * Dashboard service
 */
@Injectable()
export class DashboardService {

  constructor(private api: DashboardApiService, public store: Store<DashboardState>) { }

  /**
   * Retrieves the dashboard form the back-end
   */
  public getDashboards() {
    this.store.dispatch(new DashboardActions.LoadDashboards({request: this.api.getDashboards()}));
  }

  /**
   * Updates a particular dashboard
   * @param dashboard: the dashboard to update
   */
  public updateDashboard(dashboard: Dashboard) {
    this.store.dispatch(new DashboardActions.UpdateDashboard({dashboard: {id: dashboard.id, changes: dashboard}}));
  }

  /**
   * Adds a dashboard to the collection of dashboards
   * @param dashboard: the dashboards to add
   */
  public addDashboard(dashboard: Dashboard) {
    this.store.dispatch(new DashboardActions.AddDashboard({dashboard: dashboard}));
  }

  /**
   * Deletes a dashboard from the collection
   * @param id: the id of the dashboard to delete
   */
  public deleteDashboard(id: string) {
    this.store.dispatch(new DashboardActions.DeleteDashboard({id : id}));
  }

  /**
   * Selects a particular dashboard
   * @param id: the id of the dashboard to select
   */
  public selectDashboard(id: string) {
    this.store.dispatch(new DashboardActions.SelectDashboard({id: id}));
  }

  /**
   * Clears the selection of a particular dashboard
   */
  public clearSelectedDashboard() {
    this.store.dispatch(new DashboardActions.ClearSelection());
  }

}
