import { Component, OnInit } from '@angular/core';

import { DashboardService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard-app';

  constructor(private service: DashboardService) { }


  ngOnInit() {
    this.service.getDashboards();
  }

}
