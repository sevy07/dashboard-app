import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

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

  let mockRouter: { navigate: any };

  let dashboardServiceMock: {
    selectedDashboardId$: any,
    dashboards$: any
    selectDashboard: any,
    deleteDashboard: any,
    clearSelectedDashboard: any,
    };

  beforeEach(async(() => {

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    dashboardServiceMock = {
      dashboards$: subjectDashboards,
      selectedDashboardId$: subjectDashboardId,
      selectDashboard: jasmine.createSpy('selectDashboard'),
      deleteDashboard: jasmine.createSpy('deleteDashboard'),
      clearSelectedDashboard:  jasmine.createSpy('clearSelectedDashboard'),
    };

    TestBed.configureTestingModule({
      imports: [MatIconModule, MatListModule],
      declarations: [ DashboardListComponent ],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }, { provide: Router, useValue: mockRouter }]
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

  it('should edit a dashboard', async(() => {
    component.editDashboard(new Dashboard('test'));
    subjectDashboardId.next('1');
    expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit']);
  }));


  it('should display a dashboard', async(() => {
    component.displayDashboard(new Dashboard('test'));
    subjectDashboardId.next('1');
    expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/display']);
  }));

  it('should add a dashboard', () => {
    component.addDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit']);
  });


});
