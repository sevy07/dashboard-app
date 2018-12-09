import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Dashboard } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'app-display-dashboard',
  templateUrl: './display-dashboard.component.html',
  styleUrls: ['./display-dashboard.component.scss']
})
export class DisplayDashboardComponent implements OnInit {

  public dashboard$: Observable<Dashboard>;

  constructor(private service: DashboardService, private router: Router) {
    this.dashboard$ = this.service.selectedDashboard$;
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  editDashboard() {
    this.router.navigate(['/edit']);
  }
}