import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Subject } from 'rxjs';

import { DashboardService } from '../../services';
import { Dashboard, Element } from '../../models';

import { EditDashboardComponent } from './edit-dashboard.component';

describe('EditDashboardComponent', () => {

  const subjectDashboard = new Subject<Dashboard>();
  const subjectDashboardId = new Subject<string>();

  let component: EditDashboardComponent;
  let fixture: ComponentFixture<EditDashboardComponent>;

  let dashboardServiceMock: {
    selectedDashboardId$: any,
    selectedDashboard$: any
    selectDashboard: any,
    upsertDashboard: any,
  };

  beforeEach(async(() => {

    dashboardServiceMock = {
      selectedDashboard$: subjectDashboard,
      selectedDashboardId$: subjectDashboardId,
      selectDashboard: jasmine.createSpy('selectDashboard'),
      upsertDashboard: jasmine.createSpy('upsertDashboard')
    };

    TestBed.configureTestingModule({
      imports: [MatIconModule, MatInputModule, NoopAnimationsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ EditDashboardComponent ],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initaite with a seleted dashboard', async(() => {
    subjectDashboard.next(new Dashboard('test', 'test', undefined, [new Element(), new Element()]));
    expect(component.dashBoardForm.getRawValue().title).toEqual('test');
  }));
});
