import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { MatIconModule, MatListModule } from '@angular/material';

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
      imports: [MatIconModule, MatListModule, RouterTestingModule],
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

  it('should create, and clear the selection on lodading', () => {
    expect(component).toBeTruthy();
    expect(dashboardServiceMock.clearSelectedDashboard).toHaveBeenCalled();
  });

  it('should delete a dashboard', () => {
    component.deleteDashboard(new Dashboard('test'));
    expect(dashboardServiceMock.deleteDashboard).toHaveBeenCalled();
  });

  it('should edit a dashboard', () => {
    component.editDashboard(new Dashboard('test'));
    expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
  });


  it('should display a dashboard', () => {
    component.displayDashboard(new Dashboard('test'));
    expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
  });


});
