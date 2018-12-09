import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  get elements() {
    return this.dashBoardForm.get('elements') as FormArray;
  }

  constructor(private fb: FormBuilder, private service: DashboardService, private router: Router) {
    this.dashboard = new Dashboard('');
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
    this.dashBoardForm = this.fb.group({
      title: [this.dashboard.title],
      description: [this.dashboard.description],
      elements: this.fb.array(this.dashboard.elements ? [this.dashboard.elements.map((element) => JSON.stringify(element))] : [''])
    });
  }

  addElement() {
    this.elements.push(this.fb.control(''));
  }

  onSubmit() {
    if (this.dashBoardForm.valid) {
      this.service.selectedDashboardId$.pipe(
        take(1)
      ).subscribe(() => this.router.navigate(['/display']));
      const rawDashboard = this.dashBoardForm.getRawValue();
      const updatedDashboard = Object.assign({},
        this.dashboard, rawDashboard, { elements: rawDashboard.elements.map((element) => element ? JSON.parse(element) : undefined )});
      this.service.upsertDashboard(updatedDashboard);
      this.service.selectDashboard(updatedDashboard.id);

    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
