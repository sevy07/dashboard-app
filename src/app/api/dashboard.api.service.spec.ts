import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { concatMap, tap, map } from 'rxjs/operators';

import { Dashboard } from '../models';
import { DashboardApiService } from './dashboard.api.service';
import { DashboardInMemoryDataApiService } from './dashboard-in-memory-data.api.service';

/**
 * Tests for the DashboardApiService, implemented with HttpClient
 * Tests with extended test expirations accommodate the default (simulated) latency delay.
 * Ideally configured for short or no delay.
 */

describe('DashboardApiService', () => {

  const delay = 1; // some minimal simulated latency delay
  let dashboardApiService: DashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService, { delay })
      ],
      providers: [
        DashboardApiService
      ]
    });
    dashboardApiService = TestBed.get(DashboardApiService);
  });

  it('can get dashboards', async(() => {
    dashboardApiService.getDashboards()
      .subscribe(
        dashboards => {
          expect(dashboards.length).toBeGreaterThan(0, 'should have dashboards');
        },
        fail
      );
  }));

  it('can get dashboard w/ id', async(() => {
    dashboardApiService.getDashboard(1)
      .subscribe(
        dashboard => {
          expect(dashboard.title).toBe('Births');
        },
        () => fail('getDashboard failed')
      );
  }));

  it('should 404 when dashboard id not found', async(() => {
    const id = 123456;
    dashboardApiService.getDashboard(id)
      .subscribe(
        () => fail(`should not have found dashboard for id='${id}'`),
        err => {
          expect(err.status).toBe(404, 'should have 404 status');
        }
      );
  }));

  it('should return undefined when dashboard id not found', async(() => {
    const id = 123456;
    dashboardApiService.getDashboardNo404(id)
      .subscribe(
        dashboard => {
        expect(dashboard).toBe(undefined);
        },
        err => fail('it should have succeded')
      );
  }));

  it('can add a dashboard', async(() => {
    const dashboardTestTitle = 'Test Dashboard';
    const dashboardTest = new Dashboard(dashboardTestTitle);
    dashboardApiService.addDashboard(dashboardTest).pipe(
      tap(dashboard => {
        expect(dashboard.title).toBe(dashboardTestTitle);
      }),
      // Get the new dashboard by its generated id
      concatMap(dashboard => dashboardApiService.getDashboard(dashboard.id)),
    ).subscribe(
      dashboard => {
        expect(dashboard.title).toBe(dashboardTestTitle);
      },
      err => fail('re-fetch of new dashboard failed')
    );
  }), 10000);

  it('can delete a dashboard based on its id', async(() => {
    const id = 1;
    dashboardApiService.deleteDashboard(id)
      .subscribe(
        (_: {}) => {
          expect(_).toBeDefined();
        },
        fail
      );
  }));

  it('can delete a dashboard by passing the dashboard itself', async(() => {
    const dashboardToDelete = new Dashboard('test', '', 1);
    dashboardApiService.deleteDashboard(dashboardToDelete)
      .subscribe(
        (_: {}) => {
          expect(_).toBeDefined();
        },
        fail
      );
  }));

  it('should allow delete of non-existent dashboard', async(() => {
    const id = 123456;
    dashboardApiService.deleteDashboard(id)
      .subscribe(
        (_: {}) => {
          expect(_).toBeDefined();
        },
        fail
      );
  }));

  it('can search for dashboards by name containing "a"', async(() => {
    dashboardApiService.searchDashboards('a')
      .subscribe(
        (dashboards: Dashboard[]) => {
          expect(dashboards.length).toBe(3, 'should find 3 dashboards with letter "a"');
        },
        fail
      );
  }));

  it('should return all dashboards when searching with ""', async(() => {
    dashboardApiService.searchDashboards('')
      .subscribe(
        (dashboards: Dashboard[]) => {
          expect(dashboards.length).toBe(4, 'should find 4 dashboards');
        },
        fail
      );
  }));

  it('can update existing dashboard', async(() => {
    const id = 1;
    dashboardApiService.getDashboard(id).pipe(
      concatMap(dashboard => {
        dashboard.title = 'Thunderstorm';
        return dashboardApiService.updateDashboard(dashboard);
      }),
      concatMap(() => {
        return dashboardApiService.getDashboard(id);
      })
    ).subscribe(
      dashboard => {
        expect(dashboard.title).toBe('Thunderstorm');
      },
      err => fail('re-fetch of updated dashboard failed')
    );
  }), 10000);

  it('should create new dashboard when try to update non-existent dashboard', async(() => {
    const dashboardTest = new Dashboard('dashboardTest Title', 'dashboardTest description', 123456);
    dashboardApiService.updateDashboard(dashboardTest)
      .subscribe(
        dashboard => {
          expect(dashboard.title).toBe(dashboardTest.title);
        },
        fail
      );
  }));

});
