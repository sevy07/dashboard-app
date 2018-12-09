import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material';

import { Subject } from 'rxjs';

import { DashboardService } from '../../services';
import { Dashboard } from '../../models';

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
  let dashboardServiceMock: { selectedDashboard$: any };

  beforeEach(async(() => {

    dashboardServiceMock = {
      selectedDashboard$: subjectDashboard
    };

    TestBed.configureTestingModule({
      imports: [MatIconModule, RouterTestingModule],
      declarations: [DisplayDashboardComponent, MockElementComponent ],
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
