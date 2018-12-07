import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardApiService, DashboardInMemoryDataApiService } from './api';
import { DashboardService } from './services';
import { reducer as dashboardReducer, DashboardEffect} from './store';

import { DashboardListComponent, DisplayDashboardComponent, EditDashboardComponent } from './components';


@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent,
    DisplayDashboardComponent,
    EditDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DashboardInMemoryDataApiService),
    ReactiveFormsModule,
    StoreModule.forRoot({dashboard: dashboardReducer}),
    EffectsModule.forRoot([DashboardEffect]),
  ],
  providers: [DashboardApiService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
