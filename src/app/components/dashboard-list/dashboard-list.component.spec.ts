import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { Subject } from 'rxjs';

import { DashboardService } from '../../services';
import { Dashboard } from '../../models';

import { DashboardListComponent } from './dashboard-list.component';

describe('DashboardListComponent', () => {

  const subjectDashboards = new Subject<Dashboard[]>();
  const subjectDashboardId =  new Subject<string>();

  let component: DashboardListComponent;
  let fixture: ComponentFixture<DashboardListComponent>;

  let dashboardServiceMock: {
    selectedDashboardId$: any,
    dashboards$: any
    selectDashboard: any,
    deleteDashboard: any,
    clearSelectedDashboard: any,
    };

  beforeEach(async(() => {

    dashboardServiceMock = {
      dashboards$: subjectDashboards,
      selectedDashboardId$: subjectDashboardId,
      selectDashboard: jasmine.createSpy('selectDashboard'),
      deleteDashboard: jasmine.createSpy('deleteDashboard'),
      clearSelectedDashboard:  jasmine.createSpy('clearSelectedDashboard'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DashboardListComponent ],
      providers: [{provide: DashboardService, useValue: dashboardServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
