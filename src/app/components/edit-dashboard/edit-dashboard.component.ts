import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { Dashboard } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {

  dashboard: Dashboard;

  dashBoardForm: FormGroup;

  constructor(private fb: FormBuilder, private service: DashboardService, private router: Router) {
    this.dashboard = new Dashboard('new dashboard');
   }

  ngOnInit() {
    this.service.selectedDashboard$.pipe(
      take(1)
    ).subscribe((dashboard) => {
      if (dashboard) {
        this.dashboard = dashboard;
      }
    });
    this.populateForm();
  }

  populateForm() {
    this.dashBoardForm = this.fb.group(this.dashboard);
  }

  onSubmit() {
    if (this.dashBoardForm.valid) {
      this.service.selectedDashboardId$.pipe(
        take(1)
      ).subscribe(() => this.router.navigate(['/display']));
      const rawDashboard: Dashboard = this.dashBoardForm.getRawValue();
      const updatedDashboard = new Dashboard(rawDashboard.title, rawDashboard.description, rawDashboard.id);
      this.service.upsertDashboard(updatedDashboard);
      this.service.selectDashboard(rawDashboard.id);

    }
  }

}
