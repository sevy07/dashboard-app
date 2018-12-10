import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { Subject } from 'rxjs';

import { DashboardService } from '../../services';
import { Dashboard, Element } from '../../models';

import { DisplayDashboardComponent } from './display-dashboard.component';

@Component({
  selector: 'app-element',
  template: ''
})
class MockElementComponent {
  @Input()
  element: any;
}


describe('DisplayDashboardComponent', () => {

  const subjectDashboard = new Subject<Dashboard>();

  let component: DisplayDashboardComponent;
  let fixture: ComponentFixture<DisplayDashboardComponent>;
  let dashboardServiceMock: { selectedDashboard$: any, updateDashboard: any };
  let mockRouter: {navigate: any};

  beforeEach(async(() => {

    dashboardServiceMock = {
      selectedDashboard$: subjectDashboard,
      updateDashboard: jasmine.createSpy('updateDashboard')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [DisplayDashboardComponent, MockElementComponent ],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }, { provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate home when clicking on go home', () => {
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to edit when clicking on edit', () => {
    component.onEditDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit']);
  });

  it('should call update by removing an element when clicking on DeleteElement', () => {
    const elementOne = new Element('test');
    const dashboard = new Dashboard('test', 'desc', '1', [elementOne, new Element()]);
    component.onDeleteElement(dashboard, 1);
    expect(dashboardServiceMock.updateDashboard).toHaveBeenCalledWith({ ...dashboard, elements: [elementOne]});
  });
});
