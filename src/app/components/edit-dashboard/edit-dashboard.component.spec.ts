import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

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

  let mockRouter: { navigate: any };


  beforeEach(async(() => {

    dashboardServiceMock = {
      selectedDashboard$: subjectDashboard,
      selectedDashboardId$: subjectDashboardId,
      selectDashboard: jasmine.createSpy('selectDashboard'),
      upsertDashboard: jasmine.createSpy('upsertDashboard')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [MatIconModule, MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [ EditDashboardComponent ],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }, { provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initaite with a seleted dashboard', async(() => {
    subjectDashboard.next(new Dashboard('test', 'test', undefined, [new Element('test', {}, () => {}, false, false), new Element()]));
    expect(component.dashBoardForm.getRawValue().title).toEqual('test');
  }));

  it('should navigate home when clicking on go home', () => {
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should add an element', () => {
    component.addElement();
    expect(component.elements.controls.length).toEqual(2);
  });

  describe('edit dashboard form', () => {
    it('should not attepmt to submit an invalid form', () => {
      component.dashBoardForm.setErrors({required: 'dummy error'});
      fixture.detectChanges();
      component.onSubmit();
      expect(dashboardServiceMock.selectDashboard).not.toHaveBeenCalled();
      expect(dashboardServiceMock.upsertDashboard).not.toHaveBeenCalled();
    });

    it('should submit a valid form with elements', async(() => {
      subjectDashboard.next(new Dashboard('test', 'test', undefined, [new Element(), new Element()]));
      component.onSubmit();
      expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
      expect(dashboardServiceMock.upsertDashboard).toHaveBeenCalled();
    }));

    it('should submit a valid form with elements', () => {
      component.onSubmit();
      expect(dashboardServiceMock.selectDashboard).toHaveBeenCalled();
      expect(dashboardServiceMock.upsertDashboard).toHaveBeenCalled();
    });
  });
});
