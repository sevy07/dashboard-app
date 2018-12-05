import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import { Dashboard } from './models';
import { DashboardService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard-app';

  public dashboards$: Observable<Dashboard[]>;

  constructor(private service: DashboardService) {
    this.dashboards$ = this.service.dashboards$;
  }


  ngOnInit() {
    this.service.getDashboards();
  }
}
