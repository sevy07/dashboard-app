import { HttpClientModule } from '@angular/common/http';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DashboardApiService, DashboardInMemoryDataApiService } from '../../api';

import { Actions } from './dashboard.actions';
import { State, StateStatus } from './dashboard.state';
import { adapter, initialState, reducer } from './dashboard.reducer';
import { Dashboard } from '../../models';

describe('Dashboard store', () => {

  let dashboardApiService: DashboardApiService;

  beforeAll(() => getTestBed().platform || TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()));

  describe('reducer', () => {

    it('should have the correct initial state', () => {
      expect(initialState.stateStatus).toEqual(StateStatus.ready);
      expect(initialState.selectedDashboardId).toBeNull();
      expect(initialState.ids.length).toBe(0);
    });

    it('should return the initial state', () => {
      const state = reducer(undefined, {type: 'fake action'} as any);
      expect(state).toEqual(initialState);
    });

    describe('on Load action', () => {

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientModule,
            HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService)
          ],
          providers: [DashboardApiService]
        });

        dashboardApiService = TestBed.get(DashboardApiService);
      });

      it('should keep the content', () => {
        const state = reducer(initialState, new Actions.LoadDashboards(dashboardApiService.getDashboards()));
        expect(state.entities).toEqual(initialState.entities);
      });

      it('should update the status to loading', () => {
        const state = reducer(initialState, new Actions.LoadDashboards(dashboardApiService.getDashboards()));
        expect(state.stateStatus).toEqual(StateStatus.loading);
      });
    });

    describe('on Update action', () => {

      it('should update the content', async(() => {
        dashboardApiService.getDashboards()
          .subscribe(dashboards => {
            const state = reducer(initialState, new Actions.UpdateDashboards(dashboards));
            expect(state.ids.length).toEqual(dashboards.length);

            dashboards.forEach(dashboard => {
              const entityId = (state.ids as string[]).find((id) => {
                const entity = state.entities[id];
                return JSON.stringify(entity) === JSON.stringify(Object.assign({}, entity, dashboard));
              });
              expect(entityId).not.toBeUndefined();
            });
          });
      }));

      it('should update the status to ready', async(() => {
        dashboardApiService.getDashboards()
          .subscribe(dashboards => {
            const state = reducer(initialState, new Actions.UpdateDashboards(dashboards));
            expect(state.stateStatus).toEqual(StateStatus.ready);
          });
      }));
    });
  });
});
