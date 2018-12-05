import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDashboardComponent } from './display-dashboard.component';

describe('DisplayDashboardComponent', () => {
  let component: DisplayDashboardComponent;
  let fixture: ComponentFixture<DisplayDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDashboardComponent ]
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
