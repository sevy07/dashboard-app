import { HttpClientModule } from '@angular/common/http';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DashboardApiService, DashboardInMemoryDataApiService } from '../api';
import { Dashboard } from '../models';

import { DashboardActions } from './dashboard.actions';
import { StateStatus } from './dashboard.state';
import { adapter, initialState, getSelectedDashboardId, reducer } from './dashboard.reducer';
import { DashboardEffect } from './dashboard.effect';

describe('Dashboard store', () => {

  let dashboardApiService: DashboardApiService;
  const dashboardOne = new Dashboard('test one', '', '1');
  const dashboardTwo = new Dashboard('test two', '', '2');
  const fullState = adapter.addAll([dashboardOne, dashboardTwo], initialState);

  beforeAll(() => getTestBed().platform || TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()));

  describe('reducer', () => {

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

    it('should have the correct initial state', () => {
      expect(initialState.stateStatus).toEqual(StateStatus.ready);
      expect(initialState.selectedDashboardId).toBeNull();
      expect(initialState.ids.length).toBe(0);
    });

    it('should return the initial state', () => {
      const state = reducer(undefined, {type: 'fake action'} as any);
      expect(state).toEqual(initialState);
    });

    describe('on LoadDashboards action', () => {

      it('should keep the content', () => {
        const state = reducer(fullState,
          new DashboardActions.LoadDashboards({request: dashboardApiService.getDashboards()}));
        Object.keys(fullState.entities).forEach((id) => {
          expect(state.entities[id]).toEqual(fullState.entities[id]);
        });
      });

      it('should update the status to loading', () => {
        const state = reducer(fullState, new DashboardActions.LoadDashboards({request: dashboardApiService.getDashboards()}));
        expect(state.stateStatus).toEqual(StateStatus.loading);
      });
    });

    describe('on UpdateDashboards action', () => {

      it('should update the content', async(() => {
        dashboardApiService.getDashboards()
          .subscribe(dashboards => {
            const state = reducer(initialState, new DashboardActions.UpdateDashboards({dashboards: dashboards}));
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
            const state = reducer(initialState, new DashboardActions.UpdateDashboards({dashboards: dashboards}));
            expect(state.stateStatus).toEqual(StateStatus.ready);
          });
      }));
    });

    describe('on FailDashboards action', () => {

      it('should keep the content', () => {
        const state = reducer(initialState, new DashboardActions.FailDashboards());
        expect(state.entities).toEqual(initialState.entities);
      });

      it('should update the status to failed', () => {
        const state = reducer(initialState, new DashboardActions.FailDashboards());
        expect(state.stateStatus).toEqual(StateStatus.failed);
      });
    });

    describe('on AddDashboard action', () => {

      it('should update the content', () => {
        const dashboardToAdd = new Dashboard('test', '', '1');
        const state = reducer(initialState, new DashboardActions.AddDashboard({dashboard: dashboardToAdd}));
        expect(state.ids.length).toEqual(1);
        expect(state.ids[0]).toEqual('1');
        expect(state.entities[1]).toBe(dashboardToAdd);
      });

      it('should keep the status', () => {
        const dashboardToAdd = new Dashboard('test', '', '1');
        const state = reducer(initialState, new DashboardActions.AddDashboard({dashboard: dashboardToAdd}));
        expect(state.stateStatus).toEqual(initialState.stateStatus);
      });
    });

    describe('on UpdateDashboard action', () => {

      it('should update the content', () => {
        const updatedDashboard = new Dashboard('new Title', 'new Description', '1');
        const state = reducer(
          fullState,
          new DashboardActions.UpdateDashboard({ dashboard: { id: updatedDashboard.id, changes: updatedDashboard}}));
        expect(state.ids.length).toEqual(2);
        expect(state.ids[0]).toEqual('1');
        expect(state.entities['1']).toEqual(jasmine.objectContaining(updatedDashboard));
      });

      it('should keep the status', () => {
        const updatedDashboard = new Dashboard('new Title', 'new Description', '1');
        const state = reducer(
          fullState,
          new DashboardActions.UpdateDashboard({ dashboard: { id: updatedDashboard.id, changes: updatedDashboard } }));

        expect(state.stateStatus).toEqual(fullState.stateStatus);
      });
    });

    describe('on SelectDashboard action', () => {

      it('should keep the content', () => {
        const state = reducer(fullState, new DashboardActions.SelectDashboard({ id: '1' }));
        Object.keys(fullState.entities).forEach((id) => {
          expect(state.entities[id]).toEqual(fullState.entities[id]);
        });
      });

      it('should keep the status', () => {
        const state = reducer(fullState, new DashboardActions.SelectDashboard({ id: '1' }));
        expect(state.stateStatus).toEqual(StateStatus.ready);
      });

      it('should set the selected ID', () => {
        const state = reducer(fullState, new DashboardActions.SelectDashboard({ id: '1' }));
        expect(state.selectedDashboardId).toEqual('1');
        expect(getSelectedDashboardId(state)).toEqual('1');
      });
    });

    describe('on SelectDashboard action', () => {

      const fullSelectedState = { ...fullState, selectedDashboardId: '1' };

      it('should keep the content', () => {
        const state = reducer(fullSelectedState, new DashboardActions.ClearSelection());
        Object.keys(fullSelectedState.entities).forEach((id) => {
          expect(state.entities[id]).toEqual(fullSelectedState.entities[id]);
        });
      });

      it('should keep the status', () => {
        const state = reducer(fullSelectedState, new DashboardActions.ClearSelection());
        expect(state.stateStatus).toEqual(StateStatus.ready);
      });

      it('should set the selected ID', () => {
        const state = reducer(fullSelectedState, new DashboardActions.ClearSelection());
        expect(state.selectedDashboardId).toBeNull();
        expect(getSelectedDashboardId(state)).toBeNull();
      });
    });

    describe('on DeleteDashboard action', () => {

      it('should update the content', () => {
        const state = reducer(fullState, new DashboardActions.DeleteDashboard({ id: '1' }));
        expect(state.ids.length).toEqual(1);
        expect(state.ids[0]).toEqual('2');
        expect(state.entities['1']).not.toBeDefined();
      });

      it('should keep the status', () => {
        const state = reducer(fullState, new DashboardActions.DeleteDashboard({ id: '1' }));
        expect(state.stateStatus).toEqual(fullState.stateStatus);
      });
    });
  });

  describe('effects', () => {
    let actions: Subject<Action>;
    let dashboardEffect: DashboardEffect;
    let result: Action[];

    beforeEach(() => {
      actions = new Subject<Action>();
      result = [];
      TestBed.configureTestingModule({
        providers: [provideMockActions(() => actions), DashboardEffect]
      });
      dashboardEffect = TestBed.get(DashboardEffect);
    });

    describe('on LoadDashboards action', () => {

      it('should do a UpdateDashboards if succeded', async(() => {
        const req = new BehaviorSubject([dashboardOne]);

        dashboardEffect.loadDashboards$.subscribe(
          (action) => result.push(action),
          fail,
          () => {
            expect(result).toEqual([new DashboardActions.UpdateDashboards({dashboards : [dashboardOne]})]);
          }
        );

        actions.next(new DashboardActions.LoadDashboards({request: req as any}));
        actions.complete();

      }));

      it('should do a FailDashboards if failed', async(() => {
        const req = new Subject();

        dashboardEffect.loadDashboards$.subscribe(
          (action) => result.push(action),
          fail,
          () => {
            expect(result).toEqual([new DashboardActions.FailDashboards('error')]);
          }
        );

        req.error('error');
        actions.next(new DashboardActions.LoadDashboards({request: req as any}));
        actions.complete();
      }));
    });

  });
});
