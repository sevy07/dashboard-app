import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import * as dashboard1 from './mock-data/dashboard-1.json';

import { DashboardService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = dashboard1.default.elements.options;
  constructor(private service: DashboardService) { }


  ngOnInit() {
    this.service.getDashboards();
  }

}
