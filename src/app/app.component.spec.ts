import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DashboardApiService, DashboardInMemoryDataApiService } from './api';
import { DashboardService } from './services';
import { reducer as dashboardReducer, DashboardEffect} from './store';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let dashboardServiceMock: { getDashboards: any };

  beforeEach(async(() => {

    dashboardServiceMock = {
      getDashboards: jasmine.createSpy('getDashboards')
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should get dashboards on initialisation', () => {
    expect(app).toBeTruthy();
    expect(dashboardServiceMock.getDashboards).toHaveBeenCalled();
  });
});
