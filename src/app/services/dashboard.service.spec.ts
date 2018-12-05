import { HttpClientModule } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DashboardApiService, DashboardInMemoryDataApiService } from '../api';
import { Dashboard } from '../models';
import { DashboardActionTypes, DashboardEffect, DashboardState, reducer } from '../store';

import { DashboardService } from './dashboard.service';



describe('Dashboard Service', () => {

  const dashboardOne = new Dashboard('test one', '', '1');

  let service: DashboardService;
  let store: Store<DashboardState>;
  let calledAction: Action;

  beforeAll(() =>
    getTestBed().platform || TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService),
        StoreModule.forRoot({dashboard: reducer}),
        EffectsModule.forRoot([DashboardEffect])],
      providers: [DashboardApiService, DashboardService]
    });

    service = TestBed.get(DashboardService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callFake((action: any) => {
      calledAction = action;
    });
  });

  it('should retrieve the dashboards', () => {
    service.getDashboards();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.LOAD_DASHBOARDS);
  });

  it('should update a dashboard', () => {
    service.updateDashboard(dashboardOne);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.UPDATE_DASHBOARD);
  });

  it('should add a dashboard', () => {
    service.addDashboard(dashboardOne);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.ADD_DASHBOARD);
  });

  it('should delete a dashboard', () => {
    service.deleteDashboard(dashboardOne.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.DELETE_DASHBOARD);
  });

  it('should select a dashboard', () => {
    service.selectDashboard(dashboardOne.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.SELECT_DASHBOARD);
  });

  it('should clear the selection of a dashboard', () => {
    service.clearSelectedDashboard();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(calledAction.type).toEqual(DashboardActionTypes.CLEAR_SELECTION);
  });

});
