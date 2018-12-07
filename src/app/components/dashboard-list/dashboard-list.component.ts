import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Dashboard } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  public dashboards$: Observable<Dashboard[]>;
  public selectedDashboardId$: Observable<string>;

  constructor(private service: DashboardService, private router: Router) {
    this.dashboards$ = this.service.dashboards$;
    this.selectedDashboardId$ = this.service.selectedDashboardId$;
   }

  ngOnInit() {
    this.service.clearSelectedDashboard();
  }

  addDashboard() {
    this.router.navigate(['/edit']);
  }

  deleteDashboard(dashboard: Dashboard) {
    this.service.deleteDashboard(dashboard.id);
  }

  editDashboard(dashboard: Dashboard) {
    this.service.selectedDashboardId$.pipe(
      take(1)
    ).subscribe(() => this.router.navigate(['/edit']));
    this.service.selectDashboard(dashboard.id);
  }

  displayDashboard(dashboard: Dashboard) {
    this.service.selectedDashboardId$.pipe(
      take(1)
    ).subscribe(() => this.router.navigate(['/display']));
    this.service.selectDashboard(dashboard.id);
  }

}
