import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { DashboardService } from '../../services';
import { Dashboard } from '../../models';

import { DisplayDashboardComponent } from './display-dashboard.component';


describe('DisplayDashboardComponent', () => {

  const subjectDashboard = new Subject<Dashboard>();

  let component: DisplayDashboardComponent;
  let fixture: ComponentFixture<DisplayDashboardComponent>;
  let dashboardServiceMock: { selectedDashboard$: any };

  beforeEach(async(() => {

    dashboardServiceMock = {
      selectedDashboard$: subjectDashboard
    };

    TestBed.configureTestingModule({
      declarations: [ DisplayDashboardComponent ],
      providers: [{provide: DashboardService, useValue: dashboardServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
