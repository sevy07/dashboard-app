import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardApiService, DashboardInMemoryDataApiService } from './api';
import { DashboardService } from './services';
import { reducer as dashboardReducer, DashboardEffect} from './store';

import { DashboardListComponent, DisplayDashboardComponent, EditDashboardComponent, ElementComponent } from './components';


@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent,
    DisplayDashboardComponent,
    EditDashboardComponent,
    ElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    StoreModule.forRoot({dashboard: dashboardReducer}),
    EffectsModule.forRoot([DashboardEffect]),
  ],
  providers: [DashboardApiService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
