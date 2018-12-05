import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DashboardApiService, DashboardInMemoryDataApiService } from './api';
import { DashboardService } from './services';
import { reducer as dashboardReducer, DashboardEffect} from './store';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService),
        StoreModule.forRoot({dashboard: dashboardReducer}),
        EffectsModule.forRoot([DashboardEffect]),
      ],
      providers: [DashboardApiService, DashboardService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dashboard-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dashboard-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to dashboard-app!');
  });
});
